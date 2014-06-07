// ==UserScript==
// @name        GitHub bionaught
// @namespace   sfasfjiwenwoiwncacs
// @description Fills out GitHub username
// @include     https://github.com/login*
// @version     1
// @grant       none
// ==/UserScript==


document.getElementById('login_field').value = "bionaught";


// optional password filling and auto submit

// document.getElementById('password').value = "password";
// document.getElementById('login').getElementsByTagName('form')[0].submit();