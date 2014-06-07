// ==UserScript==
// @name           spaceo dot remover
// @namespace      .
// @description    removes dots on minimum bids at spaceo.net
// @include        http://www.spaceo.net/ind.php?_s=*
// ==/UserScript==

var doc = document.body.innerHTML;
var regex = new RegExp('<td>[\\d\\.]+</td><td><b>[\\d\\.]+</b></td><td>([\\d]+\\.[\\d\\.]+)</td>', 'i');
var res = regex.exec(doc);

while(res != null)
{
	doc = doc.replace(res[1], res[1].replace('.', ''));
	res = regex.exec(doc);
}
document.body.innerHTML = doc;