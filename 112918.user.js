// ==UserScript==
// @name           WestHelps Button
// @namespace      http://west-helps.blogspot.com
// @description    WestHelps Button
// @include        http://*.the-west.*/game.php*
// ==/UserScript==

var button = document.createElement('a');
button.innerHTML = '<img id="button_unten" alt="" src="http://1.bp.blogspot.com/-fpVcsL_qgD0/Tm5cN81FDcI/AAAAAAAAAzg/Pq-7G7MOl94/s1600/botaowest+helps.png" />';
document.getElementById('footer_menu_right').insertBefore(button, document.getElementById('footer_menu_right').firstChild);
button.href = "http://west-helps.blogspot.com";
button.target="_blank";