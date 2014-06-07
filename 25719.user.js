// ==UserScript==
// @author      Ben
// @namespace	http://userscripts.org/
// @name		Travian Select All Messages
// @description	Add a checkbox to select/deselect all messages 
// @include     http://s*.travian.*/berichte.php*
// @include     http://s*.travian3.*/berichte.php*
// @include     http://welt*.travian.*/berichte.php*
// @include     http://s*.travian.*/nachrichten.php*
// @include     http://s*.travian3.*/nachrichten.php*
// @include     http://welt*.travian.*/nachrichten.php*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @version     1.0
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var messagesHtmlTable = document.evaluate("//table[@class='tbg']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quiet, 2 - verbose, 3 - detailed
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) GM_log(msg);
}

function selectAllCheckBoxes() {

	_log(3, "<- selectAllCheckBoxes");

	value = this.checked;

	for (var i = 1; messagesHtmlTable.tBodies[0].rows[i]; ++i) {
		messagesHtmlTable.tBodies[0].rows[i].cells[0].firstChild.checked = value;
	}

	_log(3, "-> selectAllCheckBoxes");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (messagesHtmlTable) {

	_log(3, document.location.href);

	if (document.location.href.match("berichte.php") && !document.location.href.match('id=')) {
		_log(3, "Reports page");

		var newHeaderCell = document.createElement('td');
		newHeaderCell.setAttribute("width", "22");
		newHeaderCell.innerHTML = '<input type="Checkbox">';
		newHeaderCell.firstChild.addEventListener('click', selectAllCheckBoxes, true);

		messagesHtmlTable.tBodies[0].rows[0].cells[0].setAttribute("colspan", "1");
		messagesHtmlTable.tBodies[0].rows[0].insertBefore(newHeaderCell, messagesHtmlTable.tBodies[0].rows[0].cells[0]);
	}

	if (document.location.href.match("nachrichten.php")) {

		_log(3, "Messages page");

		messagesHtmlTable.tBodies[0].rows[0].cells[0].innerHTML = '<input type="Checkbox">';
		messagesHtmlTable.tBodies[0].rows[0].cells[0].firstChild.addEventListener('click', selectAllCheckBoxes, true);

	}
}