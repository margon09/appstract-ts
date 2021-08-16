import MainBox from './mainBox'
import Popup from '../../components/popup'
import Response from '../../components/popup/response'

class MainPage {
	private container: HTMLElement

	static bannerPath2: string =
		'https://raw.githubusercontent.com/margon09/appstract-react/main/src/containers/mainPage/img/banner2.png'

	private mainBox!: MainBox

	static TextObject = {
		MainTitle: 'Welcome to the discount offer finder app'
	}

	constructor(id: string) {
		this.container = document.createElement('div')
		this.container.id = id

		this.mainBox = new MainBox('mainBox')
	}

	private createHeaderTitle(text: string) {
		const headerTitle = document.createElement('h1')
		headerTitle.innerText = text
		headerTitle.id = 'title'

		return headerTitle
	}

	private createBanner() {
		const img = document.createElement('img')
		img.src = MainPage.bannerPath2
		img.classList.add('banner')
		img.id = 'imgBanner'
		return img
	}

	static btnOnClick() {
		document.getElementById('popup')!.style.display = 'block'
		document.getElementById('myForm')!.style.display = 'block'
		document.getElementById('mainBox')!.style.display = 'none'
		document.getElementById('title')!.style.display = 'none'
		document.getElementById('imgBanner')!.style.display = 'none'
	}

	render() {
		const image = this.createBanner()
		this.container.append(image)

		const title = this.createHeaderTitle(MainPage.TextObject.MainTitle)
		this.container.append(title)

		const mainBoxWrapper = this.mainBox.render()
		this.container.append(mainBoxWrapper)

		const popup = new Popup('popup').render()
		popup.style.display = 'none'
		this.container.append(popup)

		const response = new Response('success-message').render()
		response.style.display = 'none'
		this.container.append(response)

		return this.container
	}
}

export default MainPage
