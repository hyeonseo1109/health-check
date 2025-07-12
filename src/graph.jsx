import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export const BpChart = ({ data }) => {
    const chartData = data.map(el => {
        const [systolic, diastolic] = el.bp.split('/').map(Number);
        return {
            date: el.date,
            systolic,
            diastolic,
        };
    });

    const maxSystolic = Math.max(...chartData.map(d => d.systolic)) + 10;
    const minDiastolic = Math.min(...chartData.map(d => d.diastolic)) - 10;

    const ticks = [];
    for(let i=0; i<=maxSystolic; i+=20) {
        ticks.push(i);
    }

    return (
        <div className='w-full flex justify-center'>
            <ResponsiveContainer width="80%" height={200}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"
                            tick={{ fontSize: 15}}
                    />
                    <YAxis domain={[minDiastolic, maxSystolic]} ticks={ticks} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="systolic" stroke="#f64c4c" name="수축기혈압" label={{ position: 'top', fontSize: 10, fill: '#555' }}/>
                    <Line type="monotone" dataKey="diastolic" stroke="#4089e1" name="이완기혈압" label={{ position: 'top', fontSize: 10, fill: '#555' }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};







export const BstChart = ({ data }) => {
    const chartData = data.map(el => {
        return {
            date: el.date,
            bst: el.bst,
        };
    });

    const maxBst = Math.max(...chartData.map(d => d.bst)) + 20;
    const minBst = Math.min(...chartData.map(d => d.bst)) - 20;

    const ticks = [];
    for(let i=0; i<=maxBst; i+=20) {
        ticks.push(i);
    }

    return (
        <div className='w-full flex justify-center'>
            <ResponsiveContainer width="80%" height={200}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"
                            tick={{ fontSize: 15}}
                    />
                    <YAxis domain={[minBst, maxBst]} ticks={ticks} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bst" stroke="#259600" name="혈당" label={{ position: 'top', fontSize: 10, fill: '#555' }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};


export const BwChart = ({ data }) => {
    const chartData = data.map(el => {
        return {
            date: el.date,
            bw: Number(el.bw),
        };
    });

    const maxBw = Math.max(...chartData.map(d => d.bw)) + 1;
    const minBw = Math.min(...chartData.map(d => d.bw)) - 1;
    // const maxY = Math.ceil(maxBw *10) / 10;
    // const minY = Math.floor(minBw *10) / 10;

    const ticks = [];
    for (let i = minBw; i <= maxBw; i += 0.1) {
        ticks.push(Number(i.toFixed(1)));
    }

    return (
        <div className='w-full flex justify-center'>
            <ResponsiveContainer width="80%" height={200}>
                <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" 
                            tick={{ fontSize: 15}}
                    />
                    <YAxis domain={[minBw, maxBw]} ticks={ticks} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bw" stroke="#c92de4" name="체중" label={{ position: 'top', fontSize: 10, fill: '#555' }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
