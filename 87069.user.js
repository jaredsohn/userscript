// ==UserScript==
// @name           Old Google Images
// @namespace      http://userscripts.org/users/198925
// @include        http://www.google.com/imgres?imgurl=*
// @include        http://www.google.com/images*
// @version        0.1.1
// ==/UserScript==

function remove(node) { node.parentNode.removeChild(node); }
function I(string) { return document.getElementById(string); }
function QS(string) { return document.querySelector(string); }

if (document.URL.indexOf('imgres')>0) {
	var a = document.createElement('a'), img = document.createElement('img'), thumbnail = I('il_fi'), target = I('il_m');
	var w = parseInt(thumbnail.getAttribute('width')), h = parseInt(thumbnail.getAttribute('height'));
	img.setAttribute('src',thumbnail.getAttribute('src'));
	if (h>135) { w *= 135/h; h = 135; }
	img.setAttribute('style','float: left; margin: 7px 12px 0 6px; border: 1px solid black; width: ' + w + 'px; height:' + h + 'px;')
	a.appendChild(img);
	a.setAttribute('href',QS('ul.il_ul > li > a').getAttribute('href'));
	target.setAttribute('style','position: fixed; top: 0px; left: 0px; width: 100%; height: 150px; overflow: hidden; float: right;');
	a.appendChild(img);
	target.insertBefore(a,target.firstChild);
	remove(I('il_fic'));
	remove(QS('ul.il_ul'));
	I('il_fc').setAttribute('style','margin: 151px 0 0 0;');
	I('il_f').setAttribute('style','overflow: scroll;');
	QS('div#il > div > div > p:last-child').setAttribute('style','margin: 5px 0 0 0;');
	QS('h3.il_l').setAttribute('style','margin: 0;');
}

else {
	var target = document.evaluate('.//a[contains(text(),"Switch to basic version")]',document,null,9,null).singleNodeValue;
	if (target) window.location = target.getAttribute('href');
}