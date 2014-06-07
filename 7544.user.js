// ==UserScript==
// @name          TrollBridge
// @namespace     http://www.myspace.com/adrian232
// @include       http://*.livejournal.com/*
// @description   Puts the Troll back under his Bridge. Ignores pesky users from LJ comments.
// ==/UserScript==

(function() {
	// First, check to see if the x/y values are stored and reposition
	var pageOffset = GM_getValue('pageOffset');
	if (pageOffset) {
		var offset = pageOffset.split(",");
		window.scrollTo(offset[0], offset[1])
		GM_setValue('pageOffset', '');
	}
	
	var banned_list = GM_getValue('banned_list', '');
	var orig_banned_list = banned_list;
	banned_list = banned_list.slice(0, -1);
	banned_list = banned_list.replace(/`/g, '');
	
	var banned = banned_list.split("'");
	var was_banned = new Array();

	var tables = document.getElementsByTagName('table');
	
	for (var y = 0; y < tables.length; y++) {
		if (!tables[y].className || tables[y].className.indexOf('talk-comment') == -1)
			continue;
		var spans = tables[y].getElementsByTagName('span');
		if (!spans[0])
			continue;
		var name = spans[0].getAttribute('lj:user');
		if (name) {
			// put a link to ban the user after their name
			var link = document.createElement('a');
			link.href = "javascript:void(0);";
			link.setAttribute("lj:user", name);
			link.addEventListener('click',TrollUser,false);
			link.innerHTML = '<img style="border: none" src="http://i104.photobucket.com/albums/m170/Adrian_232/troll.png" />';
			if (spans[0].nextSibling)
				spans[0].parentNode.insertBefore(link, spans[0].nextSibling);
			else
				spans[0].parentNode.appendChild(link);
			for (var i = 0; i < banned.length; i++) {
				if (name == banned[i]) {
					destroy(tables[y]);
					was_banned[i] = true;
				}
			}
		}
	}
	
	var content_box = document.getElementById('Content');
	if (!content_box)
		return;
	var found = false;
	var box = document.createElement('div');
	box.innerHTML = "The following users have been ignored from this page (click to unban): "
	/*
	box.innerHTML += "{";
	for (i = 0; i < banned.length; i++){
		box.innerHTML += banned[i];
		box.innerHTML += ",";
	}
	box.innerHTML += "} :: {" + orig_banned_list + "} ";
	*/
	for (var i = 0; i < was_banned.length; i++) {
		if (was_banned[i]) {
			var link = document.createElement('a');
			link.setAttribute("lj:user", banned[i]);
			link.href = "javascript:void(0);";
			link.addEventListener('click',UntrollUser,false);
			if (found)
				box.innerHTML += ", ";
			link.innerHTML += banned[i];
			box.appendChild(link);
			found = true;
		}
	}
	if (found)
		content_box.appendChild(box);

	// destroy the node and all its children
	function destroy(node) {
		for (var y = 0; y < node.childNodes.length; y++) {
			var p = node.childNodes[y];
			if (p.style)
				p.style['display'] = 'none';
		}
		if (node.style)
			node.style['display'] = 'none';
	}
	
	function TrollUser() {
		var name = this.getAttribute("lj:user");
		var banned_list = GM_getValue('banned_list', '');

		if (banned_list.indexOf("`" + name + "'") == -1)
			GM_setValue('banned_list', banned_list + "`" + name + "'");
		// store the current x/y location in GM
		GM_setValue('pageOffset', window.pageXOffset + "," + window.pageYOffset);
		window.location.reload( false );
	}

	function UntrollUser() {
		var name = this.getAttribute("lj:user");
		var banned_list = GM_getValue('banned_list', '');

		if (name) {
			banned_list = banned_list.replace("`" + name + "'", "");
			GM_setValue('banned_list', banned_list);
		}
		// store the current x/y location in GM
		GM_setValue('pageOffset', window.pageXOffset + "," + window.pageYOffset);
		window.location.reload( false );
	}
})();
