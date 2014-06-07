// ==UserScript==
// @name           SFP layout images
// @namespace      SFP layout images
// @description    Changes the forum images and the team leaders image. 
// @include        http://goallineblitz.com/game/forum_main.pl
// @include        http://goallineblitz.com/game/forum_thread_list.pl?forum_id=*
// @include        http://goallineblitz.com/game/forum_thread_list.pl?team_id=*
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// ==/UserScript==

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://goallineblitz.com/images/game/forum/no_new_posts.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i159.photobucket.com/albums/t129/toetaggerjoe/onbutton.png';
	}
}

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://goallineblitz.com/images/game/forum/new_posts.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i159.photobucket.com/albums/t129/toetaggerjoe/forumbuttonnew.png';
	}
}

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://goallineblitz.com/images/game/forum/thread_locked.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i159.photobucket.com/albums/t129/toetaggerjoe/forumbuttonlocked.png';
	}
}

var allImgs,thisImg;
allImgs = document.evaluate('//img[@src]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

for (var i=0;i<allImgs.snapshotLength;i++) {
 var thisImg = allImgs.snapshotItem(i);
 var src = thisImg.src;
	var srcMatch = src.match('^http://goallineblitz.com/images/game/headlines/league_leaders.gif');
	if (srcMatch != null) {
  thisImg.src = 'http://i159.photobucket.com/albums/t129/toetaggerjoe/league_leaders.png';
	}
}