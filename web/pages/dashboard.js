import { useAccount, useBalance } from "@web3modal/react";
import Link from "next/link";

const Family = () => {
  const buttons = [
    {
      text: "Savings",
      link: "/savings",
      pictureurl: "https://picsum.photos/50/50.jpg",
    },
    {
      text: "Loans",
      link: "/loans",
      pictureurl: "https://picsum.photos/50/50.jpg",
    },
  ];

  const kids = [
    {
      name: "Kid 1",
      link: "/savings",
      pictureurl: "https://picsum.photos/50/50.jpg",
    },
    {
      name: "Kid 2",
      link: "/loans",
      pictureurl: "https://picsum.photos/50/50.jpg",
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
    <div className="h-screen flex flex-col">
      <div style={{ marginLeft: "-2rem", marginRight: "-2rem" }}>
        <div
          className="background-red rounded-3xl"
          style={{
            height: "170px",
            paddingTop: "28px",
          }}
        >
          <h2>Balance</h2>
          <h6 className="text-center">12,000$</h6>
        </div>
        <div
          className="flex justify-between mx-8"
          style={{
            boxShadow: "0px 3px 12px -2px rgba(61, 87, 111, 0.1)",
            borderRadius: "15px",
            marginTop: "-47px",
            backgroundColor: "white",
            padding: "12px 21px",
          }}
        >
          {buttons.map((btn) => (
            <Link key={btn.text} href={btn.link}>
              <img className="rounded-full" src={btn.pictureurl} />
              <p>{btn.text}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="w-100 mb-4">Kids</h3>
        <div className="flex">
          {kids.map((kid) => (
            <Link key={kid.name} href={kid.link} className="mr-4">
              <img className="rounded-full" src={kid.pictureurl} />
              <p>{kid.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <h3 className="w-100 mt-4">Purchases history</h3>
      <table>
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
  );
};

export default Family;
