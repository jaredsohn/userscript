// ==UserScript==
// @name            GoogleTranslateMoreLayout
// @author          Mesak
// @description     Google Translate More Layout
// @include         http://translate.google.com*
// @include         http://www.translate.google.com*
// @version        
// @namespace       http://mesak.wablog.info/
// ==/UserScript==

//START insert style
/**
 * Insert Style Function
 *
 * Insert in page CSS
 */
var link = {
"中翻英":"#zh-CN|en|",
"英翻中":"#en|zh-TW|"
}
var a = document.getElementsByTagName("a");
var size = 0;
for(n in a ){
	if ( a[n].className == 'q') {
		a[n].parentNode.setAttribute("id","three_col_wrapper");
		makeLink();
		break;
	}
}
function makeLink(){
	var LINKLAY = document.createElement('div'); ;
	var linkhtml ='';
	for(n in link){
		linkhtml += '○<a class="q" href="'+link[n]+'">'+n+'</a><br><br>';
	}
	LINKLAY.innerHTML = linkhtml;
	document.getElementById('three_col_wrapper').appendChild(LINKLAY)
}