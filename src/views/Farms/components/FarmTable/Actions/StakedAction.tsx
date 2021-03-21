import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon } from '@pancakeswap-libs/uikit'
import UnlockButton from 'components/UnlockButton'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import useI18n from 'hooks/useI18n'
import { useApprove } from 'hooks/useApprove'
import bep20Abi from 'config/abi/erc20.json'
// import { getBep20Contract } from 'utils/contractHelpers'
import { getContract } from 'utils/web3'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getBalanceNumber } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import useWeb3 from 'hooks/useWeb3'

import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import { ActionContainer, ActionTitles, ActionContent, Earned, Title, Subtle } from './styles'

const IconButtonWrapper = styled.div`
  display: flex;
`

const Staked: React.FunctionComponent<FarmWithStakedValue> = ({ pid, tokenSymbol, lpAddresses, quoteTokenAdresses, quoteTokenSymbol, tokenAddresses }) => {
    const TranslateString = useI18n()
    const { account } = useWallet()
    const [requestedApproval, setRequestedApproval] = useState(false)
    const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
    const { onStake } = useStake(pid)
    const { onUnstake } = useUnstake(pid)
    const web3 = useWeb3()

    const isApproved = account && allowance && allowance.isGreaterThan(0)

    const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
    const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
    const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
    const rawStakedBalance = getBalanceNumber(stakedBalance)
    const displayBalance = rawStakedBalance.toLocaleString()

    const [onPresentDeposit] = useModal(
        <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenSymbol} />,
    )
    const [onPresentWithdraw] = useModal(<WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenSymbol} />)

    const lpContract = getContract(bep20Abi, lpAddress)

    const { onApprove } = useApprove(lpContract)

    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            await onApprove()
            setRequestedApproval(false)
        } catch (e) {
            console.error(e)
        }
    }, [onApprove])

    if (!account) {
        return (
            <ActionContainer>
                <ActionTitles>
                    <Subtle>{TranslateString(999, 'START FARMING')}</Subtle>
                </ActionTitles>
                <ActionContent>
                    <UnlockButton width="100%" />
                </ActionContent>
            </ActionContainer>
        )
    }

    if (isApproved) {
        if (rawStakedBalance) {
            return (
                <ActionContainer>
                    <ActionTitles>
                        <Title>{tokenSymbol} </Title>
                        <Subtle>{TranslateString(999, 'STAKED')}</Subtle>
                    </ActionTitles>
                    <ActionContent>
                        <div>
                            <Earned>{displayBalance}</Earned>
                        </div>
                        <IconButtonWrapper>
                            <IconButton variant="secondary" onClick={onPresentWithdraw} mr="6px">
                                <MinusIcon color="primary" width="14px" />
                            </IconButton>
                            <IconButton variant="secondary" onClick={onPresentDeposit}>
                                <AddIcon color="primary" width="14px" />
                            </IconButton>
                        </IconButtonWrapper>
                    </ActionContent>
                </ActionContainer>
            )
        }

        return (
            <ActionContainer>
                <ActionTitles>
                    <Subtle>{TranslateString(999, 'STAKE')} </Subtle>
                    <Title>{tokenSymbol}</Title>
                </ActionTitles>
                <ActionContent>
                    <Button onClick={onPresentDeposit} variant="secondary">
                        {TranslateString(999, 'Stake LP')}
                    </Button>
                </ActionContent>
            </ActionContainer>
        )
    }

    return (
        <ActionContainer>
            <ActionTitles>
                <Subtle>{TranslateString(999, 'ENABLE FARM')}</Subtle>
            </ActionTitles>
            <ActionContent>
                <Button disabled={requestedApproval} onClick={handleApprove} variant="secondary">
                    {TranslateString(999, 'Enable')}
                </Button>
            </ActionContent>
        </ActionContainer>
    )
}

export default Staked
