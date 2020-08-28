
// datos 
// eduardd e.duartes@uniandes.edu.co alamedida
// 1. Cree una cuenta manualmente y pruebe automatizadamente el login correcto
context('Login Tests Sucess', () => {

  it('makes a wrong login attemp', () => {
    cy.visit('https://habitica.com/static/home')

    cy.get('.login-button').click(), { responseTimeout: 15000 };

    // * Se agrega un Wait para que cargue la pagina
    cy.wait(1000);

    cy.get('#usernameInput').type('eduardd').should('have.value', 'eduardd');
    cy.get('#passwordInput').type('alamedida');

    cy.get('.btn-info[type="submit"]').click()
    // Se revisa que no presente mesaje de error al hacer login
    // cy.contains("dirección de correo electrónico o contraseña son incorrectos").should('be.visible')

    // Se valida que Se realice el login y muestre el usuario correcto
    cy.wait(3000);
    cy.get('h3>span').contains('eduardd').should('have.value', "");
    // cy.contains("eduardd").should('be.visible')
    cy.get('span.mr-1').contains('@eduardd').should('have.value', "");

  })
});


// datos 
// eduardd e.duartes@uniandes.edu.co alamedida
// 2. Pruebe el comportamiento de la página cuando se trata de realizar un registro con datos de una cuenta ya existente. 
// Use los datos de la cuenta que creo en el punto anterior.
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

  });
})

// 3. Visite la página de desafios y cree un desafio público.
context('Create Desafio public ok', () => {

  it('create desafio pulic OK', () => {

    //1. Realizamos login
    cy.visit('https://habitica.com/static/home')
    cy.get('.login-button').click(), { responseTimeout: 15000 };

    // * Se agrega un Wait para que cargue la pagina
    cy.wait(1000);
    cy.get('#usernameInput').type('eduardd').should('have.value', 'eduardd');
    cy.get('#passwordInput').type('alamedida');
    cy.get('.btn-info[type="submit"]').click()

    //2. Se valida que Se realice el login y muestre el usuario correcto
    cy.wait(3000);
    cy.get('h3>span').contains('eduardd').should('have.value', "");
    cy.get('span.mr-1').contains('@eduardd').should('have.value', "");

    //3. ir a Desafios>Mis Desafios>Crear Desafio  
    cy.get('.topbar-item').eq(6).click();
    cy.get('a[href="/challenges/myChallenges"]').eq(0).click();
    cy.get('.create-challenge-button').click()

    // Se llena el formulario con los datos del desafio
    cy.wait(3000);
    cy.get('.form-group>input.form-control').eq(1).type("Automatizar Pruebas").should("have.value", "Automatizar Pruebas");
    cy.get('.form-group>input.form-control').eq(2).type("Automatizar").should("have.value", "Automatizar");
    cy.get('.summary-textarea').type("Vamos todos a trabajar en la automatización de pruebas de habitica").should('have.value', "Vamos todos a trabajar en la automatización de pruebas de habitica");
    cy.get('.description-textarea').type("Se va a utilizar Cypress para automatizar las pruebas de habitica").should('have.value', "Se va a utilizar Cypress para automatizar las pruebas de habitica");
    cy.get('select').select('Desafíos públicos');
    cy.get('.category-select').click();
    cy.wait(3000);
    cy.get('#challenge-modal-cat-academics').check();
    cy.get('.btn-primary').eq(3).click();

  })
});


// 4. Realice una prueba de Creación de un hábito
context('Create Desafio habito ok', () => {

  it('crear habito pulic OK', () => {

    //1. Realizamos login
    cy.visit('https://habitica.com/static/home')
    cy.get('.login-button').click(), { responseTimeout: 15000 };

    // * Se agrega un Wait para que cargue la pagina
    cy.wait(1000);
    cy.get('#usernameInput').type('eduardd').should('have.value', 'eduardd');
    cy.get('#passwordInput').type('alamedida');
    cy.get('.btn-info[type="submit"]').click()

    //2. Se valida que Se realice el login y muestre el usuario correcto
    cy.wait(3000);
    cy.get('h3>span').contains('eduardd').should('have.value', "");
    cy.get('span.mr-1').contains('@eduardd').should('have.value', "");

    //3. ir a Añadir tarea>Hábito
    cy.get('#create-task-btn').click();
    // cy.get('.create-task-btn').eq(1).click(); Crear tarea diaria
    cy.get('.create-task-btn').eq(0).click();


    // 4. llenar el formulario de hábito
    var random = userID_Alpha();
    cy.get('.task-purple-modal-input').eq(0).type("habito_" + random).should("have.value", "habito_" + random);
    cy.get('.task-purple-modal-input').eq(1).type("tomar el hábito de hacer testing")
      .should("have.value", "tomar el hábito de hacer testing");
    cy.get('.btn-footer').click();

    // 5. Validar que se cree el hábito 
    cy.get('p').contains("habito_" + random).should("have.value", "");

  })
});






// Login fallido
context('Login Tests Fail', () => {

  it('makes a wrong login attemp', () => {
    cy.visit('https://habitica.com/static/home')

    cy.get('.login-button').click(), { responseTimeout: 15000 };

    //  * Se agrega un Wait para que cargue la pagina
    cy.wait(1000);

    cy.get('#usernameInput').type('fake@email.com').should('have.value', 'fake@email.com');
    cy.get('#passwordInput').type('fake@email.com');

    cy.get('.btn-info[type="submit"]').click()

    cy.contains("dirección de correo electrónico o contraseña son incorrectos").should('be.visible')

  })
});

// 5. Realice una prueba de Creación de una tarea diaria
context('Create task day ok', () => {

  it('crear tarea diaria OK', () => {

    //1. Realizamos login
    cy.visit('https://habitica.com/static/home')
    cy.get('.login-button').click(), { responseTimeout: 15000 };

    // * Se agrega un Wait para que cargue la pagina
    cy.wait(1000);
    cy.get('#usernameInput').type('eduardd').should('have.value', 'eduardd');
    cy.get('#passwordInput').type('alamedida');
    cy.get('.btn-info[type="submit"]').click()

    //2. Se valida que Se realice el login y muestre el usuario correcto
    cy.wait(3000);
    cy.get('h3>span').contains('eduardd').should('have.value', "");
    cy.get('span.mr-1').contains('@eduardd').should('have.value', "");

    //3. ir a Añadir Crear tarea diaria
    cy.get('#create-task-btn').click();
    cy.get('.create-task-btn').eq(1).click();


    // 4. llenar el formulario de hábito
    var random = userID_Alpha();
    cy.get('.task-purple-modal-input').eq(0).type("task_" + random).should("have.value", "task_" + random);
    cy.get('.task-purple-modal-input').eq(1).type("tarea diaria de pruebas automaticas")
      .should("have.value", "tarea diaria de pruebas automaticas");
    cy.get('.btn-footer').click();

    // 5. Validar que se cree el hábito 
    cy.get('p').contains("task_" + random).should("have.value", "");

  })
});


//Crear texto random
function userID_Alpha() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}