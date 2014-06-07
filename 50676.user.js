// ==UserScript==
// @name          DeStickifier
// @namespace     http://www.bungie.net/Forums/posts.aspx?postID=11687345
// @description   De-stick them stickies, back where they belong! (In the sidebar).
// @include       http://*bungie.net/Forums/topics.aspx?forumID=*
// @include       http://*bungie.net/forums/topics.aspx?forumID=*
// @exclude       http://www.bungie.net/forums/topics.aspx?forumID=8
// ==/UserScript==

// This script was created by Bapa.
// Copyright LOLOLOLOL

//////////////////////
// Global variables //
//////////////////////

var bShowAfter = false; // show the Pinned Topics before or after the "Top Forum Topics" sidebar? (edit as you like)
var sPinnedTopicString = "Pinned Topics";

//////////////////////
// Helper Functions //
//////////////////////

// When trying to traverse childNodes, you always get textNodes somewhere in the mix.
// This filters-out all other nodes except Elements, then returns the array.
function getElementNodesFromArray(children)
{
	var ret = new Array();
	
	for(var i = 0; i < children.length; i++)
	{	
		var node = children[i];
			
		if (node.nodeType == 1) // is an element node
			ret.push(node);
		else
			continue;
	}
	return ret;
}

function removeAllChildren(node)
{
	while(node.hasChildNodes())
		node.removeChild(node.lastChild);
}

function stringHasText(str, instance)
{
	return (str.indexOf(instance) != -1);
}

function getStickyGrid(opt)
{
	if(!opt)
		return document.getElementById('ctl00_mainColPanel').getElementsByTagName('tbody')[0]; // always the first <tbody> tag
	else
		return opt.getElementsByTagName('tbody')[0];
}

// A "sidebar" node is passed in, and it finds the first sticky list and returns it.
function getFirstPinList(bar)
{
	for(var i = 0; i < bar.childNodes.length; i++)
	{
		var node = bar.childNodes[i];
		
		if (node.nodeType == 1) // only element nodes
		{
			if(node.hasAttribute('class') && node.getAttribute('class') == 'boxB')
				return node;
		}
		else
			continue;
	}
	
	return null;
}

function getStickyCount(grid)
{
	var count = 0;
	for(var i = 0; i < grid.childNodes.length; i++)
	{
		var tmpNode = grid.childNodes[i];
		if(tmpNode.nodeType == 1) // an element
			count++;
	}
	
	return count;
}

//////////////////////////
// The Meat n' Potatoes //
//////////////////////////

var hidden = false;
function hideOldStickyGrid(node)
{
	// TODO: Maybe implement this has a hide/unhide function instead?
	if (!hidden)
		node.parentNode.style.display = "none";
	else
		node.parentNode.style.display = "table";
		
	hidden = !hidden;
}

function getRefPinItem(topTopics)
{
	var grid = getStickyGrid(topTopics);
	
	var pinItems = getElementNodesFromArray(grid.childNodes);
	
	// QUICKFIX: If a Top Forum Topic item has a poll in it, it breaks the stickies.
	//			 Check to see if the thread is a poll. If it is, skip it. If none are left, use a template.
	
	var ret = null;
	
	for(var i = 0; i < pinItems.length; i++)
	{
		// Check if we have no pinned items at all.
		if (stringHasText(pinItems[i].innerHTML, 'No topics found'))
			break;
		if (pinItems[i].getElementsByTagName('strong').length != 0)
		{
			// The "strong" element was found. This means that the thread was a poll. Not acceptable.
			continue;
		}
		else
		{
			ret = pinItems[i];
			break;
		}
	}
		
	if (ret)
		return ret;	
	else
	{
		// No pinned-topic node was found. An HTML template will be used instead.
		
		// TODO: Implement? LOLOLOLOLOL
		
		// I *really* don't want to have copy/paste HTML code here... I'd rather this all be done programatically >=[
		// It shall be assumed there will always be one "Top Forum Topic" item with at least one reply. So this remains blank unless it breaks someday.
		
		
		// NOTE: Due to the way Bungie.net outputs HTML (it spits out a horrible mix of Element and Text node... and creates Text nodes when its not even applicable),
		//       Trying to recreate this element is near-impossible, because of the way text is parsed here. Editing the already-working code is just... too mucky.
		
		
		
		/*
		ret = document.createElement("tr");
		ret.setAttribute('class', 'odd');
	
		var tmpNode = document.createElement('td');
		tmpNode.setAttribute('style', 'width: 32px;');
		
		tmpNode.innerHTML = "<div class=\"list-h\">\
							<a id=\"ctl00_toptopics_topTopicsRepeater_ctl01_PinnedIcon\" href=\"/Forums/posts.aspx?postID=27428424\"><img src=\"/images/spacer.gif\" width=\"26px\" height=\"26px\" class=\"IBBPinnedTopicIcon\" alt=\"Pinned Topic\" /></a>\
							\
							\
							\
						</div>  ";
					
		
		ret.appendChild(tmpNode);
		
		tmpNode = document.createElement('td');
		tmpNode.innerHTML = "\
						<div class=\"list-h\">\
							<h5>\
							<a id=\"ctl00_toptopics_topTopicsRepeater_ctl01_hSubject\" href=\"/Forums/posts.aspx?postID=27428424\">Script Central&gt; BBtS; Gallery Link; Txt Legend Removal; DeStickifier</a></h5>\
							<p>Posted by <a id=\"ctl00_toptopics_topTopicsRepeater_ctl01_hUser\" href=\"/Account/Profile.aspx?memberID=77135\">Duardo</a><br />\
							last post: <a id=\"ctl00_toptopics_topTopicsRepeater_ctl01_postedBy\" href=\"/Account/Profile.aspx?memberID=77135\">Duardo</a>&nbsp;&nbsp;<a id=\"ctl00_toptopics_topTopicsRepeater_ctl01_hLastPost\" href=\"/Forums/posts.aspx?postID=27428424&amp;viewreplies=true&amp;postRepeater1-p=255#end\"><img src=\"/images/base_struct_images/forums/jump_to_last_post.gif\" width=\"11px\" height=\"9px\" alt=\"last post\" /></a></p>\
						\
						</div>  ";
					
		
		ret.appendChild(tmpNode);				
		
		return ret;
		*/
		
		return null;
	}
}

// Cleans-up the date in the Sticky list, removing the text "see all top topics", and such.
function cleanupBarDate(node)
{
	var barDateNode = node.childNodes[1].childNodes[3].childNodes[1];
	
	var newTitle = barDateNode.firstChild.nodeValue;
	
	newTitle = newTitle.substring(0, newTitle.indexOf('- ') - 1);
	
	barDateNode.innerHTML = newTitle;
}

// Takes items from the original stickies, and creates new items in the new sticky list. A reference pinned item (taken from the topTopics) is used as a template.
function populateStickies(oldGrid, newGrid, refPinItem)
{
	// Clean up any text nodes from it, for easier use.
	var oldItems = getElementNodesFromArray(oldGrid.childNodes);
	
	// Get the number of stickies.
	var stickyCount = getStickyCount(oldGrid);

	for(var i = 0; i < stickyCount; i++)
	{
		var item = newGrid.appendChild(refPinItem.cloneNode(true)); // append the bare template	
		
		// The code here is a little messy... but It Works, which is priority #1. I'm leaving it this way, for now.
		// TODO: Turn some of the things done here in to a function, and maybe create some helper functions.
		
		// TODO: Also, might want to consider updating the pinned item's class, since they alternate from "odd" to "even". 
		//       They're all going to be "odd"... but that shouldn't be a problem at all.

		// Fix the thread title/link.			
		item.childNodes[3].childNodes[1].childNodes[1].childNodes[1].innerHTML = oldItems[i].childNodes[3].childNodes[1].childNodes[1].childNodes[1].innerHTML;
		item.childNodes[3].childNodes[1].childNodes[1].childNodes[1].setAttribute('href', oldItems[i].childNodes[3].childNodes[1].childNodes[1].childNodes[1].getAttribute('href'));
		
		// Fix the thread poster/link.
		item.childNodes[3].childNodes[1].childNodes[3].childNodes[1].innerHTML = oldItems[i].childNodes[3].childNodes[1].childNodes[3].childNodes[1].innerHTML;
		item.childNodes[3].childNodes[1].childNodes[3].childNodes[1].setAttribute('href', oldItems[i].childNodes[3].childNodes[1].childNodes[3].childNodes[1].getAttribute('href'));
				
		// Check if the current sticky has a reply.
		if (oldItems[i].childNodes[3].childNodes[1].childNodes[3].innerHTML.indexOf('last reply by') != -1) // Someone has posted in the sticky
		{	
			// Fix the link to the last poster.
			item.childNodes[3].childNodes[1].childNodes[3].childNodes[4].innerHTML = oldItems[i].childNodes[3].childNodes[1].childNodes[3].childNodes[3].innerHTML;
			item.childNodes[3].childNodes[1].childNodes[3].childNodes[4].setAttribute('href', oldItems[i].childNodes[3].childNodes[1].childNodes[3].childNodes[3].getAttribute('href'));
			
			// Fix the arrow thingy at the end.
			item.childNodes[3].childNodes[1].childNodes[3].childNodes[6].setAttribute('href', oldItems[i].childNodes[3].childNodes[1].childNodes[3].childNodes[5].getAttribute('href'));
		}
		else
		{
			var tmpNode = item.childNodes[3].childNodes[1].childNodes[3];
			
			// Remove exactly 4 of the last child nodes to remove the excess, since nobody has posted in this thread.		
			for(var x = 0; x < 4; x++)
				tmpNode.removeChild(tmpNode.lastChild);

		}	

		// Change the pinned items icon and the link it points to.	
		// icon
		item.childNodes[1].childNodes[1].childNodes[1].childNodes[0].setAttribute('class', oldItems[i].childNodes[1].childNodes[1].childNodes[1].childNodes[0].getAttribute('class'));	
		// link
		item.childNodes[1].childNodes[1].childNodes[1].setAttribute('href', oldItems[i].childNodes[1].childNodes[1].childNodes[1].getAttribute('href'));		
	}
}

function createStickySidebar()
{
	var sidebar = document.getElementById('ctl00_sidebarColPanel');
	var topTopics = getFirstPinList(sidebar);
	var newStickies = null;
	
	if (!bShowAfter)
		newStickies = sidebar.insertBefore(topTopics.cloneNode(true), topTopics);
	else
		newStickies = sidebar.appendChild(topTopics.cloneNode(true), topTopics);
	
	var oldStickyGrid = getStickyGrid(null);
	var newStickyGrid = getStickyGrid(newStickies);
	
	// Change the title of the new bar to "Pinned Topics".
	newStickies.childNodes[1].childNodes[1].childNodes[1].childNodes[0].nodeValue = sPinnedTopicString;
	
	// Some misc cleanup
	cleanupBarDate(newStickies);
		
	removeAllChildren(newStickyGrid);	
	// Hide the old grid.
	hideOldStickyGrid(oldStickyGrid);
	
	// Clone a "Top Topics" node, for reference for when populating the sticky sidebar. Then clear the list.
	// NOTE: The assumption is *always* made that there will be at least one Top Forum Topic item, and that it will always have at least one reply...
	var refPinItem = getRefPinItem(topTopics);
	
	if (refPinItem == null)
	{
		hideOldStickyGrid(oldStickyGrid); // unhides it
		return;
	}
	
	// Populate the new Sticky list that was created one.
	populateStickies(oldStickyGrid, newStickyGrid, refPinItem);
}

(function() {
if (document.getElementById('ctl00_mainColPanel').getElementsByTagName('tbody').length != 2)
	return; // Since we have no sticky list 'cause we're on a different forum page... we'll just leave. =P
createStickySidebar();
})();
// Also, the Catgirl Maid Army is coming to smite you.
// Miauz ^_^