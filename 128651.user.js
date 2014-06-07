// ==UserScript==
//
//Displayable Name of your script 
// @name           teh
//
// brief description
// @description    Alerts Hello   
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://matt-fellows.me.uk/
//
// Your name, userscript userid link (optional)   
// @author         Matt Fellows (http://matt-fellows.me.uk/) 
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http:// http://matt-fellows.me.uk/userscripts/teh/ 
//
//Version Number
// @version        1.2
//
// Urls process this user script on
// @include        http://*
// @match          http://*/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.2 bug fix to allow chrome to use on all sites
// @history        1.1 first customised version
// @history        1.0 first version
//
// ==/UserScript==


//And of course your code!!
$(function(){
window.alert("Hello.. My Extension processed you..");
});