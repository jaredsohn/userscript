// ==UserScript==
// @name           Pretend SafeSearch is Locked
// @namespace      http://www.prism.gatech.edu/~mflaschen3
// @description    Pretend safe search is locked
// @include        http*://*google.*/search*
// ==/UserScript==

if(!document.getElementById('sfw'))
{
	var tsf = document.getElementById('tsf');
	var sfw = document.createElement('div');
	sfw.id = 'sfw';
	sfw.setAttribute('style', '-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent url(/images/theme/safesearchlock2.jpg) no-repeat scroll right top; margin: -1px; padding: 1px;');
	sfw.appendChild(tsf.cloneNode(true));
	tsf.parentNode.replaceChild(sfw, tsf);
	var sff = document.getElementById('sff');
	var a = document.createElement('a');
	a.style.marginRight = '1em';
	var q = window.location.href.match(/[?&]q=[^&]*/).toString().substring(1);
	a.href = '/preferences?' + q + '&hl=en&safe=active&sa=F';
	a.textContent = 'SafeSearch is locked';
	sff.appendChild(a);
}
