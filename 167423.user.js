
// ==UserScript==
// @name      highlight-bt-nuclear-ww3-download-link
// @match      http://97.99bitgongchang.org/p2p/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==


a = $("a:contains('html')")
b = $("a:[href*=www3]")

wuma = a.filter(function() {
        return this.href.match(/www3.*html/);
    })

wuma.css("color","red")
wuma.css("font-size","54pt")
   b.css("font-size","44pt")
   b.css("color","red")
