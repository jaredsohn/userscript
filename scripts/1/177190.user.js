// ==UserScript==
// @name        CapitalOne No Urchin
// @namespace   GrailsGuy
// @include     *capitalone360.com/myaccount/banking/login_pinpad.vm*
// @version     1
// ==/UserScript==
document.getElementById('continueButton').setAttribute('onclick', 'submitForm()');

console.log('Updated continue button to remove urchin call');