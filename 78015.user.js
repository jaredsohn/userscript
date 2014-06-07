// ==UserScript==
// @name           Redeem
// @description    autofill per mail, password e campi del redeem
// @include        *ptzplace.lockerz.com*
// @include        *italialockerz.altervista.org*
// ==/UserScript==

var mail = "tuamail"
var pass = "password"

var country = "Italy"; 
var countryCode = "IT";

var phoneWhole = "0039tuonumero";

var firstName = "nome";
var lastName = "cognome";

var address1 = "Via nomevia numero";

var city = "comune";
var state = "siglia provincia";
var zip = "CAP";

document.getElementById("e_11121").value = mail;
document.getElementById("p_11121").value = pass;
document.getElementById("state").value = state;
document.getElementById("statesClicker").getElementsByTagName("SPAN")[0].innerHTML = state;
document.getElementById("stateDetails").value = state;

document.getElementById("country").value = country;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = country;
document.getElementById("countryDetails").value = country;
window.location= "javascript: manipulateForm('"+countryCode+"');";

document.getElementById("_phoneWhole").value = phoneWhole;

document.getElementById("fn_11121").value = firstName;
document.getElementById("ln_11121").value = lastName;

document.getElementById("a1_11121").value = address1;

document.getElementById("cy_11121").value = city;
document.getElementById("s_11121").value = state;
document.getElementById("z_11121").value = zip;

document.getElementById('recaptcha_response_field' ).focus();