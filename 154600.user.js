// ==UserScript==
// @name        Send any Photo from Sweden as eCard
// @namespace   com.vidsbee
// @description Send any photo on fjellfotografen.se or laponiapictures.com as an eCard.  Normally photos that are a non postcard aspect ratio are excluded, and only images with certain tags are allowed as eCards.
// @grant       none
// @homepage    http://userscripts.org/scripts/show/154600
// @icon        http://laponiapictures.com/img/ecard_icon32.jpg
// @updateURL   https://userscripts.org/scripts/source/154600.meta.js
// @include     http://laponiapictures.com*/@*
// @include     http://fjellfotografen.se*/@*
// @version     1.0.0
// ==/UserScript==

var styleelem;
function VM_addStyle(styles){
	styleelem=document.createElement('style');
	styleelem.type='text/css';
	styleelem.appendChild(document.createTextNode(''+styles));
	VM_addStyle=function(styles){
		styleelem.appendChild(document.createTextNode(''+styles));
	}
	VM_ClearStyles=function(){
		if(styleelem) styleelem.innerHTML='';
	}
	VM_AppendStyles=function(){if(styleelem){
		var e=(document.getElementsByTagName('head')[0]||document.body);
		if(e){
			e.appendChild(styleelem);
			//e.removeChild(styleelem);
		}else{
			//count not append styles!
		}
	}}
}
VM_addStyle("#ecardViewer{display:block !important;}");
VM_AppendStyles();