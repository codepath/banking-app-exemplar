import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"

export default function Home({ transactions = [], transfers = [], filterInput, isLoading, addTransaction }) {
  const transactionsToShow = filterInput
    ? transactions?.filter((t) => t.description.toLowerCase().indexOf(filterInput.toLowerCase()) !== -1)
    : transactions

  return (
    <div className="Home">
      <AddTransaction addTransaction={addTransaction} />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <BankActivity transfers={transfers} transactions={transactionsToShow} filterInput={filterInput} />
      )}
    </div>
  )
}
