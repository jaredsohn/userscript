// ==UserScript==
// @name           Rapidshare Auto Pick Free
// @namespace      RS Auto Free
// @include        http://rapidshare.com/*
// @include        http://www.rapidshare.com/*
// @exclude        http://rapidshare.com/
// @exclude        http://www.rapidshare.com/
// ==/UserScript==
var inputs = document.getElementsByTagName("input");
for (var i in inputs) {
	if (inputs[i].value = "Free user") {
		inputs[i].parentNode.submit();
	}
}