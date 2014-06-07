// ==UserScript==
// @author      blablubbb
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		PKMN IV dt
// @description	übersetzt Wesen auf veekun nach deutsch
// @source 		http://userscripts.org/scripts/show/69720
// @identifier 	http://userscripts.org/scripts/source/69720.user.js
// @include 	http://veekun.com/*
// @version     1.0
// @require http://usocheckup.redirectme.net/69720.js
// ...
// usoCheckup grant permissions for Greasemonkey 1.x+
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// ...
// ==/UserScript==
var mynode = document.getElementsByTagName("body")[0];
var arr1 = ["Serious","Sassy","Naughty","Jolly","Adamant","Hasty","Rash","Quirky","Bold","Lax","Relaxed","Modest",
			"Mild","Brave","Naive","Impish","Hardy","Quiet","Careful","Docile","Timid","Lonely","Calm","Bashful","Gentle"];
var arr2 = ["Ernst","Forsch","Frech","Froh","Hart","Hastig","Hitzig","Kauzig","K&uuml;hn","Lasch","Locker","M&auml;&szlig;ig",
			"Mild","Mutig","Naiv","Pfiffig","Robust","Ruhig","Sacht","Sanft","Scheu","Solo","Still","Zaghaft","Zart"];
var str=mynode.innerHTML; 
for(i=0;i<arr1.length;i++){
str=str.replace(arr1[i],arr2[i]);}
mynode.innerHTML = str;