// ==UserScript==
// @name        RHP_gbaway2013
// @namespace   SG
// @description hide RHP posts from unwanted users
// @include     http://www.playtheimmortalgame.com/board/showthread.php*
// @include     http://www.timeforchess.com/board/showthread.php*
// @include     http://www.redhotpawn.com/board/showthread.php*
// @include     http://www.redhotchess.com/board/showthread.php*
// @include     http://www.chessatwork.com/board/showthread.php*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_log
// @version     1
// ==/UserScript==

// Surprisingly these two items aren't under the same div
var posts = $('div.forumPostContent');
var posterInfo = $('div.forumPostUserInfo');

shitList = GM_getValue('shitList');
if(shitList === undefined) {
	// make sure the variable is in there
	GM_setValue('shitList', '');
}
shitList = GM_getValue('shitList');

if(shitList.length) {
	shitList = shitList.split('\n');
	for(var pi = 0; pi < posts.length; pi++) {
		var posterName = posterInfo.eq(pi).find('a[href*="profile/playerprofile.php"]');
		for(var shi = 0; shi < shitList.length; shi++) {
			if(shitList[shi] == posterName.text()) {
				posts.eq(pi).html(''
					+ '<hr><div style="background-color:lightgray;height:2.0em;">'
					+ '<div style="float:left;">removed</div>'
					+ '<div style="float:right;">'
					+ '<a class="microButton blocker">Unblock users</a>'		// put this in to preserve indexing of block button
					+ '</div>'
					+ '</div><hr>'
				);
				posterInfo.eq(pi).hide();
			}
			// also block their quoted posts
			var quotedPost = posts.eq(pi).find('div.forumPostQuote');
			if(quotedPost.length) {
				var quotedNameIndex = quotedPost.text().search(/posted by/i);	
				if(quotedNameIndex != -1) {
					quotedNameIndex += 10; 	//'posted by '.length;
					quotedName = quotedPost.text().substring(quotedNameIndex).split('\n')[0];
					if(shitList[shi] == quotedName) {
						quotedPost.html('<span style="background-color:lightgray;"><hr>removed<hr></span>');
					}
				}
			}
		}
	}
}

// provide links on posts for blocking
// $('a.microButton[href*="replytoid"]').parent().append('<a class="microButton blocker" href="#">Block Posts!</a>');
$('a.microButton[href*="replytoid"]').parent().prepend('<a class="microButton blocker" href="#">Block Posts!</a>');
$('a.blocker').click(function(event) {
	var indexOfThis = $('a.blocker').index(this);
	var posterName = posterInfo.eq(indexOfThis).find('a[href*="profile/playerprofile.php"]');
	if($(this).text().search(/unblock/i) != -1) removeFromShitList();
	else addToShitList(posterName.text());
	location.reload(noCache = true);
});

function addToShitList(name) {
	var sl = GM_getValue('shitList');
	if(sl.length > 0) sl += '\n';
	// alert('blocking ' + name);
	sl += name;
	GM_setValue('shitList', sl);
	// alert('your shit list is now : \n' + sl);
}

function removeFromShitList() {
	// alert('restoring ' + name);
	var sl = GM_getValue('shitList');
	if(sl.length > 0) {
		sl = sl.split('\n');
		var promptStr = "Please give the number of the person to un-censor.";
		for(var i = 0; i < sl.length; i++) promptStr += '\n' + (i + 1) + ' - ' + sl[i];
		var restoreIndex = prompt(promptStr);
		sl.splice(restoreIndex - 1, 1);
		// alert('shitList is now\n' + sl.join('\n'));
		GM_setValue('shitList', sl.join('\n'));
	}
}

