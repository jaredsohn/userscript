// ==UserScript==
// @name        OU Login
// @namespace   http://userscripts.org/users/546307
// @description Auto login for the OU
// @include     https://msds.open.ac.uk/signon/SAMSDefault/SAMS001_Default.aspx*
// @version     1
// @grant       none
// ==/UserScript==


var login = document.Form1
login.username.value = ''
login.password.value = ''
login.submit()