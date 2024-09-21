function openModal(popup) {
  popup.classList.add('popup_is-opened')

  // TODO - Удаление обрабочитка на Esc
  document.addEventListener('keydown', evt => {
    if (popup.classList.contains('popup_is-opened') && evt.key === "Escape") {
      closeModal(popup)
    }
  })

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

export { openModal, closeModal }
