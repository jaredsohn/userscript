// ==UserScript==
// @name           Texags Goblets
// @namespace      bmc13texagsgoblets
// @description    Version 2.2.1
// @icon		   data:image/png;base64,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
// @include        http://www.texags.com/main/*
// @include        http://texags.com/main/*
// @include        http://*.texags.com/main/*
// @include        https://www.texags.com/main/*
// @include        https://texags.com/main/*
// @include        https://*.texags.com/main/*
// ==/UserScript==


/*      the code is largely based on GigEmAggies06 and/or Brad Lambeth's TexAgs Enchancements        */ 
/*      extensions, and much credit should be given to them                                          */
/*      https://github.com/bradlambeth/TexAgsEnhancements                                            */
/*      http://userscripts.org/scripts/show/11285                                                    */


console.log('-------------------------------------------------------------');
console.log('adding goblets');

/*********  USER-DEFINED VARIABLES  ***********/
/**********************************************/

function getElementsByClass(searchClass,node,tag) 
{
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var testReply = /postreply/;
var testPost = /posttopic/;
var testPM = /privatemessage.postmessage/;
var testEdit = /replyedit/;
var testTopic = /forum.topic/;
var testThread = /forum.reply/;
var testBCSTopic = /Topics/;
var testBCSThread = /Replies/;
var testForumLinks = /forum.main/;

var url = window.location.href;

if (	testThread.test(url) 
	&& !testReply.test(url) 
	&& !testPost.test(url) 
	&& !testPM.test(url)
	&& !testEdit.test(url)
	&& !testTopic.test(url)
	&& !testBCSTopic.test(url)
	&& !testBCSThread.test(url)
	&& !testForumLinks.test(url))
{
	var thisAnchor, userLevelImgLink, userName, agTagImgNode;
	var insertAfterThis;
	var allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	console.log("num names: " + allAnchors.snapshotLength);
	var line = 0;
	for (var i = 0; i < allAnchors.snapshotLength; i++) 
	{
		var line = 0;
		try
		{
			thisAnchor = allAnchors.snapshotItem(i);
			// make sure the anchor we're dealing with is a user name and not something else //
			if(thisAnchor.name[0] == 'r')
			{
				userLevelImgLink = thisAnchor.parentNode.nextSibling.childNodes[1];
				//console.log(userLevelImgLink.innerHTML);
				userName = thisAnchor.childNodes[0].innerHTML.toUpperCase();
				//console.log(userLevelImgLink);
				/* find ag tag, if it exists */				
				if(userLevelImgLink.parentNode.innerHTML.indexOf('maroon_ag') >= 0)
				{
					agTagImgNode = userLevelImgLink.nextSibling;
					insertAfterThis = agTagImgNode;
				}
				else
				{
					insertAfterThis = userLevelImgLink;
				}
				//console.log(insertAfterThis);
				
				line = 0;
				/* goblet section */
				if( "GAMBOCHAMAN" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var gamboGoblet = document.createElement('img');
					line++;
					gamboGoblet.src = 'http://texags.com/images/forum/victorygoblet.2.gif';
					line++;
					gamboGoblet.title = 'Vicotry Goblet: 2nd Place, something goes here';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(gamboGoblet, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(gamboGoblet, null);
					line++;
					}
				}
				else if( "TOUCAN82" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var toocanGoblet = document.createElement('img');
					line++;
					toocanGoblet.src = 'http://texags.com/images/forum/victorygoblet.5.gif';
					line++;
					toocanGoblet.title = 'Vicotry Goblet: 5th Place, Pickoff Contest 2010';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(toocanGoblet, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(toocanGoblet, null);
					line++;
					}
				}
				else if( "TREE HUGGER" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var thuggerGoblet = document.createElement('img');
					line++;
					thuggerGoblet.src = 'http://texags.com/images/forum/victorygoblet.10.gif';
					line++;
					thuggerGoblet.title = 'Vicotry Goblet: xth Place, March Madness 2010';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(thuggerGoblet, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(thuggerGoblet, null);
					line++;
					}
				}
				else if( "JJXVI" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var mm201001 = document.createElement('img');
					line++;
					mm201001.src = 'http://texags.com/images/forum/victorygoblet.1.gif';
					line++;
					mm201001.title = 'Vicotry Goblet: 1st Place, March Madness 2010';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(mm201001, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(mm201001, null);
					line++;
					}
				}
				else if( "TREX01" == userName || "BLUECAT_AGGIE94" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var mm201101 = document.createElement('img');
					line++;
					mm201101.src = 'http://texags.com/images/forum/victorygoblet.1.gif';
					line++;
					mm201101.title = 'Vicotry Goblet: 1st Place, March Madness 2011';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(mm201101, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(mm201101, null);
					line++;
					}
				}
				else if( "SETHAGS" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var mm201103 = document.createElement('img');
					line++;
					mm201103.src = 'http://texags.com/images/forum/victorygoblet.3.gif';
					line++;
					mm201103.title = 'Vicotry Goblet: 3rd Place, March Madness 2011';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(mm201103, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(mm201103, null);
					line++;
					}
				}
				else if( "JEFF GEORGE" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var mm201104 = document.createElement('img');
					line++;
					mm201104.src = 'http://texags.com/images/forum/victorygoblet.4.gif';
					line++;
					mm201104.title = 'Vicotry Goblet: 4th Place, March Madness 2011';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(mm201104, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(mm201104, null);
					line++;
					}
				}
				else if( "AGGIEBACKER81" == userName || "FPS DOUG" == userName || "JOCK 07" == userName)
				{console.log(userName);
					/* vicotry goblet */
					var mm201105 = document.createElement('img');
					line++;
					mm201105.src = 'http://texags.com/images/forum/victorygoblet.5.gif';
					line++;
					mm201105.title = 'Vicotry Goblet: 5th Place, March Madness 2011';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(mm201105, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(mm201105, null);
					line++;
					}
				}
				else if( "GG ALLIN" == userName || "JASONINDFW" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var mm201108 = document.createElement('img');
					line++;
					mm201108.src = 'http://texags.com/images/forum/victorygoblet.8.gif';
					line++;
					mm201108.title = 'Vicotry Goblet: 8th Place, March Madness 2011';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(mm201108, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(mm201108, null);
					line++;
					}
				}
				else if( "JACK 98" == userName || "SUPERAGGIE73" == userName || "STRAIGHT TALK" == userName || "BPORTTXAG" == userName || "OXYGENAG" == userName || "TRG GHOST" == userName || "LUBBOCKAGGIE14" == userName || "MARRIED2ANAGGIE" == userName )
				{console.log(userName);
					/* vicotry goblet */
					var mm201110Goblet = document.createElement('img');
					line++;
					mm201110Goblet.src = 'http://texags.com/images/forum/victorygoblet.10.gif';
					line++;
					mm201110Goblet.title = 'Vicotry Goblet: 10th Place, March Madness 2011';
					line++;
					try
					{
						insertAfterThis.parentNode.insertBefore(mm201110Goblet, insertAfterThis.nextSibling);
					line++;
					}
					catch(err)
					{
					line++;
						console.log(err);
						insertAfterThis.parentNode.insertBefore(mm201110Goblet, null);
					line++;
					}
				}
				userName = '';
			} /* end if check for username anchor */
			
			
		}
		catch(err)
		{
			console.log("error on name # " + i + " username: " + userName + " " + " line = " + line);
			console.log(err);
		}
	}
}

console.log('done adding goblets');
console.log('-------------------------------------------------------------');

//document.body.innerHTML = document.body.innerHTML.replace(/alt=/gi, 'title=');