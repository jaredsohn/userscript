// ==UserScript==
// @name           Sansursuz Ek$i
// @description    Eksi Sozluk logosundaki siyah banti gorulen luzum uzerine kaldirma aparatiydi, birkac kucuk sey daha ekledim sonra...
// @version        0.0.2
// @include        http://sozluk.sourtimes.org/*
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// ==/UserScript==

if (window.location.href.indexOf("top.asp") >= 0) {
GM_addStyle(".logo"
+"{background:url('http://img696.imageshack.us/img696/5999/logowso.png')");
var liste0;
liste0 = document.evaluate(
	"/html/body/form[@id='fg']/table/tbody/tr/td[1]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
var zappa;
for (var i = 0; i < liste0.snapshotLength; i++) 
{
	zappa = liste0.snapshotItem(i);
}
zappa.setAttribute('title','first they came for the communists, and i didn\'t speak out because i wasn\'t a communist. then they came for the trade unionists, and i didn\'t speak out because i wasn\'t a trade unionist. then they came for the jews, and i didn\'t speak out because i wasn\'t a jew. then they came for \'me\' and there was no one left to speak out for me. --martin niemöller');
}

if (window.location.href.indexOf("about.asp") >= 0) {
var liste1;
liste1 = document.evaluate(
	"/html/body/table/tbody/tr[2]/td/div[1]/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
var sansurat;
for (var i = 0; i < liste1.snapshotLength; i++) 
{
	sansurat = liste1.snapshotItem(i);
}
sansurat.style.display = 'none';
var liste2;
liste2 = document.evaluate(
	"/html/body/table/tbody/tr[2]/td/div[2]/img",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
var logo;
for (var i = 0; i < liste2.snapshotLength; i++) 
{
	logo = liste2.snapshotItem(i);
}
logo.src = "http://img696.imageshack.us/img696/5999/logowso.png";
}

if (window.location.href.indexOf("show.asp") >= 0) {
var liste4;
liste4 = document.evaluate(
	"/html/body/table[@id='panel']/tbody/tr[3]/td",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
var dolar;
for (var i = 0; i < liste4.snapshotLength; i++) 
{
	dolar = liste4.snapshotItem(i);
}
dolarhesapla1 = dolar.textContent.replace("saat","* 60 +");
dolarhesapla2 = dolarhesapla1.replace("dakika","");
dolarhesapla3 = Math.round(dolarhesapla2 * 2.6);
dolar.textContent = ""+dolarhesapla3+" $";
}