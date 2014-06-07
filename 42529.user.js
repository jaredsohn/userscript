// ==UserScript==
// @name           SSW Auction Names
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Adds a player's name underneath their avatar to each of their auctions.
// @include        http://www.secretsocietywars.com/index.php?p=auction&a=view_auctions*
// @include        http://www.secretsocietywars.com/index.php?p=records&a=view_player&id=*
// ==/UserScript==

var favorites = eval(GM_getValue("favorites", "[]"));
var favorites_span = document.createElement('span');


if(document.location.href.indexOf("p=auction&a=view_auctions") > -1) {
	auction();
} else if(document.location.href.indexOf("p=records&a=view_player") > -1) {
	profile();
}

function profile() {
	var centerobject = document.evaluate('//a/text()[.="Change Avatar"]/ancestor::center[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var re;
	var playerid;
	var playername;
	var link = document.createElement('a');
	if(re = /&id=(\d+)/.exec(document.location.href)) {
		playerid = re[1];
	}
	if(centerobject) {
		centerobject.appendChild(document.createElement('br'));
		link.href = "/index.php?p=auction&a=view_auctions&player="+playerid;
		if(playername = get_playername(playerid)) {
			link.addEventListener('click', function(ev) {remove_seller_event(ev, playername);}, false);
			link.innerHTML = "Remove " + playername + " from your favorite sellers";
		} else if(playername = get_profile_playername()) {
			link.addEventListener('click', function(ev) {add_seller_event(ev, playername, playerid);}, false);
			link.innerHTML = "Add " + playername + " to your favorite sellers";
		}
		centerobject.appendChild(link);
	}
}

function get_profile_playername() {
	var textobj = document.evaluate('//a[contains(@href, "p=search&a=member_search")]/following-sibling::text()[contains(., ">>")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var re;
	if(re = />>\s*(.*)$/.exec(textobj.data)) {
		return re[1];
	}
}

function auction() {
	var img_links = document.evaluate('//a[contains(@href, "view_auctions&player=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var playername;
	var playerid;
	var foobselect_row = document.evaluate('//select[@name="foobselect"]/ancestor::tr[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var form = document.evaluate('//form[@action="?p=auction&a=view_auctions"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var re;
	
	for(var i = 0; i < img_links.snapshotLength; i++) {
		var link = img_links.snapshotItem(i);
		var img = document.evaluate('./img', link, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(re = /player=(\d+)/.exec(link.href)) {
			var new_link = document.createElement('a');
			new_link.href = "/index.php?p=records&a=view_player&id="+re[1];
			new_link.appendChild(document.createTextNode(img.alt));
			playername = img.alt;
			playerid = re[1];
			link.parentNode.insertBefore(new_link, link.nextSibling);
			new_link.parentNode.insertBefore(document.createElement('br'), new_link);
		}
	}
	if(form) {
		if(re = /&row=(\d+)/.exec(document.location.href)) {
			form.action += "&row="+re[1];
		} else if(re = /&player=(\d+)/.exec(document.location.href)) {
			form.action += "&player="+re[1];
		}
	}

	favorites_span.style.color = "white";
	fill_favorites_span();
	
	if(foobselect_row) {
		var newcell = foobselect_row.parentNode.insertRow(foobselect_row.rowIndex+1).insertCell(0);
		newcell.colSpan = 3;
		newcell.appendChild(favorites_span);
	}
	
	if(document.evaluate('//text()[contains(., "No auctions matched your search criteria")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
		var re;
		if(re = /&player=(\d+)/.exec(document.location.href)) {
			playerid = re[1];
			playername = get_playername(playerid);
		}
	}
	
	if((document.location.href.indexOf("&player=") > -1) && playername) {
		var cell = document.evaluate('//form[contains(@action, "p=auction&a=view_auctions")]/ancestor::td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var div = document.createElement('div');
		var link = document.createElement('a');
	
		if(!cell) {
			cell = document.evaluate('//select[@name="foobselect"]/ancestor::table[1]/ancestor::tr[1]/following-sibling::tr[1]/td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}
		div.align = "middle";
		link.href = document.location.href;
		if(is_favorite(playername)) {
			link.innerHTML = "Remove "+playername+" from your favorite sellers";
			link.addEventListener('click', function(ev) {remove_seller_event(ev, playername);}, false);
		} else {
			link.innerHTML = "Add "+playername+" to your favorite sellers";
			link.addEventListener('click', function(ev) {add_seller_event(ev, playername, playerid);}, false);
		}
		div.appendChild(link);
		cell.insertBefore(div, cell.firstChild);
	}	
}

function get_playername(id) {
	for(var i = 0; i < favorites.length; i++) {
		if(favorites[i][1] == id) {
			return favorites[i][0];
		}
	}
}

function fill_favorites_span() {
	var sorted = favorites.sort(favsort);
	var linkhtml = new Array();
	favorites_span.innerHTML = "";
	for(var i = 0; i < sorted.length; i++) {
		linkhtml.push('<a href="/index.php?p=auction&a=view_auctions&player='+sorted[i][1]+'" style="color: white;">'+sorted[i][0]+'</a>');
	}
	favorites_span.innerHTML = linkhtml.join(", ");
}

function make_callback(f, a) {
	return function(ev) {f(ev, a);};
}

function favsort(a, b) {
	if(a[0].toLowerCase() < b[0].toLowerCase()) {
		return -1;
	} else {
		return 1;
	}
}

function add_seller_event(ev, name, id) {
	ev.preventDefault();
	favorites = eval(GM_getValue("favorites", "[]"));
	add_favorite(name, id);
	ev.target.parentNode.replaceChild(document.createTextNode("Added"), ev.target);
	fill_favorites_span();
}

function remove_seller_event(ev, name) {
	ev.preventDefault();
	ev.stopPropagation();
	favorites = eval(GM_getValue("favorites", "[]"));
	remove_favorite(name);
	ev.target.parentNode.replaceChild(document.createTextNode("Removed"), ev.target);
	fill_favorites_span();
}	

function is_favorite(name) {
	for(var i = 0; i < favorites.length; i++) {
		if(favorites[i][0] == name) {
			return true;
		}
	}
	return false;
}

function add_favorite(name, id) {
	if(!is_favorite(name)) {
		favorites.push([name,id]);
		GM_setValue("favorites", favorites.toSource());
	}
}

function remove_favorite(name) {
	for(var i = 0; i < favorites.length; i++) {
		if(favorites[i][0] == name) {
			favorites.splice(i, 1);
			break;
		}
	}
	GM_setValue("favorites", favorites.toSource());
}
