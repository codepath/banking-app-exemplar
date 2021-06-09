import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { formatAmount, formatDate } from "../../utils/format"
import axios from "axios"
import "./TransactionDetail.css"

export default function TransactionDetail() {
  // const transactionId = null // replace this
  const { transactionId } = useParams()
  const [transaction, setTransaction] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true)

      try {
        const res = await axios.get(`http://localhost:3001/bank/transactions/${transactionId}`)
        if (res?.data?.transaction) {
          setTransaction(res.data.transaction)
        }
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransaction()
  }, [transactionId])

  const renderTransactionContent = () => {
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <p className="description">No transaction found</p>

    return (
      <>
        <p className="description">{transaction?.description}</p>
        <div className="meta">
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction?.amount)}</p>
          <p className="date">{formatDate(transaction?.postedAt)}</p>
        </div>
      </>
    )
  }

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction?.category}</p>
        </div>

        {renderTransactionContent()}
      </div>
    </div>
  )
}
