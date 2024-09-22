const cardTemplate = document.querySelector('#card-template').content

function createCard({newPlaceCard, deleteCard, pressLike, zoomCard}) {
  console.log(newPlaceCard) // undefined
  const currentCard = cardTemplate.querySelector('.card').cloneNode(true)
  currentCard.querySelector('.card__image').src = newPlaceCard.link
  currentCard.querySelector('.card__image').alt = newPlaceCard.name
  currentCard.querySelector('.card__title').textContent = newPlaceCard.name
  currentCard.querySelector('.card__delete-button').addEventListener('click', deleteCard)
  currentCard.querySelector('.card__like-button').addEventListener('click', pressLike)
  currentCard.querySelector('.card__image').addEventListener('click', () => {
    zoomCard(newPlaceCard.name, newPlaceCard.link)
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