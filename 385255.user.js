// ==UserScript==
// @name       Mythtv Forums Tweaks
// @namespace  http://geekminute.com/
// @version    0.1
// @description  Clean up the phpbb layout some
// @match      https://forum.mythtv.org/*
// @copyright  2014+, Jon Heizer
// ==/UserScript==

//Float right the avatars
var avatars = document.evaluate("//a[contains(@href,'memberlist.php?mode=viewprofile&u=')]/img[contains(@alt,'User avatar')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < avatars.snapshotLength; i++)
{
	avatars.snapshotItem(i).style.cssFloat="right";
}