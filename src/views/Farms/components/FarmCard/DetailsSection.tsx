import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'
import { useFarmUser } from 'state/hooks'

export interface ExpandableSectionProps {
    pid: number,
    isToken?: boolean
    tokenAmount?: BigNumber
    lpTokenBalanceMC?: BigNumber
    bscScanAddress?: string
    removed?: boolean
    totalValueFormatted?: string
    tokenSymbol?: string
    quoteTokenAdresses?: Address
    quoteTokenSymbol?: string
    tokenAddresses: Address,
    totalValue?: BigNumber
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
    pid,
    isToken,
    tokenAmount,
    lpTokenBalanceMC,
    bscScanAddress,
    removed,
    totalValue,
    totalValueFormatted,
    tokenSymbol,
    quoteTokenAdresses,
    quoteTokenSymbol,
    tokenAddresses,
}) => {
    const TranslateString = useI18n()
    const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
    const { stakedBalance } = useFarmUser(pid)
    const stakedAmount = isToken ? tokenAmount : lpTokenBalanceMC
    const myValue = stakedBalance.shiftedBy(-18).div(new BigNumber(stakedAmount)).times(totalValue);
    const myValueFormatted = `$${Number(myValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    
    return (
        <Wrapper>
            <Flex justifyContent="space-between">
                <Text>{TranslateString(316, 'Stake')}:</Text>
                <StyledLinkExternal href={
                    isToken ?
                        `https://exchange.pancakeswap.finance/#/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
                        :
                        `https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`
                }>
                    {tokenSymbol}
                </StyledLinkExternal>
            </Flex>
            {!removed && (
                <Flex justifyContent="space-between">
                    <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
                    <Text>{totalValueFormatted}</Text>
                </Flex>
            )}
            <Flex justifyContent="space-between">
                <Text>{TranslateString(10015, 'My Staked Value')}:</Text>
                <Text>{myValueFormatted}</Text>
            </Flex>
            <Flex justifyContent="flex-start">
                <Link external href={bscScanAddress} bold={false}>
                    {TranslateString(356, 'View on BscScan')}
                </Link>
            </Flex>
        </Wrapper>
    )
}

export default DetailsSection
