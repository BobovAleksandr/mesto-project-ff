function enableValidation(params) {
  const formsList = Array.from(document.querySelectorAll(`${params.formSelector}`))

  formsList.forEach(formElement => {
    setEventListeners(formElement)
  })

  function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity("")
    }    
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${params.inputSelector}`))
    const buttonElement = formElement.querySelector(`${params.submitButtonSelector}`)
    toggleButtonState(inputList, buttonElement)

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      })
    })
  }

  // TODO - Кнопка сохранить должна быть активна при открытии модального окна профиля
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${params.inactiveButtonClass}`)
    } else {
      buttonElement.classList.remove(`${params.inactiveButtonClass}`)
    }
  }

  function hasInvalidInput(inputList) {
    return inputList.some(input => {
      return !input.validity.valid
    })
  }

  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
    inputElement.classList.add(`${params.inputErrorClass}`)
    errorElement.classList.add(`${params.errorClass}`)
    errorElement.textContent = errorMessage
  }
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
    inputElement.classList.remove(`${params.inputErrorClass}`)
    errorElement.classList.remove(`${params.errorClass}`)
    errorElement.textContent = ''
  }
}

// TODO - сделать DRY, нужен вызов hideInputError
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`))
  inputList.forEach(inputElement => {
    inputElement.classList.remove(`${validationConfig.inputErrorClass}`)
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
    errorElement.classList.remove(`${validationConfig.errorClass}`)
    errorElement.textContent = ''
  })
}

export {
  enableValidation,
  clearValidation
}

