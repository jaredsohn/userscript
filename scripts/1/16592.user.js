// ==UserScript==
// @name           Userscripts.org Total Installs
// @namespace      http://www.digivill.net/~joykillr
// @description    Tally install totals for all of your scripts on userscripts.org and alert total.
// @include        http://userscripts.org/users/*/scripts
// @include        http://*.userscripts.org/users/*/scripts
// ==/UserScript==
//v. 1.1

if (window.content.location.href.match(/^http\:\/\/userscripts.org\/users\/\d{1,6}\/scripts$/i)) {
var x = 0, nodes = document.evaluate("//td[@class='inv lp']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var a=0; a<nodes.snapshotLength;a++) {
	var z = nodes.snapshotItem(a).childNodes[3].textContent.toString();
	z = z.split(" ")[0];
	if (z.indexOf(",")!=-1) {z = z.replace(",","");}
	z = parseInt(z);
	with (Math) {x = x + z}
	}
alert(x);
}