// ==UserScript==
// @name       ExpressoPass
// @namespace  http://userscripts.org/users/tevaum
// @version    0.1
// @description  Gerador de Senha Segura para Criação de Usuário no ExpressoLivre
// @match      http://*/index.php?menuaction=expressoAdmin1_2.uiaccounts.add_users
// @match      https://*/index.php?menuaction=expressoAdmin1_2.uiaccounts.add_users
// @match      http://*/index.php?menuaction=expressoAdmin1_2.uiaccounts.edit_user&account_id=*
// @match      https://*/index.php?menuaction=expressoAdmin1_2.uiaccounts.edit_user&account_id=*
// @copyright  2013+, Estêvão Samuel Procópio Amaral
// ==/UserScript==


function getRandomNum (lbound, ubound) {
    return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
}

function getRandomChar (number, lower, upper, other, extra) {
    var numberChars = "0123456789";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var otherChars = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ";
    
    var charSet = extra;
    
    if (number == true)
	charSet += numberChars;
    if (lower == true)
	charSet += lowerChars;
    if (upper == true)
	charSet += upperChars;
    if (other == true)
	charSet += otherChars;

    return charSet.charAt (getRandomNum (0, charSet.length));
}

function getPassword(length, extraChars, firstNumber, firstLower, firstUpper, firstOther, latterNumber, latterLower, latterUpper, latterOther) {
    var rc = "";

    if (length > 0)
	rc = rc + getRandomChar (firstNumber, firstLower, firstUpper, firstOther, extraChars);
    for (var idx = 1; idx < length; ++idx) {
	rc = rc + getRandomChar (latterNumber, latterLower, latterUpper, latterOther, extraChars);
    }
    return rc;
}

function findInput (name) {
    var inputs = document.getElementsByTagName ('input');
    for (var i=0; i<inputs.length; i++) {
        input = inputs[i];
        if (input.name == name)
            return input;
    }
}

function PasswordButton_Click () {
    var pass = getPassword (8, false, true, true, true, false, true, true, true, false);
    
    var pw = findInput ('password1');
    pw.value = pass;
    
    var pw = findInput ('password2');
    pw.value = pass;
    
    alert ('A senha gerada foi: ' + pass);
    return false;
}

function PasswordButton () {
    var button = document.createElement ('button');
    button.innerHTML = "Gerar Senha";
    button.onclick = PasswordButton_Click;
    
    return button;
}

var input = findInput ('password1');
var container = input.parentNode;
container.appendChild (PasswordButton ());
