// ==UserScript==
// @name           Facebook "Update email address" form hider
// @namespace      http://userscripts.org/users/nitrogl
// @description    If your email expires and don't want to give facebook another valid email, just use this script. Facebook staff could decide to remove your account without a valid email address, so use the script just as an exercise.
// @include        https://www.facebook.*
// @include        http://www.facebook.*
// @copyright      Roberto Metere
// @version        1.2
// @license        MIT License
// @grant          none
// ==/UserScript==

// Hide stuff function
function hideInvalidEmailStuff() {
	// Is it "harmful"? do other dialogs share this ID?
	var dialog = document.getElementById('dialog_0');
	if (dialog) {
		dialog.style.display = 'none';
		}
	
	// Yellow banner
	var banner = document.getElementById('email_bounce_banner');
	if (banner) {
		banner.style.display = 'none';
		}

	// Loop forever
	setTimeout(hideInvalidEmailStuff, 1000);
	};

// Run!
hideInvalidEmailStuff();
	