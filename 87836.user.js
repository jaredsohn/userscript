// ==UserScript==
// @name           city-n anti-moron
// @namespace      city-n
// @description    Removes annoying animated smiles from comments on a town's news portal
// @include        http://city-n.ru/view/*
// ==/UserScript==
var imgs=document.getElementsByTagName('img');
for (var i=0; i<imgs.length; i++)
{
	if (imgs[i].getAttribute('src').match(/\/template\/default\/img\/smiles\//))
	{
	imgs[i].setAttribute('style', 'display:none; visibility:hidden');
	}
}