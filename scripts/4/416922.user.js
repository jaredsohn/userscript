// ==UserScript==
// @name        Is Dave Online?
// @namespace   nqhieu2001
// @description Shows if the admin dave is online or not
// @include     http://onehallyu.com
// ==/UserScript==

var text = document.getElementById('board_statistics').innerHTML;
var online = text.search('sx21');
var answer;
if (online > 0) 
	answer = 'DAVE IS ONLINE';
else
	answer = 'dave is not online sobs';

document.getElementById('hero').innerHTML+= answer;