const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '96d92a17-f115-490f-afb6-01e5a235a386',
    'Content-Type': 'application/json'
  }
}

function getUserInfo() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-24/users/me', {
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

function updateUserInfo(name, about) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-24/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name, about
    })
  })
}

function updateUserAvatar(avatar) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-24/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
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
    if (res.ok) {
      return res.json()
    } else {
      return Promise(`Ошибка: ${res.status}`)
    }
  })
}

function removeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-24/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .catch(err => console.log(err))
}


export {
  getInitialCards,
  postNewCard,
  removeCard,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar
}
