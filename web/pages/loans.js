
import Link from "next/link";
import Image from "next/image";
import Transactions from "../components/Transactions";
import { useState } from "react";
import { ContractApi } from "../utils/contractApi";

const Loans = () => {
    const [balance, setBalance] = useState(0)
    const [history, setHistory] = useState([])

    const borrow = async () => {
        try {
            const input = document.querySelector('#amount').value
            if (input == '') {
                return;
            }

            const contractApi = new ContractApi()
            await contractApi.setup()
            const result = await contractApi.borrow(10)

            console.log(result, history, history.length)
            if (history.length == 0) {
                // history.push({
                //     name: "Top up - weekly allowence",
                //     pictureurl: "/icons/top-up.png",
                //     value: balance + " $",
                //     sent: true
                // })

                // setHistory(history)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const payout = () => {

    }

    return (
        <>
            <div className="box-bar-header">
                <div className="flex flex-row">
                    <div className="basis-4/12 back-arrow">
                        <Link href={'/'}>
                            <Image width={24} height={24} alt={''} src={'/icons/back.svg'} />
                        </Link>
                    </div>
                    <div className="basis-4/12 header-title"><span>Loans</span></div>
                    <div className="basis-4/12"></div>
                </div>
            </div>

            <div className="h-screen flex flex-col py-2" style={{ paddingTop: '80px', background: '#E5E5E5' }}>
                <div className="box-graphs px-8 pt-6">
                    {/* <h3 className="w-100 mb-4">Simulation of your possible earnings with your current balance</h3> */}
                    <div className="text-center">
                        <div className={`box-page-balance ${balance > 0 ? 'negative' : 'positive'} `}>
                            {`${balance}$`}
                        </div>
                        <Image src={'/images/chart.png'} width={360} height={150} alt={''} style={{ margin: '20px auto 20px' }}></Image>
                        {/* <Line options={options} data={data} /> */}
                    </div>
                </div>

                <div className="box-buttons px-8 py-6">

                    <div className="grid grid-cols-6 gap-4 mb-5">
                        <div className="col-start-2 col-span-4 box-input">
                            <input id={'amount'} type={'number'} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <div className="btn-transfer left" onClick={borrow}>
                                <div className="label">BORROW</div>
                                <div className="icon"><Image src={'/icons/withdraw-arrow.png'} width={20} height={100} alt={''} style={{ margin: '5px auto 5px' }}></Image></div>
                            </div>
                        </div>
                        <div>
                            <div className="btn-transfer right" onClick={payout}>
                                <div className="icon"><Image src={'/icons/save-arrow.png'} width={20} height={100} alt={''} style={{ margin: '5px auto 5px' }}></Image></div>
                                <div className="label">PAYOUT</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Transactions data={[]} title={'Loans History'}></Transactions>
            </div>
        </>
    );
};

export default Loans;
