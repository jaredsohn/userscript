// ==UserScript==
// @name            Shanify
// @namespace       https://userscripts.org/users/478423
// @description     Shanify the forum.
// @include         *forum.*.grepolis.com/*
// @version         1.0.12
// ==/UserScript==



function Shanify() {
	var list = new Array();
	list[0] = "Richard^Shanara";
	list[1] = "richard^Shanara";
	list[2] = "RICHARD^Shanara";
	var shanifiedPage = document.body.innerHTML;
	for (var i=0; i<list.length; i++) {
		item = list[i].split("^");
		find = item[0];
		repl = item[1];
		while (shanifiedPage.indexOf(find) != -1) {
			var j = shanifiedPage.indexOf(find);
			var k = find.length;
			shanifiedPage = shanifiedPage.substr(0,j) + repl + shanifiedPage.substr(j+k);
		}
	}
	document.body.innerHTML = shanifiedPage;
}

Shanify(); 