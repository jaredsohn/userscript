// ==UserScript==
// @name           4chan Thread Filter Alternate
// @namespace      http://userscripts.org/
// @author         !49Xm1d8ZeQ
// @description    RegExp powered thread filtering
// @version        1.0.1
// @include        http://*.4chan.org/*
// ==/UserScript==

(function() {
const filter = [
	'luk0r > you', new RegExp(/[A-z0-9]{1,9}\s+(&[gl]t;)+\\s+[A-z0-9]{1,9}/i),
	'raidchan', new RegExp(/netcollect\.org irc\.netcollect\.org|^R\s*A\s*I\s*D\s*C\s*H\s*A\s*N\s*.\s*O\s*R\s*G|PACIFICO\s*WAS\s*HERE\s*2008\s*BIGGIN\s*UP\s*THAT\s*JEWFRO|z0mg\s*l0l\s*1s\s*d4t\s*s0em\s*rfi\s*sp4m\s*scr1pt\?\s*kayla\s*&lt;3\s*l0l0l0l0l\s*#tr0ll/i),
	new RegExp(/^sage$|^bump$|row\s*row\s*fight\s*the\s*powah/i),
	new RegExp(/We.re in need of some CHANGE around here|OwN3D bY \#tr0ll|(belly\s*buttons\s*){2,}|(over\s*9000\s*){2,}|install\s*gentoo/i),
];
var blockquotes = document.getElementsByTagName('blockquote');
for(var i = 0; i < blockquotes.length; i ++)
{
	for(var j = 0; j < filter.length; j ++)
		if(typeof filter[j] != 'string' && filter[j].test(blockquotes[i].innerHTML))
			break;
	if(j >= filter.length) continue;
	var wholepost = blockquotes[i].parentNode.parentNode.parentNode.parentNode;
	if(wholepost.nodeName != 'TABLE')
		continue;
	wholepost.style.display = 'none';
}
})();
