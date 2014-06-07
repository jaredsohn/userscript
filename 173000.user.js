// ==UserScript==
// @name         MAL Custom Search
// @namespace    http://userscripts.org/users/92143
// @version      0.3
// @description  Searches myanimelist.net with Google Custom Search.
// @match        http://myanimelist.net/*
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @grant        none
// @run-at       document-end
// ==/UserScript==

function googleCSE() {
	var cx = '007849635589366873171:6v2th0adyke'
	var gcse = document.createElement('script')
	gcse.type = 'text/javascript'
	gcse.async = true
	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + 
		'//www.google.com/cse/cse.js?cx=' + cx
	var s = document.getElementsByTagName('script')[0]
	s.parentNode.insertBefore(gcse, s)
	//convert relative paths to absolute paths; fix for club relations
	$('a[href^="anime.php?id="], a[href^="manga.php?id="], a[href^="character.php?id="]')
	.each(function() {
		$(this).attr('href', '/' + $(this).attr('href'))
	})
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

var malSearchElement = document.createElement('gcse:search')
malSearchElement.linktarget = '_top'
var malSearchDiv = document.createElement('div')
malSearchDiv.style.textAlign = 'left'
malSearchDiv.style.position = 'absolute'
malSearchDiv.style.top = '0px'
malSearchDiv.style.right = '0px'
malSearchDiv.style.zIndex = '100'
malSearchDiv.style.width = '460px'
malSearchDiv.style.border = '1px solid #2e51a2'
malSearchDiv.appendChild(malSearchElement)
var myanimelist = document.getElementById('myanimelist')
var menu = document.getElementById('menu')
if (myanimelist && menu) {
	document.body.insertBefore(malSearchDiv, myanimelist)
	appendScript(googleCSE, document.head, true)
}