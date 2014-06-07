// ==UserScript==
// @name           HKG GroupBuy Ads Block
// @include http://forum*.hkgolden.com/*
// ==/UserScript==
d_list = document.getElementsByClassName('DivResizableBoxContainer');
for (i=0; i< d_list.length; i++){
     d_list[i].innerHTML="";
}