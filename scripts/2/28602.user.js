// ==UserScript==
// @name ČSFD ignore list
// @include http://www.csfd.cz/film/*
// ==/UserScript==

// priklad ignore listu
var ignoreList = new Array('POMO', 'golfista', 'kleopatra', 'KevSpa', 'Houdini');
// 

function removeComments()
{
	commentList = document.evaluate("//ul[@class='ui-posts-list']/li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(i = 0; i < commentList.snapshotLength; i++)
	{
		comment = commentList.snapshotItem(i);

		nickHeading = document.evaluate(".//h5[@class='author']", comment, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (nickHeading.snapshotLength) {
			nick = nickHeading.snapshotItem(0);

			for(j = 0; j < ignoreList.length; j++)
			{
			    try {
					if(nick.innerHTML.match(ignoreList[j]))
					{
						comment.style.display = 'none';
						break;
					}
				} catch (e) {
				    break;
				}
			}
		}
	}
}


function removeRatings()
{
	voteList = document.evaluate("//div[@id='ratings']/descendant::li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for(i = 0; i < voteList.snapshotLength; i++)
	{
		voteLI = voteList.snapshotItem(i);

		for(j = 0; j < ignoreList.length; j++)
		{
			try {
				if(voteLI.innerHTML.match(ignoreList[j]))
				{
					voteLI.style.display = 'none';
					break;
				}
			} catch (e) {
			    break;
			}
		}
	}
}

removeComments();
removeRatings();