import Link from "next/link";
import Image from "next/image";
import { useSessionContext } from "../context/SessionContext";

import { useState } from "react";

const Loans = () => {
  const { isLogged, contractApi } = useSessionContext();
  const [amount, setAmount] = useState(0);

  const borrow = async () => {
    if (amount <= 0) {
      return;
    }
    console.log(contractApi);
    const result = await contractApi.borrow(amount);
    console.log(result);
  };

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
            <span>Loans</span>
          </div>
          <div className="basis-4/12"></div>
        </div>
      </div>

      <div
        className="h-screen flex flex-col py-2"
        style={{ paddingTop: "80px", background: "#E5E5E5" }}
      >
        <div className="box-graphs px-8 pt-6">
          <h4 className="mb-4">Amount to borrow from my parents</h4>
          <input
            className="mb-2"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            style={{ border: "1px solid black" }}
          ></input>
        </div>

        <div className="h-screen flex align-center justify-center">
          <button
            className="btn-red mt-4"
            style={{ minWidth: "auto" }}
            onClick={() => borrow()}
          >
            Borrow
          </button>
        </div>
      </div>
    </>
  );
};

export default Loans;
