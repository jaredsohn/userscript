// ==UserScript==
// @name           shave the welsh
// @namespace      http://userscripts.org/users/117523
// @include        http://www.underskog.no/samtale/*
// @include        http://underskog.no/samtale/*
// ==/UserScript==


var op;
op = document.getElementsByTagName('a');

for ( i = 0; i < op.length; i++) {
	if (op[i].innerHTML.indexOf('Vis opprinnelig bidrag') >= 0) {
		document.location = op[i].href;
		break;
	}
}

var truth = document.getElementsByClassName('troll_original');

for (tag in truth)
	truth[tag].style.display = 'block';

var blahs;
blahs = document.getElementsByClassName('troll_blah');
for (blah in blahs)
	blahs[blah].style.display = 'none';