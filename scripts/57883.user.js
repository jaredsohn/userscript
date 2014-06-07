// ==UserScript==
// @name           talatrick_blesse
// @namespace      talatrick_blesse
// @include        *.hattrick.org/World/Transfers/*
// ==/UserScript==

(function() {
	var img = document.getElementsByTagName("img");
	var table = "<table>";
	for (var i = 0; i < img.length; i++){
		if (img[i].src.indexOf("injured")!=-1) {
			var link = img[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
			table = table.concat("<tr>"+link+"</tr>");
		}
	}
	var div = document.getElementById("ctl00_CPMain_ucPager_divWrapper");
	var temp = div.innerHTML;
	div.innerHTML = temp + "</div><br /><div>" + table;
}
)(); 