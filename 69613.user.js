// ==UserScript==
// @name          4chan Post Number Fixer
// @description   Removes post number truncation on /b/
// @match         http://boards.4chan.org/b/*
// ==/UserScript==

function postNumbersFix(){
	var a = document.getElementsByTagName("a");
	for (var i = 0; i < a.length; i++){
		var id = a[i].href.match(/.*\/res\/([0-9]+)\#q.*/i);
		if (id){
			a[i].innerHTML = id[1];
		}
	}
	console.log("truncation removed");
}

postNumbersFix();

