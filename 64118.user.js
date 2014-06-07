// ==UserScript==
// @name           Lock your browser
// @namespace      Kyle
// @include        http://www.something.com/*
// @exclude        *
// ==/UserScript==

var ex = "!";
var qu = "?";
var nm = " Please do not type the http:// part of the link! If you don't want to go anywhere type about:blank.";
var wbstgo = "http://www.swagbucks.com/";

var name = prompt("What is your name?");

var pw = true; 
 
while(pw){ 
pw=(prompt('Password:') != 'PASSWORD HERE'); 
} 
if(confirm("Search Swagbucks?"))
{
var srch = prompt("What would you like to seach swagbucks?")
window.location = "http://www.swagbucks.com/?t=w&p=1&q=" +srch
}
else
{
var wbst = prompt("What URL would you like to go to, "+name +qu +nm)
window.location = "http://"+wbst;
}

GM_registerMenuCommand("Lock Browser Options", function() {
GM_setValue("pass", (prompt("Set the password:")||"default"));
});
while(GM_getValue("pass","default") != prompt("Confirm the Password:")) {}