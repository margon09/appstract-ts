import axios from 'axios'

class Popup {
	private popupContainer: HTMLElement
	private user: any

	static CreateDivBox = document.createElement('div')

	constructor(id: string) {
		this.popupContainer = document.createElement('div')
		this.popupContainer.id = id
	}

	private createForm(method: string) {
		const form = document.createElement('form')
		form.method = method
		form.onsubmit = this.submitForm
		form.classList.add('Form')
		form.id = 'myForm'

		return form
	}

	private inputTextField(
		id: string,
		type: string,
		name: string,
		pattern: string,
		required: boolean,
		title: string,
		placeholder: string
	) {
		const input = document.createElement('input')
		input.classList.add(name)
		input.type = type
		input.name = name
		input.pattern = pattern
		input.title = title
		input.placeholder = placeholder
		input.required = required
		input.id = id
		return input
	}

	private selectInput() {
		const options = [
			'♀ Female',
			'♂ Male',
			'⚥ Non-binary',
			'Prefer not to answer'
		]
		const input = document.createElement('select')
		input.classList.add('gender')
		input.id = 'gender'
		input.name = 'gender'
		let option = document.createElement('option')
		option.value = ''
		option.text = 'Choose (optional)'
		option.selected = true
		option.disabled = true
		input.appendChild(option)

		for (let i = 0; i < options.length; i++) {
			let option = document.createElement('option')
			option.value = (i + 1).toString()
			option.text = options[i]
			input.appendChild(option)
		}
		return input
	}

	private checkboxInput() {
		const input = document.createElement('input')
		input.type = 'checkbox'
		input.id = 'checkbox1'
		input.name = 'checkbox1'
		return input
	}

	private label(lbl: string) {
		const label = document.createElement('label')
		label.innerText = lbl
		label.classList.add('labelForm')
		return label
	}

	private div() {
		return document.createElement('div')
	}

	private submitButton() {
		const btn = document.createElement('button')
		btn.type = 'submit'
		btn.classList.add('btnSubmit')
		btn.innerText = 'Submit'
		return btn
	}

	private backButton() {
		const btn = document.createElement('button')
		btn.classList.add('btnBack')
		btn.innerText = 'Back'
		btn.addEventListener('click', this.closeForm)
		return btn
	}

	private closeForm() {
		document.getElementById('popup')!.style.display = 'none'
		document.getElementById('mainBox')!.style.display = 'block'
		document.getElementById('title')!.style.display = 'block'
		document.getElementById('imgBanner')!.style.display = 'block'
		document.getElementById('main-title')!.innerText = ''
		document.getElementById('sub-title')!.innerText = ''
		document.getElementById('paragraph')!.innerText = ''
		document.getElementById('error')!.innerText = ''
	}

	private submitForm(e: any) {
		e.preventDefault()
		const data = new FormData(e.target)
		e.target.reset()
		const jsonObj = {
			name: data.get('name'),
			surname: data.get('surname'),
			phone: data.get('phone'),
			email: data.get('email'),
			gender: data.get('gender') == null ? null : Number(data.get('gender')),
			subscription: data.get('checkbox1') == null ? false : true
		}

		axios
			.post(`https://reqres.in/api/users`, jsonObj)
			.then(resp => {
				console.log(resp.data)
				document.getElementById('myForm')!.style.display = 'none'
				document.getElementById('mainBox')!.style.display = 'none'
				document.getElementById('title')!.style.display = 'none'
				document.getElementById('success-message')!.style.display = 'block'
				document.getElementById(
					'main-title'
				)!.innerText = `Congratulations, ${resp.data.name} ${resp.data.surname}`
				document.getElementById(
					'sub-title'
				)!.innerText = `You have successfully registered with email: ${resp.data.email}`
				document.getElementById(
					'paragraph'
				)!.innerText = `Your subscription to offers is ${
					resp.data.subscription ? 'ACTIVE' : 'INACTIVE'
				}`
			})

			.catch(error => {
				console.log(error)
				document.getElementById('myForm')!.style.display = 'none'
				document.getElementById('mainBox')!.style.display = 'none'
				document.getElementById('title')!.style.display = 'none'
				document.getElementById('success-message')!.style.display = 'block'
				document.getElementById('error')!.innerHTML =
					'Your registration has failed due to some technical problem! Please try again later or call customer support'
			})
	}

	render() {
		const form = this.createForm('POST')

		const outerDivName = this.div()
		const nameDiv = this.div()
		const labelName = this.label('Name:')
		const inputName = this.inputTextField(
			'name',
			'text',
			'name',
			'[a-zA-ZæÆøØåÅ]+',
			true,
			'Names should only contain letters. e.g. John',
			'Type your first name (required)'
		)
		labelName.appendChild(inputName)
		nameDiv.appendChild(labelName)
		nameDiv.classList.add('outerDiv')
		outerDivName.appendChild(nameDiv)
		outerDivName.classList.add('wrapperDiv')

		const outerDivSurname = this.div()
		const surnameDiv = this.div()
		const labelSurname = this.label('Last name:')
		const inputSurname = this.inputTextField(
			'surname',
			'text',
			'surname',
			'[a-zA-ZæÆøØåÅ]+',
			true,
			'Surnames should only contain letters. e.g. Walker',
			'Type your last name (required)'
		)
		labelSurname.appendChild(inputSurname)
		surnameDiv.appendChild(labelSurname)
		surnameDiv.classList.add('outerDiv')
		outerDivSurname.appendChild(surnameDiv)
		outerDivSurname.classList.add('wrapperDiv')

		const outerDivPhone = this.div()
		const phoneDiv = this.div()
		const labelPhone = this.label('Phone +45:')
		const inputPhone = this.inputTextField(
			'phone',
			'tel',
			'phone',
			'\\d{8}',
			false,
			'Use a valid Danish tel number e.g. 35 35 35 35 or 35353535',
			'Type your phone number (optional)'
		)
		labelPhone.appendChild(inputPhone)
		phoneDiv.appendChild(labelPhone)
		phoneDiv.classList.add('outerDiv')
		outerDivPhone.appendChild(phoneDiv)
		outerDivPhone.classList.add('wrapperDiv')

		const outerDivEmail = this.div()
		const emailDiv = this.div()
		const labelEmail = this.label('Email:')
		const inputEmail = this.inputTextField(
			'email',
			'email',
			'email',
			'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
			true,
			'Use a valid email address e.g. jack22@gmail.com',
			'Type your email number (required)'
		)
		labelEmail.appendChild(inputEmail)
		emailDiv.appendChild(labelEmail)
		emailDiv.classList.add('outerDiv')
		outerDivEmail.appendChild(emailDiv)
		outerDivEmail.classList.add('wrapperDiv')

		const outerDivGender = this.div()
		const genderDiv = this.div()
		const labelGender = this.label('Gender:')
		const selectList = this.selectInput()
		labelGender.appendChild(selectList)
		genderDiv.appendChild(labelGender)
		genderDiv.classList.add('outerDiv2')
		outerDivGender.appendChild(genderDiv)
		outerDivGender.classList.add('wrapperDiv')

		const divContainer = this.div()
		divContainer.classList.add('checkBoxDiv')
		const labelSubscription = this.label('Subscribe to offers:')
		const checkbox = this.checkboxInput()
		checkbox.classList.add('checkBox')
		labelSubscription.appendChild(checkbox)
		const submitBtn = this.submitButton()

		divContainer.append(labelSubscription, submitBtn)

		form.append(
			outerDivName,
			outerDivSurname,
			outerDivPhone,
			outerDivEmail,
			outerDivGender,
			divContainer
		)
		const backBtn = this.backButton()
		this.popupContainer.append(form, backBtn)

		return this.popupContainer
	}
}

export default Popup
