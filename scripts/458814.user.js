// ==UserScript==
// @name        EfaExtractor
// @namespace   efa
// @description Screenscraper for EFA
// @include     http://efa.de/efa_download/buch2014/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==


"use strict";

var text = "[";
$("tr").each(function() {		
	text += '[';

	$(this).children("td").each(function() {				
		text += '"' + $(this).text().trim() + '", ';

		var url = document.location.href;
		url = url.replace(/\/[^\/]*$/, '/')
		text += '"' + url + $(this).children("a").attr("href") + '", '
	});
		
	text = text.replace(/, $/, '').replace(/\n/, ' ');
	text += '], <br>';
	
})
	text = text.replace(/, <br>$/, '');

	text += ']';

  var w = window.open("","Test","width=1500,height=900,scrollbars=1,resizable=1");
    $(w.document.body).html(text);

//unsafeWindow.console.log(text);
