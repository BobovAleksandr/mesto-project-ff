import './pages/index.css'; 
import { createCard, deleteCard, pressLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, postNewCard, removeCard, getUserInfo, updateUserInfo, updateUserAvatar } from './components/api.js';

const placesList = document.querySelector('.places__list')

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')
const profileAvatarModal = document.querySelector('.popup_type_new_avatar')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditModal = document.querySelector('.popup_type_edit')
const profileEditForm = document.forms['edit-profile']
const profileAvatarForm = document.forms['new-avatar']
const profileAvatarInput = profileAvatarForm.elements['link']

const newPlaceModal = document.querySelector('.popup_type_new-card')
const newPlaceButton = document.querySelector('.profile__add-button')
const newPlaceForm = document.forms['new-place']
const newPlaceNameInput = newPlaceForm.elements['place-name']
const newPlaceUrlInput = newPlaceForm.elements['link']

const imageModal = document.querySelector('.popup_type_image')
const imageModalPicture = imageModal.querySelector('.popup__image')
const imageModalCaption = imageModal.querySelector('.popup__caption')

const modals = document.querySelectorAll('.popup')

let user

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function profileFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = profileEditForm.elements.name.value
  profileDescription.textContent = profileEditForm.elements.description.value
  closeModal(profileEditModal)
  updateUserInfo(profileName.textContent, profileDescription.textContent)
}

function newPlaceFormSubmit(evt) {
  evt.preventDefault()
  const newPlaceCard = {
    name: newPlaceNameInput.value,
    link: newPlaceUrlInput.value,
  }
  postNewCard(newPlaceCard).then(newPlaceCard => {
    placesList.prepend(createCard({newPlaceCard, deleteCard, pressLike, zoomCard, user}))
  })
  newPlaceForm.reset()
  closeModal(newPlaceModal)
}

function profileAvatarFormSubmit(evt) {
  evt.preventDefault()
  const newAvatarUrl = profileAvatarInput.value
  profileAvatar.style = `background-image: url('${newAvatarUrl}');`
  clearValidation(profileAvatarForm)
  closeModal(profileAvatarModal)
  profileAvatarForm.reset()
  updateUserAvatar(newAvatarUrl)
}

function zoomCard(cardName, cardUrl) {
  imageModalPicture.src = cardUrl
  imageModalPicture.alt = cardName
  imageModalCaption.textContent = cardName
  openModal(imageModal)
}

profileEditButton.addEventListener('click', () => {
  openModal(profileEditModal)
  profileEditForm.elements.name.value = profileName.textContent
  profileEditForm.elements.description.value = profileDescription.textContent
  clearValidation(profileEditForm)
})

profileAvatar.addEventListener('click', () => {
  openModal(profileAvatarModal)
})

newPlaceButton.addEventListener('click', () => {
  openModal(newPlaceModal)
  newPlaceForm.reset()
  clearValidation(newPlaceForm)
})

newPlaceForm.addEventListener('submit', newPlaceFormSubmit)

profileEditForm.addEventListener('submit', profileFormSubmit)

profileAvatarForm.addEventListener('submit', profileAvatarFormSubmit)

modals.forEach(modal => {
  modal.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(modal)
  })
  modal.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closeModal(modal)
    }
  })
})

enableValidation(); 

Promise.all([getInitialCards(), getUserInfo()])
  .then(([resCards, resUser]) => {
    profileName.textContent = resUser.name
    profileDescription.textContent = resUser.about
    profileAvatar.style = `background-image: url('${resUser.avatar}');`
    user = resUser
    resCards.forEach(newPlaceCard => {
      placesList.append(createCard({newPlaceCard, deleteCard, pressLike, zoomCard, user}))
    })
  })

export { validationConfig } 

