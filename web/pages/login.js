import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LoginButton from '../components/LoginButton'

export default function Login() {
    return (
        <>
            <div className="h-screen flex flex-col">
                <div className="basis-1/12"></div>
                <div className="basis-6/12 pt-5">
                    <Image width={450} height={150} style={{ margin: "auto", maxWidth: "350px", marginBottom: '50px'}} alt='' src={'/images/logo-red-450x150.png'} />
                    <Image width={450} height={450} style={{ margin: "auto", marginBottom: '40px'}} alt='' src={'/images/finance.jpg'} />
                </div>

                <div className="basis-2/12 pb-5">
                    <LoginButton />
                </div>

                <div className="basis-2/12">
                    <div className="btn-grey hover:btn-red-hover w-4/5">
                        Create an account (COMING SOON)
                    </div>
                </div>
                <div className="basis-1/12 pb-5"></div>
            </div>
        </>
    )
}
