// ==UserScript==
// @name           CHEX auto login
// @namespace      http://userscripts.org/users/83810
// @description    script page: http://userscripts.org/scripts/show/75381
// @description    This script was based on the Itslearning script found here:
// @description    http://userscripts.org/scripts/show/33450
// @description    This script allows you to auto-login to CHEX. 
// @include        http://chex.omnisocialpc.mzinga.com/*
// @include        http://chextest.omnisocialpc.mzinga.com/*
// ==/UserScript==

// Functions
function setUsername ()
{
    var lastusername = GM_getValue ("username", null);
	newusername = prompt ("Please enter your USERNAME for CHEX.", lastusername);
    username = newusername;
    GM_setValue ("username", username);
}

function setPassword ()
{
    var lastpassword = GM_getValue ("password", null);
	newpassword = prompt ("Please enter your PASSWORD for CHEX.", "");
    password = newpassword;
    GM_setValue ("password", password);
}

GM_registerMenuCommand ("Change stored CHEX username", setUsername);
GM_registerMenuCommand ("Change stored CHEX password", setPassword);

// Default variables
// Get the username that is already entered on the page if there is one
var userDiv = document.getElementById ('s_username');
// Get the password that is already entered on the page if there is one
var passDiv = document.getElementById ('s_password');
// Find the Login button and assign it to a variable
var button  = document.getElementsByTagName ('button').item(0);
// Set the exact pages where login to CHEX occurs
var CHEXSignOnPage = "http://chex.omnisocialpc.mzinga.com/app/signon/";
var CHEXTestSignOnPage = "http://chextest.omnisocialpc.mzinga.com/app/signon/";
// Settings
var currentURL = document.URL;

// Make sure we are on a login page and there isn't a login error
if  ((currentURL == CHEXSignOnPage) || (currentURL == CHEXTestSignOnPage)) 
   {
    // Check to see if there is an error message displaying on the page
    var errorPresent = document.getElementById ('errorMessageText');
	var errorMessage = "";
	if (errorPresent) {errorMessage = errorPresent.innerHTML;}
	// alert ("["+errorMessage+"]");
    if (errorMessage != "Invalid login")
	   {
        var username = GM_getValue ("username", null);
        if ((username == null) || 
		    (errorMessage == "Missing Username") || 
			(errorMessage == "Please enter a Username and Password.")) { setUsername () }
        var password = GM_getValue ("password", null);
        if ((password == null) || 
		    (errorMessage == "Missing Password") ||
		    (errorMessage == "Please enter a Username and Password.")) { setPassword () }

        // Enter username and password if not entered
        if (userDiv.value.length == 0) { userDiv.value = username }
        if (passDiv.value.length == 0) { passDiv.value = password }

        // Login
        button.click ();
	   } else {errorPresent.innerHTML = "Invalid login. <br/> If you are trying to use the CHEX auto-login script, you may need to change your stored CHEX username or password because one or the other is incorrect. <br/>To do so, open the menu next to the the monkey icon in the upper right corner of FireFox and select User Script Commands. After changing your username/password, REVISIT the page by opening it again in a new window or tab (or by pressing Enter at the end of the URL). Just trying to refresh or reload the page will not work because the browser will try to resubmit your old username and password again. "}	   
    }
	