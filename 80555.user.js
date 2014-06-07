// ==UserScript==
// @name           Remove forums
// @namespace      http://userscript.org
// @description    Remove forums
// @include        http://what.cd/forums.php
// @include        https://ssl.what.cd/forums.php
// ==/UserScript==

function delForums() {
	var forumsBlocked = GM_getValue('forums_block') != '' ? GM_getValue('forums_block').split(',') : [];
	if (this.name) {
		var change = GM_getValue('forums_block') != '' ? GM_getValue('forums_block') + ',' + this.name : this.name;
		GM_setValue('forums_block', change);
		forumsBlocked.push(this.name);
	}

	var rows = unsafeWindow.$('tr.rowa, tr.rowb').objects;
	for (var i = 0; i < rows.length; i++) {
		if (unsafeWindow.in_array(rows[i].querySelector('a').innerHTML, forumsBlocked)) {
			rows[i].parentNode.removeChild(rows[i]);
		}
	}
	var tables = document.querySelectorAll('table');
	for (var i = 0; i < tables.length; i++) {
		var table_rows = tables[i].querySelectorAll('tr');
		var classes = ['rowa', 'rowb'], class_index = 0;
		for (var j = 1; j < table_rows.length; j++) {
			table_rows[j].className = classes[class_index++];
			class_index %= classes.length;
		}
	}
}
delForums();

var links = document.querySelectorAll('#content a');

for (var e = 0; e < links.length; e++) {
	if (links[e].href.match(/forums\.php\?action=viewforum&forumid=/)) {
		var delButton = document.createElement('a');
		delButton.href = 'javascript:void(0);';
		delButton.name = links[e].innerHTML;
		delButton.innerHTML = 'X';
		delButton.addEventListener('click', delForums, false);

		var align = document.createElement('span');
		align.setAttribute('style', 'float: right;');
		align.appendChild(delButton);

		links[e].parentNode.appendChild(align);

	}
}


var reset = document.createElement('a');
reset.href = 'javascript:void(0);';
reset.innerHTML = '(Reset)';
reset.addEventListener('click', function () {
	GM_setValue('forums_block', '');
	document.location.href = 'forums.php';
}, false);

var h2 = document.querySelector('div.thin h2');
h2.appendChild(document.createTextNode(' '));
h2.appendChild(reset);