describe('App page opens', () => {
	it('Opens the registration form', () => {
		cy.visit('/')
		cy.get('.btnMain').click()
		cy.get('#myForm').should('be.visible')
	})
	it('Registration form not visible without Sign up click', () => {
		cy.visit('/')
		cy.get('#myForm').should('not.be.visible')
	})
})
