// ==UserScript==
// @name           Redeem Quick
// @namespace      k0st4s
// @description      This baby will autofill the fields in the redeem page!
// @include        *k0st4s.org*
// @include        *ptzplace.lockerz.com*
// ==/UserScript==

var country = "Lithuania"; 
var countryCode = "LT";

var phoneOne = "";
var phoneTwo = "";
var phoneThree = "";
var phoneWhole = "";

var firstName = "Arnas";
var lastName = "vinckus";

var address1 = "Ramygalos 59-9";
var address2 = "";

var city = "Panevezys";
var state = "LT";
var zip = "3218";

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