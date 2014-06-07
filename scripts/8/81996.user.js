// ==UserScript==
// @name           showCard2
// @namespace      http://twitter.com/xteban
// @description    search a card image
// @include        http://fivewithflores.com/*
// @include        http://portalmagic.cl/*
// @include        http://www.manadeprived.com/*
// ==/UserScript==

var layer = document.createElement("div");
layer.id = "floatdiv";
layer.style.position="fixed";
layer.style.left="10px";
layer.style.top="5px";
layer.style.zIndex="10000";
var i=document.createElement("input");
i.type="button";
i.id="but";
i.value="Search Card";
i.addEventListener('click',
	function(){
		var txt = '';
		if (window.getSelection){
			txt = window.getSelection();
		} else if (document.getSelection){
			txt = document.getSelection();
		} else if (document.selection) {
			txt = document.selection.createRange().text;
		}
		if(txt!=''){
			g.src="http://gatherer.wizards.com/Handlers/Image.ashx?name="+txt+"&type=card";
			popup.style.visibility='visible';
			//alert(g.src);
		}else alert("Select something first");
	}, false);
layer.appendChild(i);

var popup=document.createElement("div");
popup.style.position="fixed";
popup.style.left="10px";
popup.style.top="25px";
popup.style.zIndex="10000";
var g=document.createElement("img");
g.alt='loading';
popup.appendChild(g);
popup.addEventListener('click',
	function(){
		popup.style.visibility='hidden';
	},false);
popup.style.visibility='hidden';
document.body.insertBefore(popup, document.body.firstChild)
document.body.insertBefore(layer, document.body.firstChild)
