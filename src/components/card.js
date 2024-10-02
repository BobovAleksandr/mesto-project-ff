import { removeCard } from './api'

const cardTemplate = document.querySelector('#card-template').content

function createCard(params) {
  const currentCard = cardTemplate.querySelector('.card').cloneNode(true)
  currentCard.querySelector('.card__image').src = params.newPlaceCard.link
  currentCard.querySelector('.card__image').alt = params.newPlaceCard.name
  currentCard.querySelector('.card__title').textContent = params.newPlaceCard.name
  currentCard.querySelector('.card__like-counter').textContent = params.newPlaceCard.likes.length
  const currentDeleteButton = currentCard.querySelector('.card__delete-button')
  if (params.newPlaceCard.owner._id === params.user._id) {
    currentDeleteButton.addEventListener('click', (event) => {
      params.deleteCard(event, params.newPlaceCard._id)
  })
  } else {
    currentDeleteButton.setAttribute('style', 'display: none')
  }
  currentCard.querySelector('.card__like-button').addEventListener('click', params.pressLike)
  currentCard.querySelector('.card__image').addEventListener('click', () => {
    params.zoomCard(params.newPlaceCard.name, params.newPlaceCard.link)
  })
  return currentCard
}

function deleteCard(event, id) {
  event.target.closest('.card').remove()
  removeCard(id)
}

function pressLike(event) {
  event.target.classList.toggle('card__like-button_is-active')

}

export {
  createCard,
  deleteCard,
  pressLike,
}