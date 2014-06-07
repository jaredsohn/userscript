/*
    SECURITY WARNING:
    This script remembers your username and password on your computer in the same way as
    when you tell firefox to remember your passwords for other website.
    Anyone who has access to your computer, and know how to look deep enough,
    can view your username and password.
*/	

// ==UserScript==
// @name           auto-login
// @namespace	   http://husamshunnar.com
// @description    bypasses the login screen of uwindsor wireless networks by auto-filling
//                 the user name and password for the user and submitting them
// @include        https://securelogin.arubanetworks.com/*
// @Author         Husam Shunnar - shunnarh@uwindsor.ca
// ==/UserScript==


/* The following block is used to support chrome. It is based on this implementation:
 * http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
 */
if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
    if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
        this.GM_getValue=function (key,def) {
            return localStorage[key] || def;
        };
        this.GM_setValue=function (key,value) {
            return localStorage[key]=value;
        };
    }
}

// Messages displayed to the user
var userPrompt = "It appears that you installed the uwindsor-auto-login script. "+
                 "In order for the script to work, enter your uwindsor username below." +
                 "\n\nPlease Enter Your Uwindsor username:";
var passPrompt = "Please Enter Your Uwindsor password:";
var userWrongPrompt = "It appears that your credentials are invalid.\n\n" + 
                      "Please Enter Your Uwindsor username:";
                      
// GM IDs
var gmUserId = "uwin_username";
var gmPassId = "uwin_password";

// DOM attributes
var errorId = "errorbox";
var userType = "text";
var passType = "password";
var loginElement = "Login";

var user = GM_getValue(gmUserId);
var pass = GM_getValue(gmPassId);

// Find out if an error message has been produced because of wrong credentials
var wrongCredentials = false;
if(document.getElementById(errorId) != null && document.getElementById(errorId).style.display != "none")
    wrongCredentials = true;

if(wrongCredentials){
    readUser();
    readPass();
}

// Get the user if we don't have it
if(user == null || user == undefined)
    readUser();

// Get the pass if we don't have it
if(pass == null || pass == undefined)
    readPass();

// Filling the information
var textElements = document.getElementsByTagName('input');

for(var i = 0; i < textElements.length; i++){
    if(textElements[i].type == userType)
        textElements[i].value = user;
    else if(textElements[i].type == passType)
        textElements[i].value = pass;
}
document.getElementsByName(loginElement)[0].click(); // Submit the form

/* Helper Functions */

function readUser(){
    setUser(prompt(userPrompt));
}

function readPass(){
    setPass(prompt(passPrompt));
}

function setUser(newUser){
    GM_setValue(gmUserId, newUser);    
}

function setPass(newPass){
    GM_setValue(gmPassId, newPass);
}