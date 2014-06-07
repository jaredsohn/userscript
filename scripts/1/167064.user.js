// ==UserScript==
// @name        Mobile Facebook Pictures View Full Size URL Rewriter Never Force Download
// @description This script makes it so that when you're looking at pictures on m.facebook.com and click "View Full Size" for one of them, the image is displayed in your browser instead of [sometimes?] forcing you to download it.
// @include     http*://m.facebook.com/photo.php*
// @version     2
// @grant       none
// ==/UserScript==

var res = document.evaluate("//a[contains(text(),'View Full Size')]", document, null, 7, null);

if (res.snapshotLength > 0)
{
	current = res.snapshotItem(0);
	urlSplitAtQuestionMarks = current.href.split("?");
	questionMarkCount = urlSplitAtQuestionMarks.length;
	if(questionMarkCount == 2) //malformed if more than 2 so dgaf
	{
		nameValueArgs = urlSplitAtQuestionMarks[1].split("&");
		nameValueArgsLength = nameValueArgs.length;
		if(nameValueArgsLength == 1)
		{
			current.href = current.href.replace("?dl=1", "");
		}
		else if(nameValueArgsLength > 1)
		{
			rebuiltQueryWithoutDLequalsOne = "";
			var firstTimeInLoop = new Boolean(true);
			for(i=0;i<nameValueArgsLength;++i)
			{
				if(nameValueArgs[i] != "dl=1")
				{
					if(!firstTimeInLoop)
					{
						rebuiltQueryWithoutDLequalsOne += "&";
					}
					else
					{
						firstTimeInLoop = false;
					}
					rebuiltQueryWithoutDLequalsOne += nameValueArgs[i];					
				}			
			}
			newUrl = urlSplitAtQuestionMarks[0] + "?" + rebuiltQueryWithoutDLequalsOne;
			current.href = newUrl;
		}
	}
}
