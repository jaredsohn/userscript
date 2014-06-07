// ==UserScript==
// @name	4chan /v/ wordfilter
// @namespace	/v/ - Video Games
// @description	Create your own modfaggotry

// WHOOP DEE FUCKIN DOO
	// @include	http://*4chan.org/v/*

// ==/UserScript==

// Regular Expressions!
var evilwords	= new Array ();
var goodwords	= new Array ();

// Only mess with these if you know regEx!

evilwords[0] = /autism/gi;
evilwords[1] = /aut?stic/gi;
evilwords[2] = /(autist)+(tics|tists)/gi;
evilwords[3] = /autist/gi;
evilwords[4] = /ass(\s)?burgers/gi;
evilwords[5] = /butt(\s)?hu([r]+)t/gi;
evilwords[6] = /aspergers/gi;
evilwords[7] = /gay/gi;

goodwords[0] = 'capitalism';
goodwords[1] = 'kicked-in-the-head';
goodwords[2] = 'followers of the Left-Hand Path';
goodwords[3] = 'Tim & Eric anarchist';
goodwords[4] = 'hamburgers';
goodwords[5] = 'cannibalistic';
goodwords[6] = 'Cotard's Delusion';
goodwords[7] = 'synthetic';

var cells	= document.getElementsByTagName ('blockquote');

for (var i = 0; i < cells.length; i ++)
{
	for (j = 0; j < evilwords.length; j ++)
	{ cells[i].innerHTML = cells[i].innerHTML.replace (evilwords[j], '<span style="border-bottom: 1px #CC1105 dashed;">' + goodwords[j] + '</span>'); }
}
