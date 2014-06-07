// ==UserScript==
// @name          GMail Left Align ChatBox
// @description	  Left Aligns Google Chats
// @namespace     http://halfaclick.blogspot.com/
// @include       http://mail.google.com/mail/*

//Developed by Mayank Singhal
// ==/UserScript==

(function() {
	function getElementAbyClass(rootobj, classname){
		var temparray=new Array()
		var inc=0
		var rootlength=rootobj.length
		for (i=0; i<rootlength; i++){
			if (rootobj[i].className==classname)
				temparray[inc++]=rootobj[i]
		}
		return temparray
	}
	function leftit() {
		var ancs = document.getElementsByClassName('no'); //Must add buttons also
		for (it = 0; it <ancs.length; it++) {
			//if (ancs[it].childnodes[0].className == 'nH nn') {
				ancs[it].style.cssFloat = "left";
			//	ancs[it].style.paddingLeft = "200px";
			//}
		}
		setTimeout(leftit, 200)
	}
	leftit();
})();