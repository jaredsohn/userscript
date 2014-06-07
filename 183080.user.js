// ==UserScript==
// @name        HaSiHacks
// @namespace   HaSi
// @include     http://www.hannover-singles.de/boerse/anzeigen/index.php
// @include     http://www.hannover-singles.de/boerse/anzeigen/singles.php?*
// @version     1.2
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @grant       none
// ==/UserScript==


// original change dates
// Oct 11, 2012 21:38
// Sep 5, 2012 21:43
// Sep 5, 2012 16:43 

"use strict"	

function setupSearch()
{
	$("[name=singlesuche]").attr("method", "get");

	$("[name=sf_alter_von]").val(18);
	$("[name=sf_alter_bis]").val(38);

	$("[name=sf_foto]").prop("checked", true);


	var extraVal = 1000;

	$("[name=sf_limit]").append(
        $('<option></option>').val(extraVal).html(extraVal + " Profile"));

	$("[name=sf_limit]").val(extraVal);
}

$(document).ready(function() {

	var pathName = window.location.pathname;

	if (pathName.match(/index/))
	{
		setupSearch();
	}
	else if (pathName.match(/singles/))
	{
		var results = $("#proffarbtab").parent().parent().parent().children();

		results.each(function(){
			var lastLogin = $(this).find("td[colspan=2][align=left]").text();
			unsafeWindow.console.log(lastLogin);
			if ((lastLogin.match(/sechs Monaten/)) || (lastLogin.match(/Monat\(en\)/)) ||
				(lastLogin.match(/4 Woche\(n\)/)) || (lastLogin.match(/10 Tagen/)))
				$(this).remove();
		});
	}
});