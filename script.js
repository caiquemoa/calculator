const calculatorBody = document.getElementsByClassName('calculator-body')[0]
const display = document.getElementsByClassName('display')[0]
createButtons()

const operationList = []
let nextOperator = ''

display.textContent = '0'

function createButtons() {
	const buttonList = [
		'AC',
		'+/-',
		'%',
		'/',
		'7',
		'8',
		'9',
		'*',
		'4',
		'5',
		'6',
		'-',
		'1',
		'2',
		'3',
		'+',
		'0',
		'.',
		'=',
	]
	buttonList.forEach((item) => {
		const button = document.createElement('div')
		button.textContent = item
		button.classList.add('btn')
		button.id = item
		if (parseInt(item) >= 0) {
			button.addEventListener('click', showInDisplay)
		}
		if (item === '0') button.classList.add('-zero')

		calculatorBody.appendChild(button)
	})
}

function showInDisplay() {
	if (!operationList[0] && nextOperator === '-') {
		display.textContent = Number(this.textContent) * -1
		operationList[0] = Number(display.textContent)
		return
	}

	if (
		!operationList[0] &&
		display.textContent === '0' &&
		!display.textContent.includes('.')
	) {
		display.textContent = this.textContent
		operationList[0] = Number(display.textContent)
		return
	}
	if (operationList[0] && operationList[1] && !operationList[2]) {
		if (display.textContent.includes('.') && operationList[2] >= 0) {
			display.textContent += this.textContent
			operationList[2] = Number(display.textContent)
			return
		}
		display.textContent = this.textContent
		operationList[2] = Number(display.textContent)
		return
	}

	if (!operationList[1]) {
		display.textContent += this.textContent
		operationList[0] = Number(display.textContent)
	} else if (operationList[0] && operationList[1] && operationList[2]) {
		display.textContent += this.textContent
		operationList[2] = Number(display.textContent)
	}
}

function operation(operator) {
	if (!operationList[0] && operator === '-') return (nextOperator = operator)
	else if (!operationList[0]) nextOperator = ''
	if (operationList[0]) nextOperator = operator
	if (operationList[0] && !operationList[2]) {
		operationList[1] = operator
		display.textContent = operator
	}
	if (operationList.length === 3)
		return (display.textContent = operate(operationList))
}

function operate(operationItemsList) {
	const [firstNumber, operator, secondNumber] = operationItemsList

	let result = 0
	switch (operator) {
		case '+':
			result = firstNumber + secondNumber
			break
		case '-':
			result = firstNumber - secondNumber
			break
		case '/':
			result = firstNumber / secondNumber
			break
		case '*':
			result = firstNumber * secondNumber
			break
		case '%':
			result = (secondNumber * firstNumber) / 100
	}
	operationItemsList.length = 0
	operationItemsList[0] = result
	if (nextOperator) operationItemsList[1] = nextOperator
	return result % 1 === 0 ? result : result.toFixed(1)
}
function clearAll() {
	display.textContent = '0'
	nextOperator = ''
	operationList.length = 0
}

const clearDisplay = document.getElementById('AC')

clearDisplay.addEventListener('click', () => {
	clearAll()
})

const invertSignal = document.getElementById('+/-')

invertSignal.addEventListener('click', () => {
	display.textContent = Number(display.textContent) * -1
	if (operationList[0] && !operationList[2])
		operationList[0] = Number(display.textContent)
	else if (operationList[2]) operationList[2] = Number(display.textContent)
})

const division = document.getElementById('/')

division.addEventListener('click', () => {
	operation('/')
})

const multiply = document.getElementById('*')

multiply.addEventListener('click', () => {
	operation('*')
})

const subtract = document.getElementById('-')

subtract.addEventListener('click', () => {
	operation('-')
})

const add = document.getElementById('+')

add.addEventListener('click', () => {
	operation('+')
})

const equal = document.getElementById('=')

equal.addEventListener('click', () => {
	if (operationList.length === 3) {
		const result = operate(operationList)
		display.textContent = result
		operationList.length = 1
	}
})

const decimalDot = document.getElementById('.')

decimalDot.addEventListener('click', () => {
	if (!display.textContent.includes('.')) {
		display.textContent += '.'
	}
})

const percentage = document.getElementById('%')

percentage.addEventListener('click', () => {
	if (operationList.length === 3 && operationList[1] !== '%') {
		const percent = (operationList[0] * operationList[2]) / 100
		operationList[2] = percent
		operation(operationList[1])
		return
	}
	operation('%')
})
