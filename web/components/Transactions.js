
export default function Transactions({ data, title }) {



    return (
        <>
            <div className="mt-4 box-history px-8" style={{background: '#fff', minHeight: '200px'}}>
                <h3 className="w-100 mt-4">{title}</h3>
                <table className="w-full">
                    
                    {data.length == 0 ? (
                        <tbody><tr style={{ height: "60px" }}><td><p>Empty</p></td></tr> </tbody>
                    ) : null}
                    {data.map((purchase, idx) => (
                        <tbody
                            key={idx}
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
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )
}