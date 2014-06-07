// Multiplayer Vote Convertion
// version 0.1 BETA!
// 2010-10-29
// Copyright (c) 2010, Mr.Mime
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Multiplayer Vote Convertion
// @namespace http://diveintogreasemonkey.org/download/
// @description Covertion vote for Multiplayer.com site
// @include *
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*
// ==/UserScript==

function calcNewVote (mitVote){
		var vC = new Array();
		vC['6.0'] = '4';
		vC['6.5'] = '4.5';
		vC['6.6'] = '4.5';
		vC['6.7'] = '4.5';
		vC['6.8'] = '4.5';
		vC['6.9'] = '4.5';
		vC['7.0'] = '5';
		vC['7.1'] = '5';
		vC['7.3'] = '5.5';
		vC['7.4'] = '5.5';
		vC['7.5'] = '6';
		vC['7.6'] = '6+';
		vC['7.7'] = '6+';
		vC['7.8'] = '6.5';
		vC['7.9'] = '6.5';
		vC['8.0'] = '7';
		vC['8.1'] = '7';
		vC['8.2'] = '7+';
		vC['8.3'] = '7+';
		vC['8.4'] = '7+';
		vC['8.5'] = '7.5';
		vC['8.6'] = '7+';
		vC['8.7'] = '7+';
		vC['8.8'] = '7/8';
		vC['8.9'] = '8-';
		vC['9.0'] = '8';
		vC['9.1'] = '8+1';
		vC['9.2'] = '8.5';
		vC['9.3'] = '8/9';
		vC['9.4'] = '9-';
		vC['9.5'] = '9';
		vC['9.6'] = '9+1';
		vC['9.7'] = '9.5';
		vC['9.8'] = '9/10';
		vC['9.9'] = '10-';
		vC['10'] = '10';
		return vC[mitVote];
	}

	function changeVote(){
		var voteContainers = document.getElementsByClassName('vote mit');
		if (voteContainers.length == 0) return;
		var vC = voteContainers[0];
		
		mitVote = vC.innerHTML.match (/[0-9]+.[0-9]+/);
		mitVote = mitVote[0];
		var newVote = calcNewVote(mitVote.toString());
		var newContent = '<small>il nostro<br>voto</small><span>['+newVote+']</span>';				
		vC.innerHTML = newContent;		
	}
	
	window.onload = changeVote;