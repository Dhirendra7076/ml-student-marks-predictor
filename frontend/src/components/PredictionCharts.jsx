import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function PredictionChart({ data }) {

  return (
    <div className="card bg-base-200 shadow-lg p-6 mt-8">

      <h2 className="text-lg font-semibold mb-4">
        Prediction Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="studyHours" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="marks"
            stroke="#00FF9D"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PredictionChart;