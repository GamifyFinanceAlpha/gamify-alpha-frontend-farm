import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
// import config from './config'
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegramPlane, faTwitter } from '@fortawesome/free-brands-svg-icons'


const Navigation = (props) => {
    //   const { account, connect, reset } = useWallet()
    //   const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
    //   const { isDark, toggleTheme } = useTheme()
    //   const cakePriceUsd = usePriceCakeBusd()

    return (
        // <UikitMenu
        //   account={account}
        //   login={connect}
        //   logout={reset}
        //   isDark={isDark}
        //   toggleTheme={toggleTheme}
        //   currentLang={selectedLanguage && selectedLanguage.code}
        //   langs={allLanguages}
        //   setLang={setSelectedLanguage}
        //   cakePriceUsd={cakePriceUsd.toNumber()}
        //   links={config}
        //   priceLink="https://bscscan.com/token/0x896eDE222D3f7f3414e136a2791BDB08AAa25Ce0"
        //   {...props}
        // />
        // <Navbar expand="lg" variant="dark" className="navbar-default">
        //     <Container>
        //         <Navbar.Brand href="/" ><img alt="Logo" src="/images/logo.png" /> Deflate Finance</Navbar.Brand>
        //         <Nav>
        //             {/* <Nav.Link href="/farms">Farms</Nav.Link>
        //             <Nav.Link eventKey={2} href="/tanks">Tanks</Nav.Link>
        //             <Nav.Link eventKey={3} href="/string">String</Nav.Link> */}

        //             <ul className="nav navbar-nav navbar-right">
        //                 <li><i className="glyphicon glyphicon-th" /><Nav.Link href="/farms">Farms</Nav.Link></li>
        //                 <li><i className="glyphicon glyphicon-bookmark" /><Nav.Link eventKey={2} href="/tanks">Tanks</Nav.Link></li>
        //                 <li><i className="glyphicon glyphicon-camera" /><Nav.Link eventKey={3} href="/string">String</Nav.Link></li>
        //             </ul>
        //             <div className="nav navbar-nav navbar-right">
        //                 <Nav.Link eventKey={4} href="https://t.me/deflatechat"><FontAwesomeIcon icon={faTelegramPlane} /></Nav.Link>
        //                 <Nav.Link eventKey={4} href="https://twitter.com/DeflateFinance/"><FontAwesomeIcon icon={faTwitter} /></Nav.Link>
        //             </div>
        //         </Nav>
        //     </Container>
        // </Navbar>
        <Navbar className="navbar navbar-default navbar-static-top">
            <Container>
                <div className="navbar-header">
                    <Navbar.Brand className="navbar-brand" href="/"><img alt="Logo" src="/images/logo.png" /><span> Deflate Finance</span></Navbar.Brand>
                </div>
                <Nav>
                    <ul className="nav navbar-nav navbar-right">
                        <li><i className="glyphicon glyphicon-th" /><a href="/farms">Farms</a></li>
                        <li><i className="glyphicon glyphicon-bookmark" /><a href="/tanks">Tanks</a></li>
                        <li><i className="glyphicon glyphicon-camera" /><a href="/string">String</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right social">
                        <li><a aria-label="Telegram chat" href="https://t.me/deflatechat"><FontAwesomeIcon icon={faTelegramPlane} /></a></li>
                        <li><a aria-label="Twitter chat" href="https://twitter.com/DeflateFinance/"><FontAwesomeIcon icon={faTwitter} /></a></li>
                    </ul>
                </Nav>
            </Container>
        </Navbar>
    )

}

export default Navigation
