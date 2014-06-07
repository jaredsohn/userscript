// ==UserScript==
// @name		UserScript.org Auto Click 'Join!' Button for Groups
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-09-08
// @lastupdated	2009-09-08
// @namespace	userscriptsOrgAutoClickJoinBtn
// @include		http*://*userscripts.org/groups/*/join
// @version		0.1
// @description	Automatically click the 'Join' button for groups, on the group's join page at userscripts.org.
// ==/UserScript==

userscriptsOrgAutoClickJoinBtn = function() {
	var joinBtn=document.evaluate("//input[@type='submit' and contains(@value,'Join')]",document,null,9,null).singleNodeValue;
	if(!joinBtn) return false;
	joinBtn.click();
	return true;
}
userscriptsOrgAutoClickJoinBtn();