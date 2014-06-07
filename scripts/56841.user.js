// ==UserScript==
// @name           EJ Thread Fixer
// @namespace      elitistjerks
// @description    Reverts the "first new post" behavior and applies the NeoGAF method.
// @include        http://elitistjerks.com/f*
// @include        http://elitistjerks.com/usercp.php
// @include        http://elitistjerks.com/subscription.php
// ==/UserScript==

function addNewPostLink(thread_id, link) {
	var icon = document.getElementById('thread_statusicon_' + thread_id);
	if (icon != null) {
		var icon_element = document.createElement('img');
		icon_element.setAttribute('src', icon.src);
		icon_element.setAttribute('border', '');
		icon_element.setAttribute('alt', '');
		icon_element.setAttribute('id', icon.id + '_2');
		
		var link_element = document.createElement('a');
		link_element.setAttribute("href", link);
		link_element.appendChild(icon_element);
		
		icon.parentNode.replaceChild(link_element, icon);
	}
}

function resetThreadLinks() {
	var links = document.getElementsByTagName('a');
	for (var i=0; i < links.length; i++)
	{
		var link = links[i];
		var link_id = link.id;
		if (link_id.indexOf("thread_title") >= 0)
		{
			var thread = link_id.replace(/thread_title_(.+)/, '$1');
			addNewPostLink(thread, link.href);
			link.setAttribute('href', link.href.replace(/\/new-post\.html$/, ''));
		}
	}
}

resetThreadLinks();