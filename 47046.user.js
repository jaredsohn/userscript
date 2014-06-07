// ==UserScript==
// @name           Mojinos minusculator
// @description    Convierte la web Toda a Minusculas
// @include        *editpost*minusculas
// ==/UserScript==

function pasarAHoygan(str)
{

str=str.replace(/A/gi, 'a');
str=str.replace(/B/gi, 'b');
str=str.replace(/C/gi, 'c');
str=str.replace(/D/gi, 'd');
str=str.replace(/E/gi, 'e');
str=str.replace(/F/gi, 'f');
str=str.replace(/G/gi, 'g');
str=str.replace(/H/gi, 'h');
str=str.replace(/I/gi, 'i');
str=str.replace(/J/gi, 'j');
str=str.replace(/K/gi, 'k');
str=str.replace(/L/gi, 'l');
str=str.replace(/M/gi, 'm');
str=str.replace(/N/gi, 'n');
str=str.replace(/Ñ/gi, 'ñ');
str=str.replace(/O/gi, 'o');
str=str.replace(/P/gi, 'p');
str=str.replace(/Q/gi, 'q');
str=str.replace(/R/gi, 'r');
str=str.replace(/S/gi, 's');
str=str.replace(/T/gi, 't');
str=str.replace(/U/gi, 'u');
str=str.replace(/V/gi, 'v');
str=str.replace(/W/gi, 'w');
str=str.replace(/X/gi, 'x');
str=str.replace(/Y/gi, 'y');
str=str.replace(/Z/gi, 'z');


return str;
}

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    node.data=pasarAHoygan(s);
}