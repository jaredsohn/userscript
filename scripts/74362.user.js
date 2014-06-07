// ==UserScript==
// @name           PriceWatch PPGb
// @namespace      http://jobson.us
// @description    Calculates price per GB on PriceWatch
// @include        http://www.pricewatch.com/hard_removable_drives/
// ==/UserScript==

var td = document.getElementById('columnwrapper').getElementsByTagName('td');

var price;
var size;

for (var i=0;i<td.length;i++) {
	if (td[i].getAttribute('class') == 'AttributeHeading') continue;
	if (td[i].getAttribute('class') == 'o') continue;
	
	console.log(td[i]);
	
	
	if (!td[i].getAttribute('class')) {
		price = parseFloat(td[i].innerHTML.replace(/[\r\n\t\s\$]/g,''));

	} else {
		var m = td[i].getElementsByTagName('a')[0].innerHTML.match(/(\d+\.*\d*)(t|g)b/);
		if (m==null) continue;
		var size = parseFloat(m[1]);
			size = (m[2]=='g') ? size : (size*1000);
		
		var cpg = (Math.round(price/size*1000)/10) + '';
			cpg = (cpg.match(/\./) == null) ? cpg+'.0' : cpg;
			cpg = '\u00a0('+ cpg +'-\u00a2/gb)';
		
		td[i].getElementsByTagName('a')[0].appendChild(document.createTextNode(cpg));
	}
}