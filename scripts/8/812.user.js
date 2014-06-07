// ==UserScript==
// @name           Discuss Ta-da Lists
// @namespace      http://plutor.org/projects/greasemonkey_scripts/
// @description    Adds Wikalong-powered discussion links to Ta-da Lists
// @include        http://*.tadalist.com/lists/show/*
// ==/UserScript==

(function () {
    //var t0 = new Date().getTime();
	var items = new Array();

	var incomplete_table = document.getElementById("incomplete_items");
	if (incomplete_table && incomplete_table.rows) {
		for (var i=0; i<incomplete_table.rows.length; ++i) {
			items.push(incomplete_table.rows[i]);
		}
	}
	var complete_table = document.getElementById("completed_items");
	if (complete_table && complete_table.rows) {
		for (var i=0; i<complete_table.rows.length; ++i) {
			items.push(complete_table.rows[i]);
		}
	}
	
    for (var i=0; i<items.length; ++i) {
    	var nc = items[i].insertCell(1);
    	var nca = document.createElement("a");
    	nca.href = "javascript:void(window.open('http://mateusz-adamowski.qwe.pl/GoWikalong.php?uri=" + escape(escape(document.location.href + "#" + items[i].id)) + "','Wikalong','location=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,width=400,height=600'));";
    	nca.onmouseover = "window.status='Discuss this item'";
    	nca.onmouseout = "window.status=''";
    	nca.appendChild(document.createTextNode("discuss"));
    	nc.appendChild(nca);
    	nc.style.fontSize = "8pt";
    	nc.style.paddingLeft = "1em";
    	nc.style.paddingRight = "1em";
    }
    
    //var t1 = new Date().getTime();
    //alert("UPS Tracking linkify took " + ((t1 - t0) / 1000) + " seconds");

})();
