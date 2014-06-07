// ==UserScript==
// @name        Fluid Gmail Growl & Dock Badge
// @namespace   http://craveytrain.com
// @description Gmail Growl Notification Dock Badge for Fluid
// @include     http://mail.google.com/*
// @include     https://mail.google.com/*
// @author      Mike Cravey
// ==/UserScript==

( function( fluid, undefined ) {
	if ( !fluid ) return;

	// Selectors: probably change often
	var messageList = 'table.F tr';
	var subjectSelector = 'td[role="link"] span';
	var authorSelector = 'span[email]';
	var previewSelector ='td[role="link"] .y2';

	var queue = {}, d;

	var pub = function( topic, args ) {
		if ( queue[ topic ] ) {
			queue[ topic ].forEach( function( callback, i, arr ) {
				callback.apply( this, args || [] );
			} );
		}
	};

	var sub = function( topic, callback ) {
		if ( !queue[ topic ] ) queue[ topic ] = [];

		queue[ topic ].push( callback );
		return [ topic, callback ];
	};

	var unsub = function( handle ) {
		var topic = handle[ 0 ];
		if ( queue[ topic ] ) {
			queue[ topic ].forEach( function( callback, i, err ) {
				if ( callback == handle[ 1 ] ) queue[ topic ].splice( i, 1 );
			} );
		}
	};

	var docReady = function() {
		if ( document.readyState === 'complete' ) {
			findDoc();
		} else {
			setTimeout( docReady, 100 );
		}
	};

	var findDoc = function() {
		var canvas = document.getElementById( 'canvas_frame' );

		if ( canvas ) {
			d = canvas.contentDocument;

			pub( 'canvasLoaded' );
		} else {
			setTimeout( findDoc, 100 );
		}
	};


	( function() {
		var inbox;

		var findInbox = function() {
			var anchors = d.getElementsByTagName( 'a' );

			for ( var i = 0; i < anchors.length; i++ ){
				if ( anchors[ i ].textContent.indexOf( 'Inbox' ) > -1 ) {
					inbox = anchors[ i ];
					break;
				}
			}

			if ( inbox ) getCount();

			setTimeout( findInbox, 1000 );
		};

		var getCount = function() {
			var txt = inbox.textContent;
			var matches = txt.match(/\((\d+)\)/);
			var count = matches ? matches[ 1 ] : 0;

			pub( 'unreadCount', [ count ] );
		};

		sub( 'canvasLoaded', findInbox );
	}() );

	// Show Badge
	( function() {
		var oldCount = 0;

		var showBadge = function( unreadCount ) {
			if ( unreadCount === oldCount ) return;

			fluid.dockBadge = unreadCount || '';
			oldCount = unreadCount;
		};

		sub( 'unreadCount', showBadge );
	}() );

	// Growl new messages
	( function() {
		var alreadySeen;

		var getMessages = function( unreadCount ) {
			var messages = d.querySelectorAll( messageList ),
				unread = unreadCount ? Array.prototype.slice.apply( messages, [ 0, unreadCount ] ) : [] ;

			if ( !alreadySeen ) {
				firstRun( unread );
			} else {
				findNewMessages( unread );
			}
		};

		var firstRun = function( unread ) {
			alreadySeen = [];

			unread.forEach( function( msg ) {
				alreadySeen.push( msg );
			} );
		};

		var findNewMessages = function( unread ) {
			unread.forEach( function( msg ) {
				if ( alreadySeen.indexOf( msg ) === -1 ) {
					alreadySeen.push( msg );
					growlMessage( msg );
				}
			} );
		};

		var growlMessage = function( message ) {
			var subject = message.querySelector( subjectSelector ).textContent;
			var author = message.querySelector( authorSelector ).textContent;
			var preview = message.querySelectorAll( previewSelector )[ 0 ].textContent.substr( 3 );

			fluid.showGrowlNotification( {
				title: subject,
				description: 'from: ' + author + '\n' + preview
			} );
		};

		sub( 'unreadCount', getMessages );
	}() );

	docReady();

}( window.fluid ) );