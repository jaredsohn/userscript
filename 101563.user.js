// ==UserScript==
// @name           UBS contract number autocomplete
// @namespace      adrian@planetcoding.net
// @description    Removes the autocomplete=off flag from the contract number input field on the UBS ebanking login page
// @include        https://ebanking*.ubs.com/*
// ==/UserScript==

var elem = document.getElementById('AuthGetContractNrDialog_input_isiwebuserid');
if(elem) {
    elem.removeAttribute('autocomplete');
}
