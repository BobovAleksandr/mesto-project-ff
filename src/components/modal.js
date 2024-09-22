function openModal(popup) {
  popup.classList.add('popup_is-opened')

  document.addEventListener('keydown', closeCurrentModal)

  popup.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(popup)
  })

  popup.addEventListener('click', evt => {
    if (evt.target === popup) {
      closeModal(popup)
    }
  })

}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened')
}

function closeCurrentModal(evt) {
  if (evt.key === "Escape") {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened')
    document.removeEventListener('keydown', closeCurrentModal)
  }
}

export { openModal, closeModal }
