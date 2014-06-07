// ==UserScript==
// @name           kayodeok web resources enhancer
// @namespace      kohalza
// @description    adds expand/collapse feature to all boxes
// @include        http://www.kayodeok.btinternet.co.uk/favorites/webdesign.htm
// ==/UserScript==
/*
todo:
1. make entire h2 clickable
2. add toggle all sections button
*/

var vStartOpen = false;

window.addEventListener("load", initCollapser, false);

function initCollapser(){
	var sectionHeads = document.getElementsByTagName('h2');
	for (var i=0, leni=sectionHeads.length; i < leni; i++){
		sectionHeads[i].style.position = 'relative';
		var collapser = document.createElement('a');
		collapser.href="javascript:void(0)";
		collapser.addEventListener("click", sectionExpandCollapse, false);
		collapser.style.position = 'absolute';
		collapser.style.top = '0px';
		collapser.style.right = '0px';
		collapser.style.padding = '4px';
		collapser.style.backgroundColor = 'transparent';
		collapser.style.color = '#FFF';
		collapser.style.fontSize = '1.2em';
		collapser.innerHTML = '-';
		collapser = sectionHeads[i].appendChild(collapser);
		if (!vStartOpen) sectionExpandCollapse(collapser);
	}
}

function sectionExpandCollapse(sender){
	if (sender.target) sender = sender.target;
	if (!sender) return;
	var ul=sender.parentNode.parentNode.getElementsByTagName('ul')[0];
	if (!ul) return;
	if (sender.innerHTML == '+'){
		ul.style.display = 'block';
		sender.innerHTML = '-';
	} else {
		ul.style.display = 'none';
		sender.innerHTML = '+';
	}
}