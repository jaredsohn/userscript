// ==UserScript==
// @name        WoltLab Support Helper
// @namespace   http://www.softcreatr.de
// @include     /^https?://(www\.)?woltlab.com/(.*/)?forum/index.php/Thread/.*$/
// @version     1.4.0
// @grant       none
// ==/UserScript==

///
// Define some vars
///

var id = $('#content nav ul li:nth-last-child(2) a').attr('href').replace(/[^0-9]/g, ''),
	notice = '<p class="error">Sie befinden sich im Unterforum "Hilfe (ältere Versionen)". Bitte berücksichtigen Sie dies bei Ihrer Antwort!</p>',
	notice2 = '<p class="error">Dieses Thema verfügt über ein Label für eine ältere Software. Bitte berücksichtigen Sie dies bei Ihrer Antwort!</p>',
	rank = '',
	label = '';

///
// Show a notice, that you are attempting to answer in a possibly outdated forum thread
///

if (id && parseInt(id) == 2607) {
	$('.contentNavigation:first').after(notice);
	$('.contentNavigation:last').before(notice);
}
else if (id && parseInt(id) == 6) {
	$.each($('.labelList li span'), function() {
	label = $(this).html();
		
	if (!/^WCF 2/.test(label) && !/^WBB 4/.test(label)) {
		  $('.contentNavigation:first').after(notice2);
		  $('.contentNavigation:last').before(notice2);
			
		  return false;
		}
	});
}

///
// Mark non-customers
///

$.each($('.userTitle .badge'), function() {
	rank = $(this).html();

	if (rank === 'Mitglied' || rank === 'Member') {
		$(this).removeClass('none').addClass('red');
	}
	else if (rank === 'Kunde' || rank === 'Customer') {
		$(this).removeClass('none').addClass('green');
	}
});
