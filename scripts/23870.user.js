// ==UserScript==
// @name           LepraNewComments
// @namespace      leprosorium.ru
// @include        http://leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/comments/*
// ==/UserScript==

var pp = document.getElementsByTagName("DIV");
var newpp = [];
var currentPost = -1;
var css = "\
	.lc-next-block { \
		position: fixed; \
		top: 90px; \
		right: 0px; \
		z-index: 100; \
	} \
	.lc-next-block span { \
		display: block; \
		color: #ccc; \
		border: 1px solid #ccc; \
		padding: 5px 10px; \
		margin-bottom: 1px; \
		font-size: 75%; \
		cursor: pointer; \
	} \
	.lc-next-block span:hover { \
		color: #000; \
		border: 1px solid #000; \
	} \
";

var ppLength = pp.length;
for(var i = 0; i < ppLength; i++) {
	if(pp[i].className.indexOf("new") != -1) {
		newpp.push(pp[i]);
	}
}

if(newpp.length > 0) {
	InitializeNavLink();
}

function InitializeNavLink() {
	var navBlock = document.createElement("DIV");
	navBlock.className = "lc-next-block";
	
	navLinkNext = document.createElement("SPAN");
	navLinkNext.appendChild(document.createTextNode("↓"));
	navLinkNext.addEventListener("click", NextNewComment, false);
	
	navLinkPrev = document.createElement("SPAN");
	navLinkPrev.appendChild(document.createTextNode("↑"));
	navLinkPrev.addEventListener("click", PrevNewComment, false);
	
	navBlock.appendChild(navLinkPrev);
	navBlock.appendChild(navLinkNext);
	document.body.appendChild(navBlock);
}

function NextNewComment() {
	currentPost++;
	if(currentPost >= newpp.length) {
		currentPost = newpp.length - 1;
	}
	window.location.hash = newpp[currentPost].id;
}

function PrevNewComment() {
	currentPost--;
	if(currentPost < 0) {
		currentPost = 0;
	}
	window.location.hash = newpp[currentPost].id;
}

style = document.createElement("STYLE");
style.type = "text/css";
style.innerHTML = css;
document.body.appendChild(style);

delete pp;
delete style;