import React from 'react'
import styled from 'styled-components'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import useI18n from 'hooks/useI18n'

export interface AprProps {
    value: string
    multiplier: string
    lpLabel: string
    quoteTokenAdresses: Address
    quoteTokenSymbol: string
    tokenAddresses: Address
    cakePrice: BigNumber
    originalValue: number
    hideButton?: boolean
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
    value,
    lpLabel,
    quoteTokenAdresses,
    quoteTokenSymbol,
    tokenAddresses,
    cakePrice,
    originalValue,
    hideButton = false,
}) => {
    const TranslateString = useI18n()
    const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
    const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
    const farmAPR = value && new BigNumber(value).times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return (
        <Container>
            {originalValue ? (
                <>
                    <AprWrapper>{farmAPR}%</AprWrapper>
                    {!hideButton && (
                        <ApyButton
                            tokenSymbol={lpLabel}
                            quoteTokenAdresses={quoteTokenAdresses}
                            quoteTokenSymbol={quoteTokenSymbol}
                            tokenAddresses={tokenAddresses}
                            cakePrice={new BigNumber(cakePrice)}
                            apy={new BigNumber(originalValue)}
                        />
                    )}
                </>
            ) : (
                <AprWrapper>{TranslateString(656, 'Loading...')}</AprWrapper>
            )}
        </Container>
    )
}

export default Apr
