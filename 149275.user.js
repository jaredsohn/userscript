// ==UserScript==
// @name           AutoReplacer
// @namespace      dzzzr/
// @include        http://classic.dzzzr.ru/moscow/go/?*
// ==/UserScript==


if(document.getElementsByName('cod')) {
	var ci=document.getElementsByName('cod')[0];
	ci.addEventListener('keyup',function(e){
		var val=ci.value.replace(/[дДвВ]/,'D').replace(/[рРкК]/,'R');
		ci.value=val;
	},false);
}

