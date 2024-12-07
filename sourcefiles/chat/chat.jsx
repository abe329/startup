import React, { useState, useEffect, useRef } from 'react';

export function Chat() {
    const [myName, setMyName] = useState('');
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        // Establish WebSocket connection
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        // socketRef.current = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socketRef.current = new WebSocket(`${protocol}://${window.location.hostname}:4000/ws`);

        socketRef.current.onopen = () => {
            setIsConnected(true);
            appendMsg('system', 'websocket', 'connected');
        };

        socketRef.current.onmessage = async (event) => {
            const text = await event.data.text();
            const chat = JSON.parse(text);
            appendMsg('friend', chat.name, chat.msg);
        };

        socketRef.current.onclose = () => {
            setIsConnected(false);
            appendMsg('system', 'websocket', 'disconnected');
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    const appendMsg = (cls, from, msg) => {
        setChatMessages(prevMessages => [{cls, from, msg}, ...prevMessages]);
    };

    const sendMessage = () => {
        if (message) {
            appendMsg('me', 'me', message);
            socketRef.current.send(JSON.stringify({name: myName, msg: message}));
            setMessage('');
        }
    };

    return (
        <main>    
            <h1>Chat</h1>
            <div className="name">
                <fieldset id="name-controls">
                    <legend>My Name</legend>
                    <input 
                        id="my-name" 
                        type="text" 
                        value={myName}
                        onChange={(e) => setMyName(e.target.value)}
                    />
                </fieldset>
            </div>

            <fieldset id="chat-controls" disabled={!myName || !isConnected}>
                <legend>Chat</legend>
                <input 
                    id="new-msg" 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </fieldset>
            <div id="chat-text">
                {chatMessages.map((msg, index) => (
                    <div key={index}>
                        <span className={msg.cls}>{msg.from}</span>: {msg.msg}
                    </div>
                ))}
            </div>
        </main>
    );
}