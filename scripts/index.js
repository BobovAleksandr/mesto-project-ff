// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// DOM узлы
const placesList = document.querySelector('.places__list')

// Функция создания карточки
function createCard(card, deleteCard) {
  const currentCard = cardTemplate.querySelector('.card').cloneNode(true)
  currentCard.querySelector('.card__image').src = card.link
  currentCard.querySelector('.card__title').textContent = card.name
  currentCard.querySelector('.card__delete-button').addEventListener('click', deleteCard)
  return currentCard
}

// Функция удаления карточки
function deleteCard() {
  event.target.closest('.card').remove()
}

// Вывести карточки на страницу
initialCards.forEach(card => {
  placesList.append(createCard(card, deleteCard))
})
