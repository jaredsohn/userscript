// ==UserScript==
// @author		   Elevory
// @name           What.CD Collage Export Utility
// @description    Saves a collection of torrents as a text file
// @version		   1.1
// @namespace      http://userscripts.org
// @include 	   https://what.cd/collages.php?id=*
// @include        https://what.cd/bookmarks.php?*
// ==/UserScript==

var btnExport = document.createElement("a"); 
var container = document.getElementById("content").getElementsByClassName("linkbox")[0];
var data = "";

// By Wingman4l7
// this "clicks" on all the page links, 
// which calls collageShow(), 
// which loads that page of albums into the page source
var pageSpans = document.getElementsByTagName("span");
for (var i = 0; i < pageSpans.length; i++) {
if(pageSpans[i].id.indexOf("pagelink") != -1)
{ pageSpans[i].firstChild.click(); }
}
document.getElementById("pagelink0").firstChild.click(); // return to first page

window.URL = window.URL || window.webkitURL; //support additional browsers

btnExport.innerHTML = "[Export]";
btnExport.href="#";
btnExport.setAttribute("onclick", "saveData();");

btnExport.onclick = function(){
	var entries = document.getElementById("coverart").querySelectorAll("[class^='image_group_']");
	
	if (document.URL.indexOf("bookmarks.php") > 0) collageName = "Bookmarks";
	else collageName = document.getElementById("content").getElementsByClassName("header")[0]
					  .getElementsByTagName('h2')[0].innerHTML;
	
	PopulateData(entries);
	
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		var a = document.createElement("a");
		a.download = "Collage - " + collageName + ".txt";
		var blob = new Blob([data], {"data":"application/octet-stream"});
		a.href = window.URL.createObjectURL(blob);
		a.click();
	}
	else {
		if (!document.getElementsByName("taExport")[0]) {
			var taExport = document.createElement("textarea");
			taExport.name = "taExport";
			taExport.rows = "5";
			container.appendChild(taExport);
		}
		taExport.value = data;
	}


};

container.appendChild(btnExport);

function PopulateData(entries) {
	for(i = 0; i < entries.length; i++) {
		var entryText = entries[i].getElementsByTagName('img')[0];
		
		if (entryText) entryText = entryText.title.toString();
		else entryText = entries[i].getElementsByTagName('span')[0].innerHTML; //some torrents have missing images
		
		data += entryText + "\n";
	}
	
	data = data.substring(0,data.length-1); //remove final linebreak
}