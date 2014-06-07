// ==UserScript==
// @id             edmapa
// @name           Edmodo Math Palette
// @version        0.2
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    All the math symbols you could ever want and possibly a few more.
// @include        http://www.edmodo.com/home
// @run-at         document-end
// ==/UserScript==


GM_addStyle('#charmap { width: 190px; background-color: #eaedef; position: fixed; top: 35.5%; z-index: 50; padding: 5px 10px 15px 5px; }');
GM_addStyle('#charmap span { display: block; text-align: center; }');
GM_addStyle('#charmap table { margin-left: auto; margin-right: auto; }');
GM_addStyle('#charmap table td { border: 1px solid #dddddd; padding: 3px 6px 3px 6px; }');
GM_addStyle('#charmap table td span { opacity: 0; }');
GM_addStyle('#charmap table td.scripted { cursor: pointer !important; }');


function insertText(symbol) { // Base function stolen from alexking.org
	if (myField.selectionStart || myField.selectionStart == '0') {
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ symbol
		+ myField.value.substring(endPos, myField.value.length);
	}
	
	else {
		myField.value += symbol;
	}
}

IncludedChars = new Array('θ', 'π', '∞', '±', '≈', '∫', '√');

commentareas = document.getElementsByTagName('textarea');
rightnav = document.getElementById('right-navbar');
CharMap = document.createElement('div');
CharTable = document.createElement('table');
Cell = '';


for (i = 0; i < commentareas.length; i++) {
	commentareas[i].addEventListener('focus', function () {myField = this;});
}


CharMap.id = 'charmap';
CharMap.innerHTML = '<span>Convenient Math Symbols</span><br />';
CharMap.style.left = rightnav.offsetLeft + 'px';


CharTable.appendChild(document.createElement('tr'));

for (i = 0, j = 0; i < 48; i++) {
	if (CharTable.childNodes[j].childNodes.length == 8) {
		CharTable.appendChild(document.createElement('tr'));
		j += 1;
	}
	
	Cell = document.createElement('td');
	
	if (IncludedChars[i] != undefined) {
		Cell.innerHTML = IncludedChars[i];
		Cell.className = 'scripted';
		Cell.addEventListener('click', function () {insertText(this.innerHTML)});
	}
	
	else {
		Cell.innerHTML = '<span>8</span>';
	}
	
	CharTable.childNodes[j].appendChild(Cell);
}

CharMap.appendChild(CharTable);
rightnav.appendChild(CharMap);