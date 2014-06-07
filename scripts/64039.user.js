// ==UserScript==
// @name           LastSearch Query
// @namespace      lastsearchquery
// @description    Uses the LastSearch plugin results to add results to Google
// @include        http://www.google.*/*
// @include        http://www.google.*/search?*q=*
// ==/UserScript==
GM_TUR = {
	un : "",
	resp : "",
	init : function() {
		var href = document.location.href;
		GM_TUR.un = href.match(/[&?]q=([^&]*)(?:&|$)/)[1];
		if( GM_TUR.un != "" ) {
			GM_xmlhttpRequest( {
				method:"GET",
				url:"http://badcheese.com/~steve/lastsearchquery.php?q="+GM_TUR.un,
				onload:GM_TUR.handle
			});
		}
	},
	handle : function(response) {
		if (response.responseText != "") {
			var results = document.getElementById("res");
			var ds = document.createElement("ol");
			results.insertBefore(ds, results.firstChild);
			var il, h;
			var query = unescape(GM_TUR.un).replace(/\+/g, ' ');
			h = ds.appendChild(document.createElement("li"));
			h.className = "g";
			var h3 = h.appendChild(document.createElement("h3"));
			h3.className = "r";
			h3.innerHTML = "LastSearch results for <em>"+ query +"</em>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 43px; text-align: center;" valign="top"><img src="http://badcheese.com/~steve/lamesmall3_5.jpg" alt=""></td><td style="padding-top: 3px;" valign="top">';
			row.innerHTML += response.responseText;
			row.innerHTML += '</td>';
		}
	}
};
GM_TUR.init();

