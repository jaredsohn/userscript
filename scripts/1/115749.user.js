// ==UserScript==
// @name           Campusnet Download Link Adder
// @description    Adds a direct download link to CN files
// @include        https://www.campusnet.dtu.dk/cnnet/*
// ==/UserScript==


for(var i=1; i<=10; i++) {
var cell = document.getElementById("Files_r" + i).childNodes[0].childNodes[0].childNodes[0].childNodes[1];
var url = cell.childNodes[0];
var newDiv = document.createElement("div");
newDiv.style.display = "inline";
newDiv.style.marginLeft = "10px";

GM_xmlhttpRequest({
method: 'GET',
url: url,
onload:function(xhr) {
	if(xhr.responseText !== "") {
		var read = xhr.responseText.replace(/&amp;/gi,"&")
		.match(/SADownload.aspx\?ElementId=\d{5,10}&FileVersionId=\d{5,10}&FileId=\d{5,10}&mode=download_text/gi);
		newDiv.innerHTML = "<a href='https://www.campusnet.dtu.dk/cnnet/filesharing/" + read[0] + "'><img src='http://www.freeiconsweb.com/Icons-show/splashyIcons/download.png' width='16px' height='16px' title='Download!' vspace='0' hspace='0'></a>";
	}
  }
});

cell.appendChild(newDiv);
}
