// ==UserScript==
// @name Teclado Bankia
// @namespace // @namespace http://userscripts.org/users/alvaromaceda
// @include https://*oi.bankia.es/*
// @version 1.0
// @grant none
// @author Alvaro Maceda
// @copyright 2013 Alvaro Maceda
// @license This work is public domain, free of known copyright restrictions
// @description Permite introducir las claves de la web de Bankia pulsando los números directamente, saltandose la protección del teclado virtual
// @downloadURL http://userscripts.org/scripts/source/186819.user.js
// @updateURL http://userscripts.org/scripts/source/186819.user.js
// ==/UserScript==


// ++++++ Elimina desde esta linea hasta la indicada mas abajo para activar el script +++++
alert( function(){/*
    Teclado Bankia
    ------------------------------

    ATENCION: Instalar este script es peligroso, ya que si tienes tu ordenador infectado por un keylogger podrían capturar tus contraseñas de Bankia.
    
    Si instalas este script sin saber lo que haces PODRIAS PERDER TODO TU DINERO.
    
    Si aún así deseas instalar el script, modifica el código del script y sigue las instrucciones escritas allí para activarlo.
*/}.toString().slice(14,-3) );
return;
// +++++ Elimina hasta esta linea desde la indicada mas arriba para activar el script +++++

// Finds password field.
function getPasswordField(){
	var campo;
	$$("label.forClave").each(
		function (c) {
			if (c.attributes["for"] && $(c.attributes["for"])) {
				campo = $(c.attributes["for"].value)
			}
		})
	return campo;
}

// Returns the number equivalent to a key event. Includes numbers and keypad.
// Returns -1 if keycode not corresponds to a number.
function numberFromKeycode(keycode) {
	// 48 to 57  -> numbers
	if ( keycode >= 48 && keycode <= 57 ) {
		return  keycode - 48;
	}
	// 96 to 105 -> keypad numbers
	if ( keycode >= 96 && keycode <= 105 ) {
		return keycode - 96;
	}
	// Not a number
	return -1;
}

// Event handler. This function does the work.
function translateNumbers(e){
	var number = numberFromKeycode(e.keyCode);
	if (number == -1) return;
	
	// We must search these objects here because, if we
    // do it earlier, they are not avaliable
    var security = OI.Security.Keyboard.keyboards[0];
        // Security keyboard object
    var keyboard = security.keyboardData;
        // Virtual keyboard data
        
    passwordField.value += keyboard.valueOfNumber(number);
	security.chequeaValor();
}

// Search for a password field every time a number is pressed.
// It could have been created dinamically, therefore it wouldn't had been installed when
// this script was loaded
function findDynamicallyCreatedPasswordField(e) {
    var number = numberFromKeycode(e.keyCode);
    if (number == -1) return;
    
    if(!passwordField) {
        // Do we have a password field now?
        passwordField = getPasswordField();
        if(!passwordField) return;
        
        // Remove document keyboard handler, it is not necessary anymore
        Event.stopObserving(document, "keyup", findDynamicallyCreatedPasswordField)
        
        // Install password field keyboard handler        
        Event.observe(passwordField, "keyup", translateNumbers);
        // Relaunch this event, or this first number would be lost
        translateNumbers(e)
    }
}

var passwordField = getPasswordField();

// If password field already exists...
if(passwordField) {
    // Add event handler to password field
    Event.observe(passwordField, "keyup", translateNumbers);
} else {
    // Add a document handler to search a password field every time a number is pressed
    Event.observe(document, "keyup", findDynamicallyCreatedPasswordField);
}
