import { useState } from "react"
import axios from "axios"
import "./AddTransaction.css"

export default function AddTransaction({ addTransaction }) {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(false)

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setError(null)

    const newTransaction = { amount, description, category }

    try {
      const res = await axios.post("http://localhost:3001/bank/transactions", { transaction: newTransaction })
      if (res?.data?.transaction) {
        addTransaction(res.data.transaction)
      }

      setAmount("")
      setDescription("")
      setCategory("")
    } catch (err) {
      setError(String(err))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="AddTransaction">
      <h2>Add Transaction</h2>

      {isProcessing ? <div className="loader">Loading</div> : null}
      {error ? <p className="red">{error}</p> : null}

      <div className="form">
        <div className="fields">
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter a category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="field" style={{ flex: 0.5 }}>
            <label>Amount (cents)</label>
            <input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <button className="btn add-transaction" type="submit" onClick={() => handleOnSubmit()}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
