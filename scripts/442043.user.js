// ==UserScript==
// @name       Fozpop
// @namespace  freakish thunder
// @version    0.1
// @description  Wakka wakka wakka
// @match      http://boards.endoftheinter.net/*
// @copyright  2012+, You
// ==/UserScript==

function get_fozdiv() {
  fozdiv = document.getElementById('fozpop');
  if (fozdiv) return fozdiv;

  fozdiv = document.createElement('img');
  fozdiv.setAttribute('id','fozpop');
  fozdiv.setAttribute( 'style', 'position:fixed;z-index:99999;top:30%;right:45%;margin:0;padding:0;border:#000 1px solid;background:#fff;width:10%;display:none;');
  fozdiv.setAttribute('src','http://i3.dealtwith.it/i/n/68c48ccff597c8fa18c99d5358bdef70/wakka%20wakka.jpg');
  fozdiv.addEventListener('click', hide_fozpop, false);
  document.body.appendChild(fozdiv);
  return fozdiv;
}
function show_fozpop(e) {
	e = (e || window.event);
	var t = e.target || e.srtElement;
	if (t && t.tagName == 'TEXTAREA') {
		return;
	}
  if ('f'== String.fromCharCode(e.charCode).toLowerCase()) get_fozdiv().style.display = 'inline';
}

function hide_fozpop(e) {
  get_fozdiv().style.display = 'none';
}
document.addEventListener('keypress', show_fozpop, false);