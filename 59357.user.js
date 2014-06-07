// ==UserScript==
// @name		UserScript.org Move Your Groups Created/Joined Lists to the Right
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-09-08
// @lastupdated	2009-10-15
// @namespace	userscriptsOrgMoveGroupsCreatedJoinedListsToRight
// @include		http*://*userscripts.org/groups
// @include		http*://*userscripts.org/groups#*
// @include		http*://*userscripts.org/groups?*
// @version		0.1.1
// @description	This userscript will move the groups created/joined lists to the right nav which makes the groups page much easier to read.
// ==/UserScript==

userscriptsOrgMoveGroupsCreatedJoinedListsToRight = function() {
	var h2s=document.evaluate("//div[@id='content']/h2[contains(text(),'Groups you created') or contains(text(),'Groups you joined')]",document,null,7,null);
	if(!h2s) return false;
	var right=document.getElementById('right');
	if(!right) return false;
	var h2,ns;
	for(var i=0;i<h2s.snapshotLength;i++){
		h2=h2s.snapshotItem(i);
		ns=h2.nextSibling;
		if (!ns || ns.nodeName != 'ul') {
			ns=ns.nextSibling;
		}
		right.appendChild(h2);
		ns.id=h2.innerHTML.toLowerCase().replace(/[^\w\d]/gi,'-');
		right.appendChild(ns);
	}
	return true;
}
userscriptsOrgMoveGroupsCreatedJoinedListsToRight();