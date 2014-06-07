// ==UserScript==
// @name           HKG Ads Block
// @include http://forum*.hkgolden.com/*
// ==/UserScript==
d_list = document.getElementsByClassName('repliers_left');
for (i=0; i< d_list.length; i++){
    //console.log(d_list[i].childNodes[1].innerHTML);
    if (d_list[i].childNodes[1].innerHTML == "Google 提供的廣告"){
        d_list[i].parentNode.parentNode.parentNode.innerHTML="";
    }
}
	