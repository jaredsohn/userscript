// ==UserScript==
// @name		Google Image Search Always show L Size
// @version			1.2
// @include		*tbm=isch*
// @include		*google.com/images?*
// @exclude		*tbm=isch*&tbs=isz:*
// @exclude		*&tbs=isz:*
// ==/UserScript==
(function() {
	var param = "&tbs=isz:l";
	var reg = new RegExp("tbs=isz");
	if (!document.URL.match(reg)) {
		window.location.replace(document.URL + param);
	}
})()
