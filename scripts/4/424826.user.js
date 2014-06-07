// ==UserScript==
// @name        GameFAQs Post and Track
// @namespace   OTACON120
// @author      OTACON120
// @version     1.0
// @description Enables option to automatically track a topic when you post a new message
// @updateURL   http://userscripts.org/scripts/source/424826.meta.js
// @downloadURL http://userscripts.org/scripts/source/424826.user.js
// @website     http://otacon120.com/scripts/post-and-track
// @include     http://www.gamefaqs.com/boards/*-*
// @include     http://www.gamefaqs.com/boards/post.php?*
// @match       http://www.gamefaqs.com/boards/*-*
// @match       http://www.gamefaqs.com/boards/post.php?*
// @grant       GM_addStyle
// ==/UserScript==

/**
 * Fallback for Chrome which doesn't support GM_addStyle
 */
if ( !this.GM_addStyle ) {
	this.GM_addStyle = function(css) {
		var newStyle = document.createElement('style');

		newStyle.type        = 'text/css';
		newStyle.textContent = css;

		document.head.appendChild(newStyle);
	}
}

/**
 * Get specified CSS property value
 * @param  {node}   el        HTML Element from which to grab CSS
 * @param  {string} styleProp CSS property to grab
 * @return {string}           Value of CSS property
 */
function getStyle(el, styleProp) {
	return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
}

/**
 * Get Board/Topic IDs on Post New Message page
 * @param  {string} name    Query string attribute to return
 * @return {string|boolean} Returns query string value if it exists, else returns false
 */
function getQueryValue( name ) {
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

if ( document.getElementsByName( 'messagetext' ).length > 0 ) {
	var userOS, userBrowser, userBrowserVersion, trackedStatusReq, trackedStatus,
		trackBtn      = document.contains( document.getElementsByClassName( 'board_nav' )[0] ) ? document.getElementsByClassName( 'board_nav' )[0].getElementsByClassName( 'icon-flag' )[0].parentNode : false,
		spacer        = document.createTextNode( ' ' ),
		postTrackBtn  = document.createElement( 'button' ),
		postForm      = document.getElementById('content').querySelector('.span8 > form .pod .body .details, .span8 > .body form .pod .body .details'),
		postBtn       = postForm.querySelector( 'input[type="submit"]' ),
		trackLink     = document.getElementsByName( 'qp' ).length > 0 ? trackBtn.href : window.location.protocol + '//' + window.location.hostname + '/boards/' + getQueryValue( 'board' ) + '-/' + getQueryValue( 'topic' ) + '?action=tracktopic',
		BrowserDetect = {
			init: function () {
				this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				this.version = this.searchVersion(navigator.userAgent)
					|| this.searchVersion(navigator.appVersion)
					|| "an unknown version";
				this.OS = this.searchString(this.dataOS) || "an unknown OS";
			},
			searchString: function (data) {
				var i,
					dataString,
					dataString;
				for (i = 0; i < data.length; i++)	{
					dataString = data[i].string;
					dataProp = data[i].prop;
					this.versionSearchString = data[i].versionSearch || data[i].identity;
					if (dataString) {
						if (dataString.indexOf(data[i].subString) != -1)
							return data[i].identity;
					}
					else if (dataProp)
						return data[i].identity;
				}
			},
			searchVersion: function (dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index == -1) return;
				return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
			},
			dataBrowser: [
				{
					string: navigator.userAgent,
					subString: "Waterfox",
					identity: "Firefox"
				},
				{
					string: navigator.userAgent,
					subString: "Firefox",
					identity: "Firefox"
				},
				{
					string: navigator.userAgent,
					subString: "Chrome",
					identity: "Chrome"
				}
			],
			dataOS : [
				{
					string: navigator.platform,
					subString: "Win",
					identity: "Windows"
				},
				{
					string: navigator.platform,
					subString: "Mac",
					identity: "Mac"
				},
				{
					string: navigator.platform,
					subString: "Linux",
					identity: "Linux"
				}
			]
		};

	/**
	 * Get tracked status of topic if not viewing message list
	 */
	if ( ! trackBtn ) {
		trackedStatusReq        = new XMLHttpRequest();
		trackedStatusReq.onload = function() {
			if ( this.status === 200 ) {
				var responseContain = document.createElement( 'div' );

				responseContain.style.display = 'none';
				responseContain.innerHTML     = this.responseText;
				document.body.appendChild( responseContain );

				trackBtn = responseContain.getElementsByClassName( 'board_nav' )[0].getElementsByClassName( 'icon-flag' )[0].parentNode;

				if ( trackBtn.href.indexOf( '?action=tracktopic' ) !== -1 ) {
					trackedStatus = false;
				} else if ( trackBtn.href.indexOf( '?action=stoptrack' ) ) {
					trackedStatus = true;
				}

				trackBtn = false;
			}
		};
		trackedStatusReq.open( 'get', trackLink.replace( '?action=tracktopic', '' ), false );
		trackedStatusReq.send();
	}

	if ( ( trackBtn && trackBtn.textContent.trim() === 'Track Topic' ) || ( ! trackBtn && ! trackedStatus ) ) {
		BrowserDetect.init();

		userOS				= BrowserDetect.OS;
		userBrowser			= BrowserDetect.browser;
		userBrowserVersion	= BrowserDetect.version + (BrowserDetect.version.toString().indexOf('.') === -1 ? '.0' : '');

		if (userOS === 'Windows' || userOS === 'Linux') {
			switch (userBrowser) {
				case 'Firefox':
					akHotkey = 'Alt + Shift + ';
					break;

				case 'Chrome':
					akHotkey = 'Alt + ';
					break;
			}
		}

		if (userOS === 'Mac') {
			switch (userBrowser) {
				case 'Firefox':
					akHotkey = !versionNewer(userBrowserVersion, '13.0') ? 'Ctrl + ' : 'Ctrl + Alt + ';
					break;

				case 'Chrome':
					akHotkey = 'Ctrl + Alt + ';
			}
		}

		GM_addStyle('\
		#o120-post-track {\
			line-height: ' + getStyle( postBtn, 'line-height' ) + ';\
		}');

		postTrackBtn.setAttribute( 'accesskey', 's' );
		postTrackBtn.className  = 'btn btn_primary';
		postTrackBtn.id         = 'o120-post-track';
		postTrackBtn.type       = 'submit';
		postTrackBtn.name       = 'post';
		postTrackBtn.value      = 'Post without Preview';
		postTrackBtn.title      = 'Post Message, Track Topic [' + akHotkey + 'S]';
		postTrackBtn.innerHTML  = '<i class="icon icon-flag"></i> Post Message, Track Topic';
		postTrackBtn.onclick    = function() {
			var startTrackReq = new XMLHttpRequest();

			startTrackReq.onload = function() {
				if ( this.status === 200 ) {
					postTrackBtn.onclick = '';
					postTrackBtn.click();
				}
			}
			startTrackReq.open( 'get', trackLink, false );
			startTrackReq.send();
			return false;
		}

		postForm.insertBefore( postTrackBtn, postBtn );
		postForm.insertBefore( spacer, postBtn );
	}
}