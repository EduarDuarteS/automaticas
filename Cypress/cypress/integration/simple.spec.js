
// datos 
// eduardd e.duartes@uniandes.edu.co alamedida

context('Login Tests', () => {

    it('makes a wrong login attemp', () => {
        cy.visit('https://habitica.com/static/home')
        // cy.visit('https://habitica.com/login')

       
        cy.get('.login-button').click(), { responseTimeout: 15000 };

        /**
         * Se agrega un Wait para que cargue la pagina
         */
        cy.wait(1000);

        cy.get('#usernameInput').type('fake@email.com').should('have.value', 'fake@email.com');
        cy.get('#passwordInput').type('fake@email.com');

        cy.get('.btn-info[type="submit"]').click()

        cy.contains("dirección de correo electrónico o contraseña son incorrectos").should('be.visible')

      })
});

// Pruebe el comportamiento de la página cuando se trata de realizar un registro con datos de una cuenta ya existente

context('Register Test fail', () => {

    it('makes a wrong Register attemp', () => {
        cy.visit('https://habitica.com/static/home')
 
        
        //Se ingresa el usuario ya registrado
        cy.get('#usernameInput').type('eduardd').should('have.value', 'eduardd');
        //Se validad que se despliegue el mesaje de error por no ser un usuario disponible
        cy.get(".input-error").should('be.visible');
        //Se validad que el mensaje de error sea el indicado par ausuario ya escogido
        cy.get(".input-error").contains('Este nombre de usuario ya está cogido.');

        cy.get('.form-control[type="email"]').type('e.duartes@uniandes.edu.co').should('have.value', 'e.duartes@uniandes.edu.co');
        
        cy.get('[placeholder="Contraseña"]').type('12345678').should('have.value', '12345678');
        cy.get('[type="password"]').eq(1).type('12345678').should('have.value', '12345678'), { responseTimeout: 15000 };

        //Al tener un username no permitido (ya que este existe) el botón se encuentra desabilitado
        cy.get('.sign-up[type="submit"]').should('be.disabled')
        
        // cy.get('.sign-up[type="submit"]').click()
        
      })
});