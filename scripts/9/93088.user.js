// ==UserScript==
// @name	  T-Mobile password saver.
// @description   Allows Firefox's Password Manager to work on t-mobile.co.uk
// @version       0.1
// @author        Peter Oliver
// @namespace     http://www.mavit.org.uk/userscripts/
// @include       https://www.t-mobile.co.uk/service/your-account/mtm-user-login-dispatch/
// @include       https://www.t-mobile.co.uk/service/your-account/login/
// ==/UserScript==

document.getElementById('mtm-login').removeAttribute('autocomplete');
document.getElementById('username').removeAttribute('autocomplete');
document.getElementById('password').removeAttribute('autocomplete');
