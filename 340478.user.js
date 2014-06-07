// ==UserScript==
// @name       Last FM average tracks per day 
// @author		Mick Doyle
// @profile     http://userscripts.org/users/566513
// @namespace   http://www.mickdoyle.net
// @version     0.1
// @description Displays users average tracks per day beside their total play count
// @match       http://www.last.fm/user/*
// @copyright   2014+, Mick Doyle
// ==/UserScript==

var target = document.getElementsByClassName('userPlays')[0];
var newContent = document.createElement('div');
newContent.innerHTML = ' | ' + document.getElementsByClassName('userPlays')[0].title;
newContent.style.color = '#999';
newContent.style.paddingTop = '4px';
newContent.style.display = 'inline';
target.appendChild(newContent);