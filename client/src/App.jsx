import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await axios.get('/partners')
      setPartners(res.data)
    })();
  }, [])
  console.log(partners)
  return (
    <>
    <div className="page-heading">
      <img className="page-logo" src="./Мастер пол.png" alt="" />
      <h1>Партнеры</h1>
    </div>
      <ul className="partners-list">
        {partners.map((partner) => {
          return <li className="partner-card" key={partner.id}>
            <div className="partner-data">
                <p className="card_heading">{partner.organization_type} | {partner.name}</p>
              <div className="partner-data-info">
                <p>{partner.ceo}</p>
                <p>{partner.phone}</p>
                <p>Рейтинг: {partner.rating}</p>
              </div>
            </div>
            <div className="partner-sale partner-data card_heading">
              sale
            </div>
          </li>
        })}
      </ul>
    </>
  )
}

export default App
