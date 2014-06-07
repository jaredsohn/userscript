// ==UserScript==
// @name           MySpace Forum Blocker
// @namespace      Adrian232
// @description    Ignores pesky users from the Forums on MySpace.
// @include        http://forum.myspace.com/*messageboard.viewThread*
// ==/UserScript==
// Last Modified: March 19, 2006
// CREDITS: Created by Adrian (myspace.com/adrian232).


(function() {
	var ignore_list = GM_getValue('ignore_list', '');
	var friendID = 6221;
	var friendName = "Tom";
	
	var friends = new Array();	// a place to store the friendID's
	
	var tds = document.getElementsByTagName("td");
	for (var n = 0; n < tds.length; n++) {
		if (tds[n].className != "author")
			continue;
		var links = tds[n].getElementsByTagName("a");
		var lastLink = null;
		for (var i = 0; i < links.length; i++) {
			if (!links[i].href)
				continue;
			var tmpID = friendIdFromHttp(links[i].href);
			
			//GM_log(ignore_list);
			//GM_log('|' + tmpID + ':');
			
			// if a link to profile (and not Tom), and is listed in the Ignore list
			if (tmpID != 6221) {
				if (ignore_list.match(new RegExp('"' + tmpID + ':', 'gi'))) {
					if (tds[n].parentNode && tds[n].parentNode.tagName == "TR")
						tds[n].parentNode.style['display'] = 'none';
				}
				if (links[i].textContent && links[i].className != "sendmsg")
					friendName = links[i].textContent;
				friendID = tmpID;
			}
			if (links[i].className == "sendmsg" && links[i].href.match(/mail\.message/))
				// in case someone's hiding it inside another tag
				for (var p = links[i]; p && p.parentNode && p.parentNode != tds[n]; p = p.parentNode);
				lastLink = p;
		}
		
		if (lastLink) {
			var newfriend = friends.length;
			friends[newfriend] = new Friend(friendID, friendName);
			var newlink = document.createElement("a");
			newlink.setAttribute("class", "sendmsg");
			newlink.setAttribute("href", "javascript:void(0);");
			newlink.addEventListener("click", friends[newfriend].ignoreUser, false);
			newlink.appendChild(document.createTextNode('Ignore User'));
			
			if (lastLink.nextSibling)
				lastLink.parentNode.insertBefore(newlink, lastLink.nextSibling);
			else
				lastLink.parentNode.appendChild(newlink);
			lastLink.parentNode.insertBefore(document.createElement("br"), newlink);
		}
	}
	
	function Friend(friendID, friendName) {
		var parent = this;
		
		this.friendID = friendID;
		this.friendName = friendName;
		
		this.ignoreUser = function(e) {
			if (confirm("Do you really want to ignore this user? This operation cannot be undone.")) {
				GM_setValue('ignore_list', ignore_list + '"' + friendID + ':' + friendName.replace(/"/g, '') + '" ');
				document.location.reload();
			}
		}
	}
	
	
	function friendIdFromHttp(request) {
		var friendMatch = request.match(/friendid=([0-9]*)/i);
		if (!friendMatch || friendMatch.length == 0) // match also direct numbered links
			friendMatch = request.match(/myspace\.com\/([0-9]+)$/i);
		return (friendMatch && friendMatch.length >= 1) ? friendMatch[1] : '6221';
	}
})();
