// ==UserScript==
// @name           GameFAQs "New Poll" Link in Topic List
// @namespace      OTACON120
// @author         OTACON120
// @version        1.1
// @description    Adds "New Poll" link on topic list pages.
// @updateURL      http://userscripts.org/scripts/source/139588.meta.js
// @downloadURL    http://userscripts.org/scripts/source/139588.user.js
// @website        http://otacon120.com/scripts/new-poll-link-in-topic-list/
// @include        http://www.gamefaqs.com/boards/*-*
// @match          http://www.gamefaqs.com/boards/*-*
// @grant          none
// ==/UserScript==
var boardNav = {
		top:    document.getElementsByClassName( 'board_nav' )[0],
		bottom: document.getElementsByClassName( 'board_nav' )[1]
	},
	userLinks = {
		top:    Array.prototype.slice.call( boardNav.top.getElementsByClassName( 'user' )[0].getElementsByTagName( 'li' ) ),
		bottom: Array.prototype.slice.call( boardNav.bottom.getElementsByClassName( 'user' )[0].getElementsByTagName( 'li' ) )
	},
	i, newTopicLinkContain, newTopicLink, newPollLinkContain, newPollLink, newPollLinkIcon;

userLinks.top.some( findLink );
addLink( userLinks.top[ i ] );

userLinks.bottom.some( findLink );
addLink( userLinks.bottom[ i ] );

function findLink( element, index, array ) {
	if ( element.textContent.trim() === 'New Topic' ) {
		i = index;
		return true;
	}
}

function addLink( location ) {
	newTopicLinkContain = location;
	newTopicLink        = newTopicLinkContain.getElementsByTagName( 'a' )[0];

	newPollLinkContain  = newTopicLinkContain.cloneNode( true );

	newPollLink             = newPollLinkContain.getElementsByTagName( 'a' )[0];
	newPollLink.href        += '&poll=1';
	newPollLink.textContent = newPollLink.textContent.replace( 'Topic', 'Poll' );
	newPollLink.insertBefore( newTopicLink.getElementsByClassName( 'icon' )[0].cloneNode( false ), newPollLink.firstChild );

	newPollLinkIcon           = newPollLink.getElementsByClassName( 'icon' )[0];
	newPollLinkIcon.className = newPollLinkIcon.className.replace( 'pencil', 'bar-chart' );

	newTopicLinkContain.parentNode.insertBefore(newPollLinkContain, newTopicLinkContain.nextSibling);
}