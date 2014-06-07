// ==UserScript==
// @name          Tradera autologin
// @namespace     http://henrik.nyh.se
// @description   Logs in automatically to Tradera. Requirements: Firefox must have been told to remember your password. Firefox mustn't remember more than one password, since that will prevent it from pre-populating the form. You may remove remembered passwords in Firefox preferences > Security > Show Passwords.
// @include       http://www.tradera.com/*
// ==/UserScript==

var form     = document.getElementById('Form2');
if (!form) return;
var username = form.elements.namedItem('username');
var password = form.elements.namedItem('password');

if (username.value.length && password.value.length)
  form.submit();
