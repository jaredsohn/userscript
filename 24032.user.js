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
i].innerHTML = tds[i].innerHTML.replace(/If we get to know all the other peoples, this will help us to make progress ourselves./gi, "Getting to know other cultures will help us make progress as well.");
}
