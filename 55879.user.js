// ==UserScript==
// @name           experts-exchange.com remover
// @namespace      org.no-ip.bca.google
// @include        http://www.google.*/search*
// ==/UserScript==

const PROMOTE = 'Promote'
const REMOVE = 'Remove'
var changes = [];
changes[0] = [/^https?:\/\/([^\/]+\.)?experts-exchange\.com(\/.*)?/, REMOVE];
const interval = 250;

var to_change = [];

function do_change() {
	var button = to_change.pop();
	if (to_change.length > 0)
		setTimeout(do_change, interval);
	button.click();
}

function scanner() {
	const res_ol = document.evaluate("//div[@id='res']//ol", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	const res_lis = res_ol.getElementsByTagName("li");

	for (var i = 0; i < res_lis.length; i++) {
		const curr_li = res_lis[i];
		const curr_a = curr_li.getElementsByClassName("l")[0];
		
		if (!curr_a)
			continue;
		
		for (var changesI = 0; changesI < changes.length; changesI++) {
			if (curr_a.href.match(changes[changesI][0])) {
				GM_log("Matched: " + curr_a.href);
			    var buttonToPick = changes[changesI][1];
				var buttons = curr_li.getElementsByTagName("button");
				for (var buttonsI = 0; buttonsI < buttons.length; buttonsI++) {
					var button = buttons[buttonsI];
					if (button.title == buttonToPick) {
						to_change.push(button);
						break;
					}
				}
			}
		}
	}

	GM_log("Found " + to_change.length + " links to change.");

	if (to_change.length > 0)
		setTimeout(do_change, interval);
}
setTimeout(scanner, interval*2);