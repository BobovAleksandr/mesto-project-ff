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
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch(err => console.log(err))
}

function updateUserInfo(name, about) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-24/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .catch(err => console.log(err))
}

function updateUserAvatar(avatar) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-24/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .catch(err => console.log(err))
}

function getInitialCards() {
  return fetch (`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch(err => console.log(err))
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
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch(err => console.log(err))
}

function removeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-24/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .catch(err => console.log(err))
}

function addLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-24/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch(err => console.log(err))
}

function removeLike(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-24/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .catch(err => console.log(err))
}

function renderLoading(element, isLoading) {
  const currentButton = element.querySelector('.popup__button')
  if (isLoading) {
    currentButton.textContent = 'Сохранение...'
  } else {
    currentButton.textContent = 'Сохранить'
  }
}

function checkMimeType(url) {
  return fetch(`${url}`, {
    method: 'HEAD',
  })
  .then(res => {
    if (res.ok) {
      return res
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  // .catch(err => console.log(err))
}

export {
  getInitialCards,
  postNewCard,
  removeCard,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  addLike,
  removeLike,
  renderLoading,
  checkMimeType,
}
