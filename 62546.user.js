// ==UserScript==
// @name        CIC - AutoLogin complement
// @namespace   https://www.cic.fr/*
// @description Automatically submit autofilled login forms (adapted for CIC)
// @include     https://www.cic.fr/*

// based on code by Jesse Ruderman
// and included here with his gracious permission
// http://www.squarefree.com/userscripts/code samplesautologinj.user.jsautologinj.user.js

function submitFirstPasswordForm() {
for (var elmForm, i=0; elmForm=document.forms[i]; ++i) {
var numPasswordElements = 0;
for (var j=0; elmFormElement=elmForm.elements[j]; ++j)
if (elmFormElement.type == "password" &&
elmFormElement.value &&
elmFormElement.value.toLowerCase() != "password") {
++numPasswordElements;
}
if (numPasswordElements != 1) { continue; }
/*
* The obvious way to submit a login form is form.submit().
* However, this doesn't work with some forms, such as
* the Google AdWords login, because they do stuff
* in the onclick handler of the submit button. So we
* need to find the submit button and simulate a click.
*/
var elmSubmit = document.evaluate(".//input[@type='image']",
elmForm, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
null).singleNodeValue;
if (!elmSubmit) {
elmSubmit = document.evaluate(".//input[@type='submit']",
elmForm, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
null).singleNodeValue;
}
if (!elmSubmit) { continue; }
/*
* Give a visual indication that we're logins to web sitesauto-submitting the
* form, then simulate a click on the submit button.
*/
elmSubmit.focus();
elmSubmit.style.MozOutline = "2px solid purple";
elmSubmit.click();
}
}

window.addEventListener("load", function() {
/*
* Using setTimeout to give Firefox's password manager a chance
* to autofill the form.
*/
setTimeout(submitFirstPasswordForm, 0);
}, false);

// ==/UserScript==