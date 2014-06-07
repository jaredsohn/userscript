// ==UserScript==
// @name           GameFAQs New PM Notification
// @namespace      OTACON120
// @version        1.1.1
// @description    Displays a notification when there are unread PMs on GameFAQs
// @updateURL      http://userscripts.org/scripts/source/116444.meta.js
// @downloadURL    http://userscripts.org/scripts/source/116444.user.js
// @website        http://otacon120.com/user-scripts/gamefaqs-related/new-pm-notification/
// @include        http://*.gamefaqs.com/*
// @match          http://*.gamefaqs.com/*
// @grant          none
// ==/UserScript==

var	i, unreadPMs, unreadPMNote, notifContent, alertDismiss, dismissIcon, plural, pronoun,
	userLinks = document.getElementsByClassName( 'masthead_strip' )[0].getElementsByClassName( 'masthead_user' )[0].getElementsByTagName( 'a' ),
	mantleSkin = document.getElementById( 'mantle_skin' );

for ( i = 0; i < userLinks.length; i++ ) {
	if ( userLinks[i].textContent.indexOf( 'Inbox' ) !== -1 && userLinks[ i ].textContent.indexOf( '(' ) !== -1 ) {
		unreadPMs = parseInt( userLinks[ i ].textContent.split( ' ', 2 )[1].replace( /\(([\d]*)\)/, '$1' ) );

		if ( unreadPMs > 1 ) {
			plural  = 's';
			pronoun = 'them';
		} else {
			plural  = '';
			pronoun = 'it';
		}
	}
}

if ( unreadPMs > 0 ) {
	notifContent           = document.createElement( 'span' );
	notifContent.id        = 'pm-notification-content';
	notifContent.innerHTML = 'You have ' + unreadPMs + ' unread private message' + plural + '. Please <a href="/pm/" style="text-decoration: underline;">read ' + pronoun + '</a> at your earliest convenience.';

	alertDismiss           = document.createElement( 'div' );
	alertDismiss.className = 'site_alert_dismiss';

	dismissIcon           = document.createElement( 'a' );
	dismissIcon.className = 'icon icon-remove';
	dismissIcon.onclick   = function() {
		unreadPMNote.parentNode.removeChild( unreadPMNote );
	}
	dismissIcon.style     = 'cursor: pointer;';
	dismissIcon.innerHTML = 'hide';

	alertDismiss.appendChild( dismissIcon );

	unreadPMNote    = document.createElement( 'div' );
	unreadPMNote.id = 'site_alert';
	unreadPMNote.className = 'site_alert_severe new-pm-notification';

	unreadPMNote.appendChild( notifContent );
	unreadPMNote.appendChild( alertDismiss );

	mantleSkin.parentNode.insertBefore(unreadPMNote, mantleSkin);
}
