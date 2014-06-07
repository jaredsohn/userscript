// ==UserScript==
// @name          WordPress confirm comment deletion after timeout
// @namespace     http://henrik.nyh.se
// @description   For WordPress blogs, clicking the "delete comment" link in a mail notification lands you on a confirmation page. This script automatically confirms the deletion after five seconds (cancel countdown with the Esc key). The intention is to make it easier to delete spam while still maintaining some safeguard against misclicks.
// @include       */wp-admin/post.php?action=confirmdeletecomment&*
// ==/UserScript==

var delay = 5;  // seconds
var cancel = false;


function xps(query, root) { return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }
function makeElement(tag, id) { var el = document.createElement(tag); if (id) el.id = id; return document.body.appendChild(el); }


var confirmButton = xps('//input[@value="Yes"]');
if (!confirmButton) return;

var num = makeElement("p", "confirm_timeout");
GM_addStyle("#confirm_timeout {	margin:0; padding:0; color:red; font-size:200px; text-align:center; position:relative; top:-200px; z-index:999; } ");

function catch_escape(e) {
	cancel = (e.keyCode == e.DOM_VK_ESCAPE);
}
document.addEventListener('keypress', catch_escape, true);

function countDown() {
	num.innerHTML = delay--;
	if (cancel)
		num.innerHTML = "";
	else if (delay >= 0)  // Count down another step
		setTimeout(countDown, 1000);
	else if (delay < 0)  // Confirm deletion
		confirmButton.click();
}
countDown();