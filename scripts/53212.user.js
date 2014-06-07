// ==UserScript==
// @name           what.cd: top 10 bookmarking
// @namespace      http://what.cd
// @description    adds bookmarking to top 10
// @include        https://ssl.what.cd/top10.php*
// @include        http://*what.cd/top10.php*
// ==/UserScript==

var grp = document.getElementsByTagName('tr');
for(i=0;i<grp.length;i++)
	if(/^group_torrent/.test(grp[i].className)) {
		var spanl = grp[i].children[2].children[0];
		var id = /\d+/.exec(grp[i].children[2].children[1].children[1].href);
		var bm = document.createElement("a");
		bm.setAttribute("title", "Bookmark!");
		bm.setAttribute("onclick", "var xhr = new XMLHttpRequest(); xhr.open('GET','bookmarks.php?action=add&auth="+unsafeWindow.authkey+"&groupid="+id+"', true); xhr.send();return false;");
		bm.setAttribute("href", "#");
		bm.innerHTML = "BM";
		spanl.innerHTML = spanl.innerHTML.replace("]"," | ");
		spanl.appendChild(bm);
		spanl.innerHTML = spanl.innerHTML + "]";
	}