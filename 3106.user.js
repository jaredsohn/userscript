// ==UserScript==
// @name          Printer friendly Indiatimes (Economic Times, Times of India)
// @description   Disables force print for printer friendly version. Just cancel on print dialog and read article.
// @include       http://*.indiatimes.com/articleshow/*prtpage*
// ==/UserScript==

function myclose(){
GM_log("that was a close call!");
};

unsafeWindow.close = myclose;

var scripts = document.getElementsByTagName('script');

GM_log(scripts.length+' scripts found');
for(var i =scripts.length-1; i >= 0; i--){
	GM_log(scripts.length+' scripts remaining i='+i);
	var aScript = scripts[i];
	aScript.parentNode.removeChild(aScript);
	unsafeWindow.close = myclose;
}
unsafeWindow.close = myclose;
peace = document.createElement('div');
peace.setAttribute('style','background-color:yellow;font-size:large');
peace.innerHTML = "Hit Cancel on Print dialog and read in peace!";
document.body.appendChild(peace);