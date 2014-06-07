// ==UserScript==
// @name				AubayRA
// @description	Relevé d'Activité
// @namespace		chooz
// @author			chooz
// @version			1.3.201403
// @updateURL		http://userscripts.org/scripts/source/183518.user.js
// @include			file:///*aubay/RA/RA_*.htm
// ==/UserScript==

// use Hacker emblem glider
// http://www.catb.org/~esr/hacker-emblem/glider.ico
// http://www.hackcraft.net/favicon.ico
var tLink = document.createElement('link');
tLink.setAttribute('rel', "shortcut icon");
tLink.setAttribute('href', "http://www.catb.org/~esr/hacker-emblem/glider.ico");
document.head.appendChild(tLink);

document.evaluate("/html/body/table/tbody/tr/td/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src = "http://gipssi.aubay.com/images/logorac.gif";

var sURL = window.location.href;

GM_addStyle(' \
	span.nav{	color: white; } \
	span.nav:hover{	color: black; cursor: pointer; } \
');

var tDate = sURL.match(/RA_(\d\d\d\d)(\d\d)\.htm/);
var dMoisCourant = new Date(tDate[1], tDate[2] - 1);
var cMoisCourant = document.evaluate("/html/body/table[2]/tbody/tr/td/table[2]/tbody/tr[2]/td/table/tbody/tr/td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var dMoisPrecedent = new Date(dMoisCourant.getTime());
dMoisPrecedent.setMonth(dMoisPrecedent.getMonth() - 1);
var sMoisPrecedent = "0" + (dMoisPrecedent.getMonth() + 1);
sMoisPrecedent = sMoisPrecedent.substr(sMoisPrecedent.length - 2);
var sURLMoisPrecedent = sURL.replace(/RA_(\d\d\d\d)(\d\d)\.htm/,"RA_" + dMoisPrecedent.getFullYear() + sMoisPrecedent + ".htm");
var sSpanMoisPrecedent = '<span class="nav" align="center" onclick="window.location.href=&apos;' + sURLMoisPrecedent + '&apos;;void(0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';


var dMoisSuivant = new Date(dMoisCourant.getTime());
dMoisSuivant.setMonth(dMoisSuivant.getMonth() + 1);
var sMoisSuivant = "0" + (dMoisSuivant.getMonth() + 1);
sMoisSuivant = sMoisSuivant.substr(sMoisSuivant.length - 2);
var sURLMoisSuivant = sURL.replace(/RA_(\d\d\d\d)(\d\d)\.htm/,"RA_" + dMoisSuivant.getFullYear() + sMoisSuivant + ".htm");
var sSpanMoisSuivant = '<span class="nav" align="center" onclick="window.location.href=&apos;' + sURLMoisSuivant + '&apos;;void(0);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';

//alert(dMoisPrecedent + "\r\n"  + dMoisCourant + "\r\n"  + dMoisSuivant + "\r\n" + sURLMoisPrecedent + "\r\n" + sURLMoisSuivant);

cMoisCourant.childNodes[1].innerHTML = sSpanMoisPrecedent + '<span>' + cMoisCourant.childNodes[1].innerHTML + '</span>' + sSpanMoisSuivant;