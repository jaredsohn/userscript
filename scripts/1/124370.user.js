// ==UserScript==
// @name           Bronyplayer - Download Song
// @author		   nym
// @version		   1.0
// @namespace      joni
// @description    Download songs from Bronyplayer
// @include        http://bronyplayer.com/#
// ==/UserScript==

var dlbutton;

function addDownloadButton() {
	removeOld();
	var where = document.getElementById("extrainfo");
	if(!where) { return; }
	dlbutton = document.createElement("a");
	var toComeHref = where.children[4].getAttribute("href");
	dlbutton.setAttribute("style", "font-size: 12px; color: #000;");
	dlbutton.innerHTML = "[download]";
	dlbutton.href = toComeHref;
	where.appendChild(dlbutton);
}

function dev() {
	var but = document.createElement("button");
	but.value = "Developer Button";
	but.setAttribute("style", "position: absolute; top: 1px; right: 100px; border: 1px solid black; background: #fff;");
	but.addEventListener("click", addDownloadButton, false);
	document.body.appendChild(but);
}

function removeOld() {
	if(dlbutton) {
		dlbutton.parentNode.removeChild(dlbutton);
		dlbutton = null;
	}
}

dev();