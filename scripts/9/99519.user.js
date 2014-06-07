// ==UserScript==
// @name           Rankings
// @namespace      com.xathis
// @include        http://134.245.253.5/wettbewerb/2011/ergebnisse
// @include        http://134.245.253.5/wettbewerb/2011/teams/*/matches
// @include        http://134.245.253.5/wettbewerb/2011/spieltage/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm%5Fjq%5Fxhr.js	
// ==/UserScript==


var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2F134.245.253.5%2Fwettbewerb%2F2011%2Frangliste%22%20and%20xpath%3D'%2F%2Ftable%5B%40class%3D%22data-table%22%5D%2Ftr%2Ftd%2Fa'&format=json&callback=";
var linkMap = {};
$.ajax({
	url: url,
	dataType: 'json',
	success: function(data) {
		var links = data.query.results.a;
		for (var i = 0; i < links.length; i++) {
			linkMap[links[i].href] = i+1;
		}
		$('a[href^="http://134.245.253.5/wettbewerb/2011/teams/"]').each(
			function(index){ $(this).after( " <span style='color:#aaa'>[#" + linkMap[this.href] + "]</span>");  }
		);
	}
});

