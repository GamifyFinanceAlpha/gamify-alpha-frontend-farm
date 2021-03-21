import React from 'react'
import { Button } from 'react-bootstrap';
import { useWalletModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

export interface ConnectWalletProps {
    account?,
    connect,
    reset
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
    account,
    connect,
    reset
}) => {
    const TranslateString = useI18n()
    const showAccount = account ? `${account.slice(0, -38)}...${account.slice(-4)}` : TranslateString(612, 'Connect')
    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(connect, reset, account)

    return (
        <Button
            onClick={account ? onPresentAccountModal : onPresentConnectModal}
            variant="danger"
            className="rounded-pill">
            {showAccount}
        </Button>
    )
}

export default ConnectWallet
