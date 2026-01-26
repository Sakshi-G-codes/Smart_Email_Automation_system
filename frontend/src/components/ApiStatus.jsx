import React, { useState } from 'react';
import { checkHealth, sendEmailTest} from '../api';

const ApiStatus = () => {
    const [healthStatus, setHealthStatus] = useState(null);
    const [emailResult, setEmailResult] = useState(null);
    const [loading, setLoading] = useState({
        health: false,
        send: false,
        fetch: false,
        sync: false
    });

    const runHealthCheck = async () => {
        setLoading(prev => ({ ...prev, health: true }));
        try {
            const res = await checkHealth();
            setHealthStatus(res);
        } catch (err) {
            setHealthStatus({ error: err.message });
        } finally {
            setLoading(prev => ({ ...prev, health: false }));
        }
    };

    const runSendTest = async () => {
        setLoading(prev => ({ ...prev, send: true }));
        try {
            // Hardcoded test data for simplicity
            const res = await sendEmailTest('pothuganti.supriya@gmail.com, sakshi31692@gmail.com', 'Test Subject', 'Hello from ApiStatus component!');
            setEmailResult(res);
        } catch (err) {
            setEmailResult({ error: err.message });
        } finally {
            setLoading(prev => ({ ...prev, send: false }));
        }
    };


    const sectionStyle = {
        border: '1px solid #ccc',
        padding: '20px',
        margin: '20px 0',
        borderRadius: '8px',
        textAlign: 'left'
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>API Status Dashboard</h2>

            <div style={sectionStyle}>
                <h3>Health Check</h3>
                <button onClick={runHealthCheck} disabled={loading.health}>
                    {loading.health ? 'Checking...' : 'Check Health'}
                </button>
                <div className="result-box">
                    <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3>Test Email Send</h3>
                <p>Sends a test email to 'pothuganti.supriya@gmail.com, sakshi31692@gmail.com'</p>
                <button onClick={runSendTest} disabled={loading.send}>
                    {loading.send ? 'Sending...' : 'Send Test Email'}
                </button>
                <div className="result-box">
                    <pre>{JSON.stringify(emailResult, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default ApiStatus;
