// ==UserScript==
// @name        GameFAQs "Takato" Board Information Layout
// @namespace   OTACON120
// @author      OTACON120
// @version     1.0.2
// @description Rearrange "Board Information" sidebar on Board List
// @updateURL   http://userscripts.org/scripts/source/455269.meta.js
// @downloadURL http://userscripts.org/scripts/source/455269.user.js
// @website     http://otacon120.com/scripts/takato-board-information-layout
// @include     http://www.gamefaqs.com/boards
// @match       http://www.gamefaqs.com/boards
// @grant       GM_addStyle
// ==/UserScript==

/**
 * Get specified CSS property value
 * @param  {node}   el        HTML Element from which to grab CSS
 * @param  {string} styleProp CSS property to grab
 * @return {string}           Value of CSS property
 */
function getStyle(el, styleProp) {
	return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
}

var i, boardUtils, announcementsTbody, firstLink, onlineUsers,
	announcements     = [],
	announcementsTbl  = document.createElement( 'table' ),
	userLinkContain   = document.createElement( 'span' ),
	boardUtilsSection = document.createElement( 'p' );
	boardUtilsList    = document.createElement( 'ul' ),
	v12Style        = document.head.querySelector( 'link[href^="/css_wide/v12"]' ), // Check if using v12 style
	biSidebar         = document.getElementById( 'content' ).getElementsByClassName( 'span4' )[0],
	boardInfo         = {
		head:         biSidebar.getElementsByClassName( 'head' )[0],
		body:         biSidebar.getElementsByClassName( 'body' )[0]
	},
	boardInfo.bodySections = boardInfo.body.getElementsByTagName( 'p' ),
	userLink          = boardInfo.bodySections[0].getElementsByTagName( 'a' )[0] || false,
	acctLvl           = userLink ? boardInfo.bodySections[0].textContent.split( 'level ' )[1].split( ' ' )[0] : false,
	pollReq           = new XMLHttpRequest();

// Script-specific CSS
GM_addStyle('\
#content .main_content .span4 .head {\
	position: relative;\
}\
\
#o120-acct-info {\
	position: ' + ( v12Style ? 'absolute' : 'relative' ) + ';\
	' + ( v12Style ? 'right:' : 'left:' ) + ' 10px;\
	bottom: ' + ( v12Style ? '6' : '2' ) + 'px;\
}\
\
#o120-utils-section {\
	text-align: center;\
	margin: 0;\
	margin-bottom: 5px;\
}\
	.container #o120-board-utils {\
		list-style: none;\
		margin: 0;\
		padding: 0;\
	}\
	\
		#o120-board-utils .menu-item {\
			display: inline;\
			font-size: .' + ( v12Style ? '8' : '9' ) + 'em;\
		}\
\
			#o120-board-utils .menu-item + .menu-item:before {\
				content: "|";\
				padding: 5px;\
			}\
\
#o120-anncmts {\
	margin-bottom: ' + getStyle( biSidebar.getElementsByTagName( 'p' )[0], 'margin-bottom' ) + ';\
}\
	#o120-anncmts .tboard {\
		font-size: .8em;\
	}\
\
	#o120-anncmts .tboard,\
	#o120-anncmts .lastpost {\
		text-align: center;\
		vertical-align: middle;\
	}');

/**
 * Remove "You are logged in as[...]" and place account information/level in sidebar header
 */
if ( userLink ) {
	userLinkContain.id = 'o120-acct-info';
	userLinkContain.appendChild( userLink );
	userLinkContain.appendChild( document.createTextNode( ' (' + acctLvl + ')' ) );
	boardInfo.head.appendChild( userLinkContain );
}

boardInfo.bodySections[0].parentNode.removeChild( boardInfo.bodySections[0] );


/**
 * Insert Board Utilities (Board Managers, Active Posts, etc.)
 */
if ( userLink ) {
	boardUtilsSection.id = 'o120-utils-section';
	boardUtilsList.id = 'o120-board-utils';

	boardUtils = [
		{ // Board Manager
			url:  '/boards/bman.php',
			text: 'Board Manager'
		},
		{ // Active Posts
			url:  '/boards/myposts.php',
			text: 'Active Posts'
		},
		{ // Tracked Topics
			url:  '/boards/tracked',
			text: 'Tracked Topics'
		},
		{ // Friend Lists
			url:  '/boards/friends',
			text: 'Friend Lists'
		}
	];

	boardUtils.forEach( utilLinks );
}

function utilLinks( el ) { // Function to traverse through boardUtils array and create links in ul
	if ( el.text !== 'Active Posts' || ( el.text === 'Active Posts' && acctLvl >= 15 ) ) {
		var linkItem = document.createElement( 'li' );

		linkItem.className = 'menu-item';
		linkItem.innerHTML = '<a href="' + el.url + '">' + el.text + '</a>';

		boardUtilsList.appendChild( linkItem );
	}
}

boardUtilsSection.appendChild( boardUtilsList )

boardInfo.bodySections[0].parentNode.insertBefore( boardUtilsSection, boardInfo.bodySections[0].nextElementSibling );


/**
 * Convert Announcements to "topics" format and remove "current users"
 */
announcementsTbl.id        = 'o120-anncmts';
announcementsTbl.className = 'topics';
announcementsTbl.innerHTML = '<thead><tr><th colspan="3">Announcements</th></tr></thead><tbody></tbody>';

announcementsTbody = announcementsTbl.getElementsByTagName( 'tbody' )[0];

checkForTopics:
for ( i = 2; i < boardInfo.bodySections.length; i++ ) {
	firstLink = boardInfo.bodySections[ i ].getElementsByTagName( 'a' )[0] || false;

	if ( firstLink ) {
		switch( true ) {
			case firstLink.href.indexOf( '/6-message-board-announcements/' ) !== -1:
				announcements[ i - 2 ] = {};
				announcements[ i - 2 ].tboard = 'Announcement';
				break;

			case firstLink.href.indexOf( '/11-sballin/' ) !== -1:
				announcements[ i - 2 ] = {};
				announcements[ i - 2 ].tboard = 'Admin Blog';
				break;

			case firstLink.href.indexOf( '/20-gamefaqs-competitions/' ) !== -1:
				announcements[ i - 2 ] = {};
				announcements[ i - 2 ].tboard = 'Competition';
				break;
		}

		announcements[ i - 2 ].url        = firstLink.href;
		announcements[ i - 2 ].text       = firstLink.innerHTML;
		announcements[ i - 2 ].date       = firstLink.parentNode.innerHTML.split( '</a> (' )[1]
				.split( ').' )[0];
		announcements[ i - 2 ].rmvSection = boardInfo.bodySections[ i ];
	} else if ( boardInfo.bodySections[ i ].textContent.indexOf( 'There are approximately ' ) !== -1 ) {
			if ( boardInfo.bodySections[ i + 1 ] ) {
				boardInfo.bodySections[ i + 1 ].parentNode.removeChild( boardInfo.bodySections[ i + 1 ] );
			}

			onlineUsers = boardInfo.bodySections[ i ].firstElementChild;

			boardInfo.bodySections[ i ].innerHTML = 'Online Users: ';
			boardInfo.bodySections[ i ].appendChild( onlineUsers );
			boardInfo.bodySections[ i ].parentNode.insertBefore( boardInfo.bodySections[ i ], boardInfo.bodySections[ 1 ] );
	}
}

if ( announcements.length > 0 ) {
	announcements.forEach( createAnncmtTopicList );

	boardInfo.bodySections[1].parentNode.insertBefore( announcementsTbl, boardInfo.bodySections[2].nextElementSibling );
}

function createAnncmtTopicList( el ) {
	var topicRow = document.createElement( 'tr' );

	topicRow.innerHTML = '<td class="topic"><a href="' + el.url + '">' + el.text + '</a></td><td class="tboard">' + el.tboard + '</td><td class="lastpost">' + el.date + '</td>';

	el.rmvSection.parentNode.removeChild( el.rmvSection );

	announcementsTbody.appendChild( topicRow );
}


/**
 * Get poll and place in sidebar
 */
pollReq.open( 'get', '/' );
pollReq.onload = function() {
	var poll        = this.responseText,
		pollContain = document.createElement( 'div' );

	pollContain.style.display = 'none';

	pollContain.innerHTML = poll;

	document.body.appendChild( pollContain );
	poll = document.getElementById( 'potd' );
	document.body.removeChild( pollContain );

	boardInfo.body.appendChild( poll );
}
pollReq.send();