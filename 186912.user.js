// ==UserScript==
// @name          scriptohvost
// @include 	  http://lj.rossia.org/*
// @namespace     http://lj.rossia.org/
// @description   Script for hiding comments from undesirable users
// @grant         none
// @require       http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==
var hidehvost = function() {
  	var unnecessaryElements = new Array();
	unnecessaryElements['veniamin'] = 'Венечка';
	unnecessaryElements['nogi'] = 'Харкотина';

	var commenthvost = function(user, alias) {
		var commentHeader = 'td[id*="cmtbar"]:has(a[href="http://lj.rossia.org/userinfo.bml?user=' + user + '"])';
		var thatsBetter = '<img src="http://www.steelersuniverse.com/forums/images/smilies/poop.gif"/>&nbsp<b><em>' + alias + '</em></b>';
		$(commentHeader).parent().next().replaceWith('');
		$(commentHeader).replaceWith('<td bgcolor="#e2e2e2" width="100%">' + thatsBetter + '</td>');
	}

	for (var element in unnecessaryElements) {
		commenthvost(element, eval('unnecessaryElements.' + element));
	}
}

hidehvost();