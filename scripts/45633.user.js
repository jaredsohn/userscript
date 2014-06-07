// ==UserScript==
// @name        estg
// @description eksi sozluk icin textarea genisleticisi.
// @namespace   http://www.berkerpeksag.com/
// @author      Berker Peksag
// @version	0.1
// @release	01.04.2009
// @include	http://sozluk.sourtimes.org/show.asp?t=*
// @include	http://www.eksisozluk.com/show.asp?t=*
// @include	http://eksisozluk.com/show.asp?t=*
// @include	http://sourtimes.org/show.asp?t=*
// @include	http://www.sourtimes.org/show.asp?t=*
// @include	http://84.44.114.44/show.asp?t=*
// ==/UserScript==

var t = document.getElementById('d');
var h = 156;

if(t) {
	t.removeAttribute('rows');
	t.setAttribute('style', 'height: ' + h + 'px; overflow: hidden');
	t.setAttribute('resize', 'none'); // Form elemanlarina mudahale eden tarayicilar icin.
	
	var o = document.createElement('div');
	o.setAttribute('id', 'd');
	o.setAttribute('style', 'background-color: #fff; font: 9pt Verdana, sans-serif; margin: 0; padding: 0; overflow: hidden; position: absolute; top: 0; left: -1024px; width: 100%;');
	document.body.appendChild(o);
	
	window.document.getElementById('d').addEventListener('keyup', function() {
		var v = t.value.replace(/\n/g, '<br />');
		o.innerHTML = v;
		
		if(o.clientHeight > h) {
			t.style.height = (o.clientHeight + 16) + 'px';
		}
	}, false);
}