// ==UserScript==
// @name                   WARforum Warserver Ad Remover
// @description            Removes annoying Warserver.cz advertise above code tags on warforum.cz.
// @details                Removes annoying Warserver.cz advertise above code tags on warforum.cz.
// @namespace              http://www.warforum.cz/scripts
// @include 			   http://www.warforum.cz/viewtopic.php?t=*
// @include 			   http://www.warforum.cz/viewtopic.php?p=*
// @include 			   http://www.warforum.cz/modcp.php?t=*
// @include 			   http://www.warforum.cz/modcp.php?mode=split*
// @include 			   http://www.warforum.cz/search.php?search_author=*
// @include 			   http://www.warforum.cz/search.php?search_id=*
// @version                1.0
// @author		           dkitty <a href="http://userscripts.org/users/dkitty">http://userscripts.org/users/dkitty</a>
// ==/UserScript==

var ads = document.evaluate("//a[parent::strong and contains(@href, 'http://www.warforum.cz/viewtopic.php?p=11193772#11193772')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var adIdx = ads.snapshotLength;
var ad;

while(adIdx--)
{
	ads.snapshotItem(adIdx).parentNode.innerHTML = 'kód:';	
}
