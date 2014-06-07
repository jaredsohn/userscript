// ==UserScript==
// @name           modcp_addon
// @namespace      http://userscripts.org/users/60487
// @description    Drobna modyfikacja dzieki ktorej przy przenoszeniu tematu automatycznie jest zaznaczana opcja "Przesun"
// @include        http://board.ogame.onet.pl/modcp.php*
// ==/UserScript==
test = document.getElementsByName('mode');
test[0].checked = 'checked';
