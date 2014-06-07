// ==UserScript==

// @name           Remove forums

// @namespace      http://userscript.org

// @description    Remove forums

// @include        http*://*weed.cd/forums.php

// ==/UserScript==



function delForums() {
	if (GM_getValue('forums_block')) {

		var forumsBlocked = GM_getValue('forums_block').split(",");
	}
	else {
		GM_setValue('forums_block', " ");
		var forumsBlocked = GM_getValue('forums_block').split(",");
	}

		if (this.name) {

			var block2 = this.name;

			forumsBlocked[forumsBlocked.length-1] = block2;

			var used = GM_getValue('forums_block');

			if (used != " ") { used = GM_getValue('forums_block')+","; }

			GM_setValue('forums_block', used+block2);

		}



		if (document.location.pathname == '/forums.php' && document.location.search == '') {

			var rows = unsafeWindow.$('tr.rowa, tr.rowb').objects;

			for (var i in rows) {

				if (unsafeWindow.in_array(rows[i].getElementsByTagName('a')[0].innerHTML, forumsBlocked)) {

					rows[i].parentNode.removeChild(rows[i]);

				}

			}

			var tables = document.getElementsByTagName('table');

			for (var i = 0; i < tables.length; i++) {

				var table_rows = tables[i].getElementsByTagName('tr');

				var classes = ['rowa', 'rowb'], class_index = 0;

				for (var j = 1; j < table_rows.length; j++) {

					table_rows[j].className = classes[class_index++];

					class_index %= classes.length;

				}

			}

		}
}

delForums();



var links = document.getElementById("content").getElementsByTagName("a");

var ssl = document.location.href.split("weed.cd/forums.php")[0];


for (var e = 0; e < links.length; e++) {

	if (links[e].href.split(ssl+"weed.cd/forums.php?action=viewforum&forumid=") != links[e].href) {

		var delButton = document.createElement("a");

		delButton.innerHTML = "X";

		delButton.name = links[e].innerHTML;

		delButton.style.cursor = "pointer";

		delButton.addEventListener('click',delForums,false);

		var align = document.createElement("span");

		align.setAttribute("style","float: right;");

		align.appendChild(delButton);

		links[e].parentNode.appendChild(align);



	}

}

function resetAll() {

	GM_setValue('forums_block', '');

	document.location.href = "forums.php";

}



var reset = document.createElement("a");

reset.innerHTML = "(Reset)";

reset.style.cursor = "pointer";

reset.addEventListener('click',resetAll,false);

var banner = document.getElementsByClassName("thin")[0].getElementsByTagName("h2")[0];

banner.appendChild(document.createTextNode(" "));

banner.appendChild(reset);