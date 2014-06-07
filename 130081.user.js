// ==UserScript==
// @name           Auto-Login for Batheo
// @description    Automatically logs you into Batheo
// @include        http://batheo.clapalong.com/?action=webgame!gamelogin&*
// @grant          none
// @run-at         document-end
// @author         Jules
// @namespace      http://userscripts.org/users/443962
// @updateURL      http://userscripts.org/scripts/source/130081.meta.js
// @version        1.3.0
// ==/UserScript==

/* 
	To use without entering in this file, add #autologin~username&password to the login page.
	So if you want to log into s50 it would look something like this: 
	http://batheo.clapalong.com/?action=webgame!gamelogin&sid=50#autologin~example@emailprovider.com&examplepassword
	You can then save that as your bookmark for an auto-login, every-time =)
	
	*Note* It is HIGHLY recommended that you browse in private or incognito mode when using public computers.
*/

//~~~~~~ USERNAME ~~~~~~~~//
var userName = ""             ;  //Enter username inside inverted commas.
//~~~~~~ PASSWORD ~~~~~~~~//
var passWord = ""             ;  //Enter password inside inverted commas.

//~~~~~~~Settings~~~~~~~~//
var autoFillOnly = false      ;  //Set to true if you want user and pass to only be filled in.

//~~~~~~ IGNORE CODE BELOW ~~~~~~//

checkIfAutoUrl(document.URL); // Start the check function to check if the url being passed is an auto url.

function checkIfAutoUrl(fullUrl) 
{
	if (fullUrl.search("#autologin~") >= 1) // Search for the occurance of #autologin~ and if found:
	{
		var parts = fullUrl.split('~')[1].split('&'); // Separate the username and password from the url,
		userName = parts[0];                          // userName is equal to 1st parameter,
		passWord = parts[1];                          // passWord is equal to 2nd parameter.
	} 
	if (userName != "" || passWord != "") // Only autoLogin if the username or password isn't empty, this is to
	{                                     // prevent it from unecessarily trying to log you in with incorrect info.
		autoLogin();
	}
}

function autoLogin() 
{
	document.getElementById("email").setAttribute("value", userName); // Fill out the email box with userName.
	document.getElementById("pw").setAttribute("value", passWord);    // Fill out the password box with passWord.
	if (!autoFillOnly) 
	{   // Only click log-in if autoFillOnly is false.
		document.location.href = "javascript:void(login());";         // Press the login button.
	}
}