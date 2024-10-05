import { validationConfig } from './../index.js'

function enableValidation() {
  const formsList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`))
  formsList.forEach(formElement => {
    setEventListeners(formElement)
  })
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }    
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`))
  const buttonElement = formElement.querySelector(`${validationConfig.submitButtonSelector}`)
  toggleButtonState(inputList, buttonElement)

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`)
  } else {
    buttonElement.classList.remove(`${validationConfig.inactiveButtonClass}`)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid
  })
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
  inputElement.classList.add(`${validationConfig.inputErrorClass}`)
  errorElement.classList.add(`${validationConfig.errorClass}`)
  errorElement.textContent = errorMessage
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
  inputElement.classList.remove(`${validationConfig.inputErrorClass}`)
  errorElement.classList.remove(`${validationConfig.errorClass}`)
  errorElement.textContent = ''
}

function clearValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`${validationConfig.inputSelector}`))
  inputList.forEach(inputElement => {
    checkInputValidity(formElement, inputElement)
    hideInputError(formElement, inputElement)
  })
  toggleButtonState(inputList, formElement.querySelector('.popup__button'))
}

export {
  enableValidation,
  clearValidation,
  showInputError
}

