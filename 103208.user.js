// ==UserScript==
// @name           Google Image Basic Search(Old Search)
// @description    Redirects Your Image Search to "basic version" of Google Images.To make it work click on search button on search result page again!
// @version        1.0
// @include        http://images.google.*/*
// @include        http://www.google.*/images?*
// @include        http://www.google.*/imghp*
// @include        http://www.google.*/*tbm=isch*
// @include        http://*.google.*/imgres?imgurl=*
// @exclude        http://*.google.*/*&sout=1*
// ==/UserScript==
window = stop ;
window.location = window.location + "&sout=1";
