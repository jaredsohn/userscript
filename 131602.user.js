// ==UserScript==
// @name           GameFAQs "Remove Friend" Button
// @namespace      OTACON120
// @author         OTACON120
// @version        1.1.1
// @description    Adds a button to allow one-click friend removal on GameFAQs friend lists
// @updateURL      http://userscripts.org/scripts/source/131602.meta.js
// @downloadURL    http://userscripts.org/scripts/source/131602.user.js
// @website        http://otacon120.com/scripts/remove-friend-button/
// @include        http://www.gamefaqs.com/boards/friends
// @include        http://www.gamefaqs.com/boards/friends?list=friends*
// @include        http://www.gamefaqs.com/boards/friends?list=requested*
// @include        http://www.gamefaqs.com/boards/friends?list=watching*
// @include        http://www.gamefaqs.com/boards/friends?list=following*
// @match          http://www.gamefaqs.com/boards/friends
// @match          http://www.gamefaqs.com/boards/friends?list=friends*
// @match          http://www.gamefaqs.com/boards/friends?list=requested*
// @match          http://www.gamefaqs.com/boards/friends?list=watching*
// @match          http://www.gamefaqs.com/boards/friends?list=following*
// @grant          GM_addStyle
// ==/UserScript==

// Fallback for Chrome's lack of GM_* support
if ( ! this.GM_addStyle || ( this.GM_addStyle.toString && this.GM_addStyle.toString().indexOf('not supported') !== -1 ) ) {
	function GM_addStyle( aCss ) {
		'use strict';
		let head = document.getElementsByTagName( 'head' )[0];
		if ( head ) {
		let style = document.createElement( 'style' );
		style.setAttribute( 'type', 'text/css' );
		style.textContent = aCss;
		head.appendChild( style );
		return style;
		}

		return null;
	}
}

function getListName( name ) {
	'use strict';
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

	var regexS = "[\\?&]" + name + "=([^&#]*)",
		regex = new RegExp( regexS ),
		results = regex.exec( window.location.search );

	if ( results === null ) {
		return false;
	} else {
		return results[1];
	}
}

var listName = ( getListName( 'list' ) ? getListName( 'list' ) : 'friends' ),
	userLists    = document.getElementsByClassName( 'users' ),
	removeFriendButton = [],
	formKey = document.getElementsByName( 'key' )[0].value,
	i, f, friendItem, friend, buttonTitle;

GM_addStyle( '\
	.remove_friend_button {\
		display: inline-block;\
	}\
\
	.remove_friend_button input {\
		background: transparent;\
		border: none;\
		color: #F00;\
		padding: 0;\
		margin: 0 0 0 5px;\
		cursor: pointer;\
		vertical-align: text-bottom;\
	}' );

for ( i = 0; i < userLists.length; i++ ) {
	friendItem = userLists[ i ].getElementsByTagName( 'li' );

	for ( f = 0; f < friendItem.length; f++ ) {
		friend = friendItem[ f ].textContent;

		switch ( listName ) {
			case 'friends':
				buttonTitle = 'Remove ' + friend + ' from Friends';
				break;

			case 'requested':
				buttonTitle = 'Remove ' + friend + ' from Acquaintances';
				break;

			case 'watching':
				buttonTitle = 'Stop watching ' + friend;
				break;

			case 'following':
				buttonTitle = 'Stop following ' + friend;
				break;
		}
		removeFriendButton[ f ] = document.createElement('form');
		removeFriendButton[ f ].method = 'post';
		removeFriendButton[ f ].action = '/boards/friends?list=' + listName + '&action=remove';
		removeFriendButton[ f ].className = 'remove_friend_button';
		removeFriendButton[ f ].innerHTML = '<input type="hidden" value="' + formKey + '" name="key" /><input type="hidden" value="' + friend + '" name="username" /><input type="submit" value="&#215;" title="' + buttonTitle + '" />';
		friendItem[ f ].appendChild( removeFriendButton[ f ] );
	}
}