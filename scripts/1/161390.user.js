// ==UserScript==
// @id             2019
// @name           Fix Stupid Typography
// @version        1.0.1
// @namespace      
// @author         protospork
// @description    Exchanges moronic typographic glyphs for normal ASCII ones.
// @include        *
// @exclude        *reddit.com*
// @run-at         document-end
// ==/UserScript==

function unStupid(pg){
    for (i=0;i<pg.length;i++){
        text = pg[i].innerHTML;
        
        text = text.replace(/\u2018|\u2019|\u02BC|&#x201[89];|&#x02BC;/gi, "'"); //apostrophes
        text = text.replace(/\u201C|\u201D|\u201E|\u201F|&#x201[C-F];/g, '"'); //quotes
        
        pg[i].innerHTML = text;
    }
}

var pg = document.getElementsByTagName('p');

unStupid(pg);