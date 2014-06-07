// Hemnet fix-links, peter(at)edlunds .net, 2006-2007
// ==UserScript==
// @name	Hemnet Linkfix
// @description	Replace JS-links on Hemnet with standard links & styles with history
// @include	http://www.hemnet.se/search/maklarutbud/NPI-lista.asp?*
// ==/UserScript==

function modLinks() {
    var ua = 'http://www.bostad.dn.se/bostadsborsen/sok/results/NPI-object_Frame.asp?objektid=';
    var ub = '&service=hemnettogp&caller=main&area=';
    var as = document.evaluate("//a[@class='objlink']", document, null,
			       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < as.snapshotLength; i++) {
	var oc = as.snapshotItem(i).getAttribute('href');
	if (!oc) continue;
	var a = oc.match(/javascript:OpenObjectWin\(\d+,'hemnettogp','main','(\d+)\&kommun=([\d,]*)',\d+,(\d+)/);
	if (!a) continue;
	as.snapshotItem(i).href = ua + a[3] + ub + a[1] + '&kommun=' + a[2];
	as.snapshotItem(i).target = '_blank';
    }
}

function modHead() {
    var s = ' \
a.objlink {font-weight:bold !important;color:#00008B !important;text-decoration:none !important;} \
a.objlink:visited {font-weight:normal !important;color:#8B0000 !important;} \
a.objlink:hover {color:#B22222 !important;}				\
a.objlink:focus {color:#B22222 !important;}				\
';
    var head = document.getElementsByTagName('head')[0];
    if(!head) return;
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = s;
    head.appendChild(style);
}

modHead();
modLinks();
