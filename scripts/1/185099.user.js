// ==UserScript==
// @name         Better Trello
// @namespace    http://xrstf.de/
// @version      1.0
// @icon64URL    https://trello.com/favicon.ico
// @match        https://*trello.com/*
// @copyright    2013, xrstf
// ==/UserScript==

/*
 * You can change the settings below if you don't like a particular change to the Trello UI.
 */

(function(d) {
	var
		cardWidth          = 900,   // make cards X pixel wide wide (set to null to disable)
		textareaHeight     = 250,   // increase card description textarea (input mode) to X pixel (null to disable)
		hideDescBadge      = true,  // hide the uselesss "This card has a description" badge from card windows
		hideUserBadges     = true,  // hide the user status and member type (e.g. board admin) badges from avatars
		disableClidkToEdit = true;  // disable click-to-edit on the card description (allows for easier text selection)

	/*
	 * No need to change anything from here on down, except if you want to edit the widths/heights
	 */

	if (cardWidth !== null) {
		var mainCol = cardWidth - 218;
		GM_addStyle('.window { width:' + cardWidth + 'px !important; } .window-main-col { width:' + mainCol + 'px !important; }');
	}

	if (textareaHeight !== null) {
		GM_addStyle('.window-main-col .edit textarea.field { height:' + textareaHeight + 'px !important; }');
	}

	if (hideDescBadge) {
		GM_addStyle('.card-detail-metadata .badge[title*="has a descr"] { display:none; }');
	}

	if (hideUserBadges) {
		GM_addStyle('.member .status { display:none; } .member .member-type { display:none; }');
	}

	if (disableClidkToEdit) {
		GM_addStyle('.window .editable .current { cursor:inherit; }');

		var setOnClickHandler = function() {
			var node = d.querySelector('.card-detail-desc .current');

			if (node && node.onclick === null) {
				node.onclick = function(e) {
					e.stopPropagation();
				};
			}
		};

		// remove the onclick handler for card descriptions (they suck hard if you have links in your description)

		var win = d.querySelector('.window-overlay .window-wrapper');

		if (win) {
			win.addEventListener('DOMSubtreeModified', setOnClickHandler);
		}
	}
}(document));
