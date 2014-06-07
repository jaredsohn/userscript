// ==UserScript==
// @name           onlySeeCompatible
// @namespace      vampirefreaks.com/possumboy
// @description    Makes addons.mozilla.org only show firefox addons that are compatible with your version of firefox.
// @include        https://addons.mozilla.org/*/firefox/browse/*
// @include        https://addons.mozilla.org/*/firefox/search?q=*
// @version        0.1
// ==/UserScript==

p = document.getElementsByTagName("div");
for(i=0; i<=p.length; i++){
if(p[i].id.match("orig-")){
if(p[i].style.display == "none"){
p[i].parentNode.parentNode.style.display = "none";
}
}
}