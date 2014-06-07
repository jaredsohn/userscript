// LastReadPost
// version 2.0
// 2010-04-01
// Copyright (c) 2005, Jon Yurek
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
// select "LastReadPost", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ars LastReadPost
// @namespace     Ars
// @description   Adds a link to the last post you read in a thread on the Ars Technica forums
// @include       http://arstechnica.com/civis/*
// ==/UserScript==

//
// USER MODIFIABLE STUFF
//

// Edit this to change the text of the inserted link.
// The default is "%d new"
var linktext = "%d new";
// addwhere:
// 0 - default - adds the link in the "Last Post" column
// 1 - adds the link after the title of the thread
// 2 - adds the link after the direct page links
// 3 - changes the icon immediately preceeding the title into the link (links to first post if thread unread)
var addwhere = 2;
var separator = " - "; // Any text. Used to separate the text links for #0-2 above
var menutimeout = 500; // time in ms for the menu to disappear on its own
var menulength = 30; // max length of the menu
var menuon = true; // turn the menu off/on
var showzero = true; //turn the topics that have 0 new posts after the last read post
var linkstyle = {
	fontWeight : "bold"
}; 
var menulinkstyle = {
	display : "block",
	color : "white",
	padding : "2px"
}; 
var menustyle = {
	position : "fixed",
	top : "0px",
	right : "0px",
	background : "green",
	fontFamily : "serif",
	fontSize : "10pt",
	borderLeft : "1px solid black",
	borderBottom : "1px solid black",
	paddingLeft : "7px",
	paddingBottom : "7px"
};

//
// END USER MODIFIABLE STUFF
//

function setProps(o, p)
{
	for (prop in p)
	{
		o[prop] = p[prop];
	}
}

function makeURL(key)
{
	var fm = key.split(":");
	var r = GM_getValue(key + ":r");

	// This bit calculates if the LRP is the last one on a page.
	// If it is, make the link for the next page.
	var c = GM_getValue(key + ":c");
	var p = Math.floor(c / 40) * 40;
	if (c == p)
	{
		return "http://arstechnica.com/civis/viewtopic.php?f=" + fm[0] + "&t=" + fm[1] + "&start=" + (p + 40);
	}

	// If it's not the last link on a page, give it the right post.
	return "http://arstechnica.com/civis/viewtopic.php?f=" + fm[0] + "&t=" + fm[1] + "&start=" + p + "#p" + r;
}

var threadnumbers = new Array();
var threadlinks = new Array();
var threadthreads = new Array();

var isForum = (window.location + '').match(/viewforum/);
var isTopic = (window.location + '').match(/viewtopic/);
var isReply = (window.location + '').match(/mode\=reply/);

var lastfew = GM_getValue("lrp-history");
if (!lastfew)
{
	lastfew = "";
}
lastfew = lastfew.split("++");
if (isForum)
{
	// Forum index
	var threadtable = document.getElementById("content");
	var threadrows = threadtable.getElementsByTagName("tr");
	var mthreadrows = new Array();
	var fora = new Array();
	for (var x = 0; x < threadrows.length; x++)
	{
		var atags = threadrows[x].getElementsByClassName("topictitle");
		if (atags.length > 0)
		{
			var link = atags[0].getAttribute("href");
			var key = link.match(/f\=(\d+)/)[1] + ":" + link.match(/t\=(\d+)/)[1];
			threadlinks[key] = atags;
			mthreadrows[key] = threadrows[x];
			threadnumbers[key] = -1;
		}
	}

	for (var key in threadnumbers)
	{
		var r = GM_getValue(key + ":r");
		if (typeof(r) != "undefined" && r != "")
		{
			var oldpostcount = GM_getValue(key + ":c");
			if (!oldpostcount)
			{
				oldpostcount = 0;
			}
			var rowcells = mthreadrows[key].getElementsByTagName("td");
			newpostcount = parseInt(mthreadrows[key].getElementsByClassName("topic-replies")[0].innerHTML) + 1;
			var pcdelta = parseInt(newpostcount) - parseInt(oldpostcount);
			if (pcdelta < 1 && !showzero)
			{
				continue;
			}
			var newurl = makeURL(key);
			var newlink = threadlinks[key][0].cloneNode(false);
			newlink.href = newurl;
			setProps(newlink.style, linkstyle);
			if (typeof(linktext) == "undefined" || linktext == "")
			{
				linktext = "%d new";
			}
			newlink.innerHTML = linktext.replace(/%d/, pcdelta);
			newlink.setAttribute("key", key);
			newlink.addEventListener("click", function(e)
			{
				if (e.shiftKey && e.ctrlKey)
				{
					GM_setValue(this.getAttribute("key") + ":r", "");
					GM_setValue(this.getAttribute("key") + ":p", "");
					GM_setValue(this.getAttribute("key") + ":c", "");
					GM_setValue(this.getAttribute("key") + ":t", "");
					GM_setValue(this.getAttribute("key") + ":z", "");
					e.preventDefault();
					e.preventBubble();
					e.preventCapture();
					e.stopPropagation();
					if (addwhere != 3)
					{
						this.parentNode.style.display = "none";
					}
					else
					{
						this.href = "#";
						this.firstChild.className = "ubb_post";
					}
				}
			}, true);
			var linkcont = document.createElement("span");
			switch(addwhere)
			{
				case 1: 
					linkcont.appendChild(document.createTextNode(separator));
					linkcont.appendChild(newlink);
					mthreadrows[key].getElementsByClassName("topic-title")[0].insertBefore(linkcont,threadlinks[key][1].nextSibling);
					break;
				case 2: 
					linkcont.appendChild(document.createTextNode(separator));
					linkcont.appendChild(newlink);
					mthreadrows[key].getElementsByClassName("topic-title")[0].appendChild(linkcont);
					break;
				case 3: 
					threadlinks[key][0].setAttribute("href", newlink.getAttribute("href"));
					threadlinks[key][0].firstChild.setAttribute("alt", newlink.innerHTML);
					threadlinks[key][0].firstChild.setAttribute("title", newlink.innerHTML);
					threadlinks[key][0].firstChild.setAttribute("src", "http://static.arstechnica.com/civis/ars/imageset/topic_unread.png");
					break;
				default: 
					linkcont.appendChild(document.createTextNode(separator));
					linkcont.appendChild(newlink);
					mthreadrows[key].getElementsByClassName("topic-last-post")[0].appendChild(linkcont);
					break;
			}
		}
	}
}
else if (isTopic)
{
	// thread
	var imgs = document.getElementsByTagName("table");
	var postids = new Array();
	for (var x = 0; x < imgs.length; x++)
	{
		var cl = imgs[x].getAttribute("class") + '';
		if (cl.match(/post/))
		{
			postids.push(imgs[x]);
		}
	}
	var lastposthref = postids[postids.length - 1].getAttribute("id");
	var __forum = window.location.href.match(/f\=(\d+)/)[1];
	var __topic = window.location.href.match(/t\=(\d+)/)[1];
	var lpr = lastposthref.match(/p(\d+)/)[1];
	var posts = document.getElementsByClassName("pager")[0].innerHTML.match(/(\d+) posts/)[1];

	var new_dt = new Date();
	if (new_dt.getMonth() + 1 < 10)
	{
		if (new_dt.getDate() < 10)
		{
			new_dt = new_dt.getFullYear() + "0" + (new_dt.getMonth() + 1) + "0" + new_dt.getDate();
		}
		else
		{
			new_dt = new_dt.getFullYear() + "0" + (new_dt.getMonth() + 1) + "" + new_dt.getDate();
		}
			
	}
	else
	{
		if (new_dt.getDate() < 10)
		{
			new_dt = new_dt.getFullYear() + "" + (new_dt.getMonth() + 1) + "0" + new_dt.getDate();
		}
		else
		{
			new_dt = new_dt.getFullYear() + "" + (new_dt.getMonth() + 1) + "" + new_dt.getDate();
		}
	}

	var title = document.getElementsByTagName("title")[0];
	var titleString = title.innerHTML.substring(0, title.innerHTML.lastIndexOf(" - "));

	GM_setValue(__forum + ":" + __topic + ":r", lpr);
	GM_setValue(__forum + ":" + __topic + ":p", Math.floor(posts / 40));
	GM_setValue(__forum + ":" + __topic + ":c", posts);
	GM_setValue(__forum + ":" + __topic + ":t", titleString);
	GM_setValue(__forum + ":" + __topic + ":z", new_dt);
}
else if (isReply)
{
	if (menuon)
	{
		var found = 0;
		var imgs = document.getElementsByTagName("table");
		for (var x = 0; x < imgs.length; x++)
		{
			var cl = imgs[x].getAttribute("class") + '';
			if (cl.match(/post/))
			{
				found = 1;
				break;
			}
		}
		if (found)
		{
			var lastreply = imgs[x].getAttribute("id");
			var f = window.location.href.match(/f\=(\d+)/)[1];
			var m = window.location.href.match(/t\=(\d+)/)[1];
			var r = lastreply.match(/p(\d+)/)[1];
			var listkey = f + ":" + m;
			var list = [listkey];
			GM_setValue(listkey + ":r", r);
			for (var x = 0; x < lastfew.length; x++)
			{
				if (lastfew[x] == listkey)
				{
					continue;
				}
				list.push(lastfew[x]);
			}
			list = list.splice(0,menulength);
			var liststring = list.join("++");
			GM_setValue("lrp-history", liststring);
			lastfew = list;
		}
	}
}
else
{
	console.log("We're not on a topic or a forum. We really shouldn't even be in this code.");
}


if (menuon)
{
	var protoa = document.createElement("a");
	setProps(protoa.style, menulinkstyle);
	var container = document.createElement("div");
	container.style.display = "none";
	container.style.borderLeft = "1px solid black";
	container.style.borderBottom = "1px solid black";
	container.id = "lastreadpost-container";
	for (var x = 0; x < lastfew.length; x++)
	{
		var title = GM_getValue(lastfew[x] + ":t");
		if (!title)
		{
			continue;
		}
		var newa = protoa.cloneNode(true);
		newa = protoa.cloneNode(true);
		newa.innerHTML = title;
		newa.href = makeURL(lastfew[x]);
		newa.style.background = x%2 ? "white" : "#eee";
		newa.setAttribute("normal", x%2 ? "white" : "#eee");
		newa.setAttribute("highlight", x%2 ? "#ddd" : "#ccc");
		newa.style.color = "black";
		newa.addEventListener("mouseover", function() {this.style.background = this.getAttribute("highlight")}, false);
		newa.addEventListener("mouseout", function() {this.style.background = this.getAttribute("normal")}, false);
		container.appendChild(newa);
	}

	var toggle = document.createElement("a");
	toggle.innerHTML = "Most Recently Read";
	setProps(toggle.style, menulinkstyle);

	var menu = document.createElement("div");
	menu.id = "lastreadpost-menu";
	setProps(menu.style, menustyle);

	menu.appendChild(container);

	var menutimeout = null;
	menu.addEventListener("click", function(e)
	{
		var c = document.getElementById("lastreadpost-container");
		c.style.display = (c.style.display == "none" ? "block" : "none");
		e.stopPropagation();
	}, false);

	menu.addEventListener("mouseover", function(e)
	{
		var c = document.getElementById("lastreadpost-container");
		c.style.display = "block";
		if (menutimeout)
		{
			clearTimeout(menutimeout);
		}
	}, false);

	menu.addEventListener("mouseout",function(e)
	{
		var c = document.getElementById("lastreadpost-container");
		if (menutimeout)
		{
			clearTimeout(menutimeout);
		}
		menutimeout = setTimeout(function() {c.style.display = "none";}, menutimeout);
	}, false);

	document.getElementsByTagName("body")[0].appendChild(menu);
}
