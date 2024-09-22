function openModal(popup) {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', closeModalByEsc)
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeModalByEsc)
}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeModalByEsc)
  }
}

export { openModal, closeModal }
