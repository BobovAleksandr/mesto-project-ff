import { removeCard, addLike, removeLike } from './api.js'
import { user } from './../index.js'

const cardTemplate = document.querySelector('#card-template').content

function createCard(params) {
  const currentCardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const currentDeleteButton = currentCardElement.querySelector('.card__delete-button')
  currentCardElement.querySelector('.card__image').src = params.newPlaceCard.link
  currentCardElement.querySelector('.card__image').alt = params.newPlaceCard.name
  currentCardElement.querySelector('.card__title').textContent = params.newPlaceCard.name
  changeLikeCounter(currentCardElement, params.newPlaceCard.likes.length)
  if (params.newPlaceCard.owner._id === params.user._id) {
    currentDeleteButton.addEventListener('click', (event) => {
      params.deleteCardElement(event, params.newPlaceCard._id)
  })
  } else {
    currentDeleteButton.setAttribute('style', 'display: none')
  }

  if (params.newPlaceCard.likes.some(likedUser => likedUser._id === user._id)) {
    currentCardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active')
  }

  currentCardElement.querySelector('.card__like-button').addEventListener('click', (event) => {
    params.pressLike(event, params.newPlaceCard, currentCardElement)
  })

  currentCardElement.querySelector('.card__image').addEventListener('click', () => {
    params.zoomCard(params.newPlaceCard.name, params.newPlaceCard.link)
  })

  return currentCardElement
}

function deleteCardElement(event, cardId) {
  event.target.closest('.card').remove()
  removeCard(cardId)
}

function pressLike(event, card, cardElement) {
  if (event.target.classList.contains('card__like-button_is-active')) {
    removeLike(card._id)
    .then(data => {
      changeLikeCounter(cardElement, data.likes.length)
      event.target.classList.remove('card__like-button_is-active')
      })
  } else {
    addLike(card._id)
    .then(data => {
      changeLikeCounter(cardElement, data.likes.length)
      event.target.classList.add('card__like-button_is-active')
      })
  }
}

function changeLikeCounter(cardElement, likesValue) {
  cardElement.querySelector('.card__like-counter').textContent = likesValue
}



export {
  createCard,
  deleteCardElement,
  pressLike,
}