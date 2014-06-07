// ==UserScript==
// @name        YouTube video watch page: 720p support
// @namespace   jacobbrett
// @description Allows user to select a 720p view from within a YouTube video watch page
// @include     https://www.youtube.com/watch?*
// @include     http://www.youtube.com/watch?*
// @version     0.2
// ==/UserScript==

function initialise() {
	var customButtons = [	// Define custom button sizes
		{
			btnTitle:	'720p',
			btnSize:	'hd720',
			vidSize:	'large'
		},
		/*{
			btnTitle:	'1080p',
			btnSize:	'hd1080',
			vidSize:	'huge'
		}*/
	]

	createButtons( customButtons );	// Create custom buttons
}

function createButtons( buttonArray ) {
	var playerFormat, buttonPosition;
	var attachButton = document.getElementsByClassName( 'html5-fullscreen-button' )[0];	// Check for HTML5 controls (HTML5 buttons will be appended to this element)

	if ( attachButton ) {
		playerFormat = 'HTML5';
		for ( var i = 0; i < buttonArray.length; i++ ) {	// Create custom buttons (HTML5 player)
			createButton( buttonArray[i].btnTitle, buttonArray[i].btnSize, buttonArray[i].vidSize, playerFormat, buttonPosition );
		}
	} else {
		for ( var i = 0; i < buttonArray.length; i++ ) {	// Create custom buttons (non-HTML5 player). Either single button or multiple-button switch toggle should be created
			if ( buttonArray.length == 1 ) {
				buttonPosition = 'single';
			} else if ( i == 0 ) {
				buttonPosition = 'start';
			} else if ( i == buttonArray.length ) {
				buttonPosition = 'end';
			} else {
				buttonPosition = '';
			}
			createButton( buttonArray[i].btnTitle, buttonArray[i].btnSize, buttonArray[i].vidSize, playerFormat, buttonPosition );
		}
	}

	function createButton( btnTitle, btnSize, vidSize, plrFormat, btnPosition ) {
		var btnHtml, btnCss;
		if ( plrFormat == 'HTML5' ) {	// If HTML5 player
			btnHtml = '<button onclick="resizePlayer( \'' + btnSize + '\', \'' + vidSize + '\' );return false;" title="' + btnTitle + ' player" type="button" class="html5-' + btnSize + '-player-button html5-control-right hid yt-uix-button yt-uix-button-player yt-uix-tooltip yt-uix-button-empty" tabindex="1000"  role="button" aria-label="' + btnTitle + ' player"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-html5" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="' + btnTitle + ' player"><span class="yt-valign-trick"></span></span></button>';
			btnCss = 'body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button, body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button:focus, body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button:hover { background: none repeat scroll 0 0 #141414; box-shadow: 0 -5px 5px #000000 inset; cursor: default; } .html5-' + btnSize + '-player-button { width: 30px; display:block; } body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button img, body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button:focus img, body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button:hover img { opacity: 0.65; } .html5-' + btnSize + '-player-button .yt-uix-button-icon, body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button:focus .yt-uix-button-icon, body[data-player-size="' + btnSize + '"] .html5-' + btnSize + '-player-button:hover .yt-uix-button-icon { background:no-repeat url("//s.ytimg.com/yts/imgbin/player-dark-vflCDBE54.png") -89px -16px;height:25px;width:30px; }';

			attachButton.insertAdjacentHTML( 'afterend', btnHtml );	// Insert custom button

			GM_addStyle( btnCss );	// Insert custom button CSS rules
		} else {	// If non-HTML5 player
			if ( btnPosition == 'single' ) {
				btnHtml = '<button onclick="resizePlayer( \'' + btnSize + '\', \'' + vidSize + '\' );return false;" title="' + btnTitle + ' player" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-' + btnSize + '" role="button"><span class="yt-uix-button-content">' + btnTitle + '</span></button>';

				document.getElementById( 'watch-actions' ).innerHTML += btnHtml;	// Insert custom button
			} else {
				if ( btnPosition == 'start' ) {
					document.getElementById( 'watch-actions' ).innerHTML += '<span id="watch-player-size" class="yt-uix-button-group" data-button-toggle-group="optional"></span>';	// Insert switch toggle container
				}
				btnHtml = '<button onclick="resizePlayer( \'' + btnSize + '\', \'' + vidSize + '\' );return false;" title="' + btnTitle + ' player" type="button" class="' + btnPosition + ' yt-uix-tooltip-reverse  yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-' + btnSize + '" data-button-toggle="true" role="button"><span class="yt-uix-button-content">' + btnTitle + '</span></button>';

				document.getElementById( 'watch-player-size' ).innerHTML += btnHtml;	// Insert custom button
			}
		}

		if ( vidSize == 'huge' ) GM_addStyle( '#watch-video.huge { width: 1920px; } #watch-video.huge #watch-player { height: 1110px; margin: 0 auto; width: 1920px; } .watch-autohide #watch-video.huge #watch-player { height: 1083px; } .watch-multicamera #watch-video.huge #watch-player { height: 1190px; } .watch-autohide.watch-multicamera #watch-video.huge #watch-player { height: 1163px; } #watch-video.huge #watch-player-rental-still-frame { height: 1080px; margin: 0 auto 30px; width: 1920px; } #watch-video.huge #watch-player-rental-still-img { height: 1080px; width: 1440px; } #watch-video.huge #watch-branded-actions { margin: 7px auto 0; width: 854px; } #watch-video.huge #watch-branded-actions img.marquee-wide { display: block; } #watch-video.huge #watch-branded-actions img.marquee-normal { display: none; }' );	// Insert custom "huge" (1080p) CSS rules
	}
}

unsafeWindow.resizePlayer = resizePlayer;

function resizePlayer( btnSize, vidSize ) {	// If custom button is pressed:
	var page = document.getElementById( 'page' );
	var watchVideo = document.getElementById( 'watch-video' );

	document.body.setAttribute( 'data-player-size', btnSize );	// Let page know player size

	// TODO: non-HTML5: set button class: yt-uix-button-toggled

	page.className += ' watch-wide';	// Set wide-player mode

	document.getElementById( 'watch-video' ).setAttribute( 'class', vidSize ); // Set player size
}

initialise();