// ==UserScript==
// @name        Follower Stalker
// @namespace   Selbi
// @include     http*://*fimfiction.net/user/*
// @version     1
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

// Make sure the script is only run once
if (window.top !== window.self)	return;

$(".bio_followers h3:first").append(' &mdash; <a href="#" onclick="checkFollowers();return false;">Stalk</a>');
var username = $(".user-box-level-1 a").html().replace(" ", "+");
var fol_old = GM_getValue("followers_" + username);

unsafeWindow.checkFollowers = function() {
	var fol_new = [];
	$("#follower_list .name").each(function(){
		fol_new.push($(this).clone().children().remove().end().text());
	});
	if (fol_new.length == 50) {
		if (confirm('Only 50 followers found. If you forgot to click on "Show All ### Followers", press Cancel and do so.') == false) return;
	}
	setTimeout(function(){GM_setValue("followers_" + username, fol_new.join(";"));},0);
	if (fol_old == undefined) {
		$(".bio_followers h3:first").append("<hr>First list of followers saved!");
		return;
	} else {
		fol_old = fol_old.split(";");
		if (typeof fol_old == "string") fol_old = [fol_old];
	}

	var fol_fo = [];
	$.each(fol_new, function(ind, n_name){
		if ($.inArray(n_name, fol_old) == -1) fol_fo.push(n_name);
	});

	var fol_un = [];
	$.each(fol_old, function(index, o_name){
		if ($.inArray(o_name, fol_new) == -1) fol_un.push(o_name);
	});
	
	if (fol_fo.length == 0) {
		fol_fo = "-None-";
	} else {
		fol_fo = "&bull; " + fol_fo.join("<br>&bull; ");
	}
	if (fol_un.length == 0) {
		fol_un = "-None-";
	} else {
		fol_un = "&bull; " + fol_un.join("<br>&bull; ");
	}
	$(".bio_followers h3:first").append("<hr><b>New Followers:</b><br>" + fol_fo + "<br><br><b>Ex-Followers:</b><br>" + fol_un);
}