import React from 'react';
import { LayoutDashboard, Map, BarChart3, Bell, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', active: true },
        { icon: Map, label: 'Analytics' },
        { icon: Bell, label: 'Alerts' },
        { icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900 text-white flex flex-col shadow-lg fixed left-0 top-0">
            {/* Brand */}
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    AIP
                </h1>
                <p className="text-xs text-slate-400 mt-1">Aravalli Intelligence</p>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${item.active
                                ? 'bg-emerald-600/20 text-emerald-400 border-l-4 border-emerald-500'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-red-400 transition-colors w-full">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
