import { useState } from 'react';
import { Phone, Delete, ArrowLeft } from 'lucide-react';
import { SUDAN_TERRITORIES, type USSDSession } from '../data/ussdData';

export const USSDSimulator = () => {
    const [session, setSession] = useState<USSDSession>({
        state: 'IDLE',
        input: '',
        history: []
    });
    const [display, setDisplay] = useState('Enter *122# to start');

    const handleKeyPress = (key: string) => {
        const newInput = session.input + key;
        setSession({ ...session, input: newInput });
    };

    const handleDelete = () => {
        setSession({ ...session, input: session.input.slice(0, -1) });
    };

    const handleSend = () => {
        processUSSD(session.input);
    };

    const processUSSD = (input: string) => {
        // Start USSD session
        if (input === '*122#' && session.state === 'IDLE') {
            setSession({
                state: 'TERRITORY_SELECT',
                input: '',
                history: ['*122#']
            });
            setDisplay(
                `Welcome to Miyah Water & Power Info\n\n` +
                `Select your territory:\n` +
                `1. Khartoum\n` +
                `2. Gezira (Al-Jazeera)\n` +
                `3. Omdurman\n` +
                `4. Kassala\n` +
                `5. Port Sudan\n` +
                `6. Nyala`
            );
            return;
        }

        // Territory selection
        if (session.state === 'TERRITORY_SELECT' && input.match(/^[1-6]$/)) {
            const territory = SUDAN_TERRITORIES[input];
            setSession({
                ...session,
                state: 'SERVICE_SELECT',
                selectedTerritory: input,
                input: '',
                history: [...session.history, input]
            });
            setDisplay(
                `${territory.name}\n\n` +
                `What do you need?\n` +
                `1. Water Information\n` +
                `2. Electricity Information\n` +
                `0. Back`
            );
            return;
        }

        // Service selection
        if (session.state === 'SERVICE_SELECT') {
            if (input === '0') {
                // Go back
                setSession({
                    state: 'TERRITORY_SELECT',
                    input: '',
                    selectedTerritory: undefined,
                    history: session.history.slice(0, -1)
                });
                setDisplay(
                    `Welcome to Miyah Water & Power Info\n\n` +
                    `Select your territory:\n` +
                    `1. Khartoum\n` +
                    `2. Gezira (Al-Jazeera)\n` +
                    `3. Omdurman\n` +
                    `4. Kassala\n` +
                    `5. Port Sudan\n` +
                    `6. Nyala`
                );
                return;
            }

            if (input === '1' || input === '2') {
                const territory = SUDAN_TERRITORIES[session.selectedTerritory!];
                const service = input === '1' ? 'water' : 'electricity';
                const info = territory[service];

                setSession({
                    ...session,
                    state: 'DISPLAY_INFO',
                    selectedService: service,
                    input: '',
                    history: [...session.history, input]
                });

                setDisplay(
                    `${territory.name} - ${service.toUpperCase()}\n\n` +
                    `📍 Location: ${info.location}\n` +
                    `📏 Distance: ${info.distance}\n` +
                    (info.schedule ? `📅 Schedule: ${info.schedule}\n` : '') +
                    `\n${info.details}\n\n` +
                    `0. Main Menu\n` +
                    `#. Exit`
                );
                return;
            }
        }

        // Display info actions
        if (session.state === 'DISPLAY_INFO') {
            if (input === '0') {
                // Back to main menu
                setSession({
                    state: 'TERRITORY_SELECT',
                    input: '',
                    selectedTerritory: undefined,
                    selectedService: undefined,
                    history: ['*122#']
                });
                setDisplay(
                    `Welcome to Miyah Water & Power Info\n\n` +
                    `Select your territory:\n` +
                    `1. Khartoum\n` +
                    `2. Gezira (Al-Jazeera)\n` +
                    `3. Omdurman\n` +
                    `4. Kassala\n` +
                    `5. Port Sudan\n` +
                    `6. Nyala`
                );
                return;
            }
            if (input === '#') {
                // Exit
                setSession({
                    state: 'IDLE',
                    input: '',
                    history: []
                });
                setDisplay('Session ended. Enter *122# to start');
                return;
            }
        }

        // Invalid input
        setDisplay('Invalid input. Please try again.');
        setSession({ ...session, input: '' });
    };

    const handleBack = () => {
        if (session.state === 'TERRITORY_SELECT') {
            setSession({
                state: 'IDLE',
                input: '',
                history: []
            });
            setDisplay('Enter *122# to start');
        } else if (session.state === 'SERVICE_SELECT') {
            processUSSD('0');
        } else if (session.state === 'DISPLAY_INFO') {
            processUSSD('0');
        }
    };

    const keypadButtons = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '*', '0', '#'
    ];

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-6 border-4 border-gray-700">
                {/* Phone Header */}
                <div className="flex items-center justify-center mb-4">
                    <Phone className="text-green-400 mr-2" size={24} />
                    <h2 className="text-white font-bold text-xl">USSD Service</h2>
                </div>

                {/* Display Screen */}
                <div className="bg-green-100 rounded-lg p-4 mb-6 min-h-64 border-2 border-green-300 shadow-inner">
                    <div className="font-mono text-sm text-gray-900 whitespace-pre-wrap">
                        {display}
                    </div>
                    {session.input && (
                        <div className="mt-4 pt-2 border-t border-green-300">
                            <span className="text-gray-700 font-bold">Input: {session.input}</span>
                        </div>
                    )}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {keypadButtons.map((key) => (
                        <button
                            key={key}
                            onClick={() => handleKeyPress(key)}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold text-2xl py-4 rounded-lg shadow-md active:scale-95 transition-transform"
                        >
                            {key}
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                    <button
                        onClick={handleBack}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg shadow-md flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={handleSend}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md active:scale-95 transition-transform"
                    >
                        SEND
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg shadow-md flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <Delete size={20} />
                    </button>
                </div>

                {/* Help Text */}
                <div className="mt-4 text-center text-gray-400 text-xs">
                    Dial *122# to access water and electricity information
                </div>
            </div>
        </div>
    );
};
