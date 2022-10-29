import { useAccount, useBalance } from "@web3modal/react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import { useSessionContext } from '../context/SessionContext'
import Image from "next/image"

export default function Home() {
    const router = useRouter()
    const { isLogged, wallet } = useSessionContext()
    const { account } = useAccount()
    const { data, error, isLoading, refetch } = useBalance({
        addressOrName: account.address
    })

    useEffect(() => {
        if(!isLogged) {
            router.push("/login")
            return;
        }

        console.log(data, account)
    })

    const randHash = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    const kids = [
        {
            name: "Kid 1",
            link: "/savings",
            pictureurl: `https://avatars.dicebear.com/api/identicon/${randHash()}.png`,
        },
        {
            name: "Kid 2",
            link: "/loans",
            pictureurl: `https://avatars.dicebear.com/api/identicon/${randHash()}.png`,
        },
    ];

    const purchasesHistory = [
        {
            name: "Purchase 1",
            pictureurl: "https://picsum.photos/50/50.jpg",
            value: "$2",
            sent: true,
        },
        {
            name: "Purchase 2",
            pictureurl: "https://picsum.photos/50/50.jpg",
            value: "$10",
            sent: false,
        },
    ];

    return (
        <div className="h-screen flex flex-col px-8">
            <div style={{ marginLeft: "-2rem", marginRight: "-2rem" }}>
                <div className="background-red rounded-3xl box-page-header"
                    style={{
                        height: "170px",
                        paddingTop: "45px",
                        margin: '12px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <div className="header-circle-medium"></div>
                    <div className="header-circle-small"></div>
                    <h2>Balance</h2>
                    <h6 className="text-center" style={{paddingTop: '7px'}}>12,000$</h6>
                </div>
                <div className="flex justify-between mx-8"
                    style={{
                        boxShadow: "0px 3px 12px -2px rgba(61, 87, 111, 0.1)",
                        borderRadius: "15px",
                        marginTop: "-47px",
                        backgroundColor: "white",
                        padding: "15px 20px",
                        height: '74px',
                        position: 'relative',
                        zIndex: '99'
                    }}
                >
                    <Link className="btn-header-icon" href={'/savings'}>
                        <Image width={25} height={25} alt={''} src={'/icons/wallet.png'} style={{margin: '0 auto'}} />
                        <span style={{fontSize: '14px', fontWeight: '500', lineHeight: '20px', color: '#232440'}}>Savings</span>
                    </Link>
                    <Link className="btn-header-icon" href={'/loans'}>
                        <Image width={25} height={25} alt={''} src={'/icons/dollar.png'} style={{margin: '0 auto'}} />
                        <span style={{fontSize: '14px', fontWeight: '500', lineHeight: '20px', color: '#232440'}}>Loans</span>
                    </Link>
                   
                </div>
            </div>
            <div className="mt-4 box-family">
                <h3 className="w-100 mb-4">Family Members</h3>
                <div className="flex">
                    {kids.map((kid) => (
                        <Link key={kid.name} href={kid.link} className="mr-4">
                            <img className="rounded-full" src={kid.pictureurl} />
                            <span>{kid.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-4 box-history">
                <h3 className="w-100 mt-4">Purchases history</h3>
                <table className="w-full">
                    {purchasesHistory.map((purchase) => (
                        <tbody
                            key={purchase.name}
                            style={{ borderBottom: "1px solid #E8E7E7" }}
                        >
                            <tr style={{ height: "60px" }}>
                                <td className="flex py-4">
                                    <img
                                        className="mr-8"
                                        src={purchase.pictureurl}
                                        style={{ borderRadius: "18px" }}
                                    />
                                    <div className="flex flex-col items-start justify-between">
                                        <p>{purchase.name}</p>
                                        <p>{purchase.sent ? "Sent" : "Received"}</p>
                                    </div>
                                </td>
                                <td>{purchase.value}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            
        </div>
    );
};
