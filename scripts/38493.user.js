// ==UserScript==
// @name           Killfile with thread support for LJ
// @namespace      killfilelj
// @include        http://*.livejournal.com/*

// put your shit list here :)
var banned_commenters = new Array("username1","username2","username3");

function RemoveComments()
{
	if (unsafeWindow.LJ_cmtinfo)
	{
		var LJ_cmtinfo = unsafeWindow.LJ_cmtinfo;
		var x,z;

		for (x in LJ_cmtinfo)
		{
			for(z in banned_commenters) {
				if(LJ_cmtinfo[x]["u"] == banned_commenters[z]) {
					RemoveComment(x);
				}
			}
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
