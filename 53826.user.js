// ==UserScript==
// @name           Darkwater
// @namespace      smashboards
// @description    makes darkwaters posts less dumb
// @include        http://www.smashboards.com/showthread.php*
// ==/UserScript==

var Darkwater_ID = 135859;

function get_post(profile_link)
{
	var node = profile_link;
	while (node.getAttribute ('class') != 'tborder') { node = node.parentNode; }
	return node;
}

var profile_links = document.evaluate("//a[@class='bigusername'][contains(concat(@href, 'END'), 'member.php?u=" + Darkwater_ID + "END')]",document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i<profile_links.snapshotLength; i++)
{
	var post = get_post(profile_links.snapshotItem(i));
	var body = post.getElementsByClassName("alt1 post_msg")[0];
	body.innerHTML = "HURF DURF I AM STUPID";
}