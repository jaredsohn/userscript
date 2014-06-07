// ==UserScript==
// @name			Auto Like Facebook
// @namespace		        Auto_like_facebook
// @description		        Auto Like By Arif Rahman Hakim
// @author			Arif Rahman Hakim
// @authorURL		        http://www.facebook.com/iif97
// @homepage		        http://userscripts.org/iif97
// @include			htt*://www.hackforums.net/*
// @version			1.1.0
// @grant       none
// ==/UserScript==
// ==============
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://cdn2.hackforums.net/images/blackreign/groupimages/english/hf_l33t.png") {
         ilist[i].src = "http://i.minus.com/ieF7N7WNk5zde.gif";
    }
}