// ==UserScript==
// @name           youtube block user v0
// @namespace      http://localhost
// @description    Removes thumbnails of videos from blocked users
// @include        http://*.youtube.com/browse*
// ==/UserScript==

/*
CHANGELOG
=========
Version 0
  - bob2005euro copied from teridon to test: more include, set log true
  - changed v120vEntry to vlentry
  - use "div[@class='vlfacets']/div/div[2]/div[2]/span[2]/a/text()"
  - changed "@" namespace from http://home.comcast.net/~teridon73 to http://localhost
*/

var log = true; // false;

var hideuserstring = GM_getValue("youtubeblockusers", "");
if (hideuserstring.length == 0) {
	GM_setValue("youtubeblockusers", "");
}

var hideusers = hideuserstring.split("|");

var header = document.getElementById("sectionHeader");
var cells = document.evaluate("//div[contains(@class, 'vlentry')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
// XPath of vlcell is   /html/body/div/div[6]/div/div[3]/table/tbody/tr/td/div
// XPath of vlentry is  /html/body/div/div[6]/div/div[3]/table/tbody/tr/td/div/div
// XPath of vlfacets is /html/body/div/div[6]/div/div[3]/table/tbody/tr/td/div/div/div[2]
// XPath of vlfrom is   /html/body/div/div[6]/div/div[3]/table/tbody/tr/td/div/div/div[2]/div[2]/span[2]

if (log) {
	GM_log ("number of cells: " + cells.snapshotLength);
}

for (var i = 0; i < cells.snapshotLength; i++) {
	div = cells.snapshotItem(i);
	if (log) { GM_log("classname is " + div.className); } // vlcell?
	// if (log) { GM_log("div.div.classname is " + div.div.className); } // vlentry?
	// if (log) { GM_log("div.div.div.classname is " + div.div.div.className); } // vlcontainer?

	// /html/body/div/div[6]/div/div[3]/table/tbody/tr/td/div/div/div[2]/div[2]/span[2]/a
	// /div[2]/span[2]/a

	var user = document.evaluate("div[@class='vlfacets']/div/div[2]/div[2]/span[2]/a/text()" , div, null, XPathResult.STRING_TYPE, null).stringValue;
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
