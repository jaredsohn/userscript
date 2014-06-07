// ==UserScript==
// @namespace     http://riddle.pl/-/greasemonkey/wp.comments.user.js
// @name          Wordpress Comments AutoSignature
// @author				riddle
// @description 	Fills comment form on Wordpress blogs in case there's no cookie (we haven't commented and set cookie yet)
// @version 			0.1.1
// @include       *
// ==/UserScript==

var userData = new Array();

/* ======================== editing STARTS ======================== */

userData['author'] = 'your name';
userData['email'] = 'your@email.com';
userData['url'] = 'http://your.page.com';

/* ======================== editing *ENDS!* ======================== */

if (!window.opera) {
	if (GM_getValue) {
		userData['author'] = GM_getValue('gmk-wpcomms-author', userData['author']);
		userData['email'] = GM_getValue('gmk-wpcomms-email', userData['email']);
		userData['url'] = GM_getValue('gmk-wpcomms-url', userData['url']);	
	}

	if ((GM_registerMenuCommand) && (GM_setValue)) {
		function createVars(e) {
			GM_setValue('gmk-wpcomms-author', '');
			GM_setValue('gmk-wpcomms-email', '');
			GM_setValue('gmk-wpcomms-url', '');	
		}
		
		GM_registerMenuCommand('Create or Erase Wordpress Variables', createVars);
	}
}

var formId = '';

function isWordpress() {
	var form = document.getElementsByTagName('form');
	for (var i = 0; i < form.length; i++) {
		if (form[i].action) {
			var action = form[i].action.toLowerCase();
			if (action.indexOf('wp-comments-post.php') > -1) {
				if (!form[i].id) {
					form[i].id = 'gmkCommForm'; 
				}
				formId = form[i].id;
				return true;
			}
		}
	}
}

function writeField(field, type) {
	if ((!field.value) || (field.value == '')) {
		field.value = userData[type];
	}
}

function init() {
	if (isWordpress()) {
		var inps = document.getElementById(formId).getElementsByTagName('input');
		for (var i = 0; i < inps.length; i++) {
			if (inps[i].name) {
				switch (inps[i].name.toLowerCase()) {
					case 'author' : writeField(inps[i], 'author'); break;
					case 'email' 	: writeField(inps[i], 'email'); break;
					case 'url' 		: writeField(inps[i], 'url'); break;
				}
			}
		}
	}
}

if (window.opera) {
	document.addEventListener('DOMContentLoaded', init, false);	
} else {
	init();
}