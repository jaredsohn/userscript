// Twitter Page Follower script
// version 0
// 2009-7-29
// Copyright (c) 2009, Kevin dolan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// A window will pop up asking if you want to install the script
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Twitter Page Follower", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Twitter Page Follower
// @namespace     http://thekevindolan.com/twitter_adder/
// @description   script to automatically follow all users on a page
// @include       http://twitter.com/followers*
// @include       http://www.twitter.com/followers*
// @include       http://twitter.com/*/followers*
// @include       http://www.twitter.com/*/followers*
// @include       http://twitter.com/*/following*
// @include       http://www.twitter.com/*/following*
// @include       http://twitter.com/*/friends*
// @include       http://www.twitter.com/*/friends*
// ==/UserScript==


els = document.getElementsByTagName('tr');
var users = new Array();

for(var i in els) {
	var row = els[i];
	var id = row.getAttribute('id');
	
	if(id != null)
		if(id.substring(0,4) == "user")
			users[users.length] = row;
}

var unfollowed = new Array();

for(var i in users) {
	var user = users[i];
	var cl = user.getAttribute('class');
	if(cl.indexOf('following') == -1)
		unfollowed[unfollowed.length] = user;
}

var butts = new Array(); 

for(var i in unfollowed) {
	var user = unfollowed[i];
	var lis = user.getElementsByTagName('li');
		
	for(var n in lis) {
		var li = lis[n];
		var cl = li.getAttribute('class');
		if(cl == "follow-action") {
			butts[butts.length] = li.getElementsByTagName('button')[0];
		}
	}
}

if(butts.length > 0) {
	el = document.createElement('div');
	el.setAttribute('id','friend_adder_bar');
	el.style.position="fixed";
	el.style.height="28px";
	el.style.width="100%";
	el.style.left="0";
	el.style.bottom="0";
	el.style.backgroundColor="#331B28";
	el.style.borderTop="1px solid #A7A6AB";
	el.style.zIndex="100";
	
	txt = "<div style=\"width:760px;margin:6px auto 0 auto;color:#ffffff;text-align:left\">";
		txt += "<p id=\"friend_adder_message\" style=\"float:right\">";
			txt += "You have "+butts.length+" unfollowed friends on this page. ";
			txt += "<a style=\"color:#2FC2EF\" href=\"javascript:";
				txt += "var lis = document.getElementsByTagName('li');";
				txt += "for(var n in lis) {var li = lis[n];try {var cl = li.getAttribute('class');if(cl == 'follow-action') {var butt = li.getElementsByTagName('button')[0];butt.click();} } catch(e) {} }";
				txt += "document.getElementById('friend_adder_message').innerHTML='Followed.';(function(){})();";
			txt +="\">"
				txt += "Follow All";
			txt += "</a>";
		txt += "</p>";
		txt += "<p>";
			txt += "<strong>Twitter Page Follower</strong> brought to you by <a href=\"http://twitter.com/kevinjdolan\" style=\"color:#2FC2EF\">@kevinjdolan</a>";
		txt += "</p>";
	txt += "</div>";
	
	el.innerHTML = txt;
	
	document.body.style.paddingBottom=("50px");
	document.body.appendChild(el);
}