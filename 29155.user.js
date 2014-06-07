// ==UserScript==
// @name           Modificador de reportes de escombros
// @namespace      http://diveintogreasemonkey.org/download/
// @description    Un toque personalizado a los reportes de escombros. Puedes modificarlo cambiando el código fuente, no tiene mucha lógica ^^
// @include        *game/index.php?page=messages*
// ==/UserScript==

function modificareporte(str)
{
str=str.replace(/recicladores tienen una capacidad total de carga de/gi, 'lentos y pequeños camiones de la basura tienen un maletero de');

return str.toUpperCase();
}

textnodes = document.evaluate("//text()",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    node.data=modificareporte(s);
}