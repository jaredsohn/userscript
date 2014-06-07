
// ==UserScript==
// @name          Castg
// @namespace  http://castg.com.ar
// @description   Chau a los molestos InfoLinks
// @require       
// @include       *
// ==/UserScript==
all = document.getElementsByTagName('*');
for(i in all){
	if(all[i].className=='IL_AD' || all[i].id.match(/IL_AD/i) ){
		all[i].onmouseover='';
		all[i].onmousein='';
		all[i].onmouseout='';
		all[i].setAttribute('class','');
	}
}