// ==UserScript==
// @name           Pardus IC chat remover
// @namespace      pardus.at
// @description    Removes the IC chat tab 
// @include        http://chat.pardus.at/chat.php*
// @version        0.1
// @author         John Wu
// ==/UserScript==

var chat_tab = document.getElementsByClassName('tabcontent');
chat_tab[1].removeAttribute('style');
chat_tab[1].innerHTML = '';
chat_tab[1].removeAttribute('onmousedown');
chat_tab[1].removeAttribute('onmouseover');
chat_tab[1].removeAttribute('onmouseout');