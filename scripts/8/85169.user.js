// ==UserScript==
// @name           TriggerTG Avatar
// @namespace      http://userscripts.org/users/33073/scripts
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==

var imgs = document.evaluate("//tr[@username='TriggerTG']//img[starts-with(@src, './avatare/') and not(contains(@src, 'TriggerTG.gif'))]", document, null, 6, null);
for (var i=0; i<imgs.snapshotLength; i++) {
	imgs.snapshotItem(i).src = "/bb/avatare/TriggerTG.gif";
}