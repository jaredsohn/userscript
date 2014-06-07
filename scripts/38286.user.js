// ==UserScript==
// @name           UserScripts.org - Historical Script Versions
// @namespace      http://home.comcast.net/~mailerdaemon/
// @include        http://userscripts.org/scripts/*
// @version        1.0
// ==/UserScript==

nav = $X("//ul[@id='script-nav']");
if(nav)
{
	link = $X("./li/a[starts-with(@href, '/')]", nav);
	if(link)
	{
		share = $X("./li[a[text()='Share']]", nav);
		var href = link.getAttribute("href");
		href = href.split("/");
		href[2]="versions"
		href = href.join("/");
		var node = document.createElement("li");
		if(href == unsafeWindow.location.pathname)
		{
			node.className = "current";
			node.innerHTML = "Versions";
		}
		else
			node.innerHTML= "<a href='"+href+"' rel='nofollow'>Versions</a>";
		insertBefore(node, share)
	}
}

function $X(_xpath, node){return document.evaluate(_xpath, node?node:document, null,	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);}
function insertAfter(insert, after){return after.parentNode.insertBefore(insert, after.nextSibling);}
function insertBefore(insert, before){return before.parentNode.insertBefore(insert, before);}