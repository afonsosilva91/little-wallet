import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import Image from "next/image";

const Savings = () => {
  const labels = [
    "Today",
    "1 day",
    "2 days",
    "3 days",
    "4 days",
    "5 days",
    "6 days",
    "7 days",
  ];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Simulated savings started with $10",
  //       data: [
  //         10,
  //         10 + 4 / 7,
  //         10 + (4 / 7) * 2,
  //         10 + (4 / 7) * 3,
  //         10 + (4 / 7) * 4,
  //         10 + (4 / 7) * 5,
  //         10 + (4 / 7) * 6,
  //         10 + (4 / 7) * 7,
  //       ],
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  const data = [
    {
      name: "Today",
      savings: 10,
    },
    {
      name: "1 day",
      savings: 10 + 4 / 7,
    },
    {
      name: "2 days",
      savings: 10 + (4 / 7) * 2,
    },
    {
      name: "3 days",
      savings: 10 + (4 / 7) * 3,
    },
    {
      name: "4 days",
      savings: 10 + (4 / 7) * 4,
    },
    {
      name: "5 days",
      savings: 10 + (4 / 7) * 5,
    },
    {
      name: "6 days",
      savings: 10 + (4 / 7) * 6,
    },
    {
      name: "7 days",
      savings: 10 + (4 / 7) * 7,
    },
  ];

  return (
    <>
      <div className="box-bar-header">
        <div className="flex flex-row">
          <div className="basis-4/12 back-arrow">
            <Link href={"/"}>
              <Image width={24} height={24} alt={""} src={"/icons/back.svg"} />
            </Link>
          </div>
          <div className="basis-4/12 header-title">
            <span>Savings</span>
          </div>
          <div className="basis-4/12"></div>
        </div>
      </div>

      <div
        className="h-screen flex flex-col py-2"
        style={{ paddingTop: "80px", background: "#E5E5E5" }}
      >
        <div className="box-graphs px-8 pt-6">
          <h3 className="w-100 mb-4">
            Simulation of your possible earnings with your current balance
          </h3>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="savings" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="h-screen flex flex-col ">
          <div className="flex justify-between">
            <button className="btn-red" style={{ minWidth: "auto" }}>
              Save
            </button>
            <button className="btn-red" style={{ minWidth: "auto" }}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Savings;
