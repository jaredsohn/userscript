// Reddit.com Zebra-izer
// version 0.1 (2006-02-11)
// Copyright (c) Jim Bagrow
// Available under GPLv2+
//
// ==UserScript==
// @name            Reddit Zebra-izer
// @namespace
// @description     Colors odd rows for increased visibility
// @include         http://reddit.com/
// @include         http://*.reddit.com/
// @include         http://*.reddit.com/*
// @include         http://reddit.com/*
// ==/UserScript==

(function() {
	var table = document.getElementById("siteTable");  
	var trs = table.getElementsByTagName("tr");

	var color = "#f0f0f0"; // comment/share/... buttons' grey
	//var color = "#c6def7"; // top bar blue
	
	for ( var i=0; i < trs.length; i++ ){
		i += 3;
		for ( var j=0; j < 3; j++ ){
			trs[i+j].style.backgroundColor = color;
			var tds = trs[i+j].getElementsByTagName("td");
			for (var k=0; k<tds.length; k++)
				tds[k].style.backgroundColor = color;
		}
		i += 2; // why does this work? who cares!
	}
})();

