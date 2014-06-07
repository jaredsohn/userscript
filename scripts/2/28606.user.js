// ==UserScript==
// @name CSFD ignore list pro diskuze
// @include http://www.csfd.cz/*diskuze*
// ==/UserScript==

var ignoreList = new Array('POMO', 'golfista', 'kleopatra', 'KevSpa', 'Houdini');

function removeDiscusionPosts()
{
	for(i = 0; i < ignoreList.length; i++)
	{
		var XPath = "//tr[(@bgcolor='' or @bgcolor='#eeeeee') and descendant::font='" + ignoreList[i] + "']";
		var nodes = document.evaluate(XPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		if(nodes.snapshotLength > 0)
		{
			for(j = 0; j < nodes.snapshotLength; j++)
			{
				nodes.snapshotItem(j).style.display = 'none';
			}
		}
	}
}

removeDiscusionPosts();
