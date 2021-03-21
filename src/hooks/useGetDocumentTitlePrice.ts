import { useEffect } from 'react'
import { usePriceCakeBusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const blnPriceUsd = usePriceCakeBusd()
  useEffect(() => {
    document.title = `Deflate Finance - $${Number(blnPriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  })
}
export default useGetDocumentTitlePrice
