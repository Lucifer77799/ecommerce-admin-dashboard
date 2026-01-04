"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

type ProductChartProps = {
  products: {
    name: string;
    price: number;
    stock: number;
  }[];
};

export default function ProductCharts({ products }: ProductChartProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div>
        <h3 className="text-sm text-gray-300 mb-2">
          Stock per Product
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#000",
                border: "1px solid #555",
                color: "#fff",
              }}
            />
            
            <Bar dataKey="stock" fill="#ffffff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div>
        <h3 className="text-sm text-gray-300 mb-2">
          Price per Product
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={products}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#000",
                border: "1px solid #555",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#22d3ee"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
