// ==UserScript==
// @name dailyyeah.com enlarger
// @author panda
// @description  enlarge thumb in dailyyeah.com automatically
// @create 2011-05-05
// @lastmodified 2011-05-05
// @version 1.0.0.0
// @namespace  http://userscripts.org/users/77040
// @download  http://userscripts.org/scripts/show/102296
// @include http://dailyyeah.com/*
// @include http://dailyyeah.com/*
// @include http://dailyyeah.com/?s=korean+comics
// ==/UserScript==

var onloadFunction = function() {
//document.body.innerHTML = document.body.innerHTML.replace(/http:\/\/dailyyeah\.com\/wp-content\/gallery\/(.*)\/thumbs\/thumbs_(.*)/i, 'http://dailyyeah.com/wp-content/gallery/$1/$2');

l = document.getElementsByTagName('div');
alert(l.length);
	for(i=0;i<l.length;i++) {
		if(l[i].className == 'ngg-gallery-thumbnail') {
		l[i].getElementsByTagName('img')[0].src = l[i].getElementsByTagName('a')[0].href;
		}                    
	}
}

window.addEventListener("load", onloadFunction, true);