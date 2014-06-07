// ==UserScript==
// @name           Redeem Quick - Autofiller (Radness)
// @namespace      k0st4s
// @description     This baby will autofill the form fields in the redeem page!
// @include        *cswiki.pl*
// @include        *ptzplace.lockerz.com*
// @include        *k0st4s.org*
// @include        *premium.retkinia.net*
// @version        1.43.1
// @author         k0st4s
// ==/UserScript==

var country = "Poland";
var countryCode = "PL";

var phoneOne = "000";
var phoneTwo = "000";
var phoneThree = "000";
var phoneWhole = "0048504806153";

var firstName = "Mikolaj";
var lastName = "Kozlowski";

var address1 = "Migdalowa 30";
var address2 = "";

var city = "Torun";
var state = "PL";
var zip = "87100";

document.getElementById("_state").value = state;
document.getElementById("statesClicker").getElementsByTagName("SPAN")[0].innerHTML = state;
document.getElementById("_stateDetails").value = state;

document.getElementById("_country").value = country;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = country;
document.getElementById("_countryDetails").value = country;
window.location= "javascript: manipulateForm('"+countryCode+"');";

document.getElementById("_phoneOne").value = phoneOne;
document.getElementById("_phoneTwo").value = phoneTwo;
document.getElementById("_phoneThree").value = phoneThree;
document.getElementById("_phoneWhole").value = phoneWhole;

document.getElementById("_firstName").value = firstName;
document.getElementById("_lastName").value = lastName;

document.getElementById("_address1").value = address1;
document.getElementById("_address2").value = address2;

document.getElementById("_city").value = city;
document.getElementById("_state").value = state;
document.getElementById("_zip").value = zip;

document.getElementById('recaptcha_response_field' ).focus();
