import axios from "axios"
import { useEffect } from "react"

export default function CreatePartner() {
  const messages = {
    ok: 'Успех!\nПользователь успешно добавлен!',
    error: 'Ошибка!\nПользователь с таким именем уже существует!'
  }
  useEffect(() => { document.title = 'Создать партнера' }, [])
  async function submitHandler(e) {
    e.preventDefault()
    const partner = {
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.CEO.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    const res = await axios.post('/partners', partner);

    document.querySelector('form').reset()
    alert(messages[res.data])
  }

  return <div className="form">
    <h1>Создать партнера</h1>
    <form onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="name">Наименование:</label>
      <input id="name" type="text" required />
      <label htmlFor="type">Тип партнера:</label>
      <select name="" id="type" required>
        <option value="ЗАО">ЗАО</option>
        <option value="ООО">ООО</option>
        <option value="ОАО">ОАО</option>
        <option value="ПАО">ПАО</option>
      </select>
      <label htmlFor="rating">Рейтинг:</label>
      <input id="rating" type="number" step="1" min='0' max='100' required />
      <label htmlFor="address">Адрес:</label>
      <input id="address" type="text" required />
      <label htmlFor="CEO">ФИО директора:</label>
      <input id="CEO" type="text" required />
      <label htmlFor="phone">Телефон:</label>
      <input id="phone" type="tel" required />
      <label htmlFor="email">Email компании:</label>
      <input id="email" type="email" required />
      <button type="submit">Создать партнера</button>
    </form>
  </div>
}