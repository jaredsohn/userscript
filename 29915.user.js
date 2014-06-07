// ==UserScript==
// @name           sueddeutsche.de cleanup
// @description    entfernt rechte Spalte und zieht den Artikel auf die ganze Breite
// @namespace      http://boeckler.org/greasemonkey
// @include        http://www.sueddeutsche.de/*/artikel/*/*
// @include        http://www.sueddeutsche.de/*/text/*
// @version        0.8
// ==/UserScript==


try {
    /*
     wir nutzen das SZ-Prototype (Ver 1.6.0)
     */
    if(typeof unsafeWindow != 'undefined') {
        Element = unsafeWindow['window'].Element;
        $ = unsafeWindow['window'].$;
        $$ = unsafeWindow['window'].$$;
        $A = unsafeWindow['window'].$A;
    }
    else {
        Element = window.Element;
        $ = window.$;
        $$ = window.$$;
        $A = window.$A;
    }


    var artikelNode = $('contentTable').select('div.content')[1];

    artikelNode.next().hide();

} catch(e) {
    //alert(e.message);
}
function myeach(iter, work) {
    for(var idx=0;idx<iter.length; idx++) {
        var el = iter[idx];
        work(el);
    }
}

myeach($$('.bannerSky, #googleAdSense, #qcsuperbanner, #qcsky, #bg_layer'), function(el) {
           Element.remove(el);
       });
myeach($$('div.sueddeutsche', '#artikel', '#special', '#contentTable','table.artikelBox', 'table.absatz', 'div.content'), function(el) {
           el.style.width = '99%';
       });

myeach($$('table.bgf2f2f2'),function(el) {
           try {
               el.removeAttribute('width');
           }catch (e) {}
       });
