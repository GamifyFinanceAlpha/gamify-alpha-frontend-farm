import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance, useReflectedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const reflectedBalance = useReflectedBalance(getCakeAddress())
  const farms = useFarms();
  const blnPrice = usePriceCakeBusd();
  const circSupply = totalSupply && totalSupply > burnedBalance ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = blnPrice.times(circSupply);

  let balloonPerBlock = 0;
  if(farms && farms[0] && farms[0].balloonPerBlock){
    balloonPerBlock = new BigNumber(farms[0].balloonPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Balloon Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total BLN Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total BLN Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">
            {TranslateString(730, 'Total BLN Reflected')}
            <Tooltip 
              title="This is the amount sent back to holders from each transaction" 
              placement="top"
              style={{minWidth:0, padding:2}}
            >
              <Button>🛈</Button>
            </Tooltip>
          </Text>
          <CardValue fontSize="14px" value={getBalanceNumber(reflectedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New BLN/block')}</Text>
          <Text bold fontSize="14px">{balloonPerBlock}</Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
