// ==UserScript==
// @name           George Straight ticket winner
// @namespace      http://userscripts.org/scripts/show/54476
// @include        http://kbtx.upickem.net/engine/Details.aspx?PageType=VOTING*
// @include        http://www.example.com/
// ==/UserScript==
if(window.location == 'http://www.example.com/') {
	window.location = 'http://kbtx.upickem.net/engine/Details.aspx?PageType=VOTING&ContestID=8327&SubmissionID=1197398&IncrementNumber=1#SubmissionDisplay';
}
function trytovote() {
	if(document.getElementById('cmdSaveChanges1')) {
		var votes = GM_getValue("total votes", 0);
		GM_setValue("total votes", votes + 1);
		document.getElementById('HiddenFormSubmitted').value = 'VOTE';
		document.getElementById('PageForm').submit();
	} else {
		setTimeout(reload, 60 * 1000);
	}
}
function reload() {
	var attempts = GM_getValue("total attempts", 0);
	GM_setValue("total attempts", attempts + 1);
	window.location = 'http://www.example.com/';
}
function voted() {
	alert('voted. I think.');
}
trytovote();
