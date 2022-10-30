import Link from "next/link";
import Image from "next/image";
import Transactions from "../components/Transactions";
import { useState } from "react";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

const Savings = () => {
    const [balance, setBalance] = useState(0)
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Savings",
            },
        },
    };


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

    const data = {
        labels,
        datasets: [
            {
                label: "Simulated savings started with $10",
                data: [
                    10,
                    10 + 4 / 7,
                    10 + (4 / 7) * 2,
                    10 + (4 / 7) * 3,
                    10 + (4 / 7) * 4,
                    10 + (4 / 7) * 5,
                    10 + (4 / 7) * 6,
                    10 + (4 / 7) * 7,
                ],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return (
        <>
            <div className="box-bar-header">
                <div className="flex flex-row">
                    <div className="basis-4/12 back-arrow">
                        <Link href={'/'}>
                            <Image width={24} height={24} alt={''} src={'/icons/back.svg'} />
                        </Link>
                    </div>
                    <div className="basis-4/12 header-title"><span>Savings</span></div>
                    <div className="basis-4/12"></div>
                </div>
            </div>

            <div className="h-screen flex flex-col py-2" style={{paddingTop: '80px', background: '#E5E5E5'}}>
                <div className="box-graphs px-8 pt-6">
                    {/* <h3 className="w-100 mb-4">Simulation of your possible earnings with your current balance</h3> */}
                    <div className="text-center">
                        <div className={`box-page-balance ${balance == 0 ? 'negative' : 'positive'} `}>
                            {`${balance}$`}
                        </div>
                        <Image src={'/images/chart.png'} width={360} height={150} alt={''} style={{margin: '20px auto 20px'}}></Image>
                        {/* <Line options={options} data={data} /> */}
                    </div>
                </div>

                <div className="box-buttons px-8 py-6">
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <div className="btn-transfer left">
                                <div className="icon"><Image src={'/icons/save-arrow.png'} width={20} height={100} alt={''} style={{margin: '5px auto 5px'}}></Image></div>
                                <div className="label">SAVE</div>
                            </div>
                        </div>
                        <div>
                            <div className="btn-transfer right">
                                <div className="label">WITHDRAW</div>
                                <div className="icon"><div className="icon"><Image src={'/icons/withdraw-arrow.png'} width={20} height={100} alt={''} style={{margin: '5px auto 5px'}}></Image></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <Transactions data={[]} title={'History'}></Transactions>
            </div>
        </>
    );

};

export default Savings;
