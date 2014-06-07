// ==UserScript==
// @name           Deposit to the bank!
// @namespace      http://www.dp.cx/userscripts
// @include        http://www.goblinz.net/bank
// ==/UserScript==



var gc_onhand_xpath = "/html/body/table[@id='wrapper']/tbody/tr[2]/td/table[@id='tbox']/tbody/tr[3]/td[2]/input";
var deposit_button_xpath = "/html/body/table[@id='wrapper']/tbody/tr[2]/td/table[@id='tbox']/tbody/tr[3]/td[4]/input";

var gc_onhand = document.evaluate(gc_onhand_xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var deposit_button = document.evaluate(deposit_button_xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < gc_onhand.snapshotLength; i++) {
	var node = gc_onhand.snapshotItem(i);
	var button_node = deposit_button.snapshotItem(0);
	if (node.value > 100 && button_node) {
		// we need to deposit!
		button_node.click();
	}
}