// ==UserScript==
// @name        Reddit - Ignore Reports Approver
// @include		/^https?://(.*\.)?reddit\.com/.*/
// @version		1.0
// @run-at document-start
// ==/UserScript==

function ignoreReportsApprover() {
	//Wait for the ignore reports button to be pressed
	$('body.moderator').on('click', '.big-mod-buttons > .neutral.pressed', function (e) {
		$(this).parent().find('.positive').click();
	});
}

//Add the script to the page
document.addEventListener('DOMContentLoaded', function(e) {
	var s = document.createElement('script');
	s.textContent="("+ignoreReportsApprover.toString()+')();';
	document.head.appendChild(s);
});
