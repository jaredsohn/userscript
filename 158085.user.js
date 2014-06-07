// ==UserScript==
// @name        Hf l33t to legion replacement. 
// @author 	beginnerhackingsection
// @namespace   http://userscripts.org/users/BeginnerHackingSection
// @include     http*://www.hackforums.net/*
// @version     1.2
// @description Changes the userbar
// @grant none
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://cdn2.hackforums.net/images/blackreign/groupimages/english/hf_l33t.png") {
         ilist[i].src = "http://i.minus.com/ieF7N7WNk5zde.gif";
    }
}

