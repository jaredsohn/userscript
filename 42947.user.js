// ==UserScript==
// @name           ja-googling
// @namespace      http://www.yaotti.net
// @description    search with google.co.jp at google.com
// @include        http://google.com/*
// @include        http://www.google.com/*
// ==/UserScript==

(function(){
    var parentnode = document.evaluate("//*[@id='sff']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var jabutton = document.createElement('input');
    jabutton.type = "button";
    jabutton.value = "Search with google.co.jp";
    jabutton.id = "jabutton";
    jabutton.addEventListener('click', function(){
        var query = document.evaluate("//*[@name='q']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;
        location.href = "http://www.google.co.jp/search?q="+encodeURIComponent(query);
    }, true);
    parentnode.appendChild(jabutton);
})();
