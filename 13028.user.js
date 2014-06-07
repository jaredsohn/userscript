// ==UserScript==
// @name           GoTo Myspace Thread Pages
// @namespace      mark
// @include        http://forums.myspace.com/*
// @exclude	   http://forums.myspace.com/p/*
// @exclude	   http://forums.myspace.com/t/*
// @exclude	   http://forums.myspace.com/Reply*
// ==/UserScript==
// credits: this updated version was created by mark (myspace.com/xenomark)
// credits: based on parts of the original Myspace Forum Enhancer by Insane Ninja (http://userscripts.org/people/774)

var thisRow, thisFmLink, allFms;

allFms = document.evaluate('/HTML[1]/BODY[1]/DIV[1]/FORM[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/TABLE[1]/TBODY[1]/TR/TD[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/A[1]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allFms.snapshotLength; i++) 
	{
    		thisFmLink = allFms.snapshotItem(i);
		var thisRow = thisFmLink.parentNode.parentNode.parentNode.parentNode;
		var thislast = thisRow.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
		var topicCount = thislast.innerHTML;
		topicCount = topicCount.replace(/,/g,"");
		topicCount = ++topicCount;
       		if (topicCount > 15)
       		{
       			var loopCount = 0;
       			var topicPages = Math.ceil(topicCount/15);
       			var topicLinks = document.createElement('div');
       			var topicURL = thisFmLink.href;
       			for ( var j = topicPages-1; j >= 0; j-- )
       			{
               			topicLinks.innerHTML = ' <a href="'+topicURL+'&PageIndex=' + (j+1) + '" style="display:inline;visibility:visible;">' + (j+1) + '</a>' + topicLinks.innerHTML;
               			if (++loopCount == 3 && j > 3)
               			{
               				j = 3;
               				topicLinks.innerHTML = ' ..' + topicLinks.innerHTML;
               			}
       			}
       			topicLinks.innerHTML = 'Page: ' + topicLinks.innerHTML;
       			topicLinks.style.display = 'block';
       			topicLinks.style.visibility = 'visable';
       			thisRow.appendChild(topicLinks)
			thisRow.parentNode.insertBefore(topicLinks, thisRow.nextSibling);
 		}
	}


