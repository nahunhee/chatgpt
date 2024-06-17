import React, { useState, useEffect, useRef } from 'react';
import './chatview.css';

const ChatView = ({ apiKey, role }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    const chatWindowRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = async () => {
        if (input.trim() && !isWaiting) {
            const userMessage = { text: input, sender: 'user' };
            const waitingMessage = { text: 'Waiting for the response from ChatGPT...', sender: 'bot' };

            setMessages([...messages, userMessage, waitingMessage]);
            setInput('');
            setIsWaiting(true);

            // Send input to ChatGPT API server
            try {
                const response = await fetchChatGPTResponse(input);
                if (response) {
                    setMessages(prevMessages => {
                        const newMessages = [...prevMessages];
                        newMessages[newMessages.length - 1] = { text: response, sender: 'bot' };
                        return newMessages;
                    });
                }
            } catch (error) {
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1] = { text: 'try again', sender: 'bot' };
                    return newMessages;
                });
            } finally {
                setIsWaiting(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchChatGPTResponse = async (input) => {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject('Timeout');
            }, 10000);

            fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}` // Use the API key here
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: role },
                        { role: "user", content: input }
                    ]
                }),
            })
            .then(response => response.json())
            .then(data => {
                clearTimeout(timer);
                resolve(data.choices[0].message.content); // Adjust based on your API response structure
            })
            .catch(error => {
                clearTimeout(timer);
                reject(error);
            });
        });
    };


    return (
        <div className="chat-container">
            <h1>Chat View</h1>
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={input} 
                    onChange={handleInputChange} 
                    onKeyPress={handleKeyPress} 
                    placeholder="Type a message..." 
                    disabled={isWaiting}
                />
                <button onClick={handleSend} disabled={isWaiting}>Send</button>
            </div>
        </div>
    );
}

export default ChatView;