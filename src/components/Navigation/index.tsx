import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import { usePriceCakeBusd } from 'state/hooks'
import ConnectWallet from 'components/ConnectWallet'
import { FaTelegramPlane, FaTwitter, FaTractor, FaInfoCircle } from "react-icons/fa";
import { GiChemicalTank, GiSewingString } from "react-icons/gi";


const Navigation = () => {
    const { account, connect, reset } = useWallet()
    const cakePriceUsd = usePriceCakeBusd()
    const { pathname } = useLocation()

    return (
        <nav className="navbar2 navbar-default2 navbar-static-top2">
            <div className="container-fluid position-relative">
                <div className="navbar-header2">
                    <a className={pathname === '/' ? "navbar-brand2 text-white" : "navbar-brand2"} href="/">
                        <img className="mb-n2" alt="logo" src="/images/logo2.png" />
                        <span className="ml-1">Deflate Finance 
                            {/* <b className="position-absolute" style={{ fontSize: "18px" }}>
                                ${`${cakePriceUsd.toNumber().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })}`}
                            </b> */}
                        </span>
                    </a>
                </div>
                <div id="navbar">
                    <ul className="nav2 navbar-nav2 navbar-right2" id="connect-wallet">
                        <li>
                            <b>
                                <ConnectWallet
                                    account={account}
                                    connect={connect}
                                    reset={reset}
                                    aria-label="Connect wallet" />
                            </b>
                        </li>
                    </ul>
                    <ul className="nav2 navbar-nav2 navbar-right2 social">
                        <li><a aria-label="Telegram" href="https://t.me/deflatechat"><FaTelegramPlane /></a></li>
                        <li><a aria-label="Twitter" href="https://twitter.com/DeflateFinance/"><FaTwitter /></a></li>
                    </ul>
                    <ul className="nav2 navbar-nav2 navbar-right2">
                        <li className={pathname === '/farms' ? "active" : ""}>
                            <a href="/farms"><FaTractor className="mr-1" /> <span>Farms</span></a>
                        </li>
                        <li className={pathname.includes('/tanks') ? "active" : ""}>
                            <a href="/tanks"><GiChemicalTank className="mr-1" /> <span>Tanks</span></a>
                        </li>
                        <li className={pathname === '/string' ? "active" : ""}>
                            <a href="/string"><GiSewingString className="mr-1" /> <span>String 🔥</span></a>
                        </li>
                        {/* <li className={pathname === '/string' ? "active" : ""}>
                            <a href="/"><FaInfoCircle className="mr-1" /> <span>About</span></a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Navigation
