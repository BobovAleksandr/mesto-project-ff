const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '96d92a17-f115-490f-afb6-01e5a235a386',
    'Content-Type': 'application/json'
  }
}

function getInitialCards() {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise(`Ошибка: ${res.status}`)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

function postNewCard(newPlaceCard) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-24/cards', {
    method: 'POST',
    body: JSON.stringify({ 
      name: newPlaceCard.name, 
      link: newPlaceCard.link 
    }),
    headers: config.headers
  })
  .then(res => {
    return res
  })
  .then(res => {
    console.log(res)
  })
}

export {
  getInitialCards,
  postNewCard
}
