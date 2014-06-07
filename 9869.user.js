// ==UserScript==
// @author         ondy1985 <ondy1985(at)gmail(dot)com>
// @name           Travian Messagebox v1.3.5
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

var query = "//table[@id='overview']/tfoot/tr[last()]/th[position()=1]";
var xresult = document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var td = xresult.snapshotItem(0);

td.innerHTML = '<input type="checkbox" onchange="'+func+'"/>';