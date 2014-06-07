// ==UserScript==
// @name        Bb Menu Opener
// @namespace   uk.co.cumquat.www
// @description Opens Bb Selective release page
// @include     http://vle.imperial.ac.uk/webct/cobaltMainFrame.dowebct
// @version     1
// ==/UserScript==
var form = document.evaluate('//form[@action="displaySRCourseMap.dowebct"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = form.snapshotLength - 1; i >= 0; i--) {
		var formSnapshot = form.snapshotItem(i);
		
	}
	
var expand = document.evaluate('//a[contains(@href,"javascript:expand")]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = expand.snapshotLength - 1; i >= 0; i--) {
		var expandSnapshot = expand.snapshotItem(i);
		//alert(expandSnapshot);
	}
	
//alert(expand.snapshotItem(0));
	
if(form.snapshotLength > 0 && expand.snapshotLength > 0)
{
	/*var elmNewContent = document.createElement('input');
	elmNewContent.type = 'button';
	elmNewContent.value = 'Click';
	elm.appendChild(elmNewContent);*/
	
	
	var elmNewContent = document.createElement('a');
	elmNewContent.href = expand.snapshotItem(0);
	elmNewContent.appendChild(document.createTextNode('click here'));
	formSnapshot.appendChild(elmNewContent);
}