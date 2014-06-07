// ==UserScript==
// @name			Prevent CSRF
// @include			*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


$("img").each(function() {
    var src = $(this).prop("src");
	if (src.indexOf(".php") !== -1){
		alert("Guess this is some dangerous site..");
	}
});