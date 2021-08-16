import MainPage from '.'

class MainBox {
	private container: HTMLElement

	static TextObject = {
		MainTitle: 'Sign up for the newsletter service',
		SubTitle: 'Everyday source of special offers'
	}

	constructor(id: string) {
		this.container = document.createElement('div')
		this.container.id = id
	}

	private createHeaderTitle(text: string) {
		const headerTitle = document.createElement('h2')
		headerTitle.innerText = text

		return headerTitle
	}

	private createSubTitle(text: string) {
		const subTitle = document.createElement('p')
		subTitle.innerText = text

		return subTitle
	}

	private createSignUpButton() {
		const btn = document.createElement('button')
		btn.innerHTML = 'Sign Up'
		btn.classList.add('btnMain')
		btn.addEventListener('click', MainPage.btnOnClick)
		return btn
	}

	render() {
		const title = this.createHeaderTitle(MainBox.TextObject.MainTitle)
		this.container.append(title)

		const subtitle = this.createSubTitle(MainBox.TextObject.SubTitle)
		this.container.append(subtitle)

		const signUpBtn = this.createSignUpButton()
		this.container.append(signUpBtn)

		return this.container
	}
}

export default MainBox
