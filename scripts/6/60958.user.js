// ==UserScript==
// @name           J&G Product Zoom
// @namespace      http://jobson.us/
// @include        http://www.jgsales.com/product_info.php/*
// ==/UserScript==

var td = [];;
var tdMain;
function init() {
	
	td.push($x('/html/body/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td[2]/form/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td')[0]);
	for (var i=0,j=$x('//form/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td');i<$x('//form/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr/td').length;i++) {
		td.push(j[i]);
	}
	
	if (td.length==0) return;
	
	tdMain = $x('/html/body/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td[2]/form/table/tbody/tr[3]/td')[0];

	for (var i=0;i<td.length;i++) {
		
		var a = td[i].getElementsByTagName('a')[0];
		
		if (i==0) {
			var img = document.createElement('img');
				img.setAttribute('src',td[i].getElementsByTagName('img')[0].getAttribute('src'));
			while(td[i].childNodes.length>0) td[i].removeChild(td[i].childNodes[0]);
			td[i].appendChild(img);
		}
		
		if (!a) continue;
		var href = a.getAttribute('href').match(/'(.+?)'/)[1];
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(rd) {
				var src = 'http://www.jgsales.com/'+ rd.responseText.match(/src="(.+?)"/)[1];
				var img = document.createElement('img');
					img.setAttribute('src',src);
					img.style.width = '380px';
				tdMain.appendChild(img);
				var br = document.createElement('br');
				tdMain.appendChild(br);
			}
		});
	}
	if (tdMain.getElementsByTagName('table')[0]) tdMain.removeChild(tdMain.getElementsByTagName('table')[0]);

}

setTimeout(init,500);


function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}


