// ==UserScript==
//
//Displayable Name of your script 
// @name           AdPearance branding for Optimizely 
//
// brief description
// @description    This script chagnes the header elements in Optimizely to show the AdPearance logo.   
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://adpearance.com
//
// Your name, userscript userid link (optional)   
// @author         Alex Miller (http://userscripts.org/users/alexpmil) 
// 
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        https://www.optimizely.com/edit#experiment_id=*
// @include        http://www.optimizely.com/edit#experiment_id=*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        
//
// @history        1.0 first version
// @history        1.0b first beta version, who knew!!
//
// ==/UserScript==


// Begin Code
$("#top").css({"background-color":"#eeeeee", "background-image":"none", "border-style":"none"});
$(".logo").replaceWith("<img src=\"http://adpearance.com/images/uploads/statuscakelogo.png\" height=\"60px\" style=\"position: absolute; left: 800px; top: 10px;\">");
$(".signed-in").css({"background-color":"#032c5e", "border-radius":"3px"});