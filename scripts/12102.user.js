// ==UserScript==
// @name           youtube block user
// @namespace      http://home.comcast.net/~teridon73
// @description    Removes thumbnails of videos from blocked users
// @include        http://www.youtube.com/browse*
// ==/UserScript==

var log = false;

var hideuserstring = GM_getValue("youtubeblockusers", "");
if (hideuserstring.length == 0) {
	GM_setValue("youtubeblockusers", "");
}

var hideusers = hideuserstring.split("|");

var header = document.getElementById("sectionHeader");
var cells = document.evaluate("//div[contains(@class, 'vlcell')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

if (log) {
	GM_log ("number of cells: " + cells.snapshotLength);
}

for (var i = 0; i < cells.snapshotLength; i++) {
	div = cells.snapshotItem(i);
	if (log) { GM_log("classname is " + div.className); }

	var user_hrefs = document.evaluate("*/*/*/span[@class='vlfrom']/a[@href]" , 
		div, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 	if (log) { GM_log("user_hrefs length is " + user_hrefs.snapshotLength);}
	
 	if (log) { GM_log("user_hrefs html is " + user_hrefs.snapshotItem(0).href); }
	var html_user = user_hrefs.snapshotItem(0).href;
	
	var tokens = html_user.split('/');
	var user = tokens[(tokens.length - 1)];

 	if (log) { GM_log("user is " + user); }

	if (hideuserstring.length != 0 ) {
		for (var j = 0; j < hideusers.length; j++)
		{
			if (user.indexOf(hideusers[j]) != -1)
			{
				div.style.display="none";
				if (log) {
					GM_log("Hid story based on username("+ hideusers[j] +"): " + user);
				}
				break;
			}
		}
	}
}
