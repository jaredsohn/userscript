// ==UserScript==
// @name          post2facebook
// @description   Adds the wall post submission form right on the person's wall
// @include       http://*facebook.com*profile.php*
// ==/UserScript==

// Author:  Justin Rosenthal
// Last Update:  05-27-2006
// Comments, Questions, Concerns?  justin.rosenthal at gmail


// Find the wallpost.php link
var allLinks, thisLink;
allLinks = document.evaluate(
	'//*[contains(@href, "wallpost.php")]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

// allLinks should return length 1
// If > 1, skip everything... just let it default to the normal wallpost.php link

if (allLinks.snapshotLength >= 1) {
	thisLink = allLinks.snapshotItem(0);

	// Get users's id
	myProfile = document.getElementById('myprofile').firstChild.href;
	usrID = myProfile.split("=")[1];

	// Get receivers id
	recID = thisLink.href.split("=")[1];

	thisLink.href = "javascript:quickPost()";
	thisLink.addEventListener(
		'click',
		function(event) {
			qMsgDiv = document.getElementById('quickPost');
			if (qMsgDiv.style.display == 'none') {
				qMsgDiv.style.display = 'block';
			} else {
				qMsgDiv.style.display = 'none';
			}

			// Prevent fallthrough
			event.stopPropagation();
			event.preventDefault();
		},
		true);

	qPostDiv = document.createElement('div');
	qPostDiv.id= "quickPost";
	qPostDiv.style.display = "none";
	html = '<form method="post" action="wallpost.php"><input type="hidden" id="form_user_check" name="form_user_check" value="' + usrID + '" />';
	html += '<input type="hidden" id="id" name="id" value="' + recID + '" /><input type="hidden" id="post" name="post" value="" />';
	html += '<center><table class="formtable" style="display: block;" border="0" cellspacing="0"><tr class="tallrow"><td><textarea id="text" name="text" class="textarea" cols = "50" rows = "4"></textarea></td></tr></table><div class="buttons" id="qpButtons" style="clear: both;"><input type="submit" id="post" name="post" class="inputsubmit" value=" Post " />&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" class="inputsubmit" value="Cancel" onClick="document.getElementById(\'quickPost\').style.display=\'none\';" /></div></center></form>';
	html += '<br style="clear: both;">';
	qPostDiv.innerHTML = html;
	thisLink.parentNode.parentNode.appendChild(qPostDiv);

}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#quickPost {clear: both; position:relative; top: 0.5em;}');

