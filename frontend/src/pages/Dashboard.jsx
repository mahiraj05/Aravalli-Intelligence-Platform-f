import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import OverviewCards from '../components/OverviewCards';
import MapView from '../components/MapView';
import NDVITimeline from '../components/NDVITimeline';
import AlertsList from '../components/AlertsList';
import { api } from '../services/api';
import { RefreshCw, Play } from 'lucide-react';

const Dashboard = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await api.getAreas();
            setAreas(data);
        } catch (error) {
            console.error("Failed to fetch areas", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRunAnalysis = async () => {
        setAnalyzing(true);
        try {
            // Trigger a default analysis for demo purposes
            await api.triggerAnalysis('deforestation', 'jaipur-aravalli');
            // Refresh data
            await fetchData();
        } catch (error) {
            alert("Analysis failed. Check console.");
        } finally {
            setAnalyzing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans text-slate-900">
            <Sidebar />

            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Environmental Intelligence Dashboard</h2>
                        <p className="text-slate-500">Real-time monitoring of Aravalli-Jaipur region</p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={fetchData}
                            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                            <span>Refresh Data</span>
                        </button>
                        <button
                            onClick={handleRunAnalysis}
                            disabled={analyzing}
                            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <Play size={18} />
                            <span>{analyzing ? 'Processing Satellites...' : 'Run Analysis'}</span>
                        </button>
                    </div>
                </header>

                {/* Overview Stats */}
                <OverviewCards areas={areas} />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Map - Spans 2 cols */}
                    <div className="lg:col-span-2">
                        <MapView areas={areas} />
                    </div>

                    {/* Right Column - Charts & Alerts */}
                    <div className="space-y-6">
                        <AlertsList areas={areas} />
                        <NDVITimeline />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
