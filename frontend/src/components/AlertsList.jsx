import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const AlertsList = ({ areas }) => {
    const safeAreas = Array.isArray(areas) ? areas : [];

    // Sort by date desc
    const sorted = [...safeAreas].sort((a, b) => {
        // Handling Firestone timestamps or generic dates just in case
        const dateA = new Date(a.createdAt?.seconds ? a.createdAt.seconds * 1000 : a.createdAt);
        const dateB = new Date(b.createdAt?.seconds ? b.createdAt.seconds * 1000 : b.createdAt);
        return dateB - dateA;
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Recent Alerts</h3>
                <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">Live</span>
            </div>

            <div className="overflow-y-auto space-y-4 pr-2">
                {sorted.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-10">No alerts detected yet.</p>
                ) : (
                    sorted.map((alert, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                            <div className={`mt-1 ${alert.riskLevel === 'high' ? 'text-red-500' : 'text-amber-500'}`}>
                                <AlertCircle size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-slate-700 capitalize">
                                    {alert.type} Detected
                                </h4>
                                <p className="text-xs text-slate-500 mt-1">
                                    Risk Level: <span className="font-medium capitalize">{alert.riskLevel}</span> • {(alert.summary?.totalAreaHa || 0).toFixed(1)} ha
                                </p>
                                <p className="text-[10px] text-slate-400 mt-2">
                                    {new Date(alert.createdAt?.seconds ? alert.createdAt.seconds * 1000 : alert.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AlertsList;
