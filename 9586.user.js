// ==UserScript==
// @name           Anti-Jassa
// @namespace      antijassa
// @include        http://syndicated.livejournal.com/

function RemoveComments()
{
	if (unsafeWindow.LJ_cmtinfo)
	{
		var LJ_cmtinfo = unsafeWindow.LJ_cmtinfo;
		var x,y;

		for (x in LJ_cmtinfo)
		{
			if (	LJ_cmtinfo[x]["u"] == "jassalol"	||
				LJ_cmtinfo[x]["u"] == "quietgladness"  ||
				LJ_cmtinfo[x]["u"] == "wakingdreaming"	)
			{
				RemoveComment(x);
			}
		}
	}
	
	var allTables, thisTable;
	allTables = document.evaluate(
		"//table[@class='talk-comment']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allTables.snapshotLength; i++)
	{
		thisTable = allTables.snapshotItem(i);

		if (
			thisTable.innerHTML.search("Wow, it's funny how there's only one response to the comic itself and the other eighteen comments that are up at the moment are about unfunny memes and some need to be first or second to comment.")>=0 ||
			thisTable.innerHTML.search("Question. Why? What's the point? Why does it matter if you're second to comment? Why is it so important to keep posting that really, really boring and repetitive potato video? Most of all, \"boobies\"?")>=0 ||
			thisTable.innerHTML.search("Granted, you can do whatever you want. I'm not stopping you, nor do I have the power to. I just think it's interesting that you guys don't seem to care about the comic so much as you do turning the comment box into another 4chan.org.")>=0)
		{
			var CommentID=thisTable.id.substr(5);
			RemoveComment(CommentID);
		}
	}
}


function RemoveComment(x)
{
	var LJ_cmtinfo = unsafeWindow.LJ_cmtinfo;
	
	var Anchor = document.getElementsByName('t'+x);
	
	if (Anchor)
	{
		var a;
		for (a in Anchor)
		{
			var Comment = Anchor[a].nextSibling;
			if (Comment)
			{
				Comment.parentNode.removeChild(Comment);
				var y;
				for (y in LJ_cmtinfo[x]["rc"])
				{
					RemoveComment(LJ_cmtinfo[x]["rc"][y]);
				}
			}
		}
	}
}

window.setTimeout(function() { RemoveComments(); }, 500);

// ==/UserScript==
