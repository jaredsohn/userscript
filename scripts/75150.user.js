// TM Analyze Team - Select All
// version 1.0
// Created: 24-Apr-2010
// Author: Rocco
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TM Trophy Manager Analyze All
// @description   Allows you to analyze all matches played with one click
// @include       http://trophymanager.com/assistant_manager.php*
// ==/UserScript==


document.checkUncheckAll = function(theElement) 
{
	alert("test");
	var theForm = theElement.form, z = 0;
	for(z=0; z<theForm.length;z++){
		if(theForm[z].type == 'checkbox' && theForm[z].name != 'checkall')
		{
			theForm[z].checked = theElement.checked;
		}
	}
}


(function() {
var target = document.getElementById("match_select_form");
target.innerHTML = '<input type="checkbox" name="checkall" onclick="document.checkUncheckAll(this);"/> Check All/None' + target.innerHTML + "<br />";
})();