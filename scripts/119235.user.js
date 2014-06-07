// ==UserScript==
// @name           O2 password saver
// @namespace      http://www.mavit.org.uk/userscripts/
// @description    Allows Firefox's Password Manager to work on o2.co.uk
// @include        https://www.o2.co.uk/login
// @version        0.1
// @author         Peter Oliver
// ==/UserScript==

document.getElementById('user_name').removeAttribute('autocomplete');
document.getElementById('user_password').removeAttribute('autocomplete');
