import React from 'react';
import { AlertTriangle, TreeDeciduous, Pickaxe, Activity } from 'lucide-react';

const Card = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4 hover:shadow-md transition-shadow">
        <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="text-white" size={24} />
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
            <p className="text-xs text-slate-400 mt-1">{subtext}</p>
        </div>
    </div>
);

const OverviewCards = ({ areas }) => {
    // Defensive check
    const safeAreas = Array.isArray(areas) ? areas : [];

    // Aggregate stats from backend data
    const totalWarnings = safeAreas.length;
    const highRiskCount = safeAreas.filter(a => a.riskLevel === 'high').length;

    // Calculate total area from summaries
    const totalArea = safeAreas.reduce((acc, curr) => acc + (curr.summary?.totalAreaHa || 0), 0);

    // Count types
    const deforestationCount = safeAreas.filter(a => a.type === 'deforestation').length;
    const miningCount = safeAreas.filter(a => a.type === 'mining').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card
                title="Total Risk Area"
                value={`${totalArea.toFixed(1)} ha`}
                subtext="Detected across all zones"
                icon={AlertTriangle}
                color="bg-rose-500"
            />
            <Card
                title="Deforestation Alerts"
                value={deforestationCount}
                subtext={`${highRiskCount} High Priority`}
                icon={TreeDeciduous}
                color="bg-emerald-500"
            />
            <Card
                title="Illegal Mining"
                value={miningCount}
                subtext="Active zones detected"
                icon={Pickaxe}
                color="bg-amber-500"
            />
            <Card
                title="Analysis Runs"
                value={totalWarnings}
                subtext="Last 24 hours"
                icon={Activity}
                color="bg-blue-500"
            />
        </div>
    );
};

export default OverviewCards;
