// ==UserScript==
// @name           Chess.com Hide User Forum Posts
// @namespace      chessdotcom
// @include        http://www.chess.com/forum/*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

var hiddenUsers = ["username1", "username2", "username3"];

for(var u in hiddenUsers) {
	$(".comment").each(function(i, el) {
			try {
				if($(el).children(".commentheader").eq(0).html().indexOf('<a href="http://www.chess.com/members/view/' + hiddenUsers[u] + '">') != -1)
					el.style.display = "none";
			} catch(e) {}
		});
	$(".tableforum tr").each(function(i, el) {
			try {
				if($(el).eq(0).html().indexOf('by ' + hiddenUsers[u] + '</span>') != -1)
					el.style.display = "none";
			} catch(e) {}
		});
	$(".li-forum li").each(function(i, el) {
			try {
				if($(el).eq(0).html().indexOf('<a href="http://www.chess.com/members/view/' + hiddenUsers[u] + '"') != -1)
					el.style.display = "none";
			} catch(e) {}
		});
}