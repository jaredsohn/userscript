// ==UserScript==
// @name           Eksi Sozluk Gizli Bknz Acici
// @description    Eksi Sozlukteki Yildizla Gosterilen Gizli Bknzlari Otomatik Acar
// @namespace      http://userscripts.org/users/419946
// @version        0.1
// @author         dogac
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://sozluk.sourtimes.org/*
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// ==/UserScript==


var matchStr = '(<a title="\\(bkz: )(.*)(\\)".*)';
var repStr = '(<a href="\show.asp?t=$2\">$2</a>)';

var abs;
var re = new RegExp(matchStr);

abs = document.evaluate(
    "//sup[@class='ab']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	
for (var i = 0; i <abs.snapshotLength; i++)
{
	abs.snapshotItem(i).innerHTML = abs.snapshotItem(i).innerHTML.replace(re, repStr);
}
