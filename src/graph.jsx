import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export const BPChart = ({ data }) => {
    const chartData = data.map(el => {
        const [systolic, diastolic] = el.bp.split('/').map(Number);
        return {
            date: el.date,
            systolic,
            diastolic,
        };
    });

    const maxSystolic = Math.max(...chartData.map(d => d.systolic)) + 10;
    const maxY = Math.ceil(maxSystolic / 20) * 20;

    const ticks = [];
    for(let i=0; i<=maxY; i+=20) {
        ticks.push(i);
    }

    return (
        <ResponsiveContainer width="80%" height={200}>
            <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[20, maxY]} ticks={ticks} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="systolic" stroke="#f64c4c" name="수축기혈압" label={{ position: 'top', fontSize: 10, fill: '#555' }}/>
                <Line type="monotone" dataKey="diastolic" stroke="#4089e1" name="이완기혈압" label={{ position: 'top', fontSize: 10, fill: '#555' }}/>
            </LineChart>
        </ResponsiveContainer>
    );
};







export const BloodPressureChart = ({ data }) => {
    const chartData = data.map(el => {
        const [systolic, diastolic] = el.bp.split('/').map(Number);
        return {
            date: el.date,
            systolic,
            diastolic,
        };
    });

    return (
        <ResponsiveContainer width="80%" height={200}>
            <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="수축기혈압" />
                <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="이완기혈압" />
            </LineChart>
        </ResponsiveContainer>
    );
};

