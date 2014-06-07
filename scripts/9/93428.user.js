// ==UserScript==
// @name           Forum Tables
// @namespace      pbr/ft
// @include        http://goallineblitz.com/game/forum_thread.pl*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.12.24
// ==/UserScript==

window.setTimeout( function() {
	main();
}, 1000);

function main() {
	for (var i=0; i<document.getElementsByClassName("post_content_inner").length; i++) {
		var posts = document.getElementsByClassName("post_content_inner");
		rep(posts[i]);
	}
	try {
		makeSortable();
	}
	catch (e) {
		console.log(e);
	}
}

function rep(post) {
	if (post.innerHTML.indexOf("&lt;/table&gt;") != -1) {
		console.log("found table");

		var src = post.innerHTML;
		src = src.replace(/<br>/g,"");
		src = src.replace(/&gt;/g,">");
		src = src.replace(/&lt;/g,"<");
		post.innerHTML = src;
	}
}

function makeSortable() {
	var tables = document.getElementsByClassName("bscTable");
	for each (var t in tables) {
		var head = t.getElementsByTagName("th");
		for each (var th in head) {
			th.addEventListener("click", sort, false);
		}
	}
}

function sort(event) {
	var tbl = event.target.parentNode.parentNode;
	var tbody = tbl.getElementsByTagName("tbody")[0];
	var idx = event.target.cellIndex-1;

	for (var i=1; i<tbl.rows.length; i++) {
		var swap = i;
		for (var j=i+1; j<tbl.rows.length; j++) {
			if (parseFloat(tbl.rows[j].cells[idx].innerHTML) > parseFloat(tbl.rows[swap].cells[idx].innerHTML)) {
				swap = j;
			}
		}
		if (swap != i) {
			tbl.rows[swap].parentNode.insertBefore(tbl.rows[swap], tbl.rows[i]);
		}
	}

	for (var i=2; i<tbl.rows.length; i++) {
		tbl.rows[i].setAttribute("class","alternating_color"+(i%2+1));
	}
}



