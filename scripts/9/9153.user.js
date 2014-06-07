// ==UserScript== 
// @name           OKC New Layout Ad Removal
// @namespace      Justin Lefler // http://www.kisstherings.com // xieish@gmail.com
// @description    A greasemonkey script to block the annoying new ad found in profiles @ OKCupid.com
// @include        http://www.okcupid.com/*
// @include        http://www.okaycupid.com/*
// ==/UserScript=='

(function () {
	document.getElementById("profileAdWrap").style.display="none";
})();
