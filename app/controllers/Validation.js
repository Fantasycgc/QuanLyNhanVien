export class Validation {
    isNumber(value, messageError, errorId) {
        const element = document.getElementById(errorId)
        const regex = /^[0-9]*$/
        if (regex.test(value)) {

            element.innerHTML = ''
            element.style.display = 'none'
            return true
        }
        element.innerHTML = messageError
        element.style.display = 'block'
        return false
    }
    isCharacter(value, messageError, errorId) {
        const element = document.getElementById(errorId)
        const regex = /^[\p{L}\s]+$/u
        if (regex.test(value)) {

            element.innerHTML = ''
            element.style.display = 'none'
            return true
        }
        element.innerHTML = messageError
        element.style.display = 'block'
        return false
    }
    isPassword(value, messageError, errorId) {
        const element = document.getElementById(errorId)
        const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
        if (regex.test(value)) {

            element.innerHTML = ''
            element.style.display = 'none'
            return true
        }
        element.innerHTML = messageError
        element.style.display = 'block'
        return false
    }
    isDate(value, messageError, errorId) {

        const element = document.getElementById(errorId)
        const regex = /(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/((19|20)\d\d)/
        if (regex.test(value)) {

            element.innerHTML = ''
            element.style.display = 'none'
            return true
        }
        element.innerHTML = messageError
        element.style.display = 'block'
        return false
    }
    isEmail(value, messageError, errorId) {
        const element = document.getElementById(errorId)
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (regex.test(value)) {

            element.innerHTML = ''
            element.style.display = 'none'
            return true
        }
        element.innerHTML = messageError
        element.style.display = 'block'
        return false
    }
    betweenLength(value, minLength, maxLength, messageError, errorId) {

        const element = document.getElementById(errorId)
        if ((value.length > maxLength) || (value.length < minLength)) {

            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }
    betweenValue(value, minValue, maxValue, messageError, errorId) {

        const element = document.getElementById(errorId)
        if ((value > maxValue) || (value < minValue)) {

            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }
    maxLength(value, maxLength, messageError, errorId) {
        const element = document.getElementById(errorId)
        if ((value.length > maxLength)) {

            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }
    minLength(value, minLength, messageError, errorId) {
        const element = document.getElementById(errorId)
        if (value.length < minLength) {

            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.direction = 'none'
        return true
    }
    required(value, messageError, errorId) {
        const element = document.getElementById(errorId)
        // TH value rỗng
        if (value.trim() == '') {
            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }
    getElement(element) {
        return document.getElementById(element)
    }
    isCombobox(value, messageError, errorId) {
        const element = document.getElementById(errorId)
        // TH value rỗng
        if (value.trim() === 'Chọn chức vụ') {
            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }
}