	// ==UserScript==
	// @name                Google Docs Viewer Hide Side Pane
	// @description	        Hides side pane where thumbnails are shown in google viewer
	// @include		http://docs.google.com/fileview*
	// ==/UserScript==

document.getElementById("thumb-pane").style.display = "none";
var f = document.getElementById("gview").contentDocument;
f.getElementById("content-pane").style.width = "100%";

var pageCount = f.getElementById("pager-page-number").innerHTML.split(" / ")[1];
for(i=0; i < pageCount; i++){
  var e = document.getElementById("0.page." + pageCount);
  e.style.width = "100%";
  var l = e.getElementsByTagName("img");
  for(j=0; j < l.length; j++){
    if(j.style.display != "none")
      j.style.width = "100%";
  }
}

    