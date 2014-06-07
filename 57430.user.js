// ==UserScript==
// @name           MyTwitter
// @namespace      #aVg
// @description    Twitter, served up how you like it.
// @include        http*://twitter.com/*
// @include        http*://twitpic.com/*
// @version        0.1.6
// @license        Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function $(A) {return document.getElementById(A);}
function single(A) {return document.evaluate("."+A, document.body, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);}
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0)
			A.addEventListener(b.substring(2), cur, false);
		else if(b=="style")
			A.setAttribute("style", B[b]);
		else
			A[b]=B[b];
	}
	if(C) for(var i=0; i<C.length; ++i) A.appendChild(C[i]);
	return A;
}
GM_addStyle(".perm {font-size:12px;float:right;}");
remove($("logo"));
let(prof=($("profile-image") || single("//img[@class='profile-img']")), bubble=single("//div[@class='content-bubble-arrow']")) {
	if(prof) {
		remove($("profilebox_outer"));
		prof.style.display = "block";
		prof.removeAttribute("width");
		prof.removeAttribute("height");
		prof.src = prof.src.replace(/\/(.+)_.+\.(.+)$/, "/$1.$2");
		prof.parentNode.href = prof.src;
		prof.title = prof.src.replace(/.+profile_images\/\d+\//,"").replace(/\.(?:jpe?|pn)g$/, "");
	}
	let(bg = getComputedStyle(document.body, null).getPropertyValue("background-image"), action=single("//ul[@class='user-actions']")) {
		if(action && bg.match(/^url\("?([^"]+)"?\)/))
		action.appendChild(new Element("li", null, new Array(
			new Element("button", {
				className : "btn",
				title : RegExp.$1,
				textContent : "View background image",
				onclick : function() {
					GM_openInTab(this.title);
				}
			})
		)));
	}
	if(bubble) bubble.style.visibility = "hidden";
}
function spaceOut(A) {
	A = single(A);
	if(!A) return spaceOut;
	for(var i = 1; i < A.children.length; i++) {
		var sep = document.createTextNode(" | ");
		var mi = A.children[i];
		mi.parentNode.insertBefore(sep, mi);
	}
	return spaceOut;
}
spaceOut("//ul[@class='top-navigation round']")("//div[@id='footer']/ul");
let(img = $("photo-display")) {
	if(img) img.src= img.src.replace("-scaled", "-full");
}