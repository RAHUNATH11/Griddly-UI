import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActionLogs.css';

const ActionLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/logs')
      .then(res => setLogs(res.data));
  }, []);

  return (
    <div className="logs-container">
      <h2>Action Logs</h2>
      <div className="logs-table">
        <div className="logs-header">
          <span>User</span>
          <span>Product</span>
          <span>Action</span>
          <span>Time</span>
          <span>Description</span>
        </div>
        {logs.map((log, index) => (
          <div key={index} className="logs-row">
            <span>{log.user?.username || 'Unknown'}</span>
            <span>{log.product?.productName || 'N/A'}</span>
            <span>{log.action}</span>
            <span>{new Date(log.time).toLocaleString()}</span>
            <span>{log.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionLogs;
