// ==UserScript==
// @name           What.CD ignore posts
// @namespace      What.CD
// @description    Adds the ability to ignore a user's posts on the forums
// @version        1.0
// @author         lukini
// @include        http*://*what.cd/forums.php*action=viewthread*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var me = /id=(\d+)/.exec($("#nav_userinfo .username").attr("href"))[1];
var users = GM_getValue("users");
users = users ? users.split(",") : [];

// add a link to each post
var link = $("<a class='ignoreuser' href='javascript:;' title='Ignore all posts from this user'></a>");
$(".colhead_dark .time").after(link);

// set up all of the posts
$(".forum_post").each(function() {
	var post = $(this),
		link = post.find(".ignoreuser");
	
	var user = /id=(\d+)/.exec(post.find(".colhead_dark strong a:first-child").attr("href"))[1];
	if (user == me) {
		link.remove();
		return;
	}
	this.setAttribute("user", user);
	
	// attach event to each link
	link.click(function() {
		togglePosts(user);
	});
	if (indexOf(user) >= 0) {
		// hide the post if they are ignored
		post.find("tr:last").hide();
		link.text(" [Unignore]");
	} else {	
		link.text(" [Ignore]");
	}
});

function togglePosts(user) {
	var index = indexOf(user),
		hide = index < 0;
	
	if (hide) users.push(user);
	else users.splice(index, 1);
	GM_setValue("users", users.join(","));
	
	$(".forum_post[user='"+user+"'] tr").each(function() {
		var post = $(this);
		post.find(".ignoreuser").text(hide ? " [Unignore]" : " [Ignore]");
		post.next()[hide ? "hide" : "show"]();
	});
}

function indexOf(user) {
	for (var i in users) {
		if (users[i] == user)
			return i;
	}
	return -1;
}