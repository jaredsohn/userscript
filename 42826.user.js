// ==UserScript==
// @name           CSM - Increase poll options
// @namespace      None
// @description    Increase the number of poll options in forums (up to 30)
// @include        http://www*.cs-manager.com/forum/?p=forum&s=new&f=*
// ==/UserScript==

var body, newEl;
body = document.getElementsByTagName('body');
body = body[0];
if (body) {
    newEl = document.createElement('script');
	newEl.innerHTML = ("function pollAddOption(oButton){var oPollOption = document.getElementById('poll_option');if (oPollOption == null) return;var oInputs = oPollOption.getElementsByTagName('input');if (oInputs == null || oInputs.length <= 0) return;var oInput = oInputs[0];var sInputValue = oInput.value.trim();if (sInputValue.length <= 0){setError(getLang('ERROR_EMPTY_FEILDS'));oInput.focus();return;} else {unsetError();}var oTr = document.createElement('tr');var oTd = document.createElement('td');oTd.align = 'right';oTd.className = 'info';oTd.innerHTML = '<b>Poll option:</b>';oTr.appendChild(oTd);oTd = document.createElement('td');oTd.className = 'value';oTd.innerHTML = '<input type=\"text\" name=\"option[]\" style=\"width:70%;\" maxlength=\"255\" value=\"' + sInputValue +  '\" class=\"required\" /> <input type=\"button\" class=\"buttonsmall\" value=\"Delete\" onclick=\"pollDelOption(this)\" />';oTr.appendChild(oTd);oPollOption.parentNode.insertBefore(oTr, oPollOption);iPollOptions++;oInput.value = '';oInput.focus();if (iPollOptions >= 30) {oButton.style.visibility = 'hidden';}}");
    body.parentNode.insertBefore(newEl, body.nextSibling);
}