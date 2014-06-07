// ==UserScript==
// @name           Time Converter (text only)
// @namespace     Concept by valmen
// Based on the great 'Super Secret Script' >
// http://userscripts.org/scripts/show/24266
// @description    Converts 24-hour format to any time
// @include        *
// ==/UserScript==

(function(){var replacements,regex,key,textnodes,node,
s;replacements={

//EDITABLE ITEMS:
//Examples:
//Replace '01:00' by '1:10' > "01:00": "1:10",
//Replace '12:30 by '11:30' > "12:30": "11:30",
//Replace '16:50 by '18:20' > "16:50": "18:20",
//Replace '15h15' by '15:15' > "15h15": "15:15",

" ": " ",
" ": " ",
" ": " ",

//and so on.
//IMPORTANT: All lines (except the last one) MUST finish
//with a comma. The space after the ':' is optional.
//You can customize it according to your own needs.
//END OF EDITABLE ITEMS

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