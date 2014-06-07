// ==UserScript==
// @name           mods.de - fast forward
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @description    leitet gleich zum eigenen reply/thread weiter
// @include        http://forum.mods.de/bb/newreply.php*
// @include        http://forum.mods.de/bb/newthread.php*
// ==/UserScript==


location.href = document.evaluate("//a[@class='notice' and contains(., 'Zu deinem')]", document, null, 8, null).singleNodeValue.href;
