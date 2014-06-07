// ==UserScript==
// @name           Deautomate Scotiabank Login 
// @namespace      http://very.weirdly.net
// @description    Prevents Scotiabank's online banking login from jumping to the password field as soon as you type 16 characters in the card number
// @include        https://www.scotiaonline.scotiabank.com/online/start.jsp*
// ==/UserScript==
var formList = document.getElementsByName("LoginForm");
var cardLabelArray = getElementsByClass('fieldTitleLeftB');
var cardRow = cardLabelArray[0].parentNode;
var numberCell = cardRow.childNodes[3].childNodes[0];
var cellName = numberCell.name;
cardRow.childNodes[3].removeChild(numberCell);
var inputField = document.createElement('input');
inputField.type = "text";
inputField.name = cellName
inputField.size = "17";
inputField.value = "453";
cardRow.childNodes[3].appendChild(inputField);

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}