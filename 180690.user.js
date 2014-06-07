// ==UserScript==
// @name           GameFAQs Account-specific Site Colors
// @namespace      OTACON120
// @version        1.0
// @description    Changes site color based on which account is currently logged in
// @updateURL      http://userscripts.org/scripts/source/180690.meta.js
// @downloadURL    http://userscripts.org/scripts/source/180690.user.js
// @website        http://otacon120.com/scripts/account-specific-site-colors/
// @include        http://*.gamefaqs.com/*
// @match          http://*.gamefaqs.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

/**
 *  Fallback for Chrome which doesn't support GM_setValue, etc.
 */
if ( !this.GM_getValue || ( this.GM_getValue.toString && this.GM_getValue.toString().indexOf('not supported') !== -1 ) ) {
	this.GM_getValue = function(key, def) {
		return localStorage[key] || def;
	};

	this.GM_setValue = function(key, value) {
		return localStorage[key] = value;
	};
}

/*\
|*|
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies     = {
		getItem: function (sKey) {
			return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
		},
		setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
			var sExpires = "";
			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
					case String:
					sExpires = "; expires=" + vEnd;
					break;
					case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
				}
			}
			document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
			return true;
		},


		removeItem: function (sKey, sPath, sDomain) {
			if (!sKey || !this.hasItem(sKey)) { return false; }
			document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
			return true;
		},
		hasItem: function (sKey) {
			return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
		},
		keys: function () {
			var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
			for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
				return aKeys;
		}
	},
	currAcct       = document.getElementsByClassName( 'masthead_user' )[0].getElementsByClassName( 'welcome' )[0].textContent.trim() || false,
	cookieColor    = docCookies.getItem( 'css_color' ) || 'blue',
	v13Style       = document.head.querySelector( 'link[href^="/css/v13"]' ),
	acctsColors    = JSON.parse( GM_getValue( 'acctsColors', JSON.stringify( { colors: [], accts: {} } ) ) ),
	siteColors     = document.getElementsByClassName( 'footer_color_subnav_item' ),
	colorPageLinks = ( window.location.pathname === '/features/change_color.html' ? document.getElementsByClassName( 'main_content' )[0].getElementsByClassName( 'span8' )[0].getElementsByTagName( 'li' ) : '' ),
	thisColor      = [],
	i, thisLink, bodyClass, bodyClassColor, newBodyClassColor;

if ( currAcct && v13Style ) {
	for ( i = 0; i < siteColors.length; i++ ) {
		thisLink        = siteColors[ i ].getElementsByTagName( 'a' )[0],
		currColorNum    = acctsColors.colors.length;

		thisColor.push( thisLink.href.replace( /(http:\/\/(www|beta)\.gamefaqs\.com)?\/user\/change_color\?site_color=/, '' ) );

		if ( acctsColors.colors.indexOf( thisColor[ i ] ) === -1 ) {
			acctsColors.colors.push( thisColor[ i ] );
		}

		if ( acctsColors.colors.length > currColorNum )
			GM_setValue( 'acctsColors', JSON.stringify( acctsColors ) );

		thisLink.onclick = function() {
			saveColor( thisColor[ i ] );
		}

		if ( window.location.pathname === '/features/change_color.html' ) {
			thisLink = colorPageLinks[ i ].getElementsByTagName( 'a' )[0];

			thisLink.onclick = function() {
				saveColor( thisColor[ i ] );
			}
		}
	}

	function saveColor( color ) {
		acctsColors.accts[ currAcct ] = color;

		GM_setValue( 'acctsColors', JSON.stringify( acctsColors ) );
	}

	if ( ! acctsColors.accts.hasOwnProperty( currAcct )  ) {
		acctsColors.accts[ currAcct ] = cookieColor;
		GM_setValue( 'acctsColors', JSON.stringify( acctsColors ) );
	}

	if ( cookieColor !== acctsColors.accts[ currAcct ] ) {
		if ( acctsColors.accts[ currAcct ] !== 'blue' ) {
			v13Style.href = v13Style.href.replace( /v13[a-z\-]*\./, 'v13-' + acctsColors.accts[ currAcct ] + '.' );
			docCookies.setItem( 'css_color', acctsColors.accts[ currAcct ], 2592000, '/', '.gamefaqs.com' );
		} else {
			v13Style.href = v13Style.href.replace( /v13[a-z\-]*\./, 'v13.' );
			docCookies.removeItem( 'css_color', '/', '.gamefaqs.com' );
		}

		bodyClass = document.body.className.trim().split( ' ' );

		for ( i = 0; i < acctsColors.colors.length; i++ ) {
				bodyClassColorIndex = bodyClass.indexOf( acctsColors.colors[ i ] );

			if ( bodyClassColorIndex !== -1 ) {
				newBodyClassColor = ( acctsColors.accts[ currAcct ] === 'blue' ? '' : acctsColors.accts[ currAcct ] );

				document.body.className = document.body.className.replace ( bodyClass[ bodyClassColorIndex ], newBodyClassColor ).trim();
				break;
			}
		}

		if ( acctsColors.accts[ currAcct ] !== 'blue' && ! newBodyClassColor )
			document.body.className += ' ' + acctsColors.accts[ currAcct ];
			document.body.className = document.body.className.trim();
	}
}