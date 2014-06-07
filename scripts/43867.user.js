// ==UserScript==
// @name           Rasmus All on One Page
// @namespace      http://jobson.us/
// @include        http://rasmuscatalog.com/cgi-bin/mnlist.cgi*
// ==/UserScript==

setTimeout(init,500);
//var console;

function init() {
	//console = unsafeWindow.console;
	
	var f = document.getElementsByTagName('form')[5];
	
	var newVal = '';
	
	var inp = f.getElementsByTagName('input');
	for (var i=0;i<inp.length;i++) {
		if (inp[i].type != 'hidden') continue;
		if (/p\d+/.test(inp[i].name)) {
			newVal += inp[i].value;
			continue;
		}
	}
	var td = document.getElementById('SelectPage').getElementsByTagName('tbody')[0].getElementsByTagName('td')[0].getElementsByTagName('p')[0];
	var inp = td.appendChild(document.createElement('input'));
		inp.type = 'hidden';
		inp.name = 'all';
		inp.value = newVal;
	var sub = td.appendChild(document.createElement('input'));
		sub.type = 'submit';
		sub.value = 'all';
		sub.name = 'page';
		
	document.getElementById('TableTop').parentNode.insertBefore(f.cloneNode(true),document.getElementById('TableTop'))
}
