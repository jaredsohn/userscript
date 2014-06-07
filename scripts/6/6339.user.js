// ==UserScript==
// @name          MySpace - Group/Forum Enhancement
// @namespace     Insane Ninja - http://userscripts.org/people/774
// @homepage      http://userscripts.org/scripts/show/6339
// @description   2007-08-06 - Upgrades MySpace Groups/Forums with "quick reply", and direct page links. (Resurrected script, may not fully work right now)
// @include       *.myspace.com/*fuseaction=messageboard.*
// @include       *.myspace.com/*fuseaction=groups.*
// @include       http://groups.myspace.com/*
// ==/UserScript==

var enable_pagelinks    = true

var enable_quickreply   = true

var enable_betterreturn   = true

var enable_quickpost    = false // non-functional
var enable_backtopage   = false // non-functional

//
//****************************************************//
// DO NOT EDIT BELOW THIS
//****************************************************//
//

	function getArgs(  ) {
		var args = new Object(  );
		var query = location.search.substring(1).toLowerCase();     
		var pairs = query.split("&");
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos+1);
			args[argname] = unescape(value);
		}
		return args;
	} var args = getArgs(  );


// Start of script

if	(
		(args.fuseaction && (args.fuseaction.toLowerCase() == 'messageboard.viewcategory' || args.fuseaction.toLowerCase() == 'groups.groupprofile'))
		||
		document.location.href.match(/groups\.myspace\.com\/[A-z0-9_-]+$/)
	)
{

	if (enable_pagelinks)
	{
	var topicList = document.evaluate("//table[@id='catstbl']/tbody/tr|//table/tbody/tr[td/img[@src='http://x.myspace.com/images/folder_smll.gif']]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); // Created By myspace.com/InsaneNinja

	for (var snapshotIndex = 0; snapshotIndex < topicList.snapshotLength; ++snapshotIndex )
	{
		var tableRow = topicList.snapshotItem(snapshotIndex);
		var tableCells = tableRow.getElementsByTagName('td');
		var topicCount = tableCells[1].innerHTML.replace(/<[^>]+>/,'').replace(/[^0-9]+/,'');

		if (topicCount > 15)
		{
			var loopCount = 0;

			var topicPages = Math.ceil(topicCount/15);

			var topicLinks = document.createElement('span');

			var topicURL = tableCells[0].getElementsByTagName('a')[0].href;

			for ( var i = topicPages-1; i >= 0; i-- )
			{
				topicLinks.innerHTML = ' <a href="'+topicURL+'&page=' + i + '" style="display:inline;visibility:visible;">' + (i+1) + '</a>' + topicLinks.innerHTML;

				if (++loopCount == 3 && i > 3)
				{
					i = 3;
					topicLinks.innerHTML = ' ..' + topicLinks.innerHTML;
				}
			}

			topicLinks.innerHTML = 'Page: ' + topicLinks.innerHTML;

			topicLinks.style.display = 'block';
			topicLinks.style.visibility = 'visable';

			tableCells[0].appendChild(topicLinks)
		}
	}
	}
}
else if (args.fuseaction.toLowerCase() == 'messageboard.viewthread')
{
	if (enable_quickreply)
	{
		replyContainer = document.evaluate("//div[@id='forumctr']//p[@class='buttons']/a/img[contains(@src,'button_post_reply.gif')]/parent::*/parent::*", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); // Created By myspace.com/InsaneNinja

		for (var snapshotIndex = 0; snapshotIndex < replyContainer.snapshotLength; ++snapshotIndex )
		{
			var replyContainer = replyContainer.snapshotItem(snapshotIndex);

			var replyContainerDiv = document.createElement('div');

			replyContainerDiv.innerHTML =
				'<div style="margin-top: 20px;"><form method="post" action="'+ document.location.href.replace(/messageboard\.viewThread/i,'messageboard.previewReply') +'">'
			+	'<input type="hidden" name="adTopicID" value="'+args.adtopicid+'">'
			+	'<input type="hidden" name="EntryID" value="'+args.entryid+'">'
			+	(args.page?'<input type="hidden" name="page" value="'+args.page+'">':'')
			+	'<table id="replyform" '
			+	'class="MyS_quickreply" ' // used for applying styles
			+	'align="center" cellspacing="0" align="center"><thead><tr><th style="text-align:center;">Quick Reply</th></tr></thead>'
			+	'<tbody><tr><td align="center"><textarea name="body" id="body" rows="8" cols="60" ></textarea><br><br>'
			+	'<input type="image" title="Post Reply" alt="Post Reply" src="http://x.myspace.com/images/replyFormSubmit.gif">'
			+	'<p align="right"><a href="http://userscripts.org/scripts/show/6339" style="font-weight: normal; color: #CCC">MyS Enhancer</p>'
			+	'</td></tr></tbody></table>'
			+	'</form></div>';

			replyContainer.parentNode.replaceChild(replyContainerDiv,replyContainer)
		}
	}
}
else if (false && args.fuseaction.toLowerCase() == 'messageboard.previewreply' && args.page)
{
	if (enable_backtopage)
	{
		var previewForm = document.evaluate("//form[@name='previewReply']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); // Created By myspace.com/InsaneNinja

		if (previewForm.snapshotLength) previewForm.snapshotItem(0).action += '&page='+args.page;
	}
}
else if (enable_betterreturn && args.fuseaction.toLowerCase() == 'messageboard.posted')
{
	if (args.groupid > 2)
	{
		var tableRows = document.getElementById('postmade').getElementsByTagName('tr');

		if (tableRows[2].innerHTML.match(/Back to Group/i))
		{
			var tableRowNew = tableRows[2].cloneNode(true);

			var tableRowNewLink = tableRowNew.getElementsByTagName('a')[0];
				tableRowNewLink.href = tableRowNewLink.href.replace(/groups.groupProfile/i,'messageboard.viewCategory');
				tableRowNewLink.innerHTML = tableRowNewLink.innerHTML.replace('to Group','to Index');

			tableRows[0].parentNode.insertBefore(tableRowNew, tableRows[2]);
			tableRows[1].innerHTML = tableRows[1].innerHTML.replace('to Forum','to Topic');
		}
		else
		if (tableRows[1].innerHTML.match(/Back to Forum/i) || !tableRows[2])
		{
			alert(true);
			var tableRowNew = tableRows[1].cloneNode(true);

			var tableRowNewLink = tableRowNew.getElementsByTagName('a')[0];
				tableRowNewLink.href = tableRowNewLink.href.replace(/groups.groupProfile/i,'messageboard.viewCategory');
				tableRowNewLink.innerHTML = tableRowNewLink.innerHTML.replace('to Group','to Index');

			tableRows[0].parentNode.insertBefore(tableRowNew, tableRows[1]);
			tableRows[1].innerHTML = tableRows[1].innerHTML.replace('to Forum','to Topic');
		}
	}

// http://forum.myspace.com/index.cfm?
//fuseaction=messageboard.posted
//	&categoryID=86
//	&adTopicID=12
//	&returnPath=http%3A%2F%2Fforum.myspace.com%2Findex.cfm%3Ffuseaction%3Dmessageboard.viewThread%26EntryID%3D1588211%26categoryID%3D86
}



