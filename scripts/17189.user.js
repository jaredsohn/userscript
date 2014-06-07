// ==UserScript==
// @name           What.cd Quick PM!
// @namespace      What.cd Quick PM!
// @description    Add's a quick PM next to users name on forums at what.cd
// @include        http://what.cd/forums.php?action=viewtopic&topicid=*
// @include        http://www.what.cd/forums.php?action=viewtopic&topicid=*
// ==/UserScript==
var links			= new Array();
var userids 		= new Array();

var a, links, no, yes;
links = document.getElementsByTagName('a');
no = -1;
for (var i = 0; i < links.length; i++) {
    a = links[i];
    if ((a.href).substr(0,34) == "http://what.cd/userdetails.php?id=") {
	no++;
	userids[no] = a.href.substr(34);
	if (a.href && no > 0) {
		yes++;
		var logo = unsafeWindow.document.createElement("a");
		logo.innerHTML = '  <a href=http://what.cd/sendmessage.php?receiver='+userids[no]+'><img src="data:image/gif;base64,R0lGODlhEAAQAJEAANHb6H6XswAAAAAAACH5BAEAAAIALAAAAAAQABAAAAIslI+py+0PT5i0VhGA3pzTDgJfFmrZZJYkmnYsK5Km/LbrLHpy/pXbhLEIgQUAOw==" border="0"> </a>';
		links[i].parentNode.insertBefore(logo, links[i].nextSibling);
		}
	}
	 
	else if ((a.href).substr(0,38) == "http://www.what.cd/userdetails.php?id=") {
	no++;
	userids[no] = a.href.substr(38);
		if (a.href && no > 0) {
		yes++;
		var logo = unsafeWindow.document.createElement("a");
		logo.innerHTML = '  <a href=http://www.what.cd/sendmessage.php?receiver='+userids[no]+'><img src="data:image/gif;base64,R0lGODlhEAAQAJEAANHb6H6XswAAAAAAACH5BAEAAAIALAAAAAAQABAAAAIslI+py+0PT5i0VhGA3pzTDgJfFmrZZJYkmnYsK5Km/LbrLHpy/pXbhLEIgQUAOw==" border="0"> </a>';
		links[i].parentNode.insertBefore(logo, links[i].nextSibling);
		}
	}
}