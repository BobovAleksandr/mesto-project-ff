const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content

function createCard(card, remove, like, zoomCard) {
  const currentCard = cardTemplate.querySelector('.card').cloneNode(true)
  currentCard.querySelector('.card__image').src = card.link
  currentCard.querySelector('.card__title').textContent = card.name
  currentCard.querySelector('.card__delete-button').addEventListener('click', remove)
  currentCard.querySelector('.card__like-button').addEventListener('click', like)
  currentCard.querySelector('.card__image').addEventListener('click', zoomCard)
  return currentCard
}

function deleteCard(event) {
  event.target.closest('.card').remove()
}

function pressLike(event) {
  event.target.classList.toggle('card__like-button_is-active')
}

export {
  initialCards,
  createCard,
  deleteCard,
  pressLike,
}