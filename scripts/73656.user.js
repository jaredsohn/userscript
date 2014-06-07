// ==UserScript==
// @name           Lockerz Form Filler
// @namespace      Adam Rock
// @include        *lockerz.com*
// ==/UserScript==


var fname = ""; // First Name
var lname = ""; // Last Name
var street = ""; // Your Street.
var city = ""; // Your City.
var state = ""; // Your State.
var zip = ""; // Zip Code.

if (location.href.indexOf("edelivery") > -1) {
    $$("fName").value = fname;
    $$("lname").value = lname;
    $$("street").value = street;
    $$("city").value = city;
    $$("state").value = state;
    $$("zipcode").value = zip;
}