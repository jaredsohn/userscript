
// ==UserScript==
// @author         bodinho
// @name           Teracod dereferer kiiktatás
// @version        1.0
// @description    Az összes linkből kiszedi a http://dereferer.org címet. 
// @include        http://teracod.com/*
// @grant          none
// ==/UserScript==



$("a.bb-url").each(function() {
var id = $(this).attr("href").replace("http://dereferer.org/?", "");
$(this).attr("href", id);
});

var link;
link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
    link[i].href = link[i].href.replace("http://dereferer.org/?", "");
}