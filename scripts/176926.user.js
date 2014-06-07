// ==UserScript==
// @name        SagaOfSoul Paragraphs
// @include     http://www.sagaofsoul.com/*
// @include     http://sagaofsoul.com/*
// @version     2
// @grant       none
// ==/UserScript==

// [T]o and [F]rom
var f = new Array ();
var t = new Array ();

f[0]  = /\<noscript\>/;
t[0]  = '<nulltag>';

f[1]  = /\<\/noscript\>/;
t[1]  = '</nulltag>';

f[2]  = new RegExp('\<br/?\>\([^\<A-Za-z]*\<br/?\>\)+', 'g');
t[2]  = '<p class="multibreak" />';

f[3]  = new RegExp('\<br\>', 'g');
t[3]  = '<p class="singlebreak" />';

f[4]  = new RegExp('\<br [^\>/]*/\>', 'g');
t[4]  = '<p class="openbreak" />';

f[5]  = /…/;
t[5]  = '…';

f[6]  = /é/;
t[6]  = 'é';

f[7]  = /°/;
f[7]  = '°';

var txt = document.body.innerHTML;

for (j = 0; j < t.length; j ++)
{ txt = txt.replace (f[j], t[j]); }

document.body.innerHTML = txt;