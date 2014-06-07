// ==UserScript==
// @name            Reddit - Modmail hide threads
// @namespace       http://userscripts.org
// @author          gavin19
// @description     Clean up modmail
// @match           http://*.reddit.com/message/moderator
// @match			https://*.reddit.com/message/moderator
// @include			http://*.reddit.com/message/moderator
// @include			https://*.reddit.com/message/moderator
// @match           http://*.reddit.com/message/moderator*
// @match			https://*.reddit.com/message/moderator*
// @include			http://*.reddit.com/message/moderator*
// @include			https://*.reddit.com/message/moderator*
// @match           http://*.reddit.com/message/moderator/*
// @match			https://*.reddit.com/message/moderator/*
// @include			http://*.reddit.com/message/moderator/*
// @include			https://*.reddit.com/message/moderator/*
// @version         1.0
// ==/UserScript==
(function () {
	var hideModThreads = {
		checkThreads: function ( threads ) {
			var i, curr, nodes, j, lenj,
				mailThreads = threads || document.querySelectorAll( '.message-parent' ),
				hiddenModmail = JSON.parse( localStorage.getItem( 'hiddenModmail' ) ) || [];
			for ( i = 0, len = mailThreads.length; i < len; i += 1 ) {
				curr = mailThreads[i].getAttribute('data-fullname');
				if ( hiddenModmail.indexOf( curr ) !== -1 ) {
					nodes = mailThreads[i].querySelectorAll( '.subject ~ *' );
					for ( j = 0, lenj = nodes.length; j < lenj; j += 1) {
						nodes[j].setAttribute( 'style', 'display:none' );
					}
					hideModThreads.addLinks( 'show', curr );
					mailThreads[i].classList.add( 'reduced' );
				} else {
					hideModThreads.addLinks( 'hide', curr );
				}
			}
		},
		addHandler: function () {
			var i, len,
				id = this.parentNode.parentNode.getAttribute( 'data-fullname' ),
				node = this.parentNode.parentNode.querySelectorAll( '.subject ~ *' ),
				hiddenModmail = JSON.parse( localStorage.getItem( 'hiddenModmail' ) ) || [];
			if ( this.textContent.match( 'show' ) ) {
				hiddenModmail.splice( hiddenModmail.indexOf( id ), 1 );
				localStorage.setItem( 'hiddenModmail', JSON.stringify( hiddenModmail ) );
				for ( i = 0, len = node.length; i < len; i += 1) {
					node[i].setAttribute( 'style', 'display:block' );
				}
				this.parentNode.parentNode.classList.remove( 'reduced' );
				this.textContent = ' hide thread';
			} else {
				hiddenModmail.push( id );
				localStorage.setItem( 'hiddenModmail', JSON.stringify( hiddenModmail ) );
				for ( i = 0, len = node.length; i < len; i += 1) {
					node[i].setAttribute( 'style', 'display:none' );
				}
				this.parentNode.parentNode.classList.add( 'reduced' );
				this.textContent = ' show thread';
			}
		},
		addLinks: function ( state, thread ) {
			var link = document.createElement( 'a' ),
				subj = '.id-' + thread,
				target;
			link.href = 'javascript:void(0);';
			link.textContent = ' ' + state + ' thread';
			link.className += 'threadToggle';
			target = document.querySelector( subj );
			target.querySelector( '.subject' ).appendChild( link );
			link.addEventListener( 'click', hideModThreads.addHandler, false );
		},
		addStyle: function () {
			var sheet = '' + '\
			.threadToggle {\
				font-size:smaller;\
				color:#369!important;\
			}\
			.reduced {\
				margin:0 10px 0 5px;\
			}';
			style = document.createElement( 'style' );
			style.type = 'text/css';
			style.textContent = sheet;
			document.querySelector( 'head' ).appendChild( style );
		},
		init: function () {
			var t;
			document.body.addEventListener( 'DOMNodeInserted', function ( e ) {
				t = e.target;
				if ( t.localName === 'div' && t.id && t.id.indexOf( 'siteTable' ) !== -1 ) {
					hideModThreads.checkThreads( t.querySelectorAll( '.message-parent' ) );
				}
			}, true );
			hideModThreads.addStyle();
			hideModThreads.checkThreads();
		}
	};
	if ( document.body && document.querySelector( '.messages-page' ) && window.localStorage ) {
		setTimeout(function () {
			hideModThreads.init();
		}, 100);
	}
}());