import './pages/index.css'; 
import { initialCards,  createCard, deleteCard, pressLike } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list')

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditModal = document.querySelector('.popup_type_edit')
const profileEditForm = document.forms['edit-profile']

const newPlaceModal = document.querySelector('.popup_type_new-card')
const newPlaceButton = document.querySelector('.profile__add-button')
const newPlaceForm = document.forms['new-place']
const newPlaceName = newPlaceForm.elements['place-name']
const newPlaceUrl = newPlaceForm.elements['link']

profileEditButton.addEventListener('click', () => {
  openModal(profileEditModal)
  profileEditForm.elements.name.value = profileName.textContent
  profileEditForm.elements.description.value = profileDescription.textContent
  profileEditForm.addEventListener('submit', profileFormSubmit)
})

function profileFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = profileEditForm.elements.name.value
  profileDescription.textContent = profileEditForm.elements.description.value
  closeModal(profileEditModal)
}

newPlaceButton.addEventListener('click', () => {
  openModal(newPlaceModal)
  newPlaceForm.addEventListener('submit', newPlaceFormSubmit)
})

function newPlaceFormSubmit(evt) {
  evt.preventDefault()
  const newPlaceCard = {
    name: newPlaceName.value,
    link: newPlaceUrl.value,
  }
  initialCards.unshift(newPlaceCard)
  placesList.prepend(createCard(newPlaceCard, deleteCard, pressLike, zoomCard))
  newPlaceForm.reset()
  closeModal(newPlaceModal)
}

function zoomCard(event) {
  const currentCard = event.target.closest('.card')
  const imageModal = document.querySelector('.popup_type_image')
  imageModal.querySelector('.popup__image').src = currentCard.querySelector('.card__image').src
  imageModal.querySelector('.popup__caption').textContent = currentCard.querySelector('.card__title').textContent
  openModal(imageModal)
}

initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard, pressLike, zoomCard))
})