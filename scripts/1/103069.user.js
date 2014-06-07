// version 2.4 BETA!
// 2012-06-20
// ==UserScript==
// @name  Urdu Font Changer
// @namespace  http://chaoticity.com
// @license (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @description   Changes font of any Urdu website. The test website here is urdu.dawn.com but you can change it by updating the @include line below. You can add more sites by adding a new @include line.
// @include  http://urdu.dawn.com/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('media', 'all');
    style.innerHTML = css;
    head.appendChild(style);
}

window.onload= function() {
var classes =['body','a','h1','h2','h3','h4','div','p','li']; //selectors for external stylesheets have to be hardcoded for now.

var elems = document.getElementsByTagName("body")[0].getElementsByTagName("*");
for(var i=0; i<elems; i++){
	var obj=elems[i];
	var lst=obj.classList;
	if (lst)  {
		for (var c=0; c<lst.length; c++) {
			classes.push("."+lst[c]);
		}
	}
}
addGlobalStyle(classes.join()+' { font-family: "Jameel Noori Nastaleeq","Alvi Nastaleeq v1.0.0","Alvi Nastaleeq","Fajer Noori Nastalique", Tahoma !important; }');

}
