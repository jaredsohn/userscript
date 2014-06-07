// ==UserScript==
//
// @name        LinkedIn Hide Non-Members from PYMK
// @description Hide non-members from People You May Know on LinkedIn. These people usually show up with a name, email address, a button to "Add to network" and no profile picture.

// @namespace   http://jonathanhult.com/
// @author      Jonathan Hult
// @license     MIT

// @version     1.0
// @changelog   1.0 Initial version

// @match       https://www.linkedin.com/people/pymk*
// @match       http://www.linkedin.com/people/pymk*
//
// ==/UserScript==
// Find all user cards
var cards = document.querySelectorAll('.card');

if (typeof cards != 'undefined') {
	// Loop through each card
	for (var i = 0; i < cards.length; i++) {
	
		// Find non-members (as determined by the class bt-invite)
		var foundNonMember = cards[i].querySelector('.bt-invite');
		
		if (foundNonMember !== null) {
			// Find the close button (the "x" button)
			var closeButton = cards[i].querySelector('.close')
			
			if (closeButton !== null) {
				// Click the close button
				closeButton.click();
			}
		}
	}
}