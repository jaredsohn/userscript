// ==UserScript==
// @name           Nexus Clash Default Prayer is for Magic
// @namespace      http://userscripts.org/users/125692
// @description    Makes default prayer be for magic
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// @grant none
// @version     1
// ==/UserScript==
(function() {
//Tweak for shephards make the default prayer be for magic.
var prayerdropdown= document.evaluate("//select[@name='prayertype']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);//find prayer select
if (prayerdropdown.snapshotLength==1){//if can find prayer dropdown set magic as the selected option.
    prayerdropdown.snapshotItem(0).selectedIndex=4;
}
//EOF
})();