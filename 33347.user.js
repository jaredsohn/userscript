// ==UserScript==
// @author		kirilloid
// @name		Travian village preserver T4
// @namespace	http://userscripts.org/
// @description	Remembers current village if played form two or more computers (browsers, tabs) simultaneously
// @include	http://tx3.travian.*
// @include	http://ts*.travian.*
// ==/UserScript==

(function() {
	
	var hostObject = typeof unsafeWindow != "undefined" ? unsafeWindow : window;
	var host = hostObject.location.host;
	var newdid = document.querySelector("#villageList a.active").href.match(/newdid=(\d+)/)[1];

	var $$ = function(selector) {
		var result = document.querySelectorAll(selector);
		result.forEach = function(callback) {
			Array.prototype.forEach.call(this, callback);
		}
		return result;
	}


	function hrefReplacer(link){
		if (!link.href.match('newdid') && !link.href.match('submit') && link.href.match(host)) {
			if (link.href.match(/\?/))
				link.href += '&newdid=' + newdid;
			else
				link.href += '?newdid=' + newdid;
		}
	}

	var xinput;
	if (document.forms[0] &&
		!document.forms[0].action.match(/gid=16\&tt=99/)) {
		xinput = document.createElement('input');
		xinput.name = 'newdid';
		xinput.type = 'hidden';
		xinput.value = newdid;
		document.forms[0].appendChild(xinput);
		document.forms[0].action += '?newdid=' + newdid;
	}
	$$("a").forEach(hrefReplacer);
	$$("map area").forEach(hrefReplacer);
	$$("button[onclick]").forEach(function(elt){
		var code = elt.getAttribute('onclick');
		code = code.replace(/\?/, "?newdid="+newdid+"&");
		elt.setAttribute('onclick', code);
	});

	// fast hack for all popus. Should check for DOM part update
	document.body.addEventListener('DOMNodeInserted', function(event){
		if (event.relatedNode.className != "content") return true;
		if (event.target.id != 'tileDetails') return true;
		$$(".dialog a").forEach(hrefReplacer);
	}, false);
	
})();