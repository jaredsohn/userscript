// ==UserScript==
// @name           jubegraph friend list
// @namespace      s
// @include        https://www.ea-pass.konami.net/contents/jubeat/knit/fri_top.do
// @match          https://www.ea-pass.konami.net/contents/jubeat/knit/fri_top.do
// ==/UserScript==

var tags = document.getElementsByClassName("friend_id_text");

for(var i = 0 ; i < tags.length ; i++){
	if(tags[i].innerHTML == "&nbsp;") continue;
	var fid = tags[i].innerHTML;
	tags[i].innerHTML = '<a href="http://jubegraph.dyndns.org/jubeat_knit/user/' + fid + '/">' + fid + '</a>';
}
