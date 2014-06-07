// ==UserScript==
// @author         Apurba Roy(e.hellraiser@gmail.com)
// @name           Travian Messagebox
// @namespace      Travian
// @description    Messagebox enhancements
// @include        http://*.travian.*/berichte.php*
// @include        http://*.travian.*/nachrichten.php*
// @exclude        http://*.travian.*/berichte.php?id=*
// @exclude        http://*.travian.*/nachrichten.php?id=*
// @exclude		   http://*.travian.*/*&id=*
// ==/UserScript==

var func = "var inputs = document.getElementsByTagName('input');"
	+	"for (var i = 0; i < inputs.length; i++) {"
	+	"if (inputs[i].type == 'checkbox') {"
	+	"if (inputs[i].name.search(/n[1-9][0-9]?/i) >= 0) {"
	+	"inputs[i].checked = !inputs[i].checked;"
	+	"}}}";

var xresult = document.evaluate("//table[@class='tbg']/tbody/tr[last()]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var tr = xresult.snapshotItem(0);

if (location.href.search(/berichte/i) >= 0) {
	var xresult = document.evaluate("//table[@class='tbg']/tbody/tr[last()]/td[position()=1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var td = xresult.snapshotItem(0);
	td.setAttribute("colspan", 1);
	tr.innerHTML = "<td></td>" + tr.innerHTML;
}
var xresult = document.evaluate("//table[@class='tbg']/tbody/tr[last()]/td[position()=1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var td = xresult.snapshotItem(0);
td.innerHTML = '<input type="checkbox" onchange="'+func+'"/>';