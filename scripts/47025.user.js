// ==UserScript==
// @name           Cracked Fixer
// @namespace      #aVg
// @include        http://www.cracked.com/*
// @include        http://cracked.com/*
// @version        0.1.2
// @description    Cracked.com is a really good site. Except almost every fucking article is on multiple pages. No more! Now with video downloader and layout cleanup.
// ==/UserScript==
var killComments=true, removeSocial = true;
function single(A, B) {return document.evaluate(A, B || document, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);}
function $(A) {return document.getElementById(A);}
function loop(A, B) {
	A = document.evaluate(A, document, null, 6, null);
	var i = A.snapshotLength;
	while(--i>=0) B(A.snapshotItem(i), i);
}
var nxt=single("//a[@class='next_arrow_active']");
var article = single("//div[@class='userStyled']");

function loadPage(urI) {
	GM_xmlhttpRequest({
		url : urI,
		method : "GET",
		onload : function(A) {
			if(A.responseText.match(/(<div class="userStyled">[\s\S]+?)<\/td>\s*<\/tr>/))
				article.innerHTML += "<pre style=\"text-align:right;\">Auto-loaded page: <a href=\""+A.finalUrl+"\">"+A.finalUrl+"</a></pre>" + RegExp.$1;
			if(A.responseText.match(/t_arrow_active" href="([^"]+)/))
				loadPage(RegExp.$1);
			loop("//a[starts-with(@href,'%20') or starts-with(@href,' ')]", function(L) {
				L.href=unescape(L.href).replace(/^\s+|\s+$/g, "");
			});
		}
	});
}
loop("//div[contains(@class, 'Box1')]",function(box) {
	if(/^\s+$/.test(box.textContent)) remove(box);
});

var v = single("//embed[@flashvars]");
if(v && v.getAttribute("flashvars").match(/&URL=([^&]+)/i)) {
	var dl = document.createElement("a");
	dl.href = unescape(RegExp.$1);
	dl.textContent = "Download this video.";
	dl.setAttribute("style", "padding: 7px; color: white; background-color: black; position: relative; top: 16px; -moz-border-radius-topleft: 8px; -moz-border-radius-topright: 8px; -moz-border-radius-bottomright: 8px; -moz-border-radius-bottomleft: 8px;");
	v.parentNode.parentNode.appendChild(dl);
}

if(nxt)
	loadPage(nxt.href);
if (removeSocial) {
	remove(single("//a[starts-with(@href, 'http://cgi.fark.com/cgi/fark/farkit.pl')]/../../.."));
	remove(single("//span[text()='Email']/.."));
}
if (killComments)
	remove(single("//div[contains(@class, 'Comment')]"));