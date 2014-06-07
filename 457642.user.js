// ==UserScript==
//
//Displayable Name of your script 
// @name           My First Script 
//
// brief description
// @description    blah
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      blah
//
// Your name, userscript userid link (optional)   
// @author         blah
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       blah
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http://*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.0 first version
// @history        1.0b first beta version, who knew!!
//
// ==/UserScript==


//And of course your code!!
$(function(){
for(var i = 58;i < 100;i++){
	window.location.assign('https://class.coursera.org/ml-005/lecture/download.mp4?lecture_id='+i);
}
});

