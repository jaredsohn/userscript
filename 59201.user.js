// ==UserScript==
// @name           CSM Admin - Predefined mail answers
// @namespace      None
// @description    Allows to add/edit predefined mail answers
// @include        http://*.cs-manager.com/csm/?p=manager_mail*
// @include        http://*.cs-manager.com/csm/other/?p=other_info&s=mail&u=*
// ==/UserScript==

// EDIT YOUR SIGN HERE //
var sign = "\n\nRegards,\n> depmod // French Game Admin";

// HERE ARE THE NAME OF THE ANSWERS //
var answerName = ["Answer #1", "Answer #2", "Answer #3"];

// HERE ARE THE CONTENT OF THE ANSWERS //
var answerContent = ["Hello,\nThis will do a line break -> \netc etc\n\ntwo line breaks" + sign,
"Hey, this is the answer #2!!!!" + sign,
"And finally, the answer #3 ;)" + sign];

var select, newEl, cnt, idSwitch;
if (document.getElementById('text') == null) {
	idSwitch = 'mail_text';
}

else { idSwitch = 'text'; }
select = document.getElementById(idSwitch);
newEl = document.createElement('div');
cnt = "<table id=\"popup_link_same\"><tr><td style=\"border:none;\">Choose your answer:</td><td style=\"border: none;width: 445px;\"><select onChange=\"document.getElementById('" + idSwitch + "').value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 100%;\">";
cnt+= '<option value="">Custom</option>';
for (var i = 0; i < answerName.length; i++) {
	cnt+='<option value="' + answerContent[i] + '">' + answerName[i] + '</option>';
}
cnt+='</select></td></tr></table><hr />';
newEl.innerHTML = cnt;
select.parentNode.insertBefore(newEl, select);