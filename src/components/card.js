const cardTemplate = document.querySelector('#card-template').content

function createCard(params) {
  const currentCard = cardTemplate.querySelector('.card').cloneNode(true)
  currentCard.querySelector('.card__image').src = params.newPlaceCard.link
  currentCard.querySelector('.card__image').alt = params.newPlaceCard.name
  currentCard.querySelector('.card__title').textContent = params.newPlaceCard.name
  currentCard.querySelector('.card__delete-button').addEventListener('click', params.deleteCard)
  currentCard.querySelector('.card__like-button').addEventListener('click', params.pressLike)
  currentCard.querySelector('.card__image').addEventListener('click', () => {
    params.zoomCard(params.newPlaceCard.name, params.newPlaceCard.link)
  })
  return currentCard
}

function deleteCard(event) {
  event.target.closest('.card').remove()
}

function pressLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

export {
  createCard,
  deleteCard,
  pressLike,
}














const obj = {
  name: 'Oleg',
  age: 23,
  haveJob: true,
  diubleAge(n) {
    return n * 2
  }
}

console.log(
  
)