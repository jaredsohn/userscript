// ==UserScript==

// @name           Neptun.NET UI javítások v1.0.1
// @description    Használd a Neptun.NET-et kényelmesebben!
// @include        https://152.66.28.*/hallgatoi/*
// @include        https://neptun3r.web.uni-corvinus.hu/hallgatoi/*
// @include        http://neptun3r-1.nyme.hu/hallgato/*
// @include        https://neptun.uni-pannon.hu/hallgato/*
// @include        https://netw2.nnet.sze.hu/hallgato/*
// @include        https://web3.neptun.szie.hu/hallgato/*
// @include        https://neptunweb.zmne.hu/hallgatoi/*
// @include        http://neptuna.avkf.hu/neptun/*
// @include        https://193.225.127.108/neptun/*
// @include        https://neptunweb.bmf.hu/hallgato/*
// @include        https://193.225.187.180/hallgato/*
// @include        https://193.225.84.12/ejfhw/*
// @include        http://152.66.10.221/hjfhw/*
// @include        http://neptun.kodolanyi.hu/hallgato/*

// ==/UserScript==

/*
   (C) Gyimesi Ákos, 2006-2007.
   A szkript szabadon felhasználható, terjeszthető és módosítható a
   GNU GPL 3 licensz szerint (http://www.gnu.org/licenses/gpl.txt).
   Bár legjobb tudomásunk és szándékunk szerint a szkript nem tartalmaz
   semmilyen kártékony vagy kémkedésre alkalmas kódot,
   CSAK A SAJÁT FELELŐSSÉGEDRE használhatod!

   Változások
   ==========

   v1.0: (Gyimesi Ákos, 2006. szeptember 10.)

   Jelenleg az alabbi funkciokat latja el:
   - Targyak / Felvett targyak linkre kattintva kivalasztja az aktualis felevet
   - A javascriptes linkeket lecsereli ugy, hogy a kozepso gombbal meg lehessen
     oket nyitni uj ablakba
   - Orarend nyomtatas gomb: letorol a tablazaton kivul mindent a kepernyorol
     (tehat mukodik :))
   - 50 masodpercenkent ker egy random oldalt (az egyik fomenupontot, tehat
     nem okozhat veletlen vizsgalejelentkezest vagy egyeb kart), hogy ne dobjon
     ki allandoan a Neptun
   - logo csere :)

   Mindenfele javaslatot, eszrevetelt varok a gyim kukac freemail.hu cimre!
   
   v1.0.1: (Udvari Gábor, 2007. szeptember 2.):

   - intézmények hozzáadása (@include tagok)
   - az új ablak funkciónál az új ablakhoz hozzáadtam a Control+Balegérgomb lehetőséget, és a szimpla megnyitást csak a bal egérgombra korlátoztam
*/

// Felvett targyak link javitas
var felvett = document.getElementById('menu_ascx_0404');
if (felvett) {
	felvett.href = "main.aspx?ctrl=0404&felvett_redirect=1";
}
// Redirect
if (document.URL.match(/felvett_redirect=1/)) {
	document.getElementById('Form1').style.display = 'none';
	// redirect URL resz eltavolitasa a form action-bol
	document.getElementById('Form1').action = 'main.aspx?ctrl=0404';

	var felevek_select = document.getElementById('addedsubjects_cmb_m_cmb');
	var felev_id = 0;
	if (felevek_select) {
		felevek_select.selectedIndex = felevek_select.options.length-1;
		setTimeout('__doPostBack(\'addedsubjects$cmb$m_cmb\',\'\')', 0);
	}
}

// === Megnyitas uj ablakban ===
var links = document.getElementsByTagName('A');
var spans = []
for (var i=0; i<links.length; i++) {
	var href = links[i].href;

	if (href.match(/^javascript:/)) {

		var span = document.createElement('SPAN');
		for (var c=0; c<links[i].childNodes.length; c++) {
			span.appendChild(links[i].childNodes[c].cloneNode(true));
		}

		span.setAttribute('onmousedown', 'if((event.button==0 && event.ctrlKey == true) || event.button==1){document.getElementById("Form1").target="_blank";' + href.substring(11) + ';document.getElementById("Form1").target="_top";}else if(event.button==0){' + href.substring(11) + '}');

		span.style.cursor = 'pointer';
		span.style.fontWeight = 'bold';
		span.style.textDecoration = 'underline';

		spans[i] = span;

		links[i].parentNode.replaceChild(span, links[i]);
		i--;
	}
}

// === Orarend nyomtatas ===
var nyomtat_gomb = document.getElementById('student_timetable_btnPrint');
if (nyomtat_gomb) {
	var nyomtat_link = document.createElement('a');
	nyomtat_link.appendChild(document.createTextNode('Működő :) nyomtatás'));

	nyomtat_link.setAttribute('href', "javascript:var t=document.evaluate('//body/form/table[@class=\"gridtable\"]', document, null, XPathResult.ANY_TYPE, null); t.iterateNext(), document.body.replaceChild(t.iterateNext(), document.getElementById('Form1'));");

	nyomtat_link.setAttribute('onclick', 'javascript:' +
	'var t=document.evaluate(\'//table[@class="gridtable"]\', document, null, XPathResult.ANY_TYPE, null);' + 

	'for (var i=0; i<7; i++) {' +
	'	var t2 = t.iterateNext();' +
	'}' +
	'document.body.replaceChild(t2, document.getElementById("Form1"));'
	);

	nyomtat_gomb.parentNode.appendChild(nyomtat_link);
}

// === Idozitett lekeresek, hogy a Neptun ki ne dobjon ===
// (Random keresek a main.aspx?ctrl=01..09-re)

var timedXMLRequest = null;
window.setInterval(function() {
	var n = Math.floor(Math.random() * 9) + 1;
	var url = "main.aspx?ctrl=0" + n;
	timedXMLRequest = new XMLHttpRequest();
	timedXMLRequest.open("GET", url, true);
	if (GM_log) GM_log('Timed request: ' + url);
	timedXMLRequest.send(null);
}, 50000);

// === Neptun logo csere ===
// Kis logo
var logoNode = document.evaluate('//img[@src="style/main/logo.jpg"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (logoNode) {
	logoNode.src = 'http://neptunui.sourceforge.net/img/logo_small.jpg';
}

// Nagy logo (bejelentkezes)
var logoNode = document.evaluate('//img[@src="style/main/loginlogo.jpg"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (logoNode) {
	logoNode.src = 'http://neptunui.sourceforge.net/img/logo_big.jpg';
}

