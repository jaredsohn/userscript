// ==UserScript==
// @name           Lectio Auto-Login
// @namespace      http://t-hawk.com
// @description    Allows auto-login on Lectio.dk
// @include        https://www.lectio.dk/lectio/*/login.aspx*
// @include        http://lectio.dk/lectio/*/login.aspx*
// @include        https://lectio.dk/lectio/*/login.aspx*
// ==/UserScript==

// Default variables
var userDiv = document.getElementById ('_ctl0_Content_username2');
var passDiv = document.getElementById ('_ctl0_Content_password2');
var button  = document.getElementById ('_ctl0_Content_submitbtn');

// Settings
function setUsername ()
{
    uname = prompt ("Please enter your Lectio.dk username", username);
    username = uname;
    GM_setValue ("username", username);
}

function setPassword ()
{
    passwd = prompt ("Please enter your Lectio.dk password", password);
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