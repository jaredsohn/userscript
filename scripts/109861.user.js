// ==UserScript==
// @name           4chan Chemo
// @namespace      Bento
// @description    just trying to remove cancer.
// @include        http://*.4chan.org/*
// @version        0.1
// @license        Beerware
// ==/UserScript==
const spam = new Array("rune",
"THIS IS THE THREAD THAT NEVER ENDS",
"1532345",
"yes it goes on and on my friends",             
"1532344",
"ccc",
"synchtube",
"diaper",
"byethost",
"Hanna12_and_Mark18.rar",
"daughter_and_father_russian.rar",
"cheating-ex",
"liamrosen");
var posts = document.getElementsByTagName("blockquote"), post, pInner;
for(var i = posts.length - 1; i >=0; --i) {
	post = posts[i];
	pInner = post.innerHTML;
	for(var a = spam.length - 1; a >= 0; --a) if(pInner.indexOf(spam[a]) >= 0) {
		post.title = post.textContent;
		post.innerHTML =  "{Cancer detected, post was deleted, roll over to read the blocked content}";
		post.setAttribute("style", "background-color: black; font-weight: bold; color: white; -moz-border-radius: 5px 5px 5px 5px;");
		break;
	}
}