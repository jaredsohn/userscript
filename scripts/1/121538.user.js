// ==UserScript==
// @name           Okcupid-Fetlife Bridge
// @namespace      http://example.com
// @description    Adds Fetlife button to OKCupid, and vice versa
// @include        http://www.okcupid.com/profile/*
// @include        https://fetlife.com/users/*
// ==/UserScript==

if (/okcupid/.test(document.location)) {
	var nickname = document.getElementById('basic_info_sn').innerHTML
	GM_xmlhttpRequest({
	  method: "HEAD",
	  url: "https://fetlife.com/" + nickname,
	  onload: function(response) {
	    if (/user/.test(response.finalUrl)) {
			var p = document.createElement("p")
			p.setAttribute("class","btn small green woo")
			p.setAttribute("onmousedown","util.toggleClass(this, 'active')")
			p.setAttribute("onmouseup","util.toggleClass(this, 'active')")
			p.setAttribute("onmouseover","util.toggleClass(this, 'hover')")
			p.setAttribute("onmouseout","util.toggleClass(this, 'hover')")
			var a = document.createElement("a")
			a.setAttribute("href",response.finalUrl)
			a.innerHTML = "Fetlife"
			p.appendChild(a)
			var node = document.querySelector('p.message').nextElementSibling
			node.parentNode.insertBefore(p,node)
		}
	  }
	});
}

if (/fetlife/.test(document.location)) {
	var nickname = document.querySelector('h2').textContent.match(/\w+/)[0]
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://www.okcupid.com/profile/" + nickname,
	  onload: function(response) {
	    if (/"screenname"/.test(response.responseText)) {
			var p = document.createElement("div")
			p.setAttribute("class","button")
			var a = document.createElement("a")
			a.setAttribute("href",response.finalUrl)
			a.setAttribute("style","background-color: #64A730;")
			a.innerHTML = "OKCupid"
			p.appendChild(a)
			var node = document.querySelector('.button').nextElementSibling
			node.parentNode.insertBefore(p,node)
		}
	  }
	});
}
