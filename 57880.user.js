// ==UserScript==
// @name           Whirlpool Whim Archive Sorter (by name)
// @namespace      blurg
// @description    Whirlpool Whim Archive Sorter (by name)
// @include        http://whirlpool.net.au/whim/?action=archive
// ==/UserScript==

var whimTRsParent = document.querySelector('#content>table>tbody');
var whimTRs = whimTRsParent.querySelectorAll('tr:not([bgcolor="##5566AA"])');

var plainArr = [];

for each (var item in whimTRs) {
	if(typeof item == "object"){
		var Name = { real: item.querySelector('b').textContent };
		Name.Sort = Name.real.toLowerCase().replace(/[^a-z,0-9]/gm, '');
		Name.tr = item;
		plainArr.push(Name);
	}
}

plainArr.sort(function(a,b) { return a.Sort < b.Sort ? -1 : 1; });

for each (var item in plainArr) {
	whimTRsParent.appendChild(item.tr);
}
