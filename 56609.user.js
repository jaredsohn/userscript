// ==UserScript==
// @name    Bing Images Direct Link
// @include http://www.bing.com/images/search?*
// ==/UserScript==

var links_done = {}
setInterval(function () {
	for (var i = 0; i < document.links.length; ++i) {
		var l = document.links[i]
		if (! l.onmousedown) continue
		if (l in links_done) continue
		links_done[i] = true
		var m = l.href.match(/\/images\/search\?.*\bfurl=(.*)/)
		if (! m) continue
		var a = document.createElement('a')
		a.href = m[1]
		a.title = l.title
		a.style = l.style
		a.className = l.className
		a.appendChild(l.firstChild)
		l.parentNode.replaceChild(a, l)
	}
}, 100)
