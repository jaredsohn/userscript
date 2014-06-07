// ==UserScript==
// @name           Move Jimmy's message on Wikipedia
// @namespace      http://satomacoto.blogspot.com/
// @include        http://*.wikipedia.org/*
// @include        http://*.wikitionary.org/*
// @include        http://*.wikinews.org/*
// @include        http://*.wikiquote.org/*
// @include        http://*.wikispecies.org/*
// @include        http://*.wikisource.org/*
// @include        http://*.wikiversity.org/*
// @include        http://*.wikibooks.org/*
// @include        http://*.wikimedia.org/*
// @description    
// ==/UserScript==

(function(){
    var content = document.getElementById("content");
    var siteNotice = document.getElementById("siteNotice");
    content.removeChild(siteNotice);
    content.appendChild(siteNotice); // don't comment out this line, or Jimmy will go away!
})();