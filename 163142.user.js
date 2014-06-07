// ==UserScript==
// @name           Enable password-manager autocomplete for Salesforce login
// @include        https://login.salesforce.com/*
// @run-at         document-start
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(e)
    {
    document.getElementById('username').removeAttribute('value');
    document.getElementById('password').removeAttribute('autocomplete');
    }, true);

