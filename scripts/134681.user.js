// ==UserScript==
// @name        phpBB Local Save
// @namespace   phpBB Local Save
// @include     http://*/posting.php*
// @version     1
// ==/UserScript==

var textNode = document.getElementById('message');
var submitBtn = document.evaluate('//input[@name="post"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var saveBtn = document.evaluate('//input[@name="save"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var fieldset = document.evaluate('//fieldset[@class="submit-buttons"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var lastEntry = GM_getValue('last_entry');

function saveText() {
  GM_setValue('last_entry', textNode.value);
}

function restoreText() {
  textNode.value = GM_getValue('last_entry');
  textNode.setAttribute('value', GM_getValue('last_entry'));
}

submitBtn.addEventListener('click', saveText, false);

var restoreBtn = document.createElement('input');
restoreBtn.setAttribute('class', 'button2');
restoreBtn.setAttribute('type', 'button');
restoreBtn.setAttribute('value', 'wiederherstellen');
restoreBtn.setAttribute('tabindex', '7');
restoreBtn.addEventListener('click', restoreText, false);

var space = document.createTextNode(" ");

if(null != fieldset) {
  fieldset.insertBefore(restoreBtn,saveBtn);
  fieldset.insertBefore(space,saveBtn);
}
