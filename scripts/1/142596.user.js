// ==UserScript==
// @name        Fix HTTPS shit
// @description Redirect from https to http.
// @version     1
// @grant       none
// @include 	https://www.runescape.com
// @include 	http://www.runescape.com
// ==/UserScript==

try {
	posts = document.getElementById("page")

	var redirectMsg = document.createElement("span")
	redirectMsg.id = "redirectMsg"
	redirectMsg.style.fontSize = "x-large"
	redirectMsg.appendChild(document.createTextNode("OWNAG3"))
	posts.parentNode.replaceChild(redirectMsg, posts)

	window.location.replace("http://www.runescape.com/title.ws")
} catch (e) {
	alert(e)
}