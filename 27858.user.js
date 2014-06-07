// ==UserScript==
// @name           What.cd Tag Icons
// @namespace      what.cd
// @include        http://www.what.cd/torrents.php*
// @include        http://what.cd/torrents.php*
// @include        https://www.what.cd/torrents.php*
// @include        https://what.cd/torrents.php*
// ==/UserScript==


// Enlarge torrent title
//
var torrent_group_trs=document.evaluate("//tr[@class=\"group\"]", document, null, 6, null);
for (var i = 0; i < torrent_group_trs.snapshotLength; i++) {
	var torrent_group_tr=torrent_group_trs.snapshotItem(i);
	GM_log(torrent_group_tr.innerHTML);

	var td_list=torrent_group_tr.childNodes;
	var td=td_list.item(5);
		  
	var group_title=td.innerHTML;
	td.innerHTML="<font size=+1>"+group_title+"</font>";
};

// Enlarge tags
//
var tag_divs = document.evaluate("//div[@class=\"tags\"]", document, null, 6, null);
for (var i = 0; i < tag_divs.snapshotLength; i++) {
  var div=tag_divs.snapshotItem(i);
  var anchor_list=div.childNodes;
  for (var j=0;j<anchor_list.length;j++) {
    var anchor=anchor_list.item(j);
  
  	var tag_string=anchor.innerHTML;  
  	anchor.innerHTML="<font size=+2>"+tag_string+"</font>";
  };
};
