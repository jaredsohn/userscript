// ==UserScript==
// @name         Keep PayPal Password
// @namespace    h00k
// @description  The simplest way to remember a PayPal password.
// @include      https://www.paypal.com/home
// @version      0.1
// ==/UserScript==

document.getElementById("login_password").setAttribute("autocomplete", "on");
