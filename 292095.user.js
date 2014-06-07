// ==UserScript==
// @name        Kickass skip warnings
// @namespace   kickass.to
// @description Skip on the adults warning and the redirect confirm in kickass.to
// @include     *kickass.to*
// @version     1.2.0
// @grant       dtk12345
// ==/UserScript==

(function() {
var arr2 = document.getElementsByClassName("siteButton bigButton");

for (var i=0;i<arr2.length;i++){
	if(arr2[i].innerHTML.indexOf("let me see it")!=-1 || arr2[i].innerHTML.indexOf("onfirm")!=-1){
		arr2[i].click();
	}
}
})();