import React, { useState } from 'react';
import './learningcontent.css';

const LearningContent = ({ setApiKey, apiKey, setRole, role }) => {
    const [inputKey, setInputKey] = useState('');
    const [inputRole, setInputRole] = useState(role);

    const handleInputChange = (e) => {
        setInputKey(e.target.value);
    };

    const handleRoleChange = (e) => {
        setInputRole(e.target.value);
    };

    const handleSaveKey = () => {
        setApiKey(inputKey);
    };

    const handleSaveRole = () => {
        setRole(inputRole);
    };

    return (
        <div className="learning-content">
            <h1>Learning Content</h1>
            <p>This section contains the learning materials and content.</p>
            <div className="api-key-container">
                <input 
                    type="text" 
                    value={inputKey} 
                    onChange={handleInputChange} 
                    placeholder="Enter API Key"
                />
                <button onClick={handleSaveKey}>Save API Key</button>
            </div>
            <div className="role-container">
                <textarea 
                    value={inputRole} 
                    onChange={handleRoleChange} 
                    placeholder="Set how ChatGPT acts"
                    rows="4"
                    cols="50"
                />
                <button onClick={handleSaveRole}>Save Role</button>
            </div>
            <p>API Key: {apiKey}</p>
            <p>Role: {role}</p>
        </div>
    );
}

export default LearningContent;