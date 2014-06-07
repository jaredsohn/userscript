// ==UserScript==
// @author      Ben
// @namespace	http://userscripts.org/
// @name		Travian Easy Messages
// @description	Add checkbox and buttons to messages 
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

/*********************************************************/
//Part of the code was taken or inspired by the scripts
//Travian: Resource++ v4
//Travian Task Queue

/*********************************************************/
// General variables you should not modify
var messagesHtmlTable;

/*********************************************************/
//launch main function after doc is loaded
window.addEventListener('load', loadEasyMessages, true);

//main function
function loadEasyMessages() {
	_log(2, "-> loadEasyMessages()");

	GM_registerMenuCommand("Travian Easy Messages erase persistent data", cleanOptions);

	messagesHtmlTable = document.evaluate("//table[@class='tbg']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if (messagesHtmlTable) {

		_log(3, document.location.href);

		if (document.location.href.match("berichte.php")) {
			if (!document.location.href.match('id=')) {
				_log(3, "Reports page");

				var newHeaderCell = document.createElement('td');
				newHeaderCell.setAttribute("width", "22");
				newHeaderCell.innerHTML = '<input type="Checkbox">';
				newHeaderCell.firstChild.addEventListener('click', selectAllCheckBoxes, true);

				messagesHtmlTable.tBodies[0].rows[0].cells[0].setAttribute("colspan", "1");
				messagesHtmlTable.tBodies[0].rows[0].insertBefore(newHeaderCell, messagesHtmlTable.tBodies[0].rows[0].cells[0]);
				createMouseEvents();

			} else {
				_log(3, "Display Report");
				var messageActualId = document.location.href.split('id=')[1];
				var messageStoredData = getOption("messageName").split(";");

				_log(3, "Actual message Id : Stored Message Id = " + messageActualId + " : " + messageStoredData[0]);

				if (messageActualId == messageStoredData[0]) {
					var deleteButtonForm = '<form method="post" action="berichte.php" name="msg">';

					for (var i = 0; i < messageStoredData.length; i = i + 2) deleteButtonForm += '<input type="hidden" name="' + messageStoredData[i + 1] + '" value="' + messageStoredData[i] + '">';

					deleteButtonForm += '<input class="std" name="del" type="Submit" value="' + getOption("deleteMessageButtonValue") + '">';
					deleteButtonForm += '</form>';
					_log(3, "Display Report page deleteButtonForm : " + deleteButtonForm);
					messagesHtmlTable.tBodies[0].rows[0].cells[0].innerHTML = deleteButtonForm;
				} else {

					_log(1, "Actual message Id != Stored Message Id " + messageActualId + " != " + messageStoredId);

				}
			}
		}

		if (document.location.href.match("nachrichten.php")) {

			_log(3, "Messages page");

			messagesHtmlTable.tBodies[0].rows[0].cells[0].innerHTML = '<input type="Checkbox">';
			messagesHtmlTable.tBodies[0].rows[0].cells[0].firstChild.addEventListener('click', selectAllCheckBoxes, true);

		}
	}

	_log(3, "<- loadEasyMessages");

}

/*********************************************************/

function selectAllCheckBoxes() {

	_log(3, "-> selectAllCheckBoxes");

	value = this.checked;

	for (var i = 1; messagesHtmlTable.tBodies[0].rows[i]; ++i) {
		messagesHtmlTable.tBodies[0].rows[i].cells[0].firstChild.checked = value;
	}

	_log(3, "<- selectAllCheckBoxes");
}

/*********************************************************/

function createMouseEvents() {

	_log(3, "-> createMouseEvents");

	var mHTTbody = messagesHtmlTable.tBodies[0];

	var hiddenInputElement = document.getElementsByName("t");
	var hiddenInputElementData = "";
	if (hiddenInputElement[0]) {
		hiddenInputElementData = ";" + hiddenInputElement[0].value + ";" + hiddenInputElement[0].name;

	}

	_log(3, "hiddenInputElementData = " + hiddenInputElementData);

	var i;
	for (i = 1; mHTTbody.rows[i + 1]; ++i) {

		if (mHTTbody.rows[i].cells[1]) {
			mHTTbody.rows[i].cells[1].firstChild.addEventListener("click",
			function() {
				var messageCheckBox = this.parentNode.parentNode.cells[0].firstChild;
				setOption("messageName", messageCheckBox.value + ";" + messageCheckBox.name + hiddenInputElementData);
			},
			true);

			_log(3, "attaching mouse event to " + mHTTbody.rows[i].cells[1].innerHTML);
		}
	}

	setOption("deleteMessageButtonValue", mHTTbody.rows[i].cells[0].firstChild.value);

	_log(3, "<- createMouseEvents");

}

/*********************************************************/

function setOption(key, value) {
	key = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + key;
	GM_setValue(key, value);
}
function getOption(key, value) {
	key = document.location.href.split(new RegExp('//?', 'i'))[1] + "_" + key;
	return GM_getValue(key, value);
}
function cleanOptions() {
	var response = confirm("Are you sure you want to delete the stored options ?");
	if (response) {
		setOption("messageName", "");
		setOption("deleteMessageButtonValue", "");

	}
}

/*********************************************************/
//Logging functions from Risi of http://userscripts.org/
var LOG_LEVEL = 1; // 0 - quiet, 1 - nearly quiet, 2 - verbose, 3 - detailed
function _log(level, msg) {
	if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) GM_log(msg);
}