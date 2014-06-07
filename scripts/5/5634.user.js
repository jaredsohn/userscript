// ==UserScript==
// @name          Rojo remove promo
// @namespace     http://xwerocode.blogspot.com/
// @description   removes newly introduced right sidebar
// @include       http://www.rojo.com/*
// ==/UserScript==

(function(){
	document.getElementById("promo").style.display='none';
	document.getElementById("main").style.width='75%';
	var strTag = new Array('div');
	var strClass = new Array('story-container');
	for(var j=0;j<strTag.length;j++){
		var temp = document.getElementsByTagName(strTag[j]);
		for (i=0;i<temp.length; i++) {
			if (temp.item(i).className == strClass[j]) {
				temp.item(i).style.width='100%';
			}
		}
	}
	
})();
