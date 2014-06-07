// ==UserScript==
// @name           güijquipedia
// @description    Convierte wikipedia a güijquipedia (hoygan)
// @include        http://es.wikipedia.org*
// ==/UserScript==

function pasarAHoygan(str)
{
str=str.replace(/a ver/gi, 'haber');
str=str.replace(/gu([aeioy]) /gi, 'w ');
str=str.replace(/x/gi, 'cs');
str=str.replace(/hay/gi, 'ahi');
str=str.replace(/antemano/gi, 'antebrazo');
str=str.replace(/guay/gi, 'wuay');
str=str.replace(/á/gi, 'a');
str=str.replace(/é/gi, 'e');
str=str.replace(/í/gi, 'i');
str=str.replace(/ó/gi, 'o');
str=str.replace(/ú/gi, 'u');

str=str.replace(/yo/gi, 'io');
str=str.replace(/m([pb])/gi, 'n$1');
str=str.replace(/qu([ei])/gi, 'k$1');
str=str.replace(/ct/gi, 'st');
str=str.replace(/cc/gi, 'cs');
str=str.replace(/ll([aeou])/gi, 'y$1');
str=str.replace(/ya/gi, 'ia');
str=str.replace(/yo/gi, 'io');
str=str.replace(/g([ei])/gi, 'j$1');
str=str.replace(/^([aeiou][a-z]{3,})/gi, 'h$1');
str=str.replace(/ ([aeiou][a-z]{3,})/gi, ' h$1');
str=str.replace(/[zc]([ei])/gi, 's$1');
str=str.replace(/z([aou])/gi, 's$1');
str=str.replace(/c([aou])/gi, 'k$1');

str=str.replace(/b([aeio])/gi, 'vvv;$1');
str=str.replace(/v([aeio])/gi, 'bbb;$1');
str=str.replace(/vvv;/gi, 'v');
str=str.replace(/bbb;/gi, 'b');

str=str.replace(/oi/gi, 'oy');
str=str.replace(/xp([re])/gi, 'sp$1');
str=str.replace(/es un/gi, 'esun');
str=str.replace(/(^| )h([ae]) /gi, '$1$2 ');
str=str.replace(/aho/gi, 'ao');
str=str.replace(/a ver /gi, 'haber ');
str=str.replace(/ por /gi, ' x ');
str=str.replace(/ñ/gi, 'ny');
str=str.replace(/buen/gi, 'GUEN');

str=str.replace(/windows/gi, 'guindous');
str=str.replace(/we/gi, 'gue');
// str=str.replace(/'. '/gi, '');
str=str.replace(/,/gi, ' ');
str=str.replace(/hola/gi, 'ola');
str=str.replace(/ r([aeiou])/gi, ' rr$1');
str=str.replace(/gueno/gi, 'wueno');
str=str.replace(/yu/gi, 'llu');
str=str.replace(/lle/gi, 'ye');

return str.toUpperCase();
}

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    node.data=pasarAHoygan(s);
}