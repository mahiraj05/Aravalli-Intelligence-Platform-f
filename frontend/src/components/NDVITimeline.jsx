import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NDVITimeline = () => {
    // Mock trend data simulating degradation over months
    const data = [
        { name: 'Jan', ndvi: 0.75 },
        { name: 'Feb', ndvi: 0.72 },
        { name: 'Mar', ndvi: 0.68 },
        { name: 'Apr', ndvi: 0.65 },
        { name: 'May', ndvi: 0.60 },
        { name: 'Jun', ndvi: 0.55 },
        { name: 'Jul', ndvi: 0.48 },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-[400px]">
            <h3 className="font-bold text-slate-800 mb-4">Vegetation Health Index (NDVI) Trend</h3>
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={[0.4, 0.8]} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#10b981' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="ndvi"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6 }}
                        />
                        {/* Threshold Line */}
                        <Line type="monotone" dataKey={() => 0.5} stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
                * Dashed line represents critical degradation threshold (0.5)
            </p>
        </div>
    );
};

export default NDVITimeline;
