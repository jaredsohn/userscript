// ==UserScript==
// @name           hwm_chat_room
// @namespace      Demin
// @description    HWM mod - hwm_chat_room (by Demin)
// @homepage       http://userscripts.org/scripts/show/92565
// @version        1.04
// @include        http://*heroeswm.*/frames.php?room=2
// @include        http://178.248.235.15/frames.php?room=2
// @include        http://173.231.37.114/frames.php?room=2
// @include        http://*freebsd-help.org/frames.php?room=2
// @include        http://*heroes-wm.*/frames.php?room=2
// @include        http://*hommkingdoms.info/frames.php?room=2
// @include        http://*hmmkingdoms.com/frames.php?room=2
// @include        http://*герои.рф/frames.php?room=2
// @include        http://*.lordswm.*/frames.php?room=2
// ==/UserScript==

// (c) 2010-2011, demin  (http://www.heroeswm.ru/pl_info.php?id=15091)

var version = '1.04';

var a = document.getElementsByName( 'main' );
if ( a[0] && a[0].parentNode ) {
a[0].parentNode.innerHTML = a[0].parentNode.innerHTML.split("\"home.php\"").join("\"inventory.php\"");
}
