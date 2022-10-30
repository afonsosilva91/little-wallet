import Link from "next/link";
import Image from "next/image";

const Savings = () => {
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
            Simulation of your possible earnings with $10
          </h3>
        </div>
        <div className="box-graphs px-8 pt-6">
          <h5 className="w-100 mb-4">Today: $10</h5>
          <h5 className="w-100 mb-4">In 7 days: $12</h5>
          <h5 className="w-100 mb-4">In 14 days: $14</h5>
          <h5 className="w-100 mb-4">In 30 days: $16</h5>
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
