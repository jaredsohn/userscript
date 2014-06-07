// ==UserScript==
// @name          modcp_move
// @description    Domyslnie zaznacz 'przenies' przy opcji przenies/kopiuj
// @include        http://board.ogame.onet.pl/modcp.php?action=thread_move*
// ==/UserScript==

przenies = document.getElementsById('radio1');

przenies.checked = checked;
