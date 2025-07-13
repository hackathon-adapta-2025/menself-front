
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Dot } from 'recharts';

interface ProgressChartProps {
  data: Array<{
    day: string;
    value: number;
    completed: boolean;
  }>;
}

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return (
    <Dot
      cx={cx}
      cy={cy}
      r={payload.completed ? 6 : 4}
      fill={payload.completed ? '#FF6600' : '#656565'}
      stroke={payload.completed ? '#FF6600' : '#656565'}
      strokeWidth={2}
    />
  );
};

export const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#656565', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#656565', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF6600"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 8, fill: '#FF6600' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
