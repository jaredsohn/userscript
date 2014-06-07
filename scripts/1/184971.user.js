// ==UserScript==
// @name        ReCAPTCHA Auto-Focus
// @namespace   *
// @description Auto-Focus on ReCAPTCHA input, if site contains captcha
// @include     *
// @version     1.1
// @grant       none
// ==/UserScript==

var cont = document.getElementById("recaptcha_response_field");
if(cont) cont.focus();