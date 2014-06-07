/*
    KeePass Helper 2
    Chris Wood, email: userscripts at gracefool.com
    
    Public Domain - Copy, use, modify, spread....

    Details:
    - displays hostname in title bar (same as the addon 'Display hostname in title bar')
    - removes extra whitespace from start and end of page title
    - sets focus on username
*/

// ==UserScript==
// @name           KeePass Helper 2
// @namespace      http://gracefool.com
// @description    KeePass AutoType feature
// @include        *
// ==/UserScript==

var strXPath, colSnapshot, objInputPassword, objInputUserName, objTitle;

// display hostname in title bar
strXPath = "//title";
colSnapshot = document.evaluate(strXPath, document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (colSnapshot.snapshotLength>0) {
	objTitle=colSnapshot.snapshotItem(0);
	objTitle.text = objTitle.text.replace(/^(\s)+/, '');
	objTitle.text = objTitle.text.replace(/(\s)+$/, '');
	if (window.location.hostname.length>0) {
		objTitle.text += ' ('+window.location.hostname+')';
	}
}

// search password input field and set focus on username field
strXPath = "//input";
colSnapshot = document.evaluate(strXPath, document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);    
for (var i = 0; i < colSnapshot.snapshotLength; i++) {
    objInputPassword = colSnapshot.snapshotItem(i);
	if (objInputPassword.type=='password' && i>0) {
	    objInputUserName = colSnapshot.snapshotItem(i-1);
	    objInputUserName.focus();
	    objInputUserName.select();
	    break;
	}
}