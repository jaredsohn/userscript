// ==UserScript==
// @name           GMX Logout - automatisch zur Startseite des Browsers
// @description    automatically redirects to the default homepage you set in your browser
// @namespace      gotU
// @include        http://logout.gmx.uimserv.net/*
// ==/UserScript==


/*window.location= "https://www.google.de";*/


//use command in dependency to browser
if (window.home) {
 window.home();
} else {
 location = "about:home";
}