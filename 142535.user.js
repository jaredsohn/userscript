// ==UserScript==
// @id             forums.xonotic.org-41f35583-d798-428e-961d-d594cd38b253@scriptish
// @name           Minimal Xonotic Badges
// @version        0.1.03
// @author         Mr. Bougo
// @license        GPLv2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @description    Makes all Xonotic player badges use the minimal theme in signatures
// @include        http://forums.xonotic.org/*
// @run-at         document-end
// ==/UserScript==

badgeSnapshot = document.evaluate('//div[@class="post_signature"]//img[starts-with(@src,"http://stats.xonotic.org/static/badges")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(let i=0 ; i < badgeSnapshot.snapshotLength ; i++) {
	let badge = badgeSnapshot.snapshotItem(i);	
	badge.src = badge.src.replace(/^http:\/\/stats\.xonotic\.org\/static\/badges(?:\/archer)?\/([0-9]+\.png)$/, "http://stats.xonotic.org/static/badges/minimal/$1");
}