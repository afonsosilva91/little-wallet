import Link from "next/link";
import Image from "next/image";

const Savings = () => {
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
