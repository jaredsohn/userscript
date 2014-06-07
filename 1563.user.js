// ==UserScript==
// @name			Helgon.net avatars in user listings
// @namespace		http://henrik.nyh.se
// @description		Show avatars next to user names in Helgon.net user listings.
// @include			http://*helgon.net/*Visitors.asp*
// @include			http://*helgon.net/*Views.asp*?*
// @include			http://*helgon.net/search/Search.asp*?*
// @include			http://*helgon.net/Start/online.asp*
// @include			http://*helgon.net/Start/BirthDay.asp*
// @include			http://*helgon.net/Start/lastreg.asp*
// @include			http://*helgon.net/UserInfo/Userinfo_Lastvisits.asp*
// @include			http://*helgon.net/*whomonitors.asp*
// @include			http://*helgon.net/Diary/Diary_readOK.asp*
// @include			http://*helgon.net/Friends/Friends.asp*
// ==/UserScript==

// TODO: Instead of a million @includes, JS it (would handle case variations).
// TODO: Remove theoretical risk of writing timestamp to cache for users with proper avatars.
// TODO: Don't read friend page #1 twice. Low priority as the avatar is cached thenceafter.

// Avatars are retrieved in a roundabout way to avoid leaving a visitor log trail.
// If this is not a concern, the code could be much simplified (by retrieving from profiles only).

var avatar_rexp = new RegExp("http://(.+\.)?helgon\.net/u/\.*?\.jpg");
var profile_links_xp = "//A[@target='helgonmain'][starts-with(@href, '/userinfo/userinfo.aspx?ID=')]";
var expire_cache_in_millisecs = 1000*60*60*6  // 6 hour timeout until re-checking avatar-less users for avatars

// Helgon is subdomain sensitive; get it right
var base_url = 'http://' + location.host;

// Initiate cache from GM_value
var defer_write_cache, cache = eval(GM_getValue("cache")) || {};

with_each(profile_links_xp, function(link) {
	link.id = link.href.match(/\?ID=(\d+)/i)[1];  // Set id of link to id of user
	get_avatar_for(link.id);
});


/* Specific functions */

function cache_later(id, avatar) {
	cache[id] = avatar;
	
	// Write cache to GM_value, but not needlessly often (thanks, Johan Sundström)
	if (defer_write_cache) clearTimeout(defer_write_cache);
	defer_write_cache = setTimeout(write_cache, 2e3);  // Write in two seconds
}

function write_cache() {
	GM_setValue("cache", cache.toSource());
}

function extract_avatar_url(contents) {
	var match = contents.match(avatar_rexp);
	if (match) return match[0];
}

function get_avatar_for(id) {
	var cached_data = get_cached_avatar_for(id);
	if (typeof(cached_data) == "string") {
		display_avatar_for(cached_data, id);
	} else {
		if (typeof(cached_data) == "number" && (cached_data + expire_cache_in_millisecs) > (new Date).getTime())
			return;  // If a stored timestamp (for avatar-less users), bail if we recently looked for an avatar
		get_new_avatar_for(id);
	}
}

function get_cached_avatar_for(id) {
	return cache[id];
}

function get_new_avatar_for(id) {
	(function(id) {  // Bind id
		cache_later(id, (new Date).getTime());  // Set current timestamp as default, to avoid re-retrieving for avatar-less users
		get_new_avatar_from_makefriends(id);  // Try this first; that function triggers others if necessary	
	})(id);
}

function get_new_avatar_from_makefriends(id) {
	var url = base_url + "/friends/friends_reg.asp?ID=0&UserID=" + id + "&Action=new";
	get(url, function(contents) {
		var avatar = extract_avatar_url(contents); 
		if (avatar) {
			set_new_avatar_for(avatar, id);
		} else {
			if (contents.match(/\bredan polare\b/))
				get_new_avatar_from_friends(id);
			else if (contents.match(/\binte bli polare med dig\b/))
				get_new_avatar_from_self(id);
		}
	});
}

function get_new_avatar_from_friends(id) {
	var url = base_url + "/Friends/Friends.asp";
	
	get(url, function(contents) {
		var m = contents.match(/Visar sida:.*&Page=(\d+)/i);  // Multiple pages?
		var max_page = m ? m[1] : 1;
		for (var i = 1; i <= max_page; i++) {
			url = url + "?Page=" + (i==1 ? '' : i);  // ?Page=1 times out, so do just ?Page=
			get(url, function(contents) {
				m = contents.match(new RegExp('friends_info\\.asp\\?ID=(\\d+)&UserID=(\\d+)&UserID2=('+id+')\\b', 'i'));
				if (m) {
					url = base_url + "/Friends/friends_info.asp?ID="+m[1]+"&UserID="+m[2]+"&UserID2="+m[3];
					get(url, function(contents) {
						var line = contents.match(new RegExp('.*\\?ID='+id+'.*<img.*', 'i'))[0];
						var avatar = extract_avatar_url(line);
						set_new_avatar_for(avatar, id);
					});
				}
			});
		}

	});
}

function get_new_avatar_from_self(id) {
	var url = base_url + "/UserInfo/UserInfo.asp";
	get(url, function(contents) {
		var avatar = extract_avatar_url(contents); 
		if (avatar) {
			set_new_avatar_for(avatar, id);
		}
	});	
}

function set_new_avatar_for(avatar, id) {
	if (avatar.indexOf('000/{00000000-0000-0000-0000-0000000000') != -1) return;  // We only want non-default pictures
	cache_later(id, avatar);
	display_avatar_for(avatar, id);
}

function recache_avatar() {
	var id = this.id.replace('avatar-', '');
	delete cache[id];
	this.parentNode.removeChild(this);
	get_new_avatar_for(id);
}

function display_avatar_for(avatar, id) {
	// You set us up the avatar!
	var img = document.createElement('img');
	img.id = "avatar-" + id;
	var url = "/userinfo/userinfo.asp?ID=" + id;
	with (img) {
		src = avatar;
		className = 'largeimageborder';
		style.width = '40px';
		style.height = '56px';
		align = 'middle';
		addEventListener('error', recache_avatar, true);
	}

	// You set us up the spacing! The text node!!
	var space = document.createTextNode(' ');
	
	// You set us up the link!
	var link = document.createElement('a');
	with (link) {
		href = url;
		appendChild(img);
	}				
	
	if (avatar.indexOf('000/{00000000-0000-0000-0000-0000000000') == -1) { // Only for non-default pictures
		$(id).parentNode.insertBefore(space, $(id));  // Insert spacing
		$(id).parentNode.insertBefore(link, space);  // Insert linked image
	}
}


/* General functions */

function $(id) { return document.getElementById(id); }
function xp(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function with_each(query, cb, root) {
	var results = xp(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}

function get(url, cb) {
  GM_xmlhttpRequest({
	method: "GET",
	url:url,
    onload:function(xhr){ cb(xhr.responseText ); }
  });
}
