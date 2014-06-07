// CFSuperIgnore
// version 1.0.1
// 2006-08-09
// Copyright (c) 2006, gumpish on cycleforums.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CFSuperIgnore", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CFSuperIgnore
// @description   Completely obliterates posts by specified users and/or obliterates posts in which the users are quoted
// @include       http://*cycleforums.com/forums/showthread.php?*
// ==/UserScript==

(function()
{
	
	var removeAuthoredPosts = true;
	
	var removeQuotedPosts = true;
	
	// Add usernames to the blacklist according to taste.
	//
	// Example:
	//
	// var blacklist = ["blakeTL", "gumpish", "rezin"];

	var blacklist = ["blakeTL"];


	function matches(pattern)
	{
		for(var j = 0; j < blacklist.length; j++)
			if(blacklist[j] == pattern) return true;

		return false;
	}
	
	function matchesSaid(pattern)
	{
		for(var j = 0; j < blacklist.length; j++)
			if(blacklist[j] + " said:" == pattern) return true;
		
		return false;
	}



	function getElementArray(startNode, elementName)
	{
		var returnArray = new Array();

		for(var i = 0; i < startNode.childNodes.length; i++)
			if(startNode.childNodes[i].nodeName == elementName) returnArray.push(startNode.childNodes[i]);
		//end for

		return returnArray;
	}

	function elementFromTheStart(startNode, elementName, offset)
	{
		var returnNode = null;

		var nodeArray = getElementArray(startNode, elementName);

		if(nodeArray.length > offset) return nodeArray[offset];
		else return null;
	}

	function firstElement(startNode, elementName)
	{
		var returnNode = null;

		for(var i = 0; i < startNode.childNodes.length; i++)
			if(startNode.childNodes[i].nodeName == elementName) return startNode.childNodes[i];
		//end for

		return null;
	}
	
	function lastElement(startNode, elementName)
	{
		var returnNode = null;

		var nodeArray = getElementArray(startNode, elementName);

		if(nodeArray.length > 0) return nodeArray[nodeArray.length - 1];
		else return null;
	}
	
	function digForElements(startNode, elementName, targetArray)
	{
		//GM_log("digForElements...");
		
		if(startNode.childNodes.length == 0)
			return;

		for(var i = 0; i < startNode.childNodes.length; i++)
		{
			if(startNode.childNodes[i].nodeName == elementName)
				targetArray.push(startNode.childNodes[i]);
			digForElements(startNode.childNodes[i], elementName, targetArray);
		}
	}


	var step0, step1, step2, step3, step4, step5, step6, step7, step8,
		step9, step10, step11, step12, postContents, blockQuotes, textBits, postRemoved;

	step0 = firstElement(document.body, "CENTER");
	
	var postsRaw = getElementArray(step0, "TABLE");
	
	var posts = new Array();
	
	//The first three and last three TABLE elements are header/footer material, not posts. Omit them.

	for(var i = 3; i < postsRaw.length - 3; i++)
		posts.push(postsRaw[i]);
	//end for
	
	//GM_log("Preparing to iterate over posts...");
	
	//Iterate through the array of posts, remove any where the author is on the blacklist.
	//Optionally remove any posts where a blacklisted person has been quoted.
	
	for(var i = 0; i < posts.length; i++)
	{
		postRemoved = false;
		
		//GM_log("Post " + i);
		step0 = firstElement(posts[i], "TBODY");
		step1 = firstElement(step0, "TR");
		step2 = elementFromTheStart(step1, "TD", 1);
		step3 = firstElement(step2, "TABLE");
		step4 = firstElement(step3, "TBODY");
		step5 = firstElement(step4, "TR");
		step6 = firstElement(step5, "TD");
		step7 = firstElement(step6, "TABLE");
		step8 = firstElement(step7, "TBODY");
		step9 = firstElement(step8, "TR");
		
		
		if(removeAuthoredPosts)
		{
			//GM_log("Performing author check...");
			step10 = firstElement(step9, "TD");
			step11 = firstElement(step10, "FONT");
			step12 = firstElement(step11, "B");
			if(matches(step12.firstChild.nodeValue))
			{
				posts[i].parentNode.removeChild(posts[i]);
				postRemoved = true;
				continue;
			}
		}
		
		if(removeQuotedPosts && !postRemoved)
		{
			//GM_log("Performing quote check...");
			step10 = lastElement(step9, "TD");
			step11 = firstElement(step10, "P");
			blockQuotes = new Array();
			if(step11 == null)
			{
				//GM_log("Null element found... Skipping this post...");
				continue;
			}
			digForElements(step11, "BLOCKQUOTE", blockQuotes);
			//GM_log("" + blockQuotes.length + " quote elements found...");
			for(var j = 0; j < blockQuotes.length; j++)
			{
				textBits = new Array();
				digForElements(blockQuotes[j], "#text", textBits);
				for(var k = 0; k < textBits.length; k++)
				{
					if(matchesSaid(textBits[k].nodeValue))
					{
						//GM_log("Offending quote found; removing post...");
						posts[i].parentNode.removeChild(posts[i]);
						postRemoved = true;
					}
					
					if(postRemoved) break;
				}
				
				if(postRemoved) break;
				
			}
		}
			
			
	}
}
)();