// ==UserScript==
// @id             favorites.eztv@bernstein.users.userscripts.org
// @name           eztv.it - Highlight favorite shows
// @author         bernstein
// @description    You must edit this script and add shows!
// @version        0.9
// @updateURL      https://userscripts.org/scripts/source/157703.user.js
// @domain         eztv.it
// @include        http*://eztv.it*
// @run-at         document-end
// @namespace      org.userscripts.user.bernstein
// @grant          GM_addStyle
// ==/UserScript==

let favorites = new Array(
// Insert shows here
);

GM_addStyle(".fav_show { color: green !important; }"
        +   ".fav_show_hd { color: #0f559d !important; }"
/*      +   ".epinfo { color: grey !important; }"*/);

var nodes = document.getElementsByTagName("a");
var nl = nodes.length;
var fl = favorites.length;

for (i=0;i<nl;i++)
{
	let t = nodes[i].textContent;
	let n = nodes[i];
	
	for (j=0;j<fl;j++)
		if (t.match("^(The )?"+favorites[j]))
		{
			if (!t.match('720p'))
				n.classList.add('fav_show');
			else
				n.classList.add('fav_show_hd');
			
			break;
		}
}