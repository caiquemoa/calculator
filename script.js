const calculatorBody = document.getElementsByClassName('calculator-body')[0]
createButtons()

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
		console.log(buttonList.length)
		button.textContent = item
		button.classList.add('btn')
		if (item === '0') button.classList.add('-zero')

		calculatorBody.appendChild(button)
	})
}
