import Image from 'next/image'
import Link from 'next/link'

export default function Splashscreen() {
    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="basis-2/12"></div>
                <div className="basis-7/12">
                    <Image width={450} height={150} style={{ margin: "auto", maxWidth: "350px", marginBottom: '50px'}} src={'/images/logo-red-450x150.png'} />
                    <Image width={450} height={450} style={{ margin: "auto", marginBottom: '40px'}} src={'/images/finance.jpg'} />
                </div>
                <div className="basis-3/12">
                    <Link href={'/login'} className="btn-red w-4/5">
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    )
}
