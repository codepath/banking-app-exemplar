import moment from "moment"

const formats = [moment.ISO_8601]

export const formatDate = (date) => {
  const d = new Date(date)
  const isValidDate = moment(d, formats, true).isValid()
  return isValidDate ? moment(d).format("MMM Do, YYYY") : "None"
}

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatAmount = (amount) => {
  const dollars = amount * 0.01
  return `$${formatter.format(dollars)}`
}
