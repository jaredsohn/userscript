// ==UserScript==
// @name        Autocomplete login
// @namespace   Autocomplete
// @description Enables the autocomplete in microsoftonline
// @include     https://*.microsoftonline.com/*
// @version     1
// @grant       none
// ==/UserScript==

if(document.getElementById("cred_userid_inputtext")){
    document.getElementById("cred_userid_inputtext").setAttribute('autocomplete', 'on');
}
if(document.getElementById("cred_password_inputtext")){
    document.getElementById("cred_password_inputtext").setAttribute('autocomplete', 'on');
}
