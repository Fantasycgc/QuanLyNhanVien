export class Validation {
    isNumber(value, messageError, errorId) {
        const element = document.getElementById(errorId)
        const regex = /^[0-9]*$/
        if (regex.test(value)) {

            element.innerHTML = ''
            element.style.display = 'block'
            return true
        }
        element.innerHTML = messageError
        element.style.display = 'none'
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
}