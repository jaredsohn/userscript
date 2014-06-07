// ==UserScript==
// @name           Capitalize
// @namespace      Capitalize
// @description    Replaces lower case with upper case letters
// @include        http://*bungie.net/*
// @include        http://mods.jmh9072.com/
// @include        http://www.bungie.net/Forums/posts.aspx?postID=27428424&postRepeater1-p=188
// ==/UserScript==

(function() {
var replacements, regex, key, textnodes, node, s;
textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
{

s = node.data;

s = s.replace( /\b.a\b/g, ".A");
s = s.replace( /\b.b\b/g, ".B");
s = s.replace( /\b.c\b/g, ".C");
s = s.replace( /\b.d\b/g, ".B");
s = s.replace( /\b.e\b/g, ".E");
s = s.replace( /\b.f\b/g, ".F");
s = s.replace( /\b.g\b/g, ".G");
s = s.replace( /\b.h\b/g, ".H");
s = s.replace( /\b.i\b/g, ".I");
s = s.replace( /\b.j\b/g, ".J");
s = s.replace( /\b.k\b/g, ".K");
s = s.replace( /\b.l\b/g, ".L");
s = s.replace( /\b.m\b/g, ".M");
s = s.replace( /\b.n\b/g, ".N");
s = s.replace( /\b.o\b/g, ".O");
s = s.replace( /\b.p\b/g, ".P");
s = s.replace( /\b.q\b/g, ".Q");
s = s.replace( /\b.r\b/g, ".R");
s = s.replace( /\b.s\b/g, ".S");
s = s.replace( /\b.t\b/g, ".T");
s = s.replace( /\b.u\b/g, ".U");
s = s.replace( /\b.v\b/g, ".V");
s = s.replace( /\b.w\b/g, ".W");
s = s.replace( /\b.x\b/g, ".X");
s = s.replace( /\b.y\b/g, ".Y");
s = s.replace( /\b.z\b/g, ".Z");
s = s.replace( /\b. a\b/g, ". A");
s = s.replace( /\b. b\b/g, ". B");
s = s.replace( /\b. c\b/g, ". C");
s = s.replace( /\b. d\b/g, ". B");
s = s.replace( /\b. e\b/g, ". E");
s = s.replace( /\b. f\b/g, ". F");
s = s.replace( /\b. g\b/g, ". G");
s = s.replace( /\b. h\b/g, ". H");
s = s.replace( /\b. i\b/g, ". I");
s = s.replace( /\b. j\b/g, ". J");
s = s.replace( /\b. k\b/g, ". K");
s = s.replace( /\b. l\b/g, ". L");
s = s.replace( /\b. m\b/g, ". M");
s = s.replace( /\b. n\b/g, ". N");
s = s.replace( /\b. o\b/g, ". O");
s = s.replace( /\b. p\b/g, ". P");
s = s.replace( /\b. q\b/g, ". Q");
s = s.replace( /\b. r\b/g, ". R");
s = s.replace( /\b. s\b/g, ". S");
s = s.replace( /\b. t\b/g, ". T");
s = s.replace( /\b. u\b/g, ". U");
s = s.replace( /\b. v\b/g, ". V");
s = s.replace( /\b. w\b/g, ". W");
s = s.replace( /\b. x\b/g, ". X");
s = s.replace( /\b. y\b/g, ". Y");
s = s.replace( /\b. z\b/g, ". Z");
s = s.replace( /\b!a\b/g, "!A");
s = s.replace( /\b!b\b/g, "!B");
s = s.replace( /\b!c\b/g, "!C");
s = s.replace( /\b!d\b/g, "!B");
s = s.replace( /\b!e\b/g, "!E");
s = s.replace( /\b!f\b/g, "!F");
s = s.replace( /\b!g\b/g, "!G");
s = s.replace( /\b!h\b/g, "!H");
s = s.replace( /\b!i\b/g, "!I");
s = s.replace( /\b!j\b/g, "!J");
s = s.replace( /\b!k\b/g, "!K");
s = s.replace( /\b!l\b/g, "!L");
s = s.replace( /\b!m\b/g, "!M");
s = s.replace( /\b!n\b/g, "!N");
s = s.replace( /\b!o\b/g, "!O");
s = s.replace( /\b!p\b/g, "!P");
s = s.replace( /\b!q\b/g, "!Q");
s = s.replace( /\b!r\b/g, "!R");
s = s.replace( /\b!s\b/g, "!S");
s = s.replace( /\b!t\b/g, "!T");
s = s.replace( /\b!u\b/g, "!U");
s = s.replace( /\b!v\b/g, "!V");
s = s.replace( /\b!w\b/g, "!W");
s = s.replace( /\b!x\b/g, "!X");
s = s.replace( /\b!y\b/g, "!Y");
s = s.replace( /\b!z\b/g, "!Z");
s = s.replace( /\b! a\b/g, "! A");
s = s.replace( /\b! b\b/g, "! B");
s = s.replace( /\b! c\b/g, "! C");
s = s.replace( /\b! d\b/g, "! B");
s = s.replace( /\b! e\b/g, "! E");
s = s.replace( /\b! f\b/g, "! F");
s = s.replace( /\b! g\b/g, "! G");
s = s.replace( /\b! h\b/g, "! H");
s = s.replace( /\b! i\b/g, "! I");
s = s.replace( /\b! j\b/g, "! J");
s = s.replace( /\b! k\b/g, "! K");
s = s.replace( /\b! l\b/g, "! L");
s = s.replace( /\b! m\b/g, "! M");
s = s.replace( /\b! n\b/g, "! N");
s = s.replace( /\b! o\b/g, "! O");
s = s.replace( /\b! p\b/g, "! P");
s = s.replace( /\b! q\b/g, "! Q");
s = s.replace( /\b! r\b/g, "! R");
s = s.replace( /\b! s\b/g, "! S");
s = s.replace( /\b! t\b/g, "! T");
s = s.replace( /\b! u\b/g, "! U");
s = s.replace( /\b! v\b/g, "! V");
s = s.replace( /\b! w\b/g, "! W");
s = s.replace( /\b! x\b/g, "! X");
s = s.replace( /\b! y\b/g, "! Y");
s = s.replace( /\b! z\b/g, "! Z");
s = s.replace( /\b? a\b/g, "!A");
s = s.replace( /\b? a\b/g, "!B");
s = s.replace( /\b? c\b/g, "!C");
s = s.replace( /\b? d\b/g, "!B");
s = s.replace( /\b? e\b/g, "!E");
s = s.replace( /\b? f\b/g, "!F");
s = s.replace( /\b? g\b/g, "!G");
s = s.replace( /\b? h\b/g, "!H");
s = s.replace( /\b? i\b/g, "!I");
s = s.replace( /\b? j\b/g, "!J");
s = s.replace( /\b? k\b/g, "!K");
s = s.replace( /\b? l\b/g, "!L");
s = s.replace( /\b? m\b/g, "!M");
s = s.replace( /\b? n\b/g, "!N");
s = s.replace( /\b? o\b/g, "!O");
s = s.replace( /\b? p\b/g, "!P");
s = s.replace( /\b? q\b/g, "!Q");
s = s.replace( /\b? r\b/g, "!R");
s = s.replace( /\b? s\b/g, "!S");
s = s.replace( /\b? t\b/g, "!T");
s = s.replace( /\b? u\b/g, "!U");
s = s.replace( /\b? v\b/g, "!V");
s = s.replace( /\b? w\b/g, "!W");
s = s.replace( /\b? x\b/g, "!X");
s = s.replace( /\b? y\b/g, "!Y");
s = s.replace( /\b? z\b/g, "!Z");
s = s.replace( /\b?a\b/g, "!A");
s = s.replace( /\b?a\b/g, "!B");
s = s.replace( /\b?c\b/g, "!C");
s = s.replace( /\b?d\b/g, "!B");
s = s.replace( /\b?e\b/g, "!E");
s = s.replace( /\b?f\b/g, "!F");
s = s.replace( /\b?g\b/g, "!G");
s = s.replace( /\b?h\b/g, "!H");
s = s.replace( /\b?i\b/g, "!I");
s = s.replace( /\b?j\b/g, "!J");
s = s.replace( /\b?k\b/g, "!K");
s = s.replace( /\b?l\b/g, "!L");
s = s.replace( /\b?m\b/g, "!M");
s = s.replace( /\b?n\b/g, "!N");
s = s.replace( /\b?o\b/g, "!O");
s = s.replace( /\b?p\b/g, "!P");
s = s.replace( /\b?q\b/g, "!Q");
s = s.replace( /\b?r\b/g, "!R");
s = s.replace( /\b?s\b/g, "!S");
s = s.replace( /\b?t\b/g, "!T");
s = s.replace( /\b?u\b/g, "!U");
s = s.replace( /\b?v\b/g, "!V");
s = s.replace( /\b?w\b/g, "!W");
s = s.replace( /\b?x\b/g, "!X");
s = s.replace( /\b?y\b/g, "!Y");
s = s.replace( /\b?z\b/g, "!Z");
s = s.replace( /\b!1!\b/g, "!!!");










node.data = s;

}} })();

// lol y r u here???? burritosenior rawks!!!111
