// ==UserScript==
// @name           testas
// @namespace      timer
// @description    testaas
// @author         sikauirtapsnojau
// @version        1.00.00
// @lastchanges    Bug Fixes
// @include        http://*tx*.travian.*/berichte.php
// @include        http://*tx*.travian.*/nachrichten.php
// ==/UserScript==


function SetAllCheckBoxes(FormName, FieldName, CheckValue)
{
	if(!document.forms[FormName])
		return;
	var objCheckBoxes = document.forms[FormName].elements[FieldName];
	if(!objCheckBoxes)
		return;
	var countCheckBoxes = objCheckBoxes.length;
	if(!countCheckBoxes)
		objCheckBoxes.checked = CheckValue;
	else
		// set the check value for all check boxes
		for(var i = 0; i < countCheckBoxes; i++)
			objCheckBoxes[i].checked = CheckValue;
}