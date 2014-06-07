// ==UserScript==
// @name           Fronter login
// @version        1.1
// @description    Skriver login for dig
// @include        https://fronter.com/eal/
// @include        https://fronter.com/eal/index.phtml
// ==/UserScript==

//Remember to fill out these fields
document.getElementById('username_input').value = "";
document.getElementsByName("password")[0].value = ""; 

//login
document.getElementById('login_button').click();

