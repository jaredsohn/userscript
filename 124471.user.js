// ==UserScript==
// @name           Don't distract me!
// @namespace      http://murtada.nl/userscripts
// @description    Annoyed and distracted by all those useless comments on public websites? Here's the remedy!
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==
console.log("Hello, World!");
$(document).ready(function () {
	var elementsToHide = "#watch-discussion";

	console.log("Hello, World!");

	$(elementsToHide).each(function (i)
	{
		$(this).css("display", "none");
	});
});