// MySpace Contact Links in Message
// by mrk (bbzmark{at}gmail)
//
// ==UserScript==
// @name	MySpace Contact Links in Message
// @namespace	http://bbzspace.com
// @description	Adds some contact links to received mails.
// @include	http://mail.myspace.com/index.cfm?fuseaction=mail.readmessage*
// ==/UserScript==

if (document.forms.length > 0) {


	var pro = document.evaluate( "//span[@class=\"text\"]//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var pl = pro.snapshotItem(0);
	var friendID = pl.href.split("friendID=");
	
	var addUsr = "http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID="+friendID[1];
	var blkUsr = "http://collect.myspace.com/index.cfm?fuseaction=block.blockUser&userID="+friendID[1];
	var favUsr = "http://collect.myspace.com/index.cfm?fuseaction=user.addToFavorite&friendID="+friendID[1]+"&public=0";

	var sTag = document.evaluate( "//td[2]//span[@class=\"text\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var dNspan = sTag.snapshotItem(0);

	newAdd = document.createElement('a');
	newAdd.href = addUsr;
	newAdd.innerHTML = 'Add to Friend';
	dNspan.parentNode.appendChild(newAdd);
	
	pipeOne = document.createElement('span');
	pipeOne.innerHTML = ' | ';
	dNspan.parentNode.appendChild(pipeOne);

	newFavs = document.createElement('a');
	newFavs.href = favUsr;
	newFavs.innerHTML = 'Add To Favorites';
	dNspan.parentNode.appendChild(newFavs);

	pipeTwo = document.createElement('span');
	pipeTwo.innerHTML = ' | ';
	dNspan.parentNode.appendChild(pipeTwo);

	newBlock = document.createElement('a');
	newBlock.href = blkUsr;
	newBlock.innerHTML = 'Block User';
	dNspan.parentNode.appendChild(newBlock);
}
