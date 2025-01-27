import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import axios from "axios";

export default function UpdatePartner() {
  const messages = {
    ok: 'Успех!\nДанные пользователя успешно обновлены!',
    error: 'Ошибка!\n'
  }
  useEffect(() => { document.title = 'Создать партнера' }, [])
  const location = useLocation();
  const [partner, setPartner] = useState(location.state.partner);

  async function submitHandler(e) {
    e.preventDefault()
    const updPartner = {
      id: partner.id,
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.CEO.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    const res = await axios.put('/partners', updPartner);

    setPartner(updPartner)
    document.querySelector('form').reset()
    alert(messages[res.data])
  }

  return <div className="form">
    <h1>Создать партнера</h1>
    <form onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="name">Наименование:</label>
      <input id="name" type="text" required defaultValue={partner.name} />
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required defaultValue={partner.type} >
        <option value="ЗАО">ЗАО</option>
        <option value="ООО">ООО</option>
        <option value="ОАО">ОАО</option>
        <option value="ПАО">ПАО</option>
      </select>
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required defaultValue={partner.rating}/>
      <label htmlFor="address">Адрес:</label>
      <input id="address" type="text" required defaultValue={partner.address} />
      <label htmlFor="CEO">ФИО директора:</label>
      <input id="CEO" type="text" required defaultValue={partner.ceo} />
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required defaultValue={partner.phone} />
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required defaultValue={partner.email}/>
      <button type="submit">Обновить партнера</button>
    </form>
  </div>
}