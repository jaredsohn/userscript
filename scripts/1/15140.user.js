// ==UserScript==
// @name           Wowhead Quick Facts Collapser
// @namespace      wowhead
// @include        http://www.wowhead.com/?*
// ==/UserScript==

var tables = document.getElementsByTagName('table');
for (var i in tables) {
	if (tables[i].className == 'infobox') {
		tables[i].style.width = tables[i].offsetWidth+'px';
		var quickinfo = tables[i].getElementsByTagName('tr')[0].firstChild
		quickinfo.innerHTML = '';
		var a = unsafeWindow.ce('a');
		a.href = 'javascript:;'
		a.innerHTML = 'Quick Facts';
		a.style.textDecoration = 'none';
		a.style.color = 'white';
		a.addEventListener('click', function(evt) { 
			var trs = evt.target.parentNode.parentNode.parentNode.getElementsByTagName('tr');
			Toggles(trs)
		}, false);
		unsafeWindow.ae(quickinfo, a)
		Toggles(tables[i].getElementsByTagName('tr'))
	}
}

function Toggles(trs) {
	if (trs[1].style.display == 'none') {
		trs[0].style.height = '';
		trs[0].firstChild.style.padding = '7px 12px';
		for (var k = 1; k<trs.length; k++) {
			trs[k].style.display = ''; 
		} 
	} else {
		trs[0].style.height = '20px';
		trs[0].firstChild.style.padding = '7px 0px 8px';
		for (var k = 1; k<trs.length; k++) {
			trs[k].style.display = 'none'; 
		} 
	}
}