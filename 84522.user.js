// ==UserScript==
// @name           TEC Web Authentication
// @namespace      TEC
// @description    Automatisk login til TEC
// @include        *hotspot.tec.dk*
// ==/UserScript==
var body = document.getElementsByTagName('body')[0];
var userDiv = document.getElementsByName('username')[0];
var passDiv = document.getElementsByName('password')[0];
var button = document.getElementsByName('Submit')[0];


// Settings
function setUsername ()
{
    uname = prompt ("Username:", username);
    username = uname;
    GM_setValue ("username", username);
}

function setPassword ()
{
    passwd = prompt ("Password:", password);
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