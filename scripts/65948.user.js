// ==UserScript==
// @name           schüler.cc
// @namespace      schüler.cc
// @include        http://www.schueler.cc/s,profil,fotoalbum,foto.php*
// ==/UserScript==

	var text ="Download";
	var DownloadButton = document.createElement("button");
	var id = document.createAttribute("id");
	var style = document.createAttribute("style");
	id.nodeValue = "download";
	var DownloadButtonLeft = document.getElementById("danachlinkoben").offsetLeft+40;
	var DownloadButtonTop = document.getElementById("danachlinkoben").offsetTop+4;
	style.nodeValue = "position:absolute; top:"+ DownloadButtonTop +"px; left:"+ DownloadButtonLeft +"px;";
	DownloadButton.setAttributeNode(id);
	DownloadButton.setAttributeNode(style);
	DownloadButton.appendChild(document.createTextNode(text));
	document.getElementsByTagName('body')[0].appendChild(DownloadButton);
	addEventListener('click', checkAction, false);

function checkAction(event) {

	switch (event.target.getAttribute("id")) {
		case "download":
				var str=document.getElementById("foto").style.backgroundImage;
				window.open (str.substring(5,str.length-2),"mywindow");
			break;
	}
}

var str=document.getElementById("foto").style.backgroundImage;
var menu = document.getElementById("container").innerHTML;
var menu = menu.replace(/return false/, "return true");
document.getElementById("container").innerHTML=menu;