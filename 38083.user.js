// ==UserScript==
// @name           GMail SVN Highlighter
// @namespace      http://martynov.info/greasemonkey
// @description    Highlights diff syntax in SVN commit messages
// @author         Sergey Martynov
// @version        0.3
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==

window.addEventListener('load', function() {
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load("1.0", function (gmail) {
			// gmail UI view state change handler
			gmail.registerViewChangeCallback(function () {
				if (gmail.getActiveViewType() != 'cv') { return; }
				var divs = gmail.getActiveViewElement().getElementsByTagName('div');
				for (i=0; i<divs.length; i++) {
					if (divs[i].className.match(/\bii\b/)) {
						var ih = divs[i].innerHTML;
						if (!ih.match(/Author:[^\n]+\nDate:[^\n]+\nNew Revision:/)) {
							continue; // highlight only svn messages
						}
						ih = ih.replace(/(\n) /g,'$1&nbsp;'); // it's a fix for incorrect gmail behavior
						ih = ih.replace(/(\n)(Modified:|========|\+\+\+\s|---\s|@@\s)(.+?)(<br)/g, '$1<span style="color:#999">$2$3</span>$4');
						ih = ih.replace(/(\n)(\+.*?)(<br)/g, '$1<span style="color:#090">$2</span>$3');
						ih = ih.replace(/(\n)(\-.*?)(<br)/g, '$1<span style="color:#900">$2</span>$3');
						divs[i].innerHTML = ih;
					}
				}
			});
		});
	}
}, true);
