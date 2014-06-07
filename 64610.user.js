// ==UserScript==
// @name           Puzzlefinder
// @namespace      p0n3yh4x scripts
// @description    Notifies you if there is a puzzle piece on your PV page and optionally reloads the page otherwise
// @include        http://*.poneyvallee.com/*
// ==/UserScript==

function enableReloadURL() {
	if (!isReloadEnabled()) {
		var v = GM_getValue('reloadURLs', null);
		v = (v != null) ? v + ' ' : '';
		GM_setValue('reloadURLs', v + window.location.href);
		GM_registerMenuCommand('Stop reloading page', disableReloadURL);
		setReloadTimeout();
	} else {
		alert('This URL is already marked for auto-reloading.');
	}
}

function disableReloadURL(t) {
	if (isReloadEnabled()) {
		var v = GM_getValue('reloadURLs', '').split(' ');
		var i = v.indexOf(window.location.href);
		if (i != -1) {
			v.splice(i, 1);
			GM_setValue('reloadURLs', v.join(' '));
		}
		GM_registerMenuCommand('Automatically reload page', enableReloadURL);	
	}
	if (t != null)
		window.clearTimeout(t);
}

function isReloadEnabled() {
	return GM_getValue('reloadURLs', '').split(' ').some(function(v) {
		return (v.toLowerCase() == window.location.href.toLowerCase());
	});
}

function reload() {
	if (isReloadEnabled())
		window.location.reload();
}

function setReloadTimeout() {
	var t = 5000+Math.floor(Math.random() * 120000);
	return window.setTimeout(reload, t);
}

var timeout;
if (!isReloadEnabled()) {
	GM_registerMenuCommand('Automatically reload page', enableReloadURL);
} else {
	GM_registerMenuCommand('Stop reloading page', disableReloadURL);
	timeout = setReloadTimeout();
}

var divs = document.getElementsByTagName("div");
for (var i = 0; i <= divs.length; i++) {
	var d = divs[i];
	if (d.id == 'citrouille') {
		for (var c = 0; c < d.childNodes.length; c++) {
			var n = d.childNodes[c];
			try {
				if (n.tagName.toLowerCase() == 'img' && n.src.match(/.*puzzle\/pieces\/piece[0-9]*.png/) != null) {
					if (isReloadEnabled())
						disableReloadURL(timeout);
					alert('Puzzle piece!');
				
				}
			} catch (err) {}

		}
	}
}


