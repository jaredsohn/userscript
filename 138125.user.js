// ==UserScript==
// @name        otomoto.pl - usuwanie pustych kategorii
// @namespace   e:\work\greasemonkey\otomoto.pl\usuwanie_pustych_kategorii.user.js 
// @include     http://otomoto.pl/osobowe/*
// @include     http://otomoto.pl/*
// @version     1
// ==/UserScript==

// alert('hi');
var showFirst = false;
var list = document.getElementById('omListVehicles');
// alert(list);
var lists = list.getElementsByTagName('ul');
if (lists.length == 1) {
var l2 = lists[0];
var marki = l2.getElementsByTagName('li');
// alert(marki + ' ilosc = ' + marki.length);
for(var i=0;i<marki.length;i++) {
 l = marki.item(i);
 var italic = l.getElementsByTagName('i')[0];
   if (!showFirst) {
     // alert(italic.innerHTML);
     showFirst = true;
 }
 // alert(l);
 if (italic.innerHTML != '(0)') {
   l.setAttribute('style','background: red');
 }
 // italic.innerHTML = 'WON';
}
}
else {
  // aha, coś innego.
  var l3 = lists[1];
  var modele = l3.getElementsByTagName('li');
	for(var i=0;i<modele.length;i++) {
	 l = modele.item(i);
	 var italic = l.getElementsByTagName('i')[0];
	   if (!showFirst) {
		 // alert(italic.innerHTML);
		 showFirst = true;
	 }
	 // alert(l);
	 if (italic.innerHTML != '(0)') {
	   l.setAttribute('style','background: red');
	 }
	 // italic.innerHTML = 'WON';
	}
  
}
// alert(l2);
// l2.setAttribute('style','background: red');
// list.
// list.parentNode.removeChild(list);

// alert('done');