// ==UserScript==
// @name           garsoniera4gm
// @namespace      garso
// @description    wyszukiwanie telefonow na garsonierze
// @version        1.8
// @include        http://*.roksa.pl/*
// @include        http://*.odloty.pl/*
// @include        http://*.odloty.tv/*
// @include        http://*.odloty.warszawa.pl/*
// @include        http://odloty.warszawa.pl/*
// @include        http://*.sekretki.pl/*
// @include        http://sekretki.pl/*
// @include        http://*.grzesznice.pl/*
// @include        http://*.goldenladies.com.pl/*
// @include        http://*.kochanka.pl/*
// @include        http://kochanka.pl/*
// @include        http://*.sexatlas.pl/*
// @include        http://sexatlas.pl/*
// @include        http://*.romansik.pl/*
// @include        http://romansik.pl/*
// @include        http://*.godzinka.pl/*
// @include        http://godzinka.pl/*
// ==/UserScript==


function createElem(tag, attr) {
	var el = document.createElement(tag);
	for (k in attr)
		el.setAttribute(k, attr[k]);
	return el;
}

function garsoTelefon(tel) {
	var t = tel.replace(/^\s+/, '').replace(/\s+$/, '');
	var s = t.match(/^([0-9]{3})[^0-9]?([0-9]{3})[^0-9]?([0-9]{3})(?:\s|$)/);
	if (s) return s.splice(1).join('-');
	var x = t.match(/^[\s+]*48\s*([0-9]{3})\s([0-9]{3})\s([0-9]{3})/);
	if (x) return x.splice(1).join('-');
	return t;
}

function garsoMenu(node, tel) {
	var telefon = tel == null ? garsoTelefon(node.textContent) : tel;
	var a = createElem( 'a', { 'href':'http://www.garsoniera.com.pl/forum/index.php?app=core&module=search&do=quick_search&search_filter_app[forums]=1&addon=2&search_term=' + telefon,
			'title':"szukaj '" + telefon + "' na garsonierze" } );
	a.appendChild( createElem( 'img', { 'src':'http://www.garsoniera.com.pl/favicon.ico',
				'style': 'display:inline; margin-left:1ex; border:none' } ) );
	node.appendChild(a);
}

function xpathCallback(xptel, func) {
	var xp = document.evaluate(xptel, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<xp.snapshotLength; i++)
		func ? func(xp.snapshotItem(i)) : garsoMenu(xp.snapshotItem(i), null);
}



if (window.location.host.match(/roksa\.pl$/)) {
	xpathCallback("//span[contains(@class,'telefon_text')]");
}
else if (window.location.host.match(/odloty\...$/)) {
	xpathCallback("//td[@class='main']//b[starts-with(.,'+48')]");
}
else if (window.location.host.match(/odloty\.warszawa\.pl$/)) {
	xpathCallback("//td[@align='right'][starts-with(.,'Telefon')]/following-sibling::node()/b");
}
else if (window.location.host.match(/kochanka\.pl$/)) {
	xpathCallback("//td[@class='red_right'][starts-with(.,'tel. kom')]/following-sibling::node()");
}
else if (window.location.host.match(/sexatlas\.pl$/)) {
	xpathCallback("//td[@align='right']/b[@class='sysinfo'][starts-with(.,'Telefon')]/../following-sibling::node()/b");
}
else if (window.location.host.match(/sekretki\.pl$/)) {
	xpathCallback(
		"//div[@id='DIV_menu_left'][starts-with(.,'Kontakt telefoniczny')]/../div[@id='DIV_menu_right_white']",
		function(node) { garsoMenu(node, garsoTelefon(node.innerHTML.replace(/(?:\/|<br>).*/, ''))); }
	);
}
else if (window.location.host.match(/grzesznice\.pl$/)) {
	xpathCallback(
		"//img[@src='images/tel2.jpg']/following-sibling::node()/b",
		function(node) { garsoMenu(node.parentNode, node.textContent); }
	);
}
else if (window.location.host.match(/goldenladies\.com\.pl$/)) {
	xpathCallback(
		"//div[contains(@class,'ads_phone')][starts-with(@id,'ads_phone_')]",
		function(node) {
			garsoMenu(node.parentNode, node.textContent);
			var span = document.createElement('span');
			garsoMenu(span, garsoTelefon(node.textContent));
			node.insertBefore(span, node.firstChild.nextSibling);
		}
	);
}
else if (window.location.host.match(/romansik\.pl$/)) {
	xpathCallback(
		"//td/b[starts-with(.,'KONTAKT')]/../following-sibling::node()"
		+ " | //tbody/tr/td[starts-with(.,'KONTAKT')]/../../tr/td/br/..",
		function(node) {
			var span = document.createElement('span');
			garsoMenu(span, garsoTelefon(node.textContent.replace(/,.*/, '')));
			node.insertBefore(span, node.firstChild);
		}
	);
}
else if (window.location.host.match(/godzinka\.pl$/)) {
	xpathCallback(
		"//td[@align='right'][starts-with(.,'Telefon')]/following-sibling::node()/b"
		+ " | //td[@colspan=2]/b[contains(.,'Telefon')]/font",
		function(node) { garsoMenu(node.parentNode, garsoTelefon(node.textContent)); }
	);
}


