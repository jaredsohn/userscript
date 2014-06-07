// ==UserScript==
//
//Displayable Name of your script 
// @name          killYahooMLBFullCount
//
// brief description
// @description    Removes Full Count from the Yahoo! MLB homepage
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://www.userscript.org
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//Version Number
// @version        1.0
//
// @history        1.0 first version
//
// @match http://sports.yahoo.com/mlb/*
//
// ==/UserScript==

var elmDeleted = document.getElementById("mediaiframe");
elmDeleted.parentNode.removeChild(elmDeleted);

