// ==UserScript==
// @name           Talatrick_red_card
// @namespace      Talatrick_red_card
// @include        *.hattrick.org/World/Transfers/*
// ==/UserScript==

(function() {
	var img = document.getElementsByTagName("img");
	var table = "<table>";
	for (var i = 0; i < img.length; i++){
		if (img[i].src.indexOf("red_card")!=-1) {
			var link = img[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
			table = table.concat("<tr>"+link+"</tr>");
		}
	}
	var div = document.getElementById("ctl00_CPMain_ucPager_divWrapper");
	var temp = div.innerHTML;
	div.innerHTML = temp + "</div><br /><div>" + table;
}
)(); 