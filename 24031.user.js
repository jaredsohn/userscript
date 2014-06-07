//
// ==UserScript==
// @name          Baryu Çeviri Düzeltme
// @description   Ikariam 'daki çeviri hatalarını düzeltir
// @include       *.ikariam.net/index.php*
// ==/UserScript==

var links = document.getElementsByTagName('a');
var imgs = document.getElementsByTagName('img');
var options = document.getElementsByTagName('option');
var ths = document.getElementsByTagName('th');
var tds = document.getElementsByTagName('td');
var ps = document.getElementsByTagName('p');
var lis = document.getElementsByTagName('li');
document.getElementsByClass = function(className) {
  var all = document.all ? document.all : document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}
for (var i = 0; i < links.length; i++) {
	links[i].innerHTML = links[i].innerHTML.replace(/Send circular message/gi, "Bütün üyelere mesaj yolla");
	links[i].innerHTML = links[i].innerHTML.replace(/Friedensabkommen anbieten/gi, "Barış antlaşması öner");
	for(var x = 0; x < links[i].attributes.length; x++) {
		if(links[i].attributes[x].nodeName.toLowerCase() == 'title') {
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Allianz beitreten/gi, "Ittifaga gir");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/stufe/gi, "Seviye");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Inspect the selected town/gi, "Haritada seçilen köye git");
			<p id='ServerTime'>17.03.2008</p> 
			foo.innerhtml='19.04.2008' 
links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Centre the selected town on the World Map/gi, "Harita ortasindaki seçilen köye git");
		}
	}
}
for (var i = 0; i < imgs.length; i++) {
	for(var x = 0; x < imgs[i].attributes.length; x++) {
		if(imgs[i].attributes[x].nodeName.toLowerCase() == 'title') {
			imgs[i].attributes[x].nodeValue = imgs[i].attributes[x].nodeValue.replace(/Gunsman/gi, "Nişancı");
		}
	}
}
for (var i = 0; i < options.length; i++) {
	options[i].innerHTML = options[i].innerHTML.replace(/Handelsabkommen[^a-zA-Z0-9]*anbieten/gi, "Ticaret anlaşması öner");
	options[i].innerHTML = options[i].innerHTML.replace(/Kulturg[^t]*terabkommen  anbieten/gi, "Kültürel eşya anlaşması öner");
	options[i].innerHTML = options[i].innerHTML.replace(/Kulturg[^t]*terabkommen  k[^n]*ndigen/gi, "Kültürel eşya degiştirme anlaşması öner");
	options[i].innerHTML = options[i].innerHTML.replace(/als gelesen markieren/gi, "Okunmuş olaraka işaretle");
	options[i].innerHTML = options[i].innerHTML.replace(/l[^s]*schen/gi, "Sil");
	options[i].innerHTML = options[i].innerHTML.replace(/Aktion w[^h]*hlen/gi, "Eylem seç...");
	options[i].innerHTML = options[i].innerHTML.replace(/ausgegraut/gi, "puan yetersiz");
	options[i].innerHTML = options[i].innerHTML.replace(/Allianz Milit[^r]*rabkmmen[^a-zA-Z0-9]*To the town ([\sa-zA-Z0-9]*)anbieten/gi, "Köye akeri ittifak teklif et $1");
}
for (var i = 0; i < ps.length; i++) {
	ps[i].innerHTML = ps[i].innerHTML.replace(/Inspect troops, that are stationed in the town/gi, "Inspect troops that are stationed in the town.");
	ps[i].innerHTML = ps[i].innerHTML.replace(/Merchants and traders do their business at the trading post. There is always a deal to make or a bargain to hunt. Merchants from far away rather to head for big and well known trading posts!/gi, "Merchants do their business at the trading post. There is always a deal to be made or a bargain to be found here. Merchants from far away prefer heading for big, well known trading posts rather than smaller ones!");
}
for (var i = 0; i < ths.length; i++) {
	ths[i].innerHTML = ths[i].innerHTML.replace(/M[^g]*gliche Upgrades/gi, "Olasi yükseltme");
}
for (var i = 0; i < tds.length; i++) {
	tds[i].innerHTML = tds[i].innerHTML.replace(/Allianz Rundmail/gi, "Bütün ittifak üyelerine mesaj");
	tds[i].innerHTML = tds[i].innerHTML.replace(/[^A-Za-z0-9]xB4;/gi, "'");
	tds[i].innerHTML = tds[i].innerHTML.replace(/If we get to know all the other peoples, this will help us to make progress ourselves./gi, "Getting to know other cultures will help us make progress as well.");
}
for (var i = 0; i < lis.length; i++) {
	for(var x = 0; x < lis[i].attributes.length; x++) {
		if(lis[i].attributes[x].nodeName.toLowerCase() == 'title') {
			lis[i].attributes[x].nodeValue = lis[i].attributes[x].nodeValue.replace(/Kosten: ([0-9,]*) ([a-zA-Z\s]*)/gi, "Maliyet: $1 $2");
		}
	}
}