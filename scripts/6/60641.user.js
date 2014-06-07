// ==UserScript==
// @name           Ajuste horario (sólo texto)
// @namespace     Concepto de valmen
// Basado en el gran 'Super Secret Script':
// http://userscripts.org/scripts/show/24266
// @description    Convierte la hora en cualquier hora
// En inglés: http://userscripts.org/scripts/show/56890
// @include        *
// ==/UserScript==

(function(){var replacements,regex,key,textnodes,node,
s;replacements={

//PARTE VARIABLE
//Ejemplos:
//Reemplazar '01:00' por '1:10' > "01:00": "1:10",
//Reemplazar '12:30 por '11:30' > "12:30": "11:30",
//Reemplazar '16:50 por '18:20' > "16:50": "18:20",
//Reemplazar '15h15' por '15:15' > "15h15": "15:15",

" ": " ",
" ": " ",
" ": " ",

//etc.
//IMPORTANTE: Todas las líneas (excepto la última)
//DEBEN terminar con coma. El espacio después de ':' es
//opcional. El script se puede modificar a conveniencia.
//FIN DE PARTE VARIABLE

};regex={};for(key in replacements)
{regex[key]=new RegExp(key,'g')}
textnodes=document.evaluate("//text()",
document,null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);for(var i=0;i<textnodes.snapshotLength;i++)
{node=textnodes.snapshotItem(i);s=node.data;
for(key in replacements)
{s=s.replace(regex[key],replacements[key])}
node.data=s}})()