function enableValidation(validationConfig) {
  const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formsList.forEach(formElement => {
    setEventListeners(formElement, validationConfig)
  })
}

function checkInputValidity(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }    
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, validationConfig)

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    })
  })
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => {
    return !input.validity.valid
  })
}

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
  inputElement.classList.add(validationConfig.inputErrorClass)
  errorElement.classList.add(validationConfig.errorClass)
  errorElement.textContent = errorMessage
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
  inputElement.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass)
  errorElement.textContent = ''
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationConfig)
    inputElement.setCustomValidity('')
  })
  toggleButtonState(inputList, formElement.querySelector(validationConfig.submitButtonSelector), validationConfig)
}

export {
  enableValidation,
  clearValidation,
  showInputError
}

