// ==UserScript==
// @name           kuvakedownload
// @namespace      tag:it.org,2008-04-04:furrfu
// @description    Lisää latauslinkki Kuvakkeen kuvasivulle
// @include        http://kuvake.net/user/*
// ==/UserScript==

var kuvakephotocont = document.getElementById('photocontainer');
var kuvakekuvadiv;
if (kuvakephotocont.childNodes[1].innerHTML.match('<b>Lataa'))
	kuvakekuvadiv = kuvakephotocont.childNodes[3];
else
	kuvakekuvadiv = kuvakephotocont.childNodes[1];
var kuvakekuvaurl = kuvakekuvadiv.style.background

var kuvastring = kuvakekuvadiv.style.background.toString()
kuvastring = kuvastring.replace('transparent url(', '')
kuvastring = kuvastring.replace(') repeat scroll 0% 0%', '')

if (kuvastring) {
	newElement = document.createElement('a');
	newElement.innerHTML = 'Lataa';
	newElement.href = kuvastring;
	kuvakekuvadiv.parentNode.insertBefore(newElement, kuvakekuvadiv.nextSibling);
}
