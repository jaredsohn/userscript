// ==UserScript==
// @name           Invisionfree (The Fanfic Forum) Ignore list
// @namespace      Ren Po Ken
// @description    Ignore List for The Fanfiction Forum
// @include        http://z14.invisionfree.com/The_Fanfiction_Forum/*
// ==/UserScript==

var ignoreList = new Array(); //Add people to the ignore list here
//Format is:	var ignoreList = new Array("ignored dude 1", "ignored dude 2", "etc.");
if (ignoreList.length!=0)
	{for (LCV=0; LCV<ignoreList.length; LCV++)
		{var xpathString = "//a [contains (.,'"+ignoreList[LCV]+"')]/ancestor::table";
		var deleteTables = document.evaluate(xpathString, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (deleteTables.snapshotLength>0)
			{for (LCV2=0; LCV2<deleteTables.snapshotLength; LCV2++)
				deleteTables.snapshotItem(LCV2).parentNode.removeChild(deleteTables.snapshotItem(LCV2));
		}
	}
}