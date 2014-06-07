// ==UserScript==
// @name           Mauro
// @namespace      Mauro
// @description      autofill
// @include        *ptzplace.lockerz.com*
// ==/UserScript==

var country = "Italy"; 
var countryCode = "IT";

var phoneOne = "";
var phoneTwo = "";
var phoneThree = "";
var phoneWhole = "00393487455954";

var firstName = "Mauro";
var lastName = "Romanella";

var address1 = "via cisterna 1";
var address2 = "";

var city = "Limatola";
var state = "BN";
var zip = "82030";

document.getElementById("state").value = state;
document.getElementById("statesClicker").getElementsByTagName("SPAN")[0].innerHTML = state;
document.getElementById("stateDetails").value = state;

document.getElementById("country").value = country;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = country;
document.getElementById("countryDetails").value = country;
window.location= "javascript: manipulateForm('"+countryCode+"');";

document.getElementById("phoneOne").value = phoneOne;
document.getElementById("phoneTwo").value = phoneTwo;
document.getElementById("phoneThree").value = phoneThree;
document.getElementById("phoneWhole").value = phoneWhole;

document.getElementById("firstName").value = firstName;
document.getElementById("lastName").value = lastName;

document.getElementById("address1").value = address1;
document.getElementById("address2").value = address2;

document.getElementById("city").value = city;
document.getElementById("state").value = state;
document.getElementById("zip").value = zip;

document.getElementById('recaptcha_response_field' ).focus();