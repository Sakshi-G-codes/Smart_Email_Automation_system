import React, { useState } from 'react';
import { checkHealth, sendEmailTest, fetchEmailsTest, syncEmailsTest } from '../api';

const ApiStatus = () => {
    const [healthStatus, setHealthStatus] = useState(null);
    const [emailResult, setEmailResult] = useState(null);
    const [fetchResult, setFetchResult] = useState(null);
    const [syncResult, setSyncResult] = useState(null);
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

    const runFetchTest = async () => {
        setLoading(prev => ({ ...prev, fetch: true }));
        try {
            const res = await fetchEmailsTest();
            setFetchResult(res);
        } catch (err) {
            setFetchResult({ error: err.message });
        } finally {
            setLoading(prev => ({ ...prev, fetch: false }));
        }
    };

    const runSyncTest = async () => {
        setLoading(prev => ({ ...prev, sync: true }));
        try {
            const res = await syncEmailsTest();
            setSyncResult(res);
        } catch (err) {
            setSyncResult({ error: err.message });
        } finally {
            setLoading(prev => ({ ...prev, sync: false }));
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

            <div style={sectionStyle}>
                <h3>Test Email Fetch</h3>
                <p>Fetches recent emails (simulated or real)</p>
                <button onClick={runFetchTest} disabled={loading.fetch}>
                    {loading.fetch ? 'Fetching...' : 'Fetch Emails'}
                </button>
                <div className="result-box">
                    <pre>{JSON.stringify(fetchResult, null, 2)}</pre>
                </div>
            </div>

            <div style={sectionStyle}>
                <h3>Test Email Sync</h3>
                <p>Triggers sync process</p>
                <button onClick={runSyncTest} disabled={loading.sync}>
                    {loading.sync ? 'Syncing...' : 'Sync Emails'}
                </button>
                <div className="result-box">
                    <pre>{JSON.stringify(syncResult, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default ApiStatus;
