// ==UserScript==
// @name           HotFile Paid Only
// @namespace      freakz
// @description    Only show the pay section not the dates with what you have earned
// @include        http://hotfile.com/mystats.html
// @include        http://www.hotfile.com/mystats.html
// @version        0.3
// ==/UserScript==

GM_registerMenuCommand("Show short table", shorttable);
GM_registerMenuCommand("Show full table", fulltable);

//Original Table 6;
var original = document.getElementsByTagName('table')[6].innerHTML;

function main(){
	var rows = document.getElementsByTagName('table')[6].getElementsByTagName('tr');
	var i = 0;
	var table = "<tr bgcolor=\"#dddddd\">" + rows[4].innerHTML + "</tr><tr bgcolor=\"#dddddd\">" + rows[5].innerHTML;
	while (i < rows.length){
		if (rows[i].getElementsByTagName('img').length == 1){
			table = table +
			"</tr><tr>" + rows[i].innerHTML + 
			"</tr><tr>" + rows[i+1].innerHTML + 
			"</tr><tr>" + rows[i+2].innerHTML + 
			"</tr><tr>" + rows[i+3].innerHTML + 
			"</tr><tr>" + rows[i+4].innerHTML + 
			"</tr>";
			document.getElementsByTagName('table')[6].innerHTML = table;
			i = rows.length;
		}
		i = i + 1;
	}
}


function shorttable(){
	if (!GM_getValue("short", true)){
		GM_setValue("short", true);
		main();
	}
}

function fulltable(){
	if (GM_getValue("short", true)){
		GM_setValue("short", false);
		document.getElementsByTagName('table')[6].innerHTML = original;
	}
}

main();