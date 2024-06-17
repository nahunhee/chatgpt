import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatView from './pages/chatview';
import LearningContent from './pages/learningcontent';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [role, setRole] = useState('You are a helpful assistant.');


  return (
    <div className="App">
      <div className="chat-view-container">
        <ChatView apiKey={apiKey} role={role} />
      </div>
      <div className="learning-content-container">
        <LearningContent setApiKey={setApiKey} apiKey={apiKey} setRole={setRole} role={role} />
      </div>
    </div>
  );
}

export default App;