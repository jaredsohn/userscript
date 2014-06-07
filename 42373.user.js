// ==UserScript==
// @name           BattleLinks
// @namespace      hwmHome
// @include        http://www.heroeswm.ru/*
// @exclude        http://www.heroeswm.ru/bselect.php*
// @exclude        http://www.heroeswm.ru/forum.php*
// @exclude        http://www.heroeswm.ru/forum_thread.php*
// @exclude        http://www.heroeswm.ru/forum_messages.php*

var a = document.getElementsByTagName('a');
var el;

for (var i = 0; i < a.length; i++) {
    el = a[i];
    if (el.href.indexOf('/warlog.php?warid=') >= 0) {
        ba = document.createElement('a');
        ba.href = el.href.replace("warlog.php", "battlechat.php");
        ba.innerHTML = '&nbsp;[chat]';
        
        sa = document.createElement('a');
        sa.href = el.href;// или sa.href = el.href + '&lt=-1';
        sa.innerHTML = '&nbsp;[#]';
        
        el.href = el.href + '&lt=-1'; // или закоментировать
        el.parentNode.insertBefore(ba, el.nextSibling);
        el.parentNode.insertBefore(sa, el.nextSibling);
        
        i += 2;
    }
}
// ==/UserScript==