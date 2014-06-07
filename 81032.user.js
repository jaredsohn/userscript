// ==UserScript==
// @name           showCard
// @namespace      http://twitter.com/xteban
// @description    search a card name on magiccard.info
// @include        http://fivewithflores.com/*
// @include        http://portalmagic.cl/*
// ==/UserScript==

var layer = document.createElement("div");
layer.id = "floatdiv";
layer.style.position="fixed";
layer.style.left="10px";
layer.style.top="5px";

var i=document.createElement("input");
i.type="button";
i.id="but";
i.value="MagicCard.info";
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
		window.open('http://www.magiccards.info/autocard.php?card='+txt,'autocard');
	}, false);
layer.appendChild(i);
document.body.insertBefore(layer, document.body.firstChild)


