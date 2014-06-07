// ==UserScript==
// @name		Konachan/yande.re: Comments - Status Info
// @namespace	Zolxys
// @description	Adds Parent/Child/Pending/Flagged info to the post headers on the comments page.
// @include	http://konachan.com/comment*
// @include	http://konachan.net/comment*
// @include	https://yande.re/comment*
// @version	1.1
// ==/UserScript==
var f = String(function(){
var zola = document.getElementById('comment-list').getElementsByTagName('strong');
for (var zoli = 0; zoli < zola.length; zoli++)
 if (zola[zoli].innerHTML == 'Date')
  if (/^comments-for-p\d+$/.test(zola[zoli].parentNode.parentNode.parentNode.parentNode.id)) {
	var zolo = Post.posts._object[parseInt(zola[zoli].parentNode.parentNode.parentNode.parentNode.id.substr(14))];
	var zolb = 0;
	if (zolo.has_children)
		zolb = 1;
	if (zolo.parent_id != null)
		zolb = zolb | 2;
	if (zolo.status == 'pending')
		zolb = zolb | 4;
	else if (zolo.status == 'flagged')
		zolb = zolb | 8;
	if (zolb == 0)
		continue;
	var zolne = document.createElement('span');
	zolne.className = 'info';
	zola[zoli].parentNode.parentNode.insertBefore(zolne,zola[zoli].parentNode.parentNode.firstChild);
	var zolee = zolne;
	zolne = document.createElement('strong');
	zolee.appendChild(zolne);
	++zoli;
	zolee = zolne;
	for (var zold = 0; zold <= 3; ++zold)
	  if (zolb & Math.pow(2,zold)) {
		zolne = document.createElement('span');
		zolne.style.color = ['#00FF00','#FFFF00','#0070FF','#FF0000'][zold];
		zolne.textContent = ['Parent ','Child ','Pending ','Flagged '][zold];
		zolee.appendChild(zolne);
	}
}
});
var ne = document.createElement('script');
ne.setAttribute('type','text/javascript');
ne.innerHTML=f.substring(f.indexOf('\n') + 1, f.lastIndexOf('}'));
	document.head.appendChild(ne);
