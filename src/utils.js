export const getFormattedCurrency = (value) => {
  const currencyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  return currencyFormat.format(value)
}

export const getLocalDate = (dateString) => {
  var m = new Date(dateString);
  return m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate();
}

export const extractArrayFromResponse = (objectArray) => {
  return objectArray.map((entry) => {
    const resp = []
    for (const prop in entry) {
      if (prop.includes("date")) {
        resp.push(getLocalDate(entry[prop]))
      } else if (prop.includes("salary")) {
        resp.push(getFormattedCurrency(entry[prop]))
      } else {
        resp.push(entry[prop])
      }
    }
    return resp
  })
}
