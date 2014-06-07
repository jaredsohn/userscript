// ==UserScript==
// @name		Video2Mp3 Direct Download
// @description		starts download directly after the conversion
// @include		*video2mp3.net/view/YouTube/*
// @include		*video2mp3.net/*/view/YouTube/*
// ==/UserScript==

function jSwitchin(){
	if (location.pathname == "/promo.php") location.replace(location.search.split("dlink=")[1].split("&")[0]);
	else {
		location.replace(document.getElementById("download").href);
		setTimeout('location.href="/afterdownload.php";', 15000);
	}
}
window.onload = jSwitchin();
