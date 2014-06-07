// ==UserScript==
// @name           Digital hearbreak cure
// @namespace      http://murtada.nl/userscripts/
// @description    Trying to forget that someone, but keep seeing his/her name on the internet? Protect yourself and digitally block anything with that person's name.
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var exName = "Niels Kalkman";

$(document).ready(function () {
	var elementsToHide = ".actorName";

	$(elementsToHide).each(function (i)
	{
		if ($(this).html() == exName)
		{
			$(this).parent().parent().parent().css("display", "none");
		}
	});
});