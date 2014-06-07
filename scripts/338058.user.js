// ==UserScript==
// @name           Promoções tweaks + preload boteco
// @author         drag.hm
// @version        0.2
// @description    pré-renderiza (pré-carrega) o boteco, quando entra na área de promoções
// @include        http://www.hardmob.com.br/promocoes/
// @run-at         document-end

// ==/UserScript==

window.scrollBy(0,246);
document.getElementsByClassName("below_body")[0].innerHTML+='<link rel="prerender" href="http://www.hardmob.com.br/boteco-hardmob/">';