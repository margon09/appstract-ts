class Response {
	private container: HTMLElement

	constructor(id: string) {
		this.container = document.createElement('div')
		this.container.id = id
	}

	private backButton() {
		const btn = document.createElement('button')
		btn.classList.add('btnClose')
		btn.id = 'btnBack'
		btn.innerText = 'Close'
		btn.onclick = this.closeForm
		return btn
	}

	private closeForm() {
		document.getElementById('success-message')!.style.display = 'none'
		document.getElementById('popup')!.style.display = 'none'
		document.getElementById('imgBanner')!.style.display = 'block'
		document.getElementById('mainBox')!.style.display = 'block'
		document.getElementById('title')!.style.display = 'block'
	}

	private createHeaderTitle() {
		const MainTitle = document.createElement('h1')
		MainTitle.id = 'main-title'

		return MainTitle
	}

	private createSubTitle() {
		const SubTitle = document.createElement('h2')
		SubTitle.id = 'sub-title'

		return SubTitle
	}

	private createParagraph() {
		const Paragraph = document.createElement('p')
		Paragraph.id = 'paragraph'

		return Paragraph
	}

	private createError() {
		const Error = document.createElement('h1')
		Error.id = 'error'
		return Error
	}

	render() {
		const title = this.createHeaderTitle()
		this.container.append(title)

		const subtitle = this.createSubTitle()
		this.container.append(subtitle)

		const paragraph = this.createParagraph()
		this.container.append(paragraph)

		const backBtn = this.backButton()
		this.container.append(backBtn)

		const error = this.createError()
		this.container.append(error)

		return this.container
	}
}

export default Response
