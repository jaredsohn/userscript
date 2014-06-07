// ==UserScript==
// @name		UserScript.org Auto Click 'Leave!' Button for Groups
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-09-08
// @lastupdated	2009-10-18
// @namespace	userscriptsOrgAutoClickLeaveBtn
// @include		http*://*userscripts.org/groups/*/leave
// @version		0.1
// @description	Automatically click the 'Leave!' button for groups, on the group's join page at userscripts.org.
// ==/UserScript==

userscriptsOrgAutoClickLeaveBtn = function() {
	var leaveBtn=document.evaluate("//input[@type='submit' and contains(@value,'Leave')]",document,null,9,null).singleNodeValue;
	if(!leaveBtn) return false;
	leaveBtn.click();
	return true;
}
userscriptsOrgAutoClickLeaveBtn();