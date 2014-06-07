// ==UserScript==
// @name UseGoogleWebHistory.FireFox
// @author mallowlabs
// @namespace http://mallowlabs.s206.xrea.com/
// @version 0.0.2
// @license public domain
// @description : Enable Google Web History
// @published 2007-01-05
// @modified 2006-01-05
// @include *
// @exclude http://www.google.tld/search?*
// @exclude http://images.google.tld/images?*
// @exclude http://maps.google.tld/maps?*
// @exclude http://news.google.tld/news?*
// @exclude http://www.google.tld/products?*
// @exclude http://video.google.tld/*
// @exclude http://books.google.tld/books?*
// @exclude http://blogsearch.google.tld/blogsearch?*
// @exclude http://www.google.tld/history/*
// @exclude https://*
// ==/UserScript==

// see also
// http://www.scss.com.au/family/andrew/opera/panels/pagerank/
// http://d.hatena.ne.jp/amatanoyo/20080104/1199450996
// =========================================
(function(){

    if (window.self != window.parent) return;

    var url=document.location;

    var img=new Image();

    img.src='http://toolbarqueries.google.com/tbr?client=navclient-auto&q=info:'+escape(url);
})();
