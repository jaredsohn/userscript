// ==UserScript==
// @name            Semicolon to Comma
// @include         https://vandalweb.uidaho.edu/*
// @grant           none
// ==/UserScript==


var textarea = document.getElementsByName('email_in')[0];
emailList = textarea.value;
textarea.value = emailList.replace(/;/g,',');


