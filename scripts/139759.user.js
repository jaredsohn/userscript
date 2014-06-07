// ==UserScript==
// @name        Read Gawker w/ Noscript
// @namespace   gawker
// @description Read Gawker site even with Noscript blocking Gawker and associated scripts
// @include     http://io9.com/*
// @include     http://deadspin.com/*
// @include     http://gizmodo.com/*
// @include     http://lifehacker.com/*
// @include     http://gawker.com/*
// @include     http://jezebel.com/*
// @version     1
// ==/UserScript==

var container = document.getElementById("container");
for (var i = 0; i < container.childNodes.length; i++) {
	var child = container.childNodes[i];
	if (child.tagName === "SCRIPT") {
		if (child.innerHTML.indexOf("ganjaStaticAjaxContent") != -1) {
			var script = child.innerHTML.substr(child.innerHTML.indexOf("=") + 1);
			script = script.replace(/[\s;]+$/,"");
			var json_obj;
			if (json_obj = JSON.parse(script)) {
				container.innerHTML = json_obj.html;
			}
			
			break;
		}
	}
}
