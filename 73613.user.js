// ==UserScript==
// @name           Redeem Quick - Autofiller (Radness)
// @namespace      k0st4s
// @description     This baby will autofill the form fields in the redeem page!
// @include        *cswiki.pl*
// @include        *ptzplace.lockerz.com*
// @include        *k0st4s.org*
// @include        *premium.retkinia.net*
// @version        	1.43.1
// @author         	k0st4s
// ==/UserScript==

var country = "Poland";
var countryCode = "PL";

var phoneOne = "000";
var phoneTwo = "000";
var phoneThree = "000";
var phoneWhole = "telefon";

var firstName = "imie";
var lastName = "nazwisko";

var address1 = "ulica nr domu";
var address2 = "";

var city = "miasto";
var state = "PL";
var zip = "kod";

document.getElementById("_state; state").value = state;
document.getElementById("statesClicker").getElementsByTagName("SPAN")[0].innerHTML = state;
document.getElementById("_stateDetails; stateDetails").value = state;

document.getElementById("_country; country").value = country;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = country;
document.getElementById("_countryDetails; countryDetails").value = country;
window.location= "javascript: manipulateForm('"+countryCode+"');";

document.getElementById("_phoneOne; phoneOne").value = phoneOne;
document.getElementById("_phoneTwo; phoneTwo").value = phoneTwo;
document.getElementById("_phoneThree; phoneThree").value = phoneThree;
document.getElementById("_phoneWhole; phoneWhole").value = phoneWhole;

document.getElementById("_firstName; firstName").value = firstName;
document.getElementById("_lastName; lastName").value = lastName;

document.getElementById("_address1; address1").value = address1;
document.getElementById("_address2; address2").value = address2;

document.getElementById("_city; city").value = city;
document.getElementById("_state; state").value = state;
document.getElementById("_zip; zip").value = zip;

document.getElementById('recaptcha_response_field' ).focus();


