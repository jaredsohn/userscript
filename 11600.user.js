// ==UserScript==
// @name           Ruhrstadion
// @namespace      none
// @description    Replaces 'rewirpowerstadion' with 'Ruhrstadion' on vfl4u.de,  vfl-bochum.de, wecotec (liveticker server)
// @description    and bobbiklub.de; Replaces now also the "Malvorlagen" on bobbiklub.de
// @description    Ersetzt 'rewirpowerstadion' mit 'Ruhrstadion' auf den Seiten vfl4u.de, vfl-bochum.de, wecotec
// @description	   (liveticker server)  und bobbiklub.de; Ersetzt jetzt auch die Malvorlagen auf bobbiklub.de
// @include        http://*vfl4u*
// @include        http://*vfl-bochum*
// @include        http://*meinvfl*
// @include        http://*bobbiklub.*
// @include        http://*.wecotec*
//
// ==/UserScript==
// Geändertes Originalscript "Harry is an idiot" von http://manuelseeger.de


(function () {
temp_body = String(document.body.innerHTML);
document.body.innerHTML = temp_body
.replace(/rewirpower-stadion|rewirpower%20-%20stadion|rewirpower%20STADION|rewirpower.tadion|rewirpowerSTADION/gi, 'Ruhrstadion')
.replace('../gif/bobbiklub_malvorlage_01.gif','http://home.arcor.de/lordxxl/vfl/bobbiklub_malvorlage_01.gif')
.replace('../download/bobbiklub_malvorlage_01.jpg','http://home.arcor.de/lordxxl/vfl/bobbiklub_malvorlage_01.jpg')
.replace('../gif/teaser_tickets_ueber_rST.gif','http://home.arcor.de/lordxxl/vfl/teaser_tickets_ueber_rST.gif')
.replace('gif/stadion.gif','http://www.vfl-bochum.de/vfl2005/tickets/gif/stadion.gif');
})();



