import './pages/index.css'; 
import { initialCards,  createCard, deleteCard, pressLike } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';

const placesList = document.querySelector('.places__list')

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileEditButton = document.querySelector('.profile__edit-button')
const profileEditModal = document.querySelector('.popup_type_edit')
const profileEditForm = document.forms['edit-profile']

const newPlaceForm = document.forms['new-place']

initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard, pressLike))
})

profileEditButton.addEventListener('click', () => {
  openModal(profileEditModal)
  profileEditForm.elements.name.value = profileName.textContent
  profileEditForm.elements.description.value = profileDescription.textContent
  profileEditForm.addEventListener('submit', saveProfileData)
})

function saveProfileData(evt) {
  evt.preventDefault()
  profileName.textContent = profileEditForm.elements.name.value
  profileDescription.textContent = profileEditForm.elements.description.value
  closeModal(profileEditModal)
}
