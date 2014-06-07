// Remove Dupes from Google Reader v0.2
// 
// version 0.2 - 2008-05-28
// - moved Remove Dupes button next to the Refresh button
// - dupes: mark as read, but no longer hides them (fix keyboard j,k bug)
// - finds more dupes by splitting symbols (-, |)
// - more helpful firebug console output (ie. # dupes removed)
//
// version 0.1 - 2008-02-09
// - first revision
//
// Last Updated 2008-05-28
// Copyright (c) 2008, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// Contact: detect [at] hotmail [dot] com
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove Dupes from Google Reader
// @description   Because duplicate posts suck.
// @include       http://www.google.com/reader/*
// ==/UserScript==

Array.prototype.removeDuplicate = function()
{
	// Here we remove duplicate values from the array of entries
	var array4 = new Array;
	var len = this.length;
	var entries = document.getElementById('entries');
	for(var i=0; i<len; i++) 
	{
		iboth = this[i];
		indexDash = iboth.lastIndexOf(' - ');
		if(indexDash != -1)
		{
			ititle = iboth.substr(0, indexDash);
		}
		else
		{
			ititle = iboth;
		}
		indexSlash = ititle.indexOf(' | ');
		if(indexSlash != -1)
		{
			ititle2 = ititle.substr(indexSlash + 3, ititle.length);
		}
		else
		{
			ititle2 = ititle;
		}
	    var xx = true;
		for(var j=i+1; j<len; j++)
		{
			jboth = this[j];
			indexDash = jboth.lastIndexOf(' - ');
			if(indexDash != -1)
			{
				jtitle = jboth.substr(0, indexDash);
			}
			else
			{
				jtitle = jboth;
			}
			indexSlash = jtitle.indexOf(' | ');
			if(indexSlash != -1)
			{
				jtitle2 = jtitle.substr(indexSlash + 3, jtitle.length);
			}
			else
			{
				jtitle2 = jtitle;
			}
			if(iboth == jboth || ititle == jtitle || ititle2 == jtitle2)
				xx = false;		
		}	
		if(xx == true)
		{
			array4.push(iboth);
		}
		else
		{
			var entry = entries.childNodes[i];
			entry.className = entry.className.replace('unread','') + " read";
			console.log("Dupe removed: " + ititle);
		}
	}
	console.log(len - array4.length, "dupes marked as read.");
	return array4;
}

unsafeWindow.removeDupes = function ()
{
	console.log("Removing dupes...");
	var entries = document.getElementById('entries');
	var arrayEntries = new Array();
	var num = entries.childNodes.length - 1;
	for(var i=0; i < num; i++)
	{
		var entry = entries.childNodes[i];
		var entrySecondary = entry.childNodes[0].childNodes[2].getElementsByTagName('div')[0];
		var entryTitle = entrySecondary.getElementsByTagName('h2')[0].innerHTML;
		var spans1 = entrySecondary.getElementsByTagName('span');
		var snippet = "";
		if(spans1.length > 0)
		{
			var spans2 = spans1[0].getElementsByTagName('span');
			if(spans2.length > 0)
			{
				snippet = spans2[0].innerHTML.substr(0,100);
			}
		}
		arrayEntries[i] = entryTitle + " " + snippet;
	}
	arrayEntries = arrayEntries.removeDuplicate();
	console.log("Done.");
}

unsafeWindow.addButtonRemoveDupes = function ()
{
	var tablerefresh = document.getElementById('viewer-refresh');
	if(tablerefresh)
	{
		var parent = document.getElementById('viewer-top-links');
		var input = document.createElement('input');
		input.setAttribute("type", "button");
		input.setAttribute("id", "btnRemoveDupes");
		input.setAttribute("onclick", "removeDupes()");
		input.setAttribute("value", "Remove Dupes");
		var node = document.createElement('div');
		node.appendChild(input);
		parent.insertBefore(node, tablerefresh.nextSibling);
	}
	else
	{
		window.setTimeout(addButtonRemoveDupes, 2000);
	}
}

unsafeWindow.addButtonRemoveDupes();