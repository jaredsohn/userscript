// ==UserScript==
// @name         Hentai AutoPlay
// @namespace    http://userscripts.org/users/92143
// @version      0.5
// @description  Removes advertisement covering play button on major hentai streaming websites and autoplays video if possible. Works best with Adblock. 
// @match        http://hentaiupload.com/*
// @match        http://hentai.animestigma.com/*
// @match        http://cravinghentai.com/*
// @match        http://hentaischool.com/*
// @match        http://watchhentaistream.com/*
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// ==/UserScript==

function autoPlayHentaiupload() {
	var scripts = document.getElementsByTagName('script')
	for (var i = 0; i < scripts.length; i++) {
		var autoPlayIndex = scripts[i].innerHTML.indexOf('autoPlay: false')
		if (autoPlayIndex !== -1) {
			var newScript = document.createElement("script")
			newScript.innerHTML = scripts[i].innerHTML.substring(0, autoPlayIndex + 10) + 'true' + scripts[i].innerHTML.substring(autoPlayIndex + 15)
			var scriptParent = scripts[i].parentNode
			scriptParent.removeChild(scripts[i])
			scriptParent.appendChild(newScript)
			break
		}
	}
}

function appendScript(newFunction, container, isSelfInvoking) {
	var newScript = document.createElement("script")
	
	if (!isSelfInvoking) {
		newScript.innerHTML = newFunction.toString()
	}
	else {
		newScript.innerHTML = '(' + newFunction.toString() + ')()'
	}
	
	if (isElement(container)) {
		container.appendChild(newScript)
	}
}

function isElement(o) {
	return (
		'object' === typeof HTMLElement ? o instanceof HTMLElement : 
		o && typeof o === 'object' && 1 === o.nodeType && 'string' === typeof o.nodeName
	)
}

//watchhentaionline, hentaicrunch, myhentaistream, hentainya, watchhentainow, animestigma, etc
if (window.top != window.self) {
	hideAd('#overlay')
	appendScript(autoPlayHentaiupload, document.body, true)
}
//cravinghentai, hentaischool, etc
else {
	hideAd('#videoad_0')
}

function hideAd(selector) {
	var css = document.createElement('style')
	css.type = 'text/css'
	css.innerHTML = selector + ' {display: none !important;}'
	if(document.body) {
		document.body.appendChild(css)
	}
}