// ==UserScript==
// @name           Google.co.kr "HOT Topic" remover
// @namespace      http://twitter.com/ziru
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// ==/UserScript==

(function(){
	var idNameAry = ['rs','ht'];
	var classNameAry = ['rhss'];
	var tempEle = "";
	var tempEles = "";
	// remove known ad ids
	for (var i = 0; i < idNameAry.length; i++) {
		tempEle = document.getElementById(idNameAry[i]);
		if (tempEle) tempEle.parentNode.removeChild(tempEle);
	}
	// remove known ad class names
	/*
	for (var i = 0; i < classNameAry.length; i++) {
		tempEles = document.getElementsByClassName(classNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
	*/
})();