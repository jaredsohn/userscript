// ==UserScript==
// @name			BattleWatcher
// @description			BattleWatcher
// @include			http://erepublik.com/*
// @include			http://www.erepublik.com/*
// @copyright			BattleWatcher
// @version			1.4
// @license			LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==
 var tajmer = setInterval("procitaj()",2000);
function procitaj() {
	var nick = document.getElementsByTagName("small")[0].childNodes[0].nodeValue;
	var inf = document.getElementsByTagName("big")[0].childNodes[0].nodeValue;
	//$('#result').load('http://serbiandream.in.rs/jstest.php?cid=' + nick + '&bid=' + inf); 
	console.log(nick + ":" + inf);
	}