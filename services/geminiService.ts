import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_TEXT_TASK } from '../constants';
import { NeighborhoodData, WaterStatus } from '../types';

/**
 * Service to interact with the Google Gemini API.
 * The API key is expected to be available via process.env.API_KEY.
 */
class GeminiService {
  private getAiInstance(): GoogleGenAI {
    if (!process.env.API_KEY) {
      console.error('API_KEY environment variable is not set.');
      throw new Error('Gemini API key is not configured.');
    }
    // Create a new instance for each call to ensure the latest API key is used
    // if the user interacts with the API key selection dialog.
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Generates a suggested broadcast message using the Gemini API.
   * @param neighborhoodData An array of neighborhood data for context.
   * @param selectedNeighborhoodIds The IDs of neighborhoods for which to generate the message.
   * @param customPrompt An optional custom prompt to guide the message generation.
   * @returns A promise that resolves to the suggested broadcast message.
   */
  public async generateBroadcastSuggestion(
    neighborhoodData: NeighborhoodData[],
    selectedNeighborhoodIds: string[],
    customPrompt?: string,
  ): Promise<string> {
    try {
      const ai = this.getAiInstance();

      const relevantNeighborhoods = neighborhoodData.filter(nb => selectedNeighborhoodIds.includes(nb.id));

      if (relevantNeighborhoods.length === 0) {
        return 'No neighborhoods selected or found for generating a broadcast message.';
      }

      const neighborhoodSummary = relevantNeighborhoods.map(nb => {
        let status = `Water: ${nb.waterStatus}`;
        if (nb.waterStatus === WaterStatus.NO_WATER || nb.waterStatus === WaterStatus.SCARCE) {
          status += nb.daysNoWater ? `, No water for ${nb.daysNoWater} days` : '';
          if (nb.waterTruckSchedule && nb.waterTruckSchedule.length > 0) {
            status += `, Water trucks on ${nb.waterTruckSchedule.join(' and ')}`;
          }
          if (nb.nearestWell) {
            status += `, Nearest well: ${nb.nearestWell}`;
          }
          if (nb.alerts && nb.alerts.length > 0) {
            status += `, Alerts: ${nb.alerts.join(', ')}`;
          }
        }
        status += `; Power: ${nb.powerStatus}`;
        return `${nb.name} (ID: ${nb.id}) - ${status}. Last updated: ${new Date(nb.lastUpdated).toLocaleDateString()}`;
      }).join('\n');

      const prompt = customPrompt
        ? customPrompt
        : `Given the following neighborhood status data, draft a concise, empathetic, and urgent SMS broadcast message (max 160 characters) to inform residents about the situation and any immediate actions or expected relief. Focus on the selected neighborhoods. Do not include location GPS, only neighborhood names. Use simple Arabic (Sudanese dialect) if possible, or clear English if not.
        
        Neighborhood Status:\n${neighborhoodSummary}\n\nSuggested broadcast message:`;

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL_TEXT_TASK,
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 200, // Limit to ensure SMS length
          thinkingConfig: { thinkingBudget: 0 } // Prioritize speed over deep thinking for urgent messages
        },
      });

      const suggestedMessage = response.text;
      return suggestedMessage || 'Could not generate a suggestion at this time.';
    } catch (error) {
      console.error('Error generating broadcast suggestion:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate broadcast suggestion: ${error.message}`);
      }
      throw new Error('Failed to generate broadcast suggestion due to an unknown error.');
    }
  }
}

export const geminiService = new GeminiService();