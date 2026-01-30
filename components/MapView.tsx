import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { geoPath } from 'd3-geo';
import { GeoFeature, GeoJsonData, Language, WaterStatus, PowerStatus, NeighborhoodData } from '../types';
import { useTranslation } from '../utils/i18n';

interface MapViewProps {
  geojson: GeoJsonData;
  neighborhoodData: NeighborhoodData[];
  currentLang: Language;
  filterWaterStatus: WaterStatus | 'All'; // New prop for filtering
}

const MapView: React.FC<MapViewProps> = ({ geojson, neighborhoodData, currentLang, filterWaterStatus }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation(currentLang);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  const getStatusColor = useCallback((status: WaterStatus | PowerStatus): string => {
    switch (status) {
      case WaterStatus.AVAILABLE:
      case PowerStatus.ON:
        return 'rgb(34, 197, 94)'; // Tailwind green-500
      case WaterStatus.SCARCE:
      case PowerStatus.INTERMITTENT:
        return 'rgb(250, 204, 21)'; // Tailwind yellow-400
      case WaterStatus.CONTAMINATED:
        return 'rgb(239, 68, 68)'; // Tailwind red-500
      case WaterStatus.NO_WATER:
      case PowerStatus.OFF:
        return 'rgb(128, 128, 128)'; // Grey
      default:
        return 'rgb(209, 213, 219)'; // Tailwind gray-300
    }
  }, []);

  const getWaterStatusText = useCallback((status: WaterStatus): string => {
    switch (status) {
      case WaterStatus.AVAILABLE: return t('status.available');
      case WaterStatus.SCARCE: return t('status.scarce');
      case WaterStatus.CONTAMINATED: return t('status.contaminated');
      case WaterStatus.NO_WATER: return t('status.noWater');
      default: return t('status.unknown');
    }
  }, [t]);

  const getPowerStatusText = useCallback((status: PowerStatus): string => {
    switch (status) {
      case PowerStatus.ON: return t('status.on');
      case PowerStatus.INTERMITTENT: return t('status.intermittent');
      case PowerStatus.OFF: return t('status.off');
      default: return t('status.unknown');
    }
  }, [t]);

  // SVG Icons for tooltip - Removed clipRule
  const WaterIcon = () => `<svg class="inline w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6c0 3.314 3.793 7.283 5.46 8.932a1.002 1.002 0 001.08 0C12.207 15.283 16 11.314 16 8a6 6 0 00-6-6zM8 8a2 2 0 114 0 2 2 0 01-4 0z"></path></svg>`;
  const PowerIcon = () => `<svg class="inline w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.3 2.14a.5.5 0 01.4 0l6.5 2.167a.5.5 0 01.3.43V17.5a.5.5 0 01-.284.453l-6.5 2.5a.5.5 0 01-.432 0l-6.5-2.5A.5.5 0 012 17.5V4.607a.5.5 0 01.3-.43L9.3 2.14a.5.5 0 01.4 0zM10 4.107L4.444 6.097v9.423l5.556 2.14 5.556-2.14V6.097L10 4.107zM10 8a2 2 0 100 4 2 2 0 000-4z"></path></svg>`;
  const WellIcon = () => `<svg class="inline w-4 h-4 mr-1 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A1 1 0 0017 12H7a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 00.707-.293l2-2a1 1 0 000-1.414l-2-2zM9 13a1 1 0 01-2 0v-2a1 1 0 012 0v2zM13 13a1 1 0 01-2 0v-2a1 1 0 012 0v2zM17 13a1 1 0 01-2 0v-2a1 1 0 012 0v2zM5 3a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1V3z"></path></svg>`;
  const TruckIcon = () => `<svg class="inline w-4 h-4 mr-1 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 4h3a1 1 0 110 2H7V4zM7 8h5a1 1 110 2H7V8zM7 12h7a1 1 110 2H7v-2zM17 14h-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2v-2z"></path></svg>`;
  const AlertIcon = () => `<svg class="inline w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18.707 17.293a1 1 0 01-1.414 0L10 9.414l-7.293 7.293a1 1 0 01-1.414-1.414L8.586 8l-7.293-7.293a1 1 0 011.414-1.414L10 6.586l7.293-7.293a1 1 0 011.414 1.414L11.414 8l7.293 7.293a1 1 0 010 1.414z"></path></svg>`;


  // Resize observer to get parent dimensions
  useEffect(() => {
    const parent = svgRef.current?.parentElement;
    if (!parent) return;

    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setParentWidth(width);
      setParentHeight(height);
    });

    resizeObserver.observe(parent);

    return () => {
      resizeObserver.unobserve(parent);
    };
  }, []);

  useEffect(() => {
    if (!parentWidth || !parentHeight || !svgRef.current) return;

    const width = parentWidth;
    const height = parentHeight;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll('*').remove(); // Clear previous rendering

    const projection = d3.geoMercator()
      .fitSize([width, height], geojson);

    const path = geoPath().projection(projection);

    const dataMap = new Map(neighborhoodData.map(d => [d.id, d]));

    svg.append('g')
      .selectAll('path')
      .data(geojson.features)
      .join('path')
      .attr('d', path as d3.Path<any, d3.GeoPermissibleObjects>)
      .attr('fill', (d: GeoFeature) => {
        const nb = dataMap.get(d.properties.id) as NeighborhoodData | undefined;
        if (!nb) return getStatusColor(WaterStatus.UNKNOWN);

        // Apply filter: dim if not matching
        if (filterWaterStatus !== 'All' && nb.waterStatus !== filterWaterStatus) {
          return 'rgba(200, 200, 200, 0.6)'; // Dim non-matching areas
        }
        return getStatusColor(nb.waterStatus);
      })
      .attr('stroke', (d: GeoFeature) => {
        const nb = dataMap.get(d.properties.id) as NeighborhoodData | undefined;
        // Highlight critical areas with a red stroke
        if (nb && (nb.waterStatus === WaterStatus.CONTAMINATED || (nb.waterStatus === WaterStatus.NO_WATER && (nb.daysNoWater || 0) >= 7))) {
          return 'rgb(239, 68, 68)'; // Tailwind red-500
        }
        return 'rgb(229, 231, 235)'; // Tailwind gray-200 for normal borders
      })
      .attr('stroke-width', (d: GeoFeature) => {
        const nb = dataMap.get(d.properties.id) as NeighborhoodData | undefined;
        if (nb && (nb.waterStatus === WaterStatus.CONTAMINATED || (nb.waterStatus === WaterStatus.NO_WATER && (nb.daysNoWater || 0) >= 7))) {
          return 2.5; // Thicker stroke for critical
        }
        return 1;
      })
      .attr('class', 'neighborhood-path cursor-pointer transition-all duration-200 ease-in-out')
      .on('mouseover', (event: MouseEvent, d: GeoFeature) => {
        const nb = dataMap.get(d.properties.id) as NeighborhoodData;
        if (nb && tooltipRef.current) {
          d3.select(event.currentTarget as SVGPathElement)
            .attr('stroke', 'rgb(59, 130, 246)') // Tailwind blue-500 for hover
            .attr('stroke-width', 2);

          let tooltipContent = `
            <div class="font-bold text-lg mb-2 text-gray-900">${nb.name}</div>
            <div class="text-sm space-y-1 text-gray-700">
              <p class="flex items-center"><span class="font-semibold text-gray-800">${WaterIcon()}${t('map.tooltip.water')}</span> ${getWaterStatusText(nb.waterStatus)}</p>
              <p class="flex items-center"><span class="font-semibold text-gray-800">${PowerIcon()}${t('map.tooltip.power')}</span> ${getPowerStatusText(nb.powerStatus)}</p>
              <p class="flex items-center"><span class="font-semibold text-gray-800">${t('map.tooltip.lastUpdated')}</span> ${new Date(nb.lastUpdated).toLocaleString(currentLang, { dateStyle: 'medium', timeStyle: 'short' })}</p>
          `;
          if (nb.daysNoWater && nb.daysNoWater > 0 && nb.waterStatus !== WaterStatus.AVAILABLE) {
            tooltipContent += `<p class="flex items-center"><span class="font-semibold text-gray-800">${t('map.tooltip.daysNoWater')}</span> ${nb.daysNoWater}</p>`;
          }
          if (nb.nearestWell) {
            tooltipContent += `<p class="flex items-center"><span class="font-semibold text-gray-800">${WellIcon()}${t('dashboard.nearestWell')}</span> ${nb.nearestWell}</p>`;
          }
          if (nb.waterTruckSchedule && nb.waterTruckSchedule.length > 0) {
            tooltipContent += `<p class="flex items-center"><span class="font-semibold text-gray-800">${TruckIcon()}${t('dashboard.waterTruckSchedule')}</span> ${nb.waterTruckSchedule.join(', ')}</p>`;
          }
          if (nb.alerts && nb.alerts.length > 0) {
            tooltipContent += `<p class="flex items-center text-red-700"><span class="font-semibold text-gray-800">${AlertIcon()}${t('dashboard.alerts')}</span> ${nb.alerts.join(', ')}</p>`;
          }
          tooltipContent += `</div>`;

          tooltipRef.current.innerHTML = tooltipContent;
          d3.select(tooltipRef.current)
            .style('display', 'block')
            .style('left', `${event.pageX + 15}px`) // Offset tooltip slightly
            .style('top', `${event.pageY - 15}px`); // Offset tooltip slightly
        }
      })
      .on('mouseout', (event: MouseEvent, d: GeoFeature) => {
        const nb = dataMap.get(d.properties.id) as NeighborhoodData | undefined;
        d3.select(event.currentTarget as SVGPathElement)
          .attr('stroke', (d: GeoFeature) => {
            if (nb && (nb.waterStatus === WaterStatus.CONTAMINATED || (nb.waterStatus === WaterStatus.NO_WATER && (nb.daysNoWater || 0) >= 7))) {
              return 'rgb(239, 68, 68)'; // Restore red stroke for critical
            }
            return 'rgb(229, 231, 235)'; // Restore normal border
          })
          .attr('stroke-width', (d: GeoFeature) => {
            if (nb && (nb.waterStatus === WaterStatus.CONTAMINATED || (nb.waterStatus === WaterStatus.NO_WATER && (nb.daysNoWater || 0) >= 7))) {
              return 2.5; // Restore thicker stroke for critical
            }
            return 1;
          });
        d3.select(tooltipRef.current).style('display', 'none');
      });

      // Add labels for neighborhoods
      svg.append('g')
        .selectAll('text')
        .data(geojson.features)
        .join('text')
        .attr('x', (d: GeoFeature) => (path.centroid(d)?.[0] || 0))
        .attr('y', (d: GeoFeature) => (path.centroid(d)?.[1] || 0) + 4) // Adjust for vertical centering
        .text((d: GeoFeature) => d.properties.name)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '10px')
        .attr('fill', (d: GeoFeature) => {
          const nb = dataMap.get(d.properties.id) as NeighborhoodData | undefined;
          if (filterWaterStatus !== 'All' && nb && nb.waterStatus !== filterWaterStatus) {
            return 'rgba(55, 65, 81, 0.4)'; // Dim text for non-matching areas (Tailwind gray-700 with opacity)
          }
          return 'rgb(55, 65, 81)'; // Tailwind gray-700
        })
        .attr('text-anchor', 'middle') // Center text horizontally
        .attr('pointer-events', 'none'); // Prevent text from blocking mouse events on paths

  }, [geojson, neighborhoodData, parentWidth, parentHeight, getStatusColor, getWaterStatusText, getPowerStatusText, currentLang, t, filterWaterStatus]);

  return (
    <div className="relative w-full h-full min-h-[400px] flex justify-center items-center bg-gray-50 rounded-lg shadow-inner overflow-hidden">
      <svg ref={svgRef} className="block"></svg>
      <div
        ref={tooltipRef}
        className="absolute hidden p-3 bg-white border border-gray-300 rounded-lg shadow-xl pointer-events-none z-50 transition-opacity duration-200"
        style={{ opacity: 0.98 }}
      ></div>
    </div>
  );
};

export default MapView;