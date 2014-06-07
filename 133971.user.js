// ==UserScript==
// @name           TumKoseYazilari.com Minibar
// @namespace      tumkoseyazilari
// @description    TumKoseYazilari.com'da üstteki barı küçültür, siteye doğrudan gitmek için barı kapat düğmesi ekler.
// @author         sanilunlu
// @include        http://*tumkoseyazilari.com/*/*/*
// @version        1.0
// ==/UserScript==

document.onload = function() {
    document.getElementsByTagName('frameset')[0].rows = "70px, *";
}

setTimeout(document.onload, 3000);
