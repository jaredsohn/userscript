// ==UserScript==
// @name           Windows Live Skydrive View Detail
// @namespace      zhangsoft.gmail.com
// @description    Redirect Skydrive file list to 'View Detail' and expand the width of file name column.
// @version        1.2
// @include        http://*.skydrive.live.com/*
// ==/UserScript==

var pathArray = window.location.pathname.split("/");
var url = window.location.href;
var urlquery=location.href.split("?");
if (pathArray[1] == "browse.aspx") {
	if (urlquery.length == 1) {
		window.location.href = url + "?view=details";
	} else if(urlquery.length == 2 && urlquery[1] == "view=details"){
		var tables = document.getElementsByTagName("table");
		var ta = tables[0];
		ta.style.width = "120%";
		ta.tHead.rows[0].cells[0].style.width="58%";
		ta.tHead.rows[0].cells[1].style.width="19%";
		ta.tHead.rows[0].cells[2].style.width="15%";
		ta.tHead.rows[0].cells[3].style.width="8%";
	}
}