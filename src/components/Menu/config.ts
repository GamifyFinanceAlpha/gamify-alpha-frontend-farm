import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Buy Balloon',
        href: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xcf3452578a581dcf19f4a9c36c0caf617103128c',
      },
      {
        label: 'Add Balloon Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/add/ETH/0xcf3452578a581dcf19f4a9c36c0caf617103128c',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Tanks',
    icon: 'PoolIcon',
    href: '/tanks',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'PancakeSwap',
        href: 'https://pancakeswap.info/token/0xcf3452578a581dcf19f4a9c36c0caf617103128c',
      },
      {
        label: 'BscScan',
        href: 'https://bscscan.com/token/0xcf3452578a581dcf19f4a9c36c0caf617103128c',
      }
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: "Github",
        href: "https://github.com/deflate-finance",
      },
      {
        label: "Docs",
        href: "https://deflatefi.gitbook.io/",
      },
      {
        label: "Blog",
        href: "https://medium.com/@deflatefi",
      },
    ],
  },
  {
    label: 'Old',
    icon: 'IfoIcon',
    href: 'https://old.deflate.finance/'
  },
]

export default config
