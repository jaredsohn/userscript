// ==UserScript==
// @author    Odie5533
// @name          RapidShare Instantizer
// @description   Makes RapidShare Instant
// @include      *rapidshare.de/*
// ==/UserScript==

(function() {
	// first page
	var newpage;
	if (document.body.parentNode.innerHTML.indexOf("unescape") == -1)
	{
		document.forms[0].elements[2].click();
	} else {
		var index = document.body.parentNode.innerHTML.indexOf("unescape");
		newpage = document.body.parentNode.innerHTML.substring(index + 10);
		index = newpage.indexOf("'");
		newpage = newpage.substring(0, index);
		document.body.parentNode.innerHTML = unescape(newpage);
	}
})();