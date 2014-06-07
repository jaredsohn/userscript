// ==UserScript==
// @name           sueddeutsche.de comments fix
// @namespace      http://boeckler.org/greasemonkey
// @include        http://www.sueddeutsche.de/*/artikel/*/*
// @include        http://www.sueddeutsche.de/*/text/*
// @version        0.5
// ==/UserScript==

/*
  wir nutzen das SZ-Prototype (Ver 1.6)
 */
if(typeof unsafeWindow != 'undefined') {
    $ = unsafeWindow['window'].$;
    $$ = unsafeWindow['window'].$$;
    Element = unsafeWindow['window'].Element;
    Event = unsafeWindow['window'].Event;
    Effect = unsafeWindow['window'].Effect;
    console = unsafeWindow['window'].console;
}
else {
    $ = window.$;
    $$ = window.$$;
    Element = window.Element;
    Event = window.Event;
    Effect = window.Effect;
}

function myeach(iter, work) {
    for(var idx=0;idx<iter.length; idx++) {
        var el = iter[idx];
        work(el);
    }
} 

if($('btn-toggle-comments')) {
    var parentNode =  $('btn-toggle-comments').up();
    parentNode.previous(0).hide();
    parentNode.previous(1).hide();
    parentNode.hide();
    $('further-comments-block').show();
    
    myeach($$('div.imgCommunity'),Element.hide);
    myeach($$('.userText'), Element.hide);

    myeach($$('.textCommunity p.ueberschrift'), function(el) {
            var link = document.createElement("a");
            link.href = 'javascript:void(0)';
            link.style.backgroundColor = 'green';
            link.style.color = 'white';
            var text = document.createTextNode("show/hide");
            link.appendChild(text);
            el.appendChild(link);
            //link.setStyle({ cursor: 'pointer'});
            Event.observe(link, 'click', function titleClick(event) {
                    el.up().getElementsBySelector('.userText').each( Element.toggle);
                }
                );
        });
}

var pager = $$('table.pagerArtikel')[0];
if(pager) {
    var myparent = pager.up();
    var block = $('kommentarBlock');
    myparent.insertBefore(pager.cloneNode(true), block);
}
