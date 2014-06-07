// ==UserScript==
// @name           select by status
// @namespace      http://lucash.de/cobocards
// @description    Adds buttons to select all questions with special number of correct answers
// @include        http://my.cobocards.com/print/*
// ==/UserScript==

var console = unsafeWindow.console;
if (console == undefined) {
	console = {};
	console.log = function(){}
}

var lucash_de = lucash_de || {};
lucash_de.cobocards = lucash_de.cobocards || {};
unsafeWindow.lucash_de = lucash_de;

var newBar = document.createElement('div');
var newBarStyles = {
	backgroundColor: '#D9D9D7', 
	height: '28px', 
	left: '-30px', 
	padding: '7px 10px',
	position: 'absolute',
	top: '42px',
	width: '799px'
};
for (var i in newBarStyles) {
	if (i != undefined) {
		newBar.style[i] = newBarStyles[i];
		//console.log(i, newBarStyles[i]);
	}
}
newBar.innerHTML = '<span style="float: left;">Alle </span><a class="button_grey" onClick="lucash_de.cobocards.select(1);">nicht</a>';
newBar.innerHTML += '<a class="button_grey" onClick="lucash_de.cobocards.select(6);">halb</a>';
newBar.innerHTML += '<a class="button_grey" onClick="lucash_de.cobocards.select(2);">1 mal</a>';
newBar.innerHTML += '<a class="button_grey" onClick="lucash_de.cobocards.select(3);">2 mal</a>';
newBar.innerHTML += '<a class="button_grey" onClick="lucash_de.cobocards.select(4);">3 mal</a>';
newBar.innerHTML += '<a class="button_grey" onClick="lucash_de.cobocards.select(5);">4 mal</a><span> gewussten</span>';
document.getElementById('cardnavibar').parentNode.insertBefore(newBar, document.getElementById('cardnavibar'));
document.getElementById('cardnavibar').nextSibling.nextSibling.style.marginTop = '84px';
document.getElementById('cardnavibar').removeChild(document.getElementById('cardnavibar').firstChild.nextSibling);
//console.log(document.getElementsByTagName('img'));

unsafeWindow.lucash_de.cobocards.select = function (type) {
	var imgElements = document.getElementsByTagName('img');
	for (var i = 0; i < imgElements.length; i++) {
		if (imgElements[i].src == 'http://my.cobocards.com/img/status_' + type + '.png') {
			console.log(imgElements[i].parentNode.firstChild.checked);
			if (imgElements[i].parentNode.firstChild.checked == true) {
				imgElements[i].parentNode.firstChild.checked = false;
			} else {
				imgElements[i].parentNode.firstChild.checked = true;
			}
		}
	}
}
