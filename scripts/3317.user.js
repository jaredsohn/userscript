// ==UserScript==
// @name          Bit-Tech Forums Cleanup
// @description   Enables the Bit-Tech forums to take up the whole screen width, rather than the nasty dead space at the side.
// @include       http://forums.bit-tech.net/*
// ==/UserScript==
if (document.getElementById('header-ad')) {
	document.getElementById('header-ad').style.display='none';
}
if (document.getElementById('navi')) {
	document.getElementById('navi').style.top='125px';
}
if (document.getElementsByTagName('div').length>0) { 
	for (var i=0;i<document.getElementsByTagName('div').length;i++) {
		if (document.getElementsByTagName('div')[i].style.height=='264px') {
			document.getElementsByTagName('div')[i].style.height='149px';
		}
		if (document.getElementsByTagName('div')[i].style.marginRight=='176px') {
			document.getElementsByTagName('div')[i].style.marginRight='0px';
		}
	}
}