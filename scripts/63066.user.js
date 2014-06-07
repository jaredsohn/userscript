// ==UserScript==
// @name           Simple XVideos
// @namespace      http://userscripts.org/scripts/show/63066
// @description    Simple XVideos Player
// @include        http://www.xvideos.com/video*/*
// ==/UserScript==

(function() {
	var player = document.innerHTML = document.getElementById('player');

	var mainDiv = document.createElement("div");
		mainDiv.style.textAlign = "center";
		mainDiv.style.margin = "40px 30px";

	mainDiv.appendChild(player);

	var DLlink = document.createElement("div");
		DLlink.id = "DLlinkBox";
		DLlink.style.paddingTop = "20px";
		DLlink.style.clear = "both";
	var url = player.getElementsByTagName('embed')[0].getAttribute('flashvars').split('&')[2].split('=')[1];
		DLlink.innerHTML = '<a href="'+ url +'" target="_blank" title="Get flv file" style="margin: 0px 10px 0px 0px;">DownLoad Link <b>FLV</b></a>';

	mainDiv.appendChild(DLlink);

	var html = document.getElementsByTagName("html")[0];
	html.removeChild(html.childNodes.item(1));

	var body = document.createElement("body");
	var table = document.createElement("table");
		table.align = "center";
		table.style.backgroundColor = "#fff";
		table.style.marginTop = "30px";
		table.style.marginBottom = "10px";
	var tbody = document.createElement("tbody");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.width = "754";
		td.vAlign = "middle";
		td.style.border = "1px solid #ccc";

	table.appendChild(tbody);
	tbody.appendChild(tr);
	tr.appendChild(td);
	td.appendChild(mainDiv);
	body.appendChild(table);

	html.appendChild(body);
})();
