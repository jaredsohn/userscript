// ==UserScript==
// @name           Itslearning
// @namespace      itslearning.com*
// @include        https://www.itslearning.com*
// @include        itslearning.com*
// ==/UserScript==

// ==UserScript==
// THIS SCRIPT HAVE BEEN COPIED AND EDITED. IT'S AN ORIGINAL SCRIPT FOR LECTIO.DK
// @name           Lectio Auto-Login
// @namespace      http://t-hawk.com
// @description    Allows auto-login on Lectio.dk
// @include        https://www.lectio.dk/lectio/*/login.aspx*
// @include        http://lectio.dk/lectio/*/login.aspx*
// @include        https://lectio.dk/lectio/*/login.aspx*
// ==/UserScript==

// Default variables
var userDiv = document.getElementById ('Login_username_input');
var passDiv = document.getElementById ('Login_password_input');
var button  = document.getElementById ('Login_loginbtn');

// Settings
function setUsername ()
{
    uname = prompt ("Please enter your username for itslearning.com", username);
    username = uname;
    GM_setValue ("username", username);
}

function setPassword ()
{
    passwd = prompt ("Please enter your password for itslearning.com", password);
    password = passwd;
    GM_setValue ("password", password);
}

var username = GM_getValue ("username", null);
if (username == null) { setUsername () }
var password = GM_getValue ("password", null);
if (password == null) { setPassword () }

GM_registerMenuCommand ("Change username", setUsername);
GM_registerMenuCommand ("Change password", setPassword);

// Enter username and password if not entered
if (userDiv.value.length == 0) { userDiv.value = username }
if (passDiv.value.length == 0) { passDiv.value = password }

// Login
button.click ();