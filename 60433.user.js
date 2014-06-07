// ==UserScript==
// @author         byrae
// @email          byrae@hotmail.com
// @name           Reports IGMs Enhancements
// @version        1.0.0
// @namespace      Travian
// @description    All Reports IGMs SelectBox for Travian 3.5
// @include        http://*.travian.*/berichte.php*
// @include        http://*.travian.*/nachrichten.php*
// @exclude        http://*.travian.*/berichte.php?id=*
// @exclude        http://*.travian.*/nachrichten.php?id=*
// ==/UserScript==

var func = "var inputs = document.getElementsByTagName('input');"
	+	"for (var i = 0; i < inputs.length; i++) {"
	+	"if (inputs[i].type == 'checkbox') {"
	+	"if (inputs[i].name.search(/n[1-9][0-9]?/i) >= 0) {"
	+	"inputs[i].checked = !inputs[i].checked;"
	+	"}}}";

var xresult = document.evaluate("//table[@id='overview']/tfoot/tr[position()=1]/th[position()=1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var td = xresult.snapshotItem(0);
td.innerHTML = '<input type="checkbox" onchange="'+func+'"/>';
