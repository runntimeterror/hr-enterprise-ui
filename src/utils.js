export const getFormattedCurrency = (value) => {
  const currencyFormat =  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  return currencyFormat.format(value)
}
