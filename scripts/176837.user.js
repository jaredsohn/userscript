// ==UserScript==
// @name        Reddit LearnJapanese furigana to HTML5 ruby
// @namespace   http://www.reddit.com/r/LearnJapanese/
// @description Turns the furigana "fake links" of /r/LearnJapanese into HTML5 <ruby> elements. (Firefox users: you currently need an addon for ruby support.)
// @include     /^https?://(.*?\.)??reddit\.com/.*$/
// @include     http://www.reddit.com/*
// @grant       none
// @version     1.0
// @author		Artfunkel
// ==/UserScript==

function make_ruby(elem) {
	var walker = document.createTreeWalker(elem, NodeFilter.SHOW_ELEMENT, null, false)
	var elems = new Array()
	
	while(walker.nextNode()) {
		if (walker.currentNode.localName == "a") {
			var href = walker.currentNode.getAttribute("href")
			if (href == "#fg" || href == "/fg") elems.push(walker.currentNode)
		}
	}

	for(var i = 0; i < elems.length; i++) {
		a = elems[i]
		
		var ruby = document.createElement("ruby")
		ruby.textContent = a.textContent
		
		var rt = document.createElement("rt")
		rt.textContent = a.getAttribute("title")
		
		var rp_open = document.createElement("rp")
		rp_open.textContent = " ("
		var rp_close = document.createElement("rp")
		rp_close.textContent = ")"
		ruby.appendChild(rp_open)
		ruby.appendChild(rt)
		ruby.appendChild(rp_close)
		
		a.parentNode.insertBefore(ruby,a)
		a.parentNode.removeChild(a)
	}
}

make_ruby(document.body)

var observe_cfg = { subtree:true, childList:true }
var observer = new MutationObserver(function(mutations) {
	observer.disconnect()
	for(var i = 0; i < mutations.length; i++) make_ruby(mutations[i].target)
	observer.observe(document.body, observe_cfg)
})
observer.observe(document.body, observe_cfg)
