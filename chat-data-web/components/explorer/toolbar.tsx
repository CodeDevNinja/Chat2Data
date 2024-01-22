import React, { useState } from 'react';
import { Sheet, PieChart, LineChart, Download, AreaChart,Code } from 'lucide-react';
import LabelCheckbox from '@/components/explorer/labelcheckbox'
const Toolbar = ({ onIconClick }: any) => {
    const [activeIcon, setActiveIcon] = useState('sheet');

    const handleClick = (icon: any) => {
        console.log(`${icon} clicked`);
        setActiveIcon(icon);
        onIconClick(icon);
    };

    return (
        <div className="flex flex-row items-center toolbar space-x-2 border rounded-full bg-slate-100 px-3 py-1 justify-center">
            <div onClick={() => handleClick('sheet')} aria-label="Sheet">
                <Sheet className={`w-6/8 h-4/8 ${activeIcon === 'sheet' ? 'bg-blue-500 text-white' : 'text-black'}`} />
            </div>
            <div onClick={() => handleClick('lineChart')} aria-label="Line Chart">
                <LineChart className={`w-6/8 h-4/8 ${activeIcon === 'lineChart' ? 'bg-blue-500 text-white' : 'text-black'}`} />
            </div>
            <div onClick={() => handleClick('areaChart')} aria-label="Area Chart">
                <AreaChart className={`w-6/8 h-4/8 ${activeIcon === 'areaChart' ? 'bg-blue-500 text-white' : 'text-black'}`} />
            </div>
            <div onClick={() => handleClick('pieChart')} aria-label="Pie Chart">
                <PieChart className={`w-6/8 h-4/8 ${activeIcon === 'pieChart' ? 'bg-blue-500 text-white' : 'text-black'}`} />
            </div>
            <LabelCheckbox />
            <div onClick={() => handleClick('code')} aria-label="Code">
                <Code className={`w-6/8 h-4/8 ${activeIcon === 'code' ? 'bg-blue-500 text-white' : 'text-black'}`} />
            </div>
            <div onClick={() => handleClick('download')} aria-label="Download">
                <Download className={`w-6/8 h-4/8 ${activeIcon === 'download' ? 'bg-blue-500 text-white' : 'text-black'}`} />
            </div>
            {/* Add more buttons as needed */}
        </div>
    );
};

export default Toolbar;
