// ==UserScript==
// @name         Select-click-copy Enabler
// @namespace    http://userscripts.org/users/92143
// @version      8.2
// @description  Enables select, right-click, copy and drag on pages that disable them. WARNING: MAY BREAK PAGE FUNCTIONS. 
// @include      /^http\:\/\//
// @exclude      /^http\:\/\/([^\.]+\.)?facebook\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?google\.((?!\/cse\?).)+$/
// @exclude      /^http\:\/\/([^\.]+\.)?wikipedia\.org/
// @exclude      /^http\:\/\/([^\.]+\.)?youtube\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?saucenao\.com/
// @exclude      /^http\:\/\/myanimelist\.net\/editprofile\.php/
// @exclude      /^http\:\/\/([^\.]+\.)?mitbbs\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?getchu\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?jsfiddle\.net/
// @exclude      /^http\:\/\/([^\.]+\.)?fiddle\.jshell\.net/
// @exclude      /^http\:\/\/([^\.]+\.)?jsbin\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?photojoiner\.net/
// @exclude      /^http\:\/\/tieba\.baidu\.com/
// @exclude      /^http\:\/\/w\.qq\.com/
// @exclude      /^http\:\/\/web2\.qq\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?flagcounter\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?dm5\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?yahoo\.co\.jp/
// @exclude      /^http\:\/\/([^\.]+\.)?xinhuanet\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?newegg\.com/
// @exclude      /^http\:\/\/([^\.]+\.)?doublemap\.com/
// @exclude      /^http\:\/\/([^\.]+\.)*sina\.com\.cn/
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-start
// ==/UserScript==

var wasRun
//increase this value to 1000 or greater for pages that need a long time to be loaded
var BODY_DELAY = 100

function init() {
	
	 wasRun = false
	 
}

function enableSelectClickCopy() {
	
	var events = 
		['copy', 'mouseup', 'mousedown', 'contextmenu', 'select', 'selectstart', 'dragstart']
	var topElements = [window, document]
	
	function disableAll(event) {
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation()
		}
		else if (event.stopPropagation) {
			event.stopPropagation()
		}
	}
	
	for (var i = 0; i < events.length; i++) {
		var event = 'on' + events[i]
		for (var j = 0; j < topElements.length; j++) {
			topElements[j][event] = null
		}
		document.addEventListener(events[i], disableAll, true)
	}
	
}

function loadedHandler() {
	
	if (wasRun) {
		return
	}
	wasRun = true
	document.removeEventListener('beforescriptexecute', loadedHandler, true)
	document.removeEventListener('beforeload', loadedHandler, true)
	document.removeEventListener('DOMContentLoaded', loadedHandler, true)
	appendScript(document)
	
}

function loadedCssIframeHandler() {
	
	setTimeout(function() {
		appendCssEnabler(document.body)
		//handle iframes
		var oldBody, newBody
		for (var i = 0; i < frames.length; i++) {
			var iDocument
			try {
				iDocument = frames[i].document
			}
			//cross domain access, protocol mismatch, etc
			catch(securityError) {
				continue
			}
			
			if(iDocument) {
				oldBody = iDocument.body
				newBody = oldBody.cloneNode(true)
				prependScriptTo(newBody)
				appendCssEnabler(newBody)
				oldBody.parentNode.replaceChild(newBody, oldBody)
			}
			
		}
	}, BODY_DELAY)
	
}

function appendScript(documentObject) {
	
	if(!documentObject) {
		return
	}
	var s = documentObject.createElement('script')
	s.innerHTML = '(' + enableSelectClickCopy.toString() + ')()'
	var container = documentObject.head || documentObject.body
	if(container) {
		container.appendChild(s)
	}
	
}

function prependScriptTo(container) {
	
	if(!container) {
		return
	}
	var s = document.createElement('script')
	s.innerHTML = '(' + enableSelectClickCopy.toString() + ')()'
	container.insertBefore(s, container.firstChild)
	
}

function appendCssEnabler(container) {
	
	var css = document.createElement('style')
	css.type = 'text/css'
	css.innerHTML = 
		'* {-webkit-touch-callout: text !important; -webkit-user-select: text !important; ' + 
		'-khtml-user-select: text !important; -moz-user-select: text !important; ' + 
		'-ms-user-select: text !important; user-select: text !important;}'
	if(container) {
		container.appendChild(css)
	}
	
}

init()

if ('onbeforescriptexecute' in document) {
	//for firefox
	document.addEventListener('beforescriptexecute', loadedHandler, true)
}
else {
	//for chrome and opera
	document.addEventListener('beforeload', loadedHandler, true)
}

document.addEventListener('DOMContentLoaded', function() {
	//in case all previous efforts fail
	loadedHandler()
	//handle css and iframes
	loadedCssIframeHandler()
}, true)
