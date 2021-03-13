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
        href: 'https://deflatefi.gitbook.io/deflate-finance/faq/buy',
      },
      {
        label: 'Add Balloon Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/add/ETH/0x55c0bf68101fd8c0f56461df2732e358c2c6d0b2',
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
        href: 'https://pancakeswap.info/token/0x55c0bf68101fd8c0f56461df2732e358c2c6d0b2',
      },
      {
        label: 'BscScan',
        href: 'https://bscscan.com/token/0x55c0bf68101fd8c0f56461df2732e358c2c6d0b2',
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
    label: 'Roadmap',
    icon: 'RoadmapIcon',
    href: 'https://deflatefi.gitbook.io/deflate-finance/roadmap'
  },
  {
    label: 'Audit by TechRate',
    icon: 'AuditIcon',
    href: 'https://deflate.finance/audit/TechRate.pdf'
  },
  {
    label: 'Old',
    icon: 'IfoIcon',
    href: 'https://old.deflate.finance/'
  },
]

export default config
