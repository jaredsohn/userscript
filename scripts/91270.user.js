// ==UserScript==
// @name           klavogonki: BigTextarea
// @namespace      klavogonki
// @include        http://klavogonki.ru/forum*
// @author         Fenex
// @version	   1.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
//edit width and height of textBox
var brain = '';
var fnx_rows = '15';
var fnx_cols = '125';
var textareas = document.getElementsByTagName('textarea');
for (i=0;i<textareas.length;i++) {
	textareas[i].rows = fnx_rows;
	textareas[i].cols = fnx_cols;
}
//add function of clear textarea.
if (document.getElementById('write-block')){
var fnx_s = document.createElement('script');
fnx_s.innerHTML = 'function fnx_btn_clear(){if (document.getElementById("fast-reply_textarea").value == ""){document.getElementById("fast-reply_textarea").value = brain;}else{brain = document.getElementById("fast-reply_textarea").value;document.getElementById("fast-reply_textarea").value = "";}};function fnx_btn_cancel(){document.getElementById("write-link").style.display="";document.getElementById("write-block").style.display="none";}';
document.body.appendChild(fnx_s);
//add button "Cancel" and "Clear"
var div_space = document.createElement('span');
div_space.innerHTML = ' <input type="button" value="Стереть" onClick="fnx_btn_clear()"> <input type="button" value="Отмена" onClick="fnx_btn_cancel()">';
var sfb = document.getElementById('write-block').getElementsByTagName('p')[0].getElementsByTagName('input')[0];
sfb.parentNode.insertBefore(div_space, sfb.nextSibling.nextSibling.nextSibling);}