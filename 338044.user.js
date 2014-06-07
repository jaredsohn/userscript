// ==UserScript==
// @name           Boteco tweaks + preload promoções
// @author         drag.hm
// @version        0.2
// @description    pré-renderiza (pré-carrega) a área de promoções, quando entra no boteco
// @include        http://www.hardmob.com.br/boteco-hardmob/
// @run-at         document-end

// ==/UserScript==

window.scrollBy(0,246);
document.getElementsByClassName("below_body")[0].innerHTML+='<link rel="prerender" href="http://www.hardmob.com.br/promocoes/">';