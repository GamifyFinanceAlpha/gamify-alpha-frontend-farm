import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { Button } from 'react-bootstrap'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Heading, RowType, Toggle, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { TiFlash } from "react-icons/ti";
import { MdSwapHoriz } from "react-icons/md";
import { BsArrowClockwise } from "react-icons/bs";
import { BLOCKS_PER_YEAR } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import ToggleView from './components/ToggleView/ToggleView'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import FarmTabButtons from './components/FarmTabButtons'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'

export interface FarmsProps {
    tokenMode?: boolean
}

const Header = styled.div`
  padding: 32px 0px;
  background: rgb(51,51,51);
  background: linear-gradient(90deg, rgba(51,51,51,1) 0%, rgba(34,34,34,1) 50%, rgba(51,51,51,1) 100%);

  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`
const Farms: React.FC<FarmsProps> = (farmsProps) => {
    const { path } = useRouteMatch()
    const { pathname } = useLocation()
    const pathParts = pathname.split('/')
    const TranslateString = useI18n()
    const farmsLP = useFarms()
    const cakePrice = usePriceCakeBusd()
    const bnbPrice = usePriceBnbBusd()
    const [query, setQuery] = useState('')
    const [viewMode, setViewMode] = useState(ViewMode.TABLE)
    const [sortOption, setSortOption] = useState('hot')
    const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
    const { tokenMode } = farmsProps;

    const dispatch = useDispatch()
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        if (account) {
            dispatch(fetchFarmUserDataAsync(account))
        }
    }, [account, dispatch, fastRefresh])

    const [stakedOnly, setStakedOnly] = useState(false)

    const activeFarms = farmsLP.filter((farm) => !!farm.isToken === !!tokenMode && farm.multiplier !== '0X')
    const inactiveFarms = farmsLP.filter((farm) => !!farm.isToken === !!tokenMode && farm.multiplier === '0X')

    const stakedOnlyFarms = activeFarms.filter(
        (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
    )

    const pageTitle = pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1)

    const pageIntro = (page) => {
        switch (page) {
            case 'Tanks':
                return 'Stake single tokens to earn BLN.';
            case 'String':
                return 'Automatically swap single tokens for Liquidity Pool (LP) tokens and stake them to earn BLN.';
            default:
                return 'Stake Liquidity Pool (LP) tokens to earn BLN.';
        }
    }

    const renderPerks = (page) => {
        switch (page) {
            case 'Tanks':
                return (
                    <>
                        <Button disabled variant="outline-info" className="rounded-pill mb-3 mr-2" style={{ fontSize: "12px", opacity: 1 }}>
                            <b>Single token</b>
                        </Button>
                        <Button disabled variant="outline-danger" className="rounded-pill mb-3" style={{ fontSize: "12px", opacity: 1 }}>
                            <b><BsArrowClockwise />Compound</b>
                        </Button>
                    </>
                )
            case 'String':
                return (
                    <div className="mt-2">
                        <Button disabled variant="outline-warning" className="rounded-pill mb-3 mr-2" style={{ fontSize: "12px", opacity: 1 }}>
                            <b><MdSwapHoriz />Auto swap</b>
                        </Button>
                        <Button disabled variant="outline-warning" className="rounded-pill mb-3" style={{ fontSize: "12px", opacity: 1 }}>
                            <b><TiFlash />Auto compound</b>
                        </Button>
                    </div>
                )
            default:
                return (
                    <Button disabled variant="outline-success" className="rounded-pill mb-3" style={{ fontSize: "12px", opacity: 1 }}>
                        <b>Double token</b>
                    </Button>
                )

        }
    }

    // /!\ This function will be removed soon
    // This function compute the APY for each farm and will be replaced when we have a reliable API
    // to retrieve assets prices against USD
    const farmsList = useCallback(
        (farmsToDisplay) => {
            const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
                const cakeRewardPerBlock = new BigNumber(farm.balloonPerBlock || 1).times(new BigNumber(farm.poolWeight)).div(new BigNumber(10).pow(18))
                const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

                let apy = cakePrice.times(cakeRewardPerYear);

                let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

                if (farm.quoteTokenSymbol === QuoteToken.BNB) {
                    totalValue = totalValue.times(bnbPrice);
                }

                if (totalValue.comparedTo(0) > 0) {
                    apy = apy.div(totalValue);
                }

                return { ...farm, apy, liquidity: totalValue }
            })
            // if (query) {
            //     const lowercaseQuery = query.toLowerCase()
            //     farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
            //       if (farm.lpSymbol.toLowerCase().includes(lowercaseQuery)) {
            //         return true
            //       }

            //       return false
            //     })
            // }
            return farmsToDisplayWithAPY
        },
        [bnbPrice, cakePrice],
    )

    const isActive = !pathname.includes('history')
    let farmList = []
    if (isActive) {
        farmList = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    } else {
        farmList = farmsList(inactiveFarms)
    }

    const rowData = farmList.map((farm) => {
        const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
        const lpLabel = farm.tokenSymbol && farm.tokenSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

        const row: RowProps = {
            apr: {
                value: farm.apy && farm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
                multiplier: farm.multiplier,
                lpLabel,
                quoteTokenAdresses,
                quoteTokenSymbol,
                tokenAddresses,
                cakePrice,
                originalValue: farm.apy,
            },
            farm: {
                image: farm.tokenSymbol.split(' ')[0].toLocaleLowerCase(),
                label: lpLabel,
                pid: farm.pid,
            },
            earned: {
                earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
                pid: farm.pid,
            },
            liquidity: {
                liquidity: farm.liquidity,
            },
            multiplier: {
                multiplier: farm.multiplier,
            },
            details: farm,
        }

        return row
    })

    const renderContent = (): JSX.Element => {
        if (viewMode === ViewMode.TABLE && rowData.length) {
            const columnSchema = DesktopColumnSchema
            const columns = columnSchema.map((column) => ({
                id: column.id,
                name: column.name,
                label: column.label,
                sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
                    switch (column.name) {
                        case 'farm':
                            return b.id - a.id
                        case 'apr':
                            if (a.original.apr.value && b.original.apr.value) {
                                return Number(a.original.apr.value) - Number(b.original.apr.value)
                            }

                            return 0
                        case 'earned':
                            return a.original.earned.earnings - b.original.earned.earnings
                        default:
                            return 1
                    }
                },
                sortable: column.sortable,
            }))

            return <Table data={rowData} columns={columns} />
        }

        return (
            <div>
                <FlexLayout>
                    <Route exact path={`${path}`}>
                        {farmList.map((farm) => (
                            <FarmCard
                                key={farm.pid}
                                farm={farm}
                                removed={false}
                                cakePrice={cakePrice}
                                bnbPrice={bnbPrice}
                                ethereum={ethereum}
                                account={account}
                            />
                        ))}
                    </Route>
                    <Route exact path={`${path}/history`}>
                        {farmList.map((farm) => (
                            <FarmCard
                                key={farm.pid}
                                farm={farm}
                                removed
                                cakePrice={cakePrice}
                                bnbPrice={bnbPrice}
                                account={account}
                            />
                        ))}
                    </Route>
                </FlexLayout>
            </div>
        )
    }

    const handleSortOptionChange = (option: OptionProps): void => {
        setSortOption(option.value)
      }

    return (
        <>
            <Header>
                <Heading as="h1" size="xxl" color="secondary" mb="24px">
                    {TranslateString(999, pageTitle)}
                </Heading>
                {/* {renderPerks(pageTitle)} */}
                <Heading size="lg" color="text">
                    {TranslateString(999, pageIntro(pageTitle))}
                </Heading>
            </Header>
            <Page>
                {/* <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} /> */}
                <ControlContainer>
                    <ViewControls>
                        <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
                        <ToggleWrapper>
                            <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                            <Text> {TranslateString(1116, 'Staked only')}</Text>
                        </ToggleWrapper>
                        {/* <FarmTabButtons /> */}
                    </ViewControls>
                    <FilterContainer>
                        <LabelWrapper>
                            <Text>SORT BY</Text>
                            <Select
                                options={[
                                    {
                                        label: 'Hot',
                                        value: 'hot',
                                    },
                                    {
                                        label: 'APR',
                                        value: 'apr',
                                    },
                                    {
                                        label: 'Multiplier',
                                        value: 'multiplier',
                                    },
                                    {
                                        label: 'Earned',
                                        value: 'earned',
                                    },
                                    {
                                        label: 'Liquidity',
                                        value: 'liquidity',
                                    },
                                ]}
                                onChange={handleSortOptionChange}
                            />
                        </LabelWrapper>
                        {/* <LabelWrapper style={{ marginLeft: 16 }}>
                            <Text>SEARCH</Text>
                            <SearchInput onChange={handleChangeQuery} value={query} />
                        </LabelWrapper> */}
                    </FilterContainer>
                </ControlContainer>

                {renderContent()}
            </Page>
        </>
    )
}

export default Farms
