// ==UserScript==
// @name           MoreManga
// @namespace      MoreManga_ChowMein
// @description    MoreManga
// @updateURL      https://userscripts.org/scripts/source/135690.meta.js
// @include        /^http://www\.(2|6|8)comic\.com/[\w]+/
// @include        http://*comicvip.com/*
// @include        http://*dm5.com/m*
// @include        http://*1kkk.com/*
// @include        http://*99comic.com/comic*
// @include        http://*99comic.com/manhua/*
// @include        http://*99manga.com/page*
// @include        http://*99manga.com/comic*
// @include        http://*99manga.com/man*
// @include        http://*cococomic.com/*
// @include        http://*99770.cc/comic*
// @include        http://*99770.cc/manhua/*
// @include        http://*99mh.com/page/*
// @include        http://*99mh.com/comic*
// @include        http://*99mh.com/manhua/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at         document-end
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @version        0.7.1.20140412
// ==/UserScript==

( function( window, jQuery ) {
var $ = jQuery;
var _unsafeWindow = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;

_unsafeWindow.MoreManga = {};
_unsafeWindow.MoreManga.version = "0.7.1.20140412";

//****************************************************************************
//  utilities object
//****************************************************************************
var MyUtils = {
	getQuerystring: function( href, name ) {
		if ( name === undefined ) {
			name = href;
			href = location.href;
		}

		var results = new RegExp( "[\\?&#]" + name + "=([^&#]*)" ).exec( href );

		if ( results ) {
			return decodeURIComponent( results[1].replace( /\+/g, " " ) );
		}
		return "";
	},

	extend: function( dest ) {
		var source;

		for ( var i = 1; i < arguments.length; ++i ) {
			source = arguments[i];
			for ( var property in source ) {
				if ( source[property] !== undefined ) {
					dest[property] = source[property];
				}
			}
		}
		return dest;
	},

	sprintf: function( str ) {
		for ( var i = 1; i < arguments.length; ++i ) {
			str = str.replace( "%s", arguments[i] );
		}
		return str;
	},

	/* https://github.com/carhartl/jquery-cookie/
		options = {
			expires: 365,
			path: '/',
			domain: 'example.com',
			secure: false,
			raw: false,
		}
	*/
	cookie: function( key, value, options ) {
		// key and at least value given, set cookie...
		if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
// #				options = $.extend({}, options);
				options = MyUtils.extend({}, options);

				if (value === null || value === undefined) {
						options.expires = -1;
				}

				if (typeof options.expires === 'number') {
						var days = options.expires, t = options.expires = new Date();
						t.setDate(t.getDate() + days);
				}

				value = String(value);

				return (document.cookie = [
						encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
						options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
						options.path ? '; path=' + options.path : '',
						options.domain ? '; domain=' + options.domain : '',
						options.secure ? '; secure' : ''
				].join(''));
		}

		// key and possibly options given, get cookie...
		options = value || {};
		var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

		var pairs = document.cookie.split('; ');
		 for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
				if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
		}
		return null;
	}
};

var MyConfig = {
	Greasemonkey: 0,
	LocalStorage: 1,

	Position_Relative: 0,
	Position_Absolute: 1,
	Position_Fixed: 2,
	Position_Static: 3,

	Place_Left: 0,
	Place_Right: 1,
	Place_Top: 2,
	Place_Bottom: 3,

	Slide_First: 0,
	Slide_Prev: 1,
	Slide_Center: 2,
	Slide_Next: 3,
	Slide_Last: 4,

	View_OriginalSize: 0,
	View_IntrinsicSize: 1,
	View_BestFit: 2,
	View_Width: 3,
	View_Height: 4,
	View_Custom:5,

	View_Custom_NoCustom: 6,
	View_Custom_MaxWidth: 7,
	View_Custom_MaxHeight: 8,
	View_Custom_FixedSize: 9,
	View_Custom_Zoom: 10,

	Split_Right: 0,
	Split_Left: 1,

	Style_Default: 0,
	Style_iPad_White: 1,
	Style_iPad_Black: 2,

	cookieUsed: false,
	storageUsed: false,
	gmUsed: false,

	cookieEnabled: navigator.cookieEnabled,

	storageEnabled: ( function() {
		try {
			localStorage.setItem( "70cecf2d4e5e444459a446b07536a03a", "MoreManga" );
			localStorage.removeItem( "70cecf2d4e5e444459a446b07536a03a" );
			return true;
		} catch( e ) {
		}

		return false;
	} )(),

	gmEnabled: ( function() {
		try {
			GM_setValue( "70cecf2d4e5e444459a446b07536a03a", true );
			var b = GM_getValue( "70cecf2d4e5e444459a446b07536a03a" );
			GM_deleteValue( "70cecf2d4e5e444459a446b07536a03a" );
			return !!b;
		} catch ( e ) {
		}

		return false;
	} )(),

	load: function( bDefault ) {
		var conf = {
			"Image-Preload-Count-Perv": 1,
			"Image-Preload-Count-Next": 3,
			"Image-Preload-AutoClean": true,

			"Image-AutoTop": true,
			"Image-AutoResize": false,
			"Image-Split-Enable": false,

			"Image-FitMode": MyConfig.View_IntrinsicSize,
			"Image-CustomMode": MyConfig.View_Custom_MaxWidth,
			"Image-MaxWidth": 1250,
			"Image-MaxHeight": 768,
			"Image-FixedSize": { w: 1024, h: 768 },
			"Image-Zoom": 50,

			"View-Overlay-Enable": false,
			"View-Overlay-BgColor": "#000",

			"History-Replace-Enable": true,

			"Request-Async-List": true,
			"Request-Async-Preload": false,
			"Request-Sync-Timeout": 120000,

			"Theme-Style": MyConfig.Style_iPad_White,
			"UI-InfoPanel-Show": true
		};

		if ( !bDefault ) {
			var g_conf = this.loadFromGlobal();
			if ( g_conf ) {
				MyUtils.extend( conf, g_conf );
			}

			var l_conf = this.loadFromLocal();
			if ( l_conf ) {
				MyUtils.extend( conf, l_conf );
			}
		}
		return conf;
	},

	loadFromGlobal: function() {
		var conf = null;

		if ( this.gmEnabled ) {
			var jconf = GM_getValue( "MoreManga-IzConfig" );

			if ( jconf ) {
				conf = JSON.parse( jconf );
				this.gmUsed = true;
			}
		}
		return conf;
	},

	loadFromLocal: function() {
		var conf = null;

		if ( this.storageEnabled ) {
			var jconf = localStorage.getItem( "MoreManga-IzConfig" );

			if ( jconf ) {
				conf = JSON.parse( jconf );
				this.storageUsed = true;
			}
		} else if ( this.cookieEnabled ) {
			var jconf = MyUtils.cookie( "MoreManga-IzConfig" );

			if ( jconf ) {
				conf = JSON.parse( jconf );
				this.cookieUsed = true;
			}
		}
		return conf;
	},

	save: function( conf ) {
		this.saveToGlobal( conf );
		this.saveToLocal( conf );
	},

	saveToGlobal: function( conf ) {
		if ( this.gmEnabled ) {
			GM_setValue( "MoreManga-IzConfig", JSON.stringify( conf ) );
			this.gmUsed= true;
		}
	},

	saveToLocal: function( conf ) {
		if ( this.storageEnabled ) {
			localStorage.setItem( "MoreManga-IzConfig", JSON.stringify( conf ) );
			this.storageUsed = true;
		} else if ( this.cookieEnabled ) {
			MyUtils.cookie( "MoreManga-IzConfig", JSON.stringify( conf ), { expires: 365, path: "/", domain: /[\w]+\.[\w]+$/.exec( window.location.hostname )[0] } );
			this.cookieUsed = true;
		}
	},

	removeGlobal: function() {
		if ( this.gmEnabled ) {
			GM_deleteValue( "MoreManga-IzConfig" );
		}

		this.gmUsed = false;
	},

	removeLocal: function() {
		if ( this.storageEnabled ) {
			localStorage.removeItem( "MoreManga-IzConfig" );
		}

		if ( this.cookieEnabled ) {
			MyUtils.cookie( "MoreManga-IzConfig", null, { path: "/", domain: /[\w]+\.[\w]+$/.exec( window.location.hostname )[0] } );
		}

		this.cookieUsed = false;
		this.storageUsed = false;
	}
};

//****************************************************************************
// jQuery plugin
//****************************************************************************
//-- Image Plugin
( function( $ ) {

var Option = {
	NoFit: 0,
	IntrinsicSize: 1,
	BestSize: 2,
	Width: 3,
	Height: 4,
	Custom:5,

	NoCustom: 6,
	MaxWidth: 7,
	MaxHeight: 8,
	FixedSize: 9,
	Zoom: 10,

	Right: 0,
	Left: 1
};

var methods = {
	fitNone: function() {
		return this.each( function() {
			var img = this, $img = $( img ), settings = $img.data( "settings" );

			if ( img.naturalWidth ) {
				$img
					.css( { width: 'auto' , height: 'auto' } )
					.trigger( "izSizeEvent.izImage", { fitMode: Option.NoFit } );
			} else {
				settings.isDelayFit = true;
			}
		} );
	},

	fitIntrinsicSize: function() {
		return this.each( function() {
			var img = this, $img = $( img ), settings = $img.data( "settings" );

			if ( img.naturalWidth ) {
				$img
					.css( { width: img.naturalWidth, height: img.naturalHeight } )
					.trigger( "izSizeEvent.izImage", { fitMode: Option.IntrinsicSize } );
			} else {
				settings.isDelayFit = true;
			}

		} );
	},

	fitBestSize: function() {
		return this.each( function() {
			var img = this, $img = $( img ), settings = $img.data( "settings" );

			if ( img.naturalWidth ) {
				$img.css( { width: 'auto', height: window.innerHeight - settings.hCorrection } );

				var isTooWide = $img.width() > window.innerWidth;
				if ( isTooWide ) {
					$img.css( { height: 'auto', width: window.innerWidth - settings.wCorrection } );

					var hasVScroll = $img.height() > window.innerHeight;
					if ( hasVScroll ) {
						$img.css( 'width', $img.width() - settings.scrollBarWidth );
					}
				}

				$img.trigger( "izSizeEvent.izImage", { fitMode: Option.BestSize } );
			} else {
				settings.isDelayFit = true;
			}

		} );
	},

	fitWidth: function() {
		return this.each( function() {
			var img = this, $img = $( img ), settings = $img.data( "settings" );

			if ( img.naturalWidth ) {
				$img.css( { height: 'auto', width: window.innerWidth - settings.wCorrection } );

				var hasVScroll = $img.height() > window.innerHeight;
				if ( hasVScroll ) {
					$img.css( 'width', $img.width() - settings.scrollBarWidth );
				}

				$img.trigger( "izSizeEvent.izImage", { fitMode: Option.Width } );
			} else {
				settings.isDelayFit = true;
			}
		} );
	},

	fitHeight: function() {
		return this.each( function() {
			var img = this, $img = $( img ), settings = $img.data( "settings" );

			if ( img.naturalWidth ) {
				$img.css( { width: 'auto', height: window.innerHeight - settings.hCorrection } );

				var hasHScroll = $img.width() > window.innerWidth;
				if ( hasHScroll ) {
					$img.css( 'height', $img.height() - settings.scrollBarWidth );
				}

				$img.trigger( "izSizeEvent.izImage", { fitMode: Option.Height } );
			} else {
				settings.isDelayFit = true;
			}
		} );
	},

	fitCustom: function( customMode ) {
		return this.each( function() {
			var img = this, $img = $( img ), settings = $img.data( "settings" );

			if ( img.naturalWidth ) {
				if ( customMode === undefined ) {
					customMode = settings.customMode;
				}

				switch ( parseInt( customMode ) ) {
					case Option.MaxWidth:
						if ( img.naturalWidth > settings.maxWidth ) {
							$img.css( { width: settings.maxWidth, height: 'auto' } );
						} else {
							$img.css( { width: 'auto', height: 'auto' } );
						}

						$img.trigger( "izSizeEvent.izImage", { fitMode: Option.Custom, customMode: Option.MaxWidth } );
						break;

					case Option.MaxHeight:
						if ( img.naturalHeight > settings.maxHeight ) {
							$img.css( { width: 'auto', height: settings.maxHeight } );
						} else {
							$img.css( { width: 'auto', height: 'auto' } );
						}

						$img.trigger( "izSizeEvent.izImage", { fitMode: Option.Custom, customMode: Option.MaxHeight } );
						break;

					case Option.FixedSize:
						$img
							.css( { width: settings.fixedSize.w, height: settings.fixedSize.h } )
							.trigger( "izSizeEvent.izImage", { fitMode: Option.Custom, customMode: Option.FixedSize } );
						break;

					case Option.Zoom:
						$img
							.css( { width: img.naturalWidth * settings.zoom / 100, height: 'auto' } )
							.trigger( "izSizeEvent.izImage", { fitMode: Option.Custom, customMode: Option.Zoom } );
						break;

					case Option.NoCustom:
					default:
						$img
							.css( { width: 'auto', height: 'auto' } )
							.trigger( "izSizeEvent.izImage", { fitMode: Option.Custom, customMode: Option.NoCustom } );
						break;
				}
			} else {
				settings.isDelayFit = true;
			}
		} );
	},

	fit: function ( fitMode ) {
		return this.each( function() {
			var $img = $( this ), settings = $img.data( "settings" );

			if ( fitMode === undefined ) {
				fitMode = settings.fitMode;
			}

			switch ( parseInt( fitMode ) ) {
				case Option.NoFit:
					methods.fitNone.call( $img );
					break;

				case Option.IntrinsicSize:
					methods.fitIntrinsicSize.call( $img );
					break;

				case Option.BestSize:
						methods.fitBestSize.call( $img );
				break;

				case Option.Width:
					methods.fitWidth.call( $img );
					break;

				case Option.Height:
					methods.fitHeight.call( $img );
					break;

				case Option.Custom:
					methods.fitCustom.call( $img );
					break;
			}
		} );
	},

	setFitMode: function( mode ) {
		return this.each( function() {
			$( this ).data( "settings" ).fitMode = parseInt( mode );
		} );
	},

	setCustomMode: function( mode, data ) {
		return this.each( function() {
			var settings = $( this ).data( "settings" );

			settings.customMode = parseInt( mode );

			if ( data ) {
				if ( data.maxWidth ) {
					settings.maxWidth = parseInt( data.maxWidth );
				}

				if ( data.maxHeight  ) {
					settings.maxHeight = parseInt( data.maxHeight );
				}

				if ( data.fixedSize ) {
					if ( data.fixedSize.w ) {
						settings.fixedSize.w = parseInt( data.fixedSize.w );
					}

					if ( data.fixedSize.h ) {
						settings.fixedSize.h = parseInt( data.fixedSize.h );
					}
				}

				if ( data.zoom ) {
					settings.zoom = parseInt( data.zoom );
				}
			}
	} );
},

	load: function( imgSrc ) {
		return this.each( function() {
			var $img = $( this );

			$img.trigger( "izBeforeLoadEvent.izImage" );
			$img.attr( "src", imgSrc );

			if ( imgSrc !== "" ) {
				methods.fit.call( $img );
			}
		} );
	},

	_getScrollBarWidth: function  () {
		var inner = document.createElement( 'div' );
		inner.style.width = "100%";
		inner.style.height = "200px";

		var outer = document.createElement('div');
		outer.style.position = "absolute";
		outer.style.top = "-500px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild(inner);

		document.body.appendChild(outer);
		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		var w2 = inner.offsetWidth;

		if (w1 == w2) w2 = outer.clientWidth;

		document.body.removeChild(outer);
		return (w1 - w2);
	},

	create: function( options ) {
		return this.each( function() {
			var settings = $.extend( {}, $.fn.izImage.defaults, options || {} );

			var $img = $( this )
				.addClass( "izImage" )
				.css( { 'max-width': 'none', 'max-height': 'none', 'min-width': 'none', 'min-height': 'none', width: 'auto' , height: 'auto' } )
				.data( "settings", settings )
				.bind( 'click', settings.click )
				.bind( 'error', function() {
					$( this ).trigger( "izErrorEvent.izImage" );
				} )
				.bind( 'load', function() {
					var settings = $( this ).data( "settings" );
					if ( settings.isDelayFit ) {
						settings.isDelayFit = false;
						methods.fit.call( $( this ) );
					}

					$( this ).trigger( "izLoadedEvent.izImage" );
				} );

			if ( settings.scrollBarWidth === null ) {
				settings.scrollBarWidth = methods._getScrollBarWidth.call( $img );
			}

			if ( this.src !== "" ) {
				methods.fit.call( $img );
			}
		} );
	}
};

$.fn.izImage = function( op ) {
	if ( methods[op] ) {
		return methods[op].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof op === 'object' || !op ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + op + ' does not exist on jQuery.izImage' );
	}
};

$.fn.izImage.version = "0.1";

$.fn.izImage.defaults = {
	hCorrection: 7, /* fx 的 img 有隱含的邊 (2*2px)? */
	wCorrection: 1,
	scrollBarWidth: null,
	click: function() { },

	fitMode: 0,
	customMode: 0,
	maxWidth: 1024,
	maxHeight: 768,
	fixedSize: { w: 1024, h: 768 },
	zoom: 50,

	// private
	isDelayFit: false
};

} )( jQuery );

//-- Image Extra Plugin
( function( $ ) {

var Option = {
	NoFit: 0,
	IntrinsicSize: 1,
	BestSize: 2,
	Width: 3,
	Height: 4,
	Custom:5,

	NoCustom: 6,
	MaxWidth: 7,
	MaxHeight: 8,
	FixedSize: 9,
	Zoom: 10,

	Right: 0,
	Left: 1
};

var methods = {
	_adjust: function( opts ) { // opts = { fitMode: 0, customMode: 0 }
		return this.each( function() {
			var $img = $( this ), settings = $img.data( "settings" );

			if ( settings.isAutoSplit && this.naturalWidth > this.naturalHeight ) {
				switch ( opts.fitMode ) {
					case Option.Width:
						$img.css( { width: ( window.innerWidth - settings.scrollBarWidth - settings.wCorrection ) * 2, height: 'auto' } );
						break;

					case Option.BestSize:
						$img.css( { width: 'auto', height: window.innerHeight - settings.hCorrection } );
					break;

					case Option.Custom:
						switch ( opts.customMode ) {
							case Option.MaxWidth:
								$img.css( 'height', 'auto' );
								if ( this.naturalWidth / 2 > settings.maxWidth ) {
									$img.css( 'width', settings.maxWidth * 2 );
								} else {
									$img.css( 'width', 'auto' );
								}
								break;

							case Option.FixedSize:
								$img.css( 'width', settings.fixedSize.w * 2 );
								break;
						}
						break;
				}

				var imgWidth = $img.width();
				if ( $img.hasClass( "Left" ) ) {
					$img
						.removeClass( "Right" )
						.addClass( "Splitted Left" )
						.css( {
							clip: "rect(0," + imgWidth / 2 + "px," + $img.height() + "px,0)",
							left: Math.max( ( window.innerWidth - imgWidth / 2 - settings.scrollBarWidth ) / 2, 0 )
						} );
				} else {
					$img
						.removeClass( "Left" )
						.addClass( "Splitted Right" )
						.css( {
							clip: "rect(0," + imgWidth + "px," + $img.height() + "px," + imgWidth / 2 + "px)",
							left: ( window.innerWidth - imgWidth / 2 - imgWidth - settings.scrollBarWidth ) / 2
						} );
				}

				settings.fitMode = opts.fitMode;
				settings.customMode = opts.customMode;
			} else {
				$img
					.removeClass( "Splitted" )
					.css( { clip: 'auto' } );

				switch ( opts.fitMode ) {
					case Option.Width:
						$img.css( { left: 0 } );
						break;

					case Option.BestSize:
						$img.css( { left: Math.max( ( window.innerWidth - $img.width() ) / 2, 0 ) } );
						break;

					default:
						$img.css( { left: Math.max( ( window.innerWidth - $img.width() - settings.scrollBarWidth ) / 2, 0 ) } );
						break;
				}
			}

		} );
	},

	'split': function() {
		return this.each( function() {
			var $img = $( this ), settings = $img.data( "settings" );

			settings.isAutoSplit = true;

			if ( !settings.isLocked ) {
				$img
					.css( { position: 'absolute' } )
					.bind( "izSizeEvent.izImage.izImageEx", function( event, data ) {
						methods._adjust.call( $( this ), { fitMode: data.fitMode, customMode: data.customMode } );
					} );
			}

			methods._adjust.call( $img, { fitMode: settings.fitMode, customMode: settings.customMode } );
		} );
	},

	unsplit: function() {
		return this.each( function() {
			var $img = $( this ), settings = $img.data( "settings" );

			settings.isAutoSplit = false;

			$img
				.removeClass( "Splitted" )
				.izImage( "fit" );

			if ( !settings.isLocked ) {
				$img
					.css( { position: "" } )
					.unbind( "izSizeEvent.izImage.izImageEx" );
			}

			methods._adjust.call( $img, { fitMode: settings.fitMode, customMode: settings.customMode } );
		} );
	},

	lock: function() {
		return this.each( function() {
			var $img = $( this ), settings = $img.data( "settings" );

			var $overlay = $( "#izImageEx-Overlay" );

			if ( !$overlay.length ) {
				$overlay = $( "<div id='izImageEx-Overlay'></div>" )
					.css( {
						display: 'none',
						position: 'fixed',
						'z-index': 999,
						top: 0,
						left: 0,
						'text-align': 'center',
						width: window.innerWidth,
						height: window.innerHeight,
						'background': settings.overlayBgColor
					} )
					.appendTo( document.body );
			}

			if ( $overlay.is( ":hidden" ) ) {
				$( window ).bind( "resize.izImageEx", function() {
					$overlay.css( { width: window.innerWidth, height: window.innerHeight } );
				} );

				$img.css( { 'z-Index': 1000, top: 0 } );

				if ( !settings.isAutoSplit ) {
					$img
						.css( { position: 'absolute' } )
						.bind( "izSizeEvent.izImage.izImageEx", function( event, data ) {
							methods._adjust.call( $( this ), { fitMode: data.fitMode, customMode: data.customMode } );
						} );
				}

				methods._adjust.call( $img, { fitMode: settings.fitMode, customMode: settings.customMode } );
			}

			$overlay.show();
			settings.isLocked = true;
		} );
	},

	unlock: function() {
		return this.each( function() {
			var $img = $( this ), settings = $img.data( "settings" ), $overlay = $( "#izImageEx-Overlay" );

			if ( $overlay && $overlay.is( ":visible" ) ) {
				$overlay.hide();
				settings.isLocked = false;

				$( window ).unbind( "resize.izImageEx" );

				$img.css( { 'z-Index': "", top: "" } );

				if ( !settings.isAutoSplit ) {
					$img
						.css( { position: "" } )
						.unbind( "izSizeEvent.izImage.izImageEx" );
				}

				methods._adjust.call( $img, { fitMode: settings.fitMode, customMode: settings.customMode } );
			}
		} );
	},

	isAutoSplit: function() {
		return this.data( "settings" ).isAutoSplit;
	},

	isLocked: function() {
		return this.data( "settings" ).isLocked;
	},

	setBgColor: function( color ) {
		return this.each( function() {
			$( this ).data( "settings" ).overlayBgColor = color;
			$( "#izImageEx-Overlay" ).css( 'background', color );
		} );
	},

	load: function( imgSrc, opts ) { // opts = { part: Right }
		return this.each( function() {
			var $img = $( this );

			$img.trigger( "izBeforeLoadEvent.izImage" );
			$img.attr( "src", imgSrc );

			if ( opts && opts.part !== undefined ) {
				if ( opts.part === Option.Left ) {
					$img.removeClass( "Right" ).addClass( "Left" );
				} else {
					$img.removeClass( "Left" ).addClass( "Right" );
				}
			}

			if ( imgSrc !== "" ) {
				$img.izImage( "fit" );
			}
		} );
	},

	create: function( options ) {
		return this.each( function() {
			var $img = $( this ), settings = $.extend( {}, $.fn.izImageEx.defaults, options || {} );

			if( !$img.hasClass( "izImage" ) ) {
				$img.izImage();
			}

			$img
				.addClass( "izImageEx" )
				.data( "settings", $.extend( settings, $img.data("settings") ) );
		} );
	}
};

$.fn.izImageEx = function( op ) {
	if ( methods[op] ) {
		return methods[op].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof op === 'object' || !op ) {
		return methods.create.apply( this, arguments );
	} else {
		try {
			$( this ).izImage( op );
		} catch ( e ) {
			$.error( 'Method ' + op + ' does not exist on jQuery.izImageEx' );
		}
	}
};

$.fn.izImageEx.version = "0.1";

$.fn.izImageEx.defaults = {
	overlayBgColor: "#000",

	// private
	isLocked: false,
	isAutoSplit: false
};

} )( jQuery );

//-- MessageBox Plugin
( function( $ ) {

var offsetTop = 0, offsetLeft = 0;

var methods = {
	_setCaption: function( caption ) {
		this.find( ".izMessageBox-TitleText" ).html( caption );
	},

	_setContent: function( content ) {
		this.find( ".izMessageBox-ClientArea" ).html( content );
	},

	_buildButtons: function( buttons ) {
		/*	buttons= [{
				classname: 'izOK',
				override: true,
				name: 'OK',
				click: function(){}
			}, ... ]
			or
			[ "izOK", ... ]
		*/
		var $buttonPane = this.find( ".izMessageBox-ButtonPane" );

		if ( buttons.length ) {
			var  btn, $btn, allButtons = $buttonPane.children().hide();

			for ( var i = 0; i < buttons.length; ++i ) {
				btn = buttons[i];

				if ( typeof btn === "string" ) {
					btn = {	classname: btn, override: false };
				}

				$btn = allButtons.filter( "." + btn.classname );

				if ( $btn.length ) {
					if ( btn.override ) {
						if ( btn.name ) {
							$btn.val( btn.name );
						}

						if ( btn.click ) {
							$btn.unbind( "click" ).bind( "click", btn.click );
						}
					}

					$btn.show();
				} else {
					$btn = $( "<input type='button' class='" + btn.classname + "' value='" + ( btn.name ? btn.name : "" ) + "' />" );
					if ( btn.click ) {
						$btn.bind( "click", btn.click );
					}

					$buttonPane.append( $btn );
				}
			}

			$buttonPane.css( 'display', '' );
		} else {
			$buttonPane.css( 'display', 'none' );
		}
	},

	show: function( content, caption, buttons, opts ) {

		if ( typeof content !== 'string' ) {
			throw new TypeError( 'MessageBox Plugin ( Method show ): content must be a string' );
		}

		if ( opts === undefined ) {
			switch ( typeof buttons ) {
				case 'object':
					if ( $.isArray( buttons ) ) {
						// ( content, caption, buttons )
						opts = {};
					} else {
						if ( $.isArray( caption ) ) {
							// ( content, buttions, opts )
							opts = buttons;
							buttons = caption;
							caption = null;
						} else {
							// ( content, caption, opts )
							opts = buttons;
							buttons = [];
						}
					}
					break;

				default:
					switch ( typeof caption ) {
						case 'object':
							if ( $.isArray( caption ) ) {
								// ( content, buttons )
								opts = {};
								buttons = caption;
								caption = null;
							} else {
								// ( content, opts )
								opts = caption;
								buttons = [];
								caption = null;
							}
							break;

						case 'string':
							// ( content, caption )
							opts = {};
							buttons = [];
							break;

						default:
							// ( content )
							opts = {};
							buttons = [];
							caption = null;
							break;
					}
				break;
			}
		}

		// ( content, caption, buttons, opts )
		if ( typeof opts !== 'object' ) {
			throw new TypeError( 'MessageBox Plugin ( Method show ): opts must be an object' );
		}

		if ( !$.isArray( buttons ) ) {
			throw new TypeError( 'MessageBox Plugin ( Method show ): buttons must be an array' );
		}

		if ( caption !== null && typeof caption !== 'string' ) {
			throw new TypeError( 'MessageBox Plugin ( Method show ): caption must be a string' );
		}

		return this.each( function() {
			var $mb = $( this );

			opts = $.extend( {}, $mb.data( "settings" ), opts );

			methods._setContent.call( $mb, content );
			methods._setCaption.call( $mb, caption || opts.caption );
			methods._buildButtons.call( $mb, buttons );

			$mb.find( ".izMessageBox-Titlebar-CloseButton" ).css( 'display', ( opts.closeButton ? '' : 'none' ) );

			offsetTop += 5;
			offsetLeft += 5;

			if ( offsetTop > 25 ) {
				offsetTop = 0;
				offsetLeft = 0;
			}

			var cTop, cLeft;
			if ( opts.offset.top === "center" ) {
				cTop = ( window.innerHeight - $mb.height() ) / 2 + offsetTop;
			} else {
				cTop = opts.offset.top;
			}

			if ( opts.offset.left === "center" ) {
				cLeft = ( window.innerWidth - $mb.width() ) / 2 + offsetLeft;
			} else {
				cLeft = opts.offset.left;
			}

			$mb.css( {
				position : ( opts.position !== "absolute") ? "fixed" : "absolute",
				top: cTop,
				left: cLeft,
				opacity: 1
			} );

			if (	opts.isUseAnimate ) {
				$mb
					.stop()
					.fadeIn( 'fast', function() {
						if ( opts.autoClose ) {
							$mb.fadeOut( opts.autoCloseSpeed );
						}
					} );
			} else {
				$mb.css( 'display', 'block' );
			}
		} );
	},

	hide: function( opts ) {
		return this.each( function() {
			var $mb = $( this ), settings = $mb.data( "settings" );

			if ( opts && opts.isUseAnimate !== undefined ) {
				isUseAnimate = opts.isUseAnimate;
			} else {
				isUseAnimate = settings.isUseAnimate;
			}

			if (	isUseAnimate ) {
				$mb.hide();
			} else {
				$mb.css( 'display', 'none' );
			}
		} );
	},

	create: function( options ) {
		if ( !$( "#izStyle-MessageBox" ).length ) {
			$( "<style id='izStyle-MessageBox' type='text/css'></style>" ).text(
				'.izMessageBox {display:none;position:fixed;z-index:9999;min-width:150px;padding:3px;border:1px solid #ddd;background-color:#ececec;font-family:"Microsoft JhengHei", sans-serif;}.izMessageBox input[type="button"]::-moz-focus-inner,.izMessageBox input[type="button"]::-webkit-focus-inner {border:none;}.izMessageBox-Titlebar {min-height:20px;margin:0;padding:2px;border:1px solid #CC7A00;background-image:-moz-linear-gradient(center bottom, #FF9900 50%, #FF9E0D 50%);background-image:-webkit-gradient(linear, left bottom, left top, color-stop(50%, #FF9900), color-stop(50%, #FF9E0D));color:#fdfdfd;white-space:nowrap;text-align:right;-moz-user-select:-moz-none;-webkit-user-select:none;}.izMessageBox .izMessageBox-TitleText {float:left;overflow:hidden;min-height:20px;white-space:nowrap;line-height:16px;text-align:left;}input.izMessageBox-Titlebar-CloseButton {margin:0 1px;padding:0;border:none;background-color:transparent;color:#2E86C7;white-space:nowrap;}input.izMessageBox-Titlebar-CloseButton::-moz-focus-inner,input.izMessageBox-Titlebar-CloseButton::-webkit-focus-inner {border:none;}.izMessageBox-ClientArea {min-height:50px;margin:0 0 3px 0;padding:10px 15px;background-color:#efefef;color:#090909;}.izMessageBox-ButtonPane {margin:0;padding:5px;border-top:1px solid #ddd;background-color:#f5f5f5;text-align:center;}.izMessageBox-ButtonPane input[type="button"] {margin:0 3px 1px;padding:2px 3px;border:1px solid #ccc;background-color:#fff;color:#2E86C7;}.izMessageBox-ButtonPane input[type="button"]:hover {background-color:#fdfdfd;border:1px solid #999;}'
			).appendTo( document.head );
		}

		return this.each( function() {
			var settings = $.extend( {}, $.fn.izMessageBox.defaults, options || {} ),
				$mb = $( this ).data( "settings", settings ).addClass( "izMessageBox" ).hide();

			var $titlebar = $( "<div class='izMessageBox-Titlebar'></div>" ).prependTo( $mb );

			$( "<div class='izMessageBox-ClientArea'></div>" ).appendTo( $mb );
			$( "<div class='izMessageBox-ButtonPane'></div>" ).appendTo( $mb );

			methods._buildButtons.call( $mb, settings.buttons );

			$( "<span class='izMessageBox-TitleText'></span>" ).appendTo( $titlebar );
			$( "<input type='button' class='izMessageBox-Titlebar-CloseButton' value='╳' />" )
				.bind( "click.izMessageBox", function() { methods.hide.call( $mb ); } )
				.appendTo( $titlebar );
		} );
	}
};

$.fn.izMessageBox = function( op ) {
	if ( methods[op] ) {
		return methods[op].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof op === 'object' || !op ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + op + ' does not exist on jQuery.izMessageBox' );
	}
};

$.fn.izMessageBox.version = "0.3";

$.fn.izMessageBox.defaults = {
	caption: "MessageBox",
	closeButton: true,
	position: "fixed",
	offset: { top: "center", left: "center" },
	autoClose: false,
	autoCloseSpeed: 1500,
	isUseAnimate: true,

	buttons: [ /*
		{
			classname: 'izOK',
			name: 'OK',
			click: function(){}
		}, ....
		*/ ]
};
} )( jQuery );

//-- PhotoGird Plugin
( function( $ ) {

var Option = {
	First: 0,
	Prev: 1,
	Center: 2,
	Next: 3,
	Last: 4
};

var methods = {
	slideTo: function( position, index ) {
		return this.each( function() {
			var $pg = $( this ),
				settings = $pg.data( "settings" ),
				$container = $pg.find( ".izPhotoGird-Container" ),
				$strip = $pg.find( "ul" ),
				rowNo,
				TopMargin;

			switch ( position ) {
				case Option.Prev:
					var limit = 0,
						currentPos = parseInt( $strip.css( "margin-Top" ) ),
						interval = index ? index : settings.scrollInterval,
						newPos;

					// currentPos -> limit
					if ( currentPos < limit ) {
						newPos = currentPos + settings.itemHeight * interval;

						if ( limit < newPos ) {
							newPos = limit;
						}

						TopMargin = newPos;
					} else {
						// it may be in the center, so to maintain the original TopMargin
						return;
					}
					break;

				case Option.Next:
					var columnCount = Math.floor( $container.width() / settings.itemWidth ),
						limit = -( settings.itemHeight * Math.ceil( settings.itemCount / columnCount ) - $container.height() ),
						currentPos = parseInt( $strip.css( "margin-Top" ) ),
						interval = index ? index : settings.scrollInterval,
						newPos;

					// limit <- currentPos
					if ( limit < currentPos ) {
						newPos = currentPos - settings.itemHeight * interval;
						if ( newPos < limit ) {
							newPos = limit;
						}

						TopMargin = newPos;
					} else {
						// it may be in the center, so to maintain the original TopMargin
						return;
					}
					break;

				case Option.Center:
					var columnCount = Math.floor( $container.width() / settings.itemWidth );
					if ( !index || index < 1 ) {
						rowNo = Math.floor( settings.itemCount / ( 2 * columnCount ) );
					} else {
						rowNo = Math.ceil( index / columnCount );
					}

					TopMargin = $container.height() / 2 - settings.itemHeight * rowNo + settings.itemHeight / 2;
					break;

				case Option.Last:
					if ( !index || index < 1 ) {
						var rowCount = Math.floor( $strip.height() / settings.itemHeight );
						rowNo = rowCount;
					}	else {
						var columnCount = Math.floor( $container.width() / settings.itemWidth );
						rowNo = Math.ceil( index / columnCount );
					}
					TopMargin = $container.height() - settings.itemHeight * rowNo;
					break;

				case Option.First:
				default:
					if ( !index || index < 1 ) {
						rowNo = 1;
					} else {
						var columnCount = Math.floor( $container.width() / settings.itemWidth );
						rowNo = Math.ceil( index / columnCount );
					}
					TopMargin = -settings.itemHeight * ( rowNo - 1 );
					break;
			}

			$strip.css( { 'margin-Top': TopMargin } );
		} );
	},

	create: function( options ) {
		if ( !$( "#izStyle-PhotoGird" ).length ) {
			$( "<style id='izStyle-PhotoGird' type='text/css'></style>" ).text(
'.izPhotoGird-Container {position:relative;overflow:hidden;margin:0;padding:1px;line-height:0;}.izPhotoGird ul {list-style:none outside none;margin:0;padding:0;-moz-user-select:-moz-none;-webkit-user-select:none;}.izPhotoGird ul li {display:inline-block;overflow:hidden;margin:2px;padding:0;border:1px solid #fff;}'
			).appendTo( document.head );
		}

		return this.each( function() {
			var settings = $.extend( {}, $.fn.izPhotoGird.defaults, options || {} ),
				$pg = $( this ).addClass( "izPhotoGird" ).data( "settings", settings );

			var $container = $( "<div class='izPhotoGird-Container'></div>" ).appendTo( $pg ),
				$strip = $( "<ul></ul>" ).appendTo( $container );

				// insert li
			for ( var i = 0; i < settings.itemCount; ++i ) {
				var idx = i + 1;

				// 1-indexed
				$( "<li></li>"  )
					.data( "index", idx )
					.attr( 'title', idx )
					.css( { 'width': settings.itemWidth, 'height': settings.itemHeight } )
					.bind( 'click', function( event, data ) {
						var $li = $( this );
						$li.addClass( "current" ).siblings( "li" ).removeClass( "current" );
						settings.oldIndex = settings.currentIndex;
						settings.currentIndex = $li.data( "index" );

						var data = $.extend( {
							itemCount: settings.itemCount,
							currentItemIndex: settings.currentIndex,
							oldItemIndex: settings.oldIndex
						}, data );

						settings.itemClick.call( this, event, data );

						$pg.trigger( "izItemClicked.izPhotoGird", data );
					} )
					.appendTo( $strip );
			}

			var $firstli = $strip.find( "li:first-child" ).addClass( "current" );

			// item size
			settings.itemWidth = $firstli.outerWidth( true );
			settings.itemHeight = $firstli.outerHeight( true );

			// css
			$strip.css( {
				top: 0,
				'-moz-transition': settings.scrollSpeed ? "margin 0.2s linear " +  settings.scrollSpeed / 1000 + "s" : 'none',
				'-webkit-transition': settings.scrollSpeed ? "margin 0.2s linear " +  settings.scrollSpeed / 1000 + "s" : 'none'
			} );

			$container.css( { width: settings.visibleColumnCount ? settings.itemWidth * settings.visibleColumnCount : settings.width } );
			if ( settings.visibleRowCount ) {
				$container.css( {	height: settings.itemHeight	* settings.visibleRowCount } );
			} else if ( settings.height === "auto" ) {
				$container.css( {	height: $( window ).height() } );
			} else {
				$container.css( {	height: settings.height } );
			}

			$pg.css( {
				width: $container.outerWidth(true)
			} );

			// strip navigation
			var mouseStart = 0;

			$container
				.bind( 'touchstart', function(event) {
					if ( !event.originalEvent.targetTouches.length ) {
						return;
					}

					event.preventDefault();
					mouseStart = event.originalEvent.targetTouches[0].clientX;
				} )
				.bind( 'touchmove', function(event) {
					event.preventDefault();
				} )
				.bind( 'touchend', function(event) {
					var mouseEnd = event.originalEvent.changedTouches[0].clientX;

					if ( mouseEnd - mouseStart > 20 ) {
						methods.slideTo.call( $( $( this ).parent() ), Option.Prev );
					} else if ( mouseEnd - mouseStart < -20 ) {
						methods.slideTo.call( $( $( this ).parent() ), Option.Next );
					}
					mouseStart = 0;
			} );

			$container
				.bind( 'mousedown', function( event ) {
					mouseStart = event.clientY;
				} )
				.bind( 'mouseup', function( event ) {
					if ( mouseStart ) {
						if ( event.clientY - mouseStart > 30 ) {
							methods.slideTo.call( $( $( this ).parent() ), Option.Prev );
						} else if ( event.clientY - mouseStart < -30 ) {
							methods.slideTo.call( $( $( this ).parent() ), Option.Next );
						}
					}
					mouseStart = 0;
				} )
				.bind( 'DOMMouseScroll mousewheel', function( event ) {
					var delta;
					if ( event.originalEvent.detail ) {
						delta = event.originalEvent.detail / 3;
					} else if ( event.originalEvent.wheelDelta ) {
						delta = -event.originalEvent.wheelDelta / 120;
					}

					if ( delta > 0 ) {
						methods.slideTo.call( $( $( this ).parent() ), Option.Next, 1 );
					} else if ( delta < 0 ) {
						methods.slideTo.call( $( $( this ).parent() ), Option.Prev, 1 );
					}

					event.preventDefault();
				} );

			if ( settings.isAutoScroll ) {
				$strip.css( {
					'-moz-transition': "",
					'-webkit-transition': ""
				} );

				var timeID = 0, cursorOffsetY;

				$container
					.bind( 'mouseleave', function() {
						clearInterval( timeID );
						timeID = 0;
						mouseStart = 0;
					} )
					.bind( 'mousemove', function( event ) {

						if ( mouseStart ) {
							return;
						}

						cursorOffsetY = event.pageY - $( this ).offset().top;

						if( !timeID ) {
							timeID = setInterval( function() {
								if ( mouseStart ) {
									clearInterval( timeID );
									timeID = 0;
									return;
								}

								var isOnBeforeOneThird = cursorOffsetY < $container.height() / 4;
								var isOnAfterOneThird =  $container.height() * 3 / 4 < cursorOffsetY;

								if ( isOnBeforeOneThird ) {
									var currentMarginTop = parseInt( $strip.css( 'margin-top' ) );

									if ( currentMarginTop < 0 ) {
										var newMarginTop = currentMarginTop + settings.autoScrollSpeed;
										if ( newMarginTop + settings.autoScrollSpeed > 0  ) {
											newMarginTop = 0;
										}

										$strip.css( 'margin-top', newMarginTop );
									}
								} else if ( isOnAfterOneThird ) {
									var currentMarginTop = parseInt( $strip.css( 'margin-top' ) );
									var visibleBottom = $container.height() - $strip.height();

									if ( currentMarginTop > visibleBottom ) {
										var newMarginTop = currentMarginTop - settings.autoScrollSpeed;
										if ( newMarginTop < visibleBottom ) {
											newMarginTop = visibleBottom;
										}

										$strip.css( 'margin-top', newMarginTop );
									}
								}
							}, 50 );
						}
					} )	;
			}
		} );
	}
};

$.fn.izPhotoGird = function( op ) {
	if ( methods[op] ) {
		return methods[op].apply( this, Array.prototype.slice.call( arguments, 1 ) );
	} else if ( typeof op === 'object' || !op ) {
		return methods.create.apply( this, arguments );
	} else {
		$.error( 'Method ' + op + ' does not exist on jQuery.izPhotoGird' );
	}
};

$.fn.izPhotoGird.version = "0.1";

$.fn.izPhotoGird.defaults = {
	width: 407,
	height: "auto",
	visibleColumnCount: 0,
	visibleRowCount: 0,

	itemWidth: 75,
	itemHeight: 90,
	itemCount: 10,
	itemClick: function () {},

	scrollSpeed: 100,
	scrollInterval: 3,
	isAutoScroll: true,
	autoScrollSpeed: 20,

	// private:
	currentIndex: 1,
	oldIndex: 1
};

} )( jQuery );


//****************************************************************************
// global variable
//****************************************************************************
var gBaseUrl = window.location.href,
	IzConfig = MyConfig.load();

///////////////////////////////////////////////////////////////////////////////

//-- OptionsDialog Singleton
var OptionsDialog = ( function() {

	var Singleton = function() {
		var style = document.createElement( "style" );
		style.id = "izStyle-OptionsDialog";
		style.type = "text/css";
		style.textContent =	'#mmOptionsDialog {position:fixed;z-index:1030;top:10px;left:200px;min-width:450px;border:1px solid rgba(200,200,200,0.5);box-shadow:2px 2px 3px 0px rgba(0,0,0,0.5);background:#fff;text-align:left;}#mmOptionsDialog .xxTitlebar {padding:5px 10px;border-bottom:1px solid rgba(200,200,200,0.5);background: #eee;text-align:center}#mmOptionsDialog .xxTab {margin:0 10px;}#mmOptionsDialog fieldset {margin:5px 0;padding:3px 10px;}#mmOptionsDialog input[type="checkbox"] {vertical-align:middle;}#mmOptionsDialog input[type="text"] {border:1px solid #aaa;text-align:right;}#mmOptionsDialog input[type="button"] {padding:2px 5px;border:1px solid #aaa;}#mmDialogBtn {margin:10px 0;text-align:center;}';
		document.head.appendChild( style );

		this.dialog = document.createElement( "div" );
		this.dialog.id = "mmOptionsDialog";
		this.dialog.innerHTML = '<div class="xxTitlebar">偏好設定</div><div class="xxTab"><fieldset><legend>圖片選項</legend><label>向後預載張數 <input type="text" id="txtImagePreloadCountPerv" size="3" /></label>&nbsp<label>向前預載張數 <input type="text" id="txtImagePreloadCountNext" size="3" /></label><br /><label><input type="checkbox" id="chkImagePreloadAutoClean" />自動清除預載</label>&nbsp<label><input type="checkbox" id="chkImageAutoTop" />自動移到上緣</label><br /><label><input type="checkbox" id="chkImageAutoResize" />自動重整尺寸</label>&nbsp<label><input type="checkbox" id="chkImageSplit" />啟用分頁</label></fieldset><fieldset><legend>縮放模式</legend><label for="selImageFitMode">預設模式：</label><select id="selImageFitMode"><option value="1">實際大小</option><option value="2">最適大小</option><option value="3">符合寬度</option><option value="4">符合高度</option><option value="5">自訂大小</option></select><br /><div><label  for="selImageCustomMode">自訂大小：</label><select id="selImageCustomMode"><option value="7">最大寬度</option><option value="8">最大高度</option><option value="9">固定大小</option><option value="10">縮放大小</option></select><br /><label>最大寬度 <input type="text" id="txtCustomMaxWidth" size="5" /></label><br /><label>最大高度 <input type="text" id="txtCustomMaxHeight" size="5" /></label><br /><label>固定大小</label> <label>寬: <input type="text" id="txtCustomFixedSizeWidth" size="5"/></label> <label>高: <input type="text" id="txtCustomFixedSizeHeight" size="5" /></label><br /><label>縮放大小 <input type="text" id="txtCustomZoom" size="5" />%</label></div></fieldset><fieldset><legend>覆蓋模式</legend><label><input type="checkbox" id="chkViewOverlay" />啟用覆蓋</label><br /><label>背景色 <input type="text" id="txtViewOverlayBgColor" size="7" /></label></fieldset><fieldset><legend>介面主題</legend><select id="selThemeStyle"><option value="0">原始</option><option value="1">iPad White</option><option value="2">iPad Black</option></select><br /><label><input type="checkbox" id="chkchkInfoPanelShow" />顯示資訊列</label></fieldset></div><div id="mmDialogBtn"><input type="button" class="xxOK" value="確定" />&nbsp<input type="button" class="xxCancel" value="取消" />&nbsp<input type="button" class="xxApply" value="套用" />&nbsp<input type="button" class="xxDefault" value="預設" />&nbsp<input type="button" class="xxClear" value="移除" /></div>';
		document.body.appendChild( this.dialog );

		var $styleTheme = $( "#izStyle-MoreManga-Theme" );

		switch ( parseInt( IzConfig["Theme-Style"] ) ) {
			case MyConfig.Style_iPad_White:
			case MyConfig.Style_iPad_Black:
				$styleTheme.text( $styleTheme.text() +
'#mmOptionsDialog {border:none;border-radius:15px;font:18px "Microsoft JhengHei",sans-serif;}#mmOptionsDialog * {font:18px "Microsoft JhengHei",sans-serif;}#mmOptionsDialog .xxTitlebar {border-bottom:1px solid rgba(180,180,180,0.5);border-radius:15px 15px 0 0;}#mmOptionsDialog fieldset {border:1px solid rgba(100,100,100,0.58);border-radius:8px;}#mmOptionsDialog input[type="button"] {height:44px;width:60px;margin:1px 2px;padding:2px 5px;box-shadow:0px 0px 1px 0px rgba(0,0,0,0.5);border:1px solid rgba(100,100,100,0.5);border-radius:8px;background-image: -moz-linear-gradient(top, #fff, #f8f8f8, #eee );background-image: -webkit-linear-gradient(top, #fff, #f8f8f8, #eee );color:#333;text-shadow: rgba(50,50,50,0.2) 0px -1px 0px;}#mmOptionsDialog input[type="text"] {margin:1px 3px;padding:0 5px;border-width:1px;border-style:solid;border-color:rgb(146, 146, 147) rgb(174, 174, 174) rgb(189, 189, 189);border-radius:3px;box-shadow:inset 0px 2px 3px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 0px rgba(255, 255, 255, 0.3);}#mmOptionsDialog select {margin:1px 3px;padding:0 0 0 2px;border:1px solid rgba(180,180,180,0.8);border-radius:3px;color:#000;text-shadow:rgba(50,50,50,0.2) 0px -1px 0px;}'
				);
				break;

			default:
				break;
		}

		this.dialog.style.display = "none";
		this.titleText = document.querySelector( "#mmOptionsDialog .xxTitlebar" );

		this.txtImagePreloadCountPerv = document.getElementById( "txtImagePreloadCountPerv" );
		this.txtImagePreloadCountNext = document.getElementById( "txtImagePreloadCountNext" );
		this.chkImagePreloadAutoClean = document.getElementById( "chkImagePreloadAutoClean" );
		this.chkImageAutoTop = document.getElementById( "chkImageAutoTop" );
		this.chkImageAutoResize = document.getElementById( "chkImageAutoResize" );
		this.chkImageSplit = document.getElementById( "chkImageSplit" );

		this.selImageFitMode = document.getElementById( "selImageFitMode" );
		this.selImageCustomMode = document.getElementById( "selImageCustomMode" );

		this.txtCustomMaxWidth = document.getElementById( "txtCustomMaxWidth" );
		this.txtCustomMaxHeight = document.getElementById( "txtCustomMaxHeight" );
		this.txtCustomFixedSizeWidth = document.getElementById( "txtCustomFixedSizeWidth" );
		this.txtCustomFixedSizeHeight = document.getElementById( "txtCustomFixedSizeHeight" );
		this.txtCustomZoom = document.getElementById( "txtCustomZoom" );

		this.chkViewOverlay = document.getElementById( "chkViewOverlay" );
		this.txtViewOverlayBgColor = document.getElementById( "txtViewOverlayBgColor" );

		this.selThemeStyle = document.getElementById( "selThemeStyle" );
		this.chkInfoPanelShow = document.getElementById( "chkchkInfoPanelShow" );

		Singleton.evtHandler( this );
	};

	Singleton.prototype = {
		dialog: null,
		titleText: null,

		app: null,
		config: null,
		configType: null,

		txtImagePreloadCountPerv: null,
		txtImagePreloadCountNext: null,
		chkImagePreloadAutoClean: null,
		chkImageAutoTop: null,
		chkImageAutoResize: null,
		chkImageSplit: null,

		selImageFitMode: null,
		selImageCustomMode: null,

		txtCustomMaxWidth: null,
		txtCustomMaxHeight: null,
		txtCustomFixedSizeWidth: null,
		txtCustomFixedSizeHeight : null,
		txtCustomZoom: null,

		chkViewOverlay: null,
		txtViewOverlayBgColor: null,

		selThemeStyle: null,
		chkInfoPanelShow:null,

		init: function( opts ) {
			this.app = opts.app;
			this.config = opts.config;
			this.configType = opts.configType;

			return this;
		},

		setTitleText: function( text ) {
			this.titleText.innerHTML = text;
			return this;
		},

		show: function() {
			this.dialog.style.display = "";
			return this;
		},

		hide: function() {
			this.dialog.style.display = "none";
			return this;
		},

		loadConf: function( bDefault ) {
			var conf;

			if ( bDefault ) {
				conf = MyConfig.load( true );
			} else {
				conf = this.config;
			}

			this.txtImagePreloadCountPerv.value = conf["Image-Preload-Count-Perv"];
			this.txtImagePreloadCountNext.value = conf["Image-Preload-Count-Next"];
			this.chkImagePreloadAutoClean.checked = conf["Image-Preload-AutoClean"];
			this.chkImageAutoTop.checked = conf["Image-AutoTop"];
			this.chkImageAutoResize.checked = conf["Image-AutoResize"];
			this.chkImageSplit.checked = conf["Image-Split-Enable"];

			this.selImageFitMode.selectedIndex = conf["Image-FitMode"] - 1;
			this.selImageCustomMode.selectedIndex = conf["Image-CustomMode"] - 7;

			this.txtCustomMaxWidth.value = conf["Image-MaxWidth"];
			this.txtCustomMaxHeight.value = conf["Image-MaxHeight"];
			this.txtCustomFixedSizeWidth.value = conf["Image-FixedSize"].w;
			this.txtCustomFixedSizeHeight.value = conf["Image-FixedSize"].h;
			this.txtCustomZoom.value = conf["Image-Zoom"];

			this.chkViewOverlay.checked = conf["View-Overlay-Enable"];
			this.txtViewOverlayBgColor.value = conf["View-Overlay-BgColor"];

			this.selThemeStyle.selectedIndex = conf["Theme-Style"];
			this.chkInfoPanelShow.checked = conf["UI-InfoPanel-Show"];

			return this;
		},

		saveConf: function() {
			this.config["Image-Preload-Count-Perv"] = parseInt( this.txtImagePreloadCountPerv.value, 10 );
			this.config["Image-Preload-Count-Next"] = parseInt( this.txtImagePreloadCountNext.value, 10 );
			this.config["Image-Preload-AutoClean"] = this.chkImagePreloadAutoClean.checked;
			this.config["Image-AutoTop"] = this.chkImageAutoTop.checked;
			this.config["Image-AutoResize"] = this.chkImageAutoResize.checked;
			this.config["Image-Split-Enable"] = this.chkImageSplit.checked;

			this.config["Image-FitMode"] = parseInt( this.selImageFitMode.selectedIndex, 10 ) + 1;
			this.config["Image-CustomMode"] = parseInt( this.selImageCustomMode.selectedIndex, 10 ) + 7;

			this.config["Image-MaxWidth"] = parseInt( this.txtCustomMaxWidth.value, 10 );
			this.config["Image-MaxHeight"] = parseInt( this.txtCustomMaxHeight.value, 10 );
			this.config["Image-FixedSize"].w = parseInt( this.txtCustomFixedSizeWidth.value, 10 );
			this.config["Image-FixedSize"].h = parseInt( this.txtCustomFixedSizeHeight.value, 10 );
			this.config["Image-Zoom"] = parseInt( this.txtCustomZoom.value, 10 );

			this.config["View-Overlay-Enable"] = this.chkViewOverlay.checked;
			this.config["View-Overlay-BgColor"] = this.txtViewOverlayBgColor.value;

			this.config["Theme-Style"] = parseInt( this.selThemeStyle.selectedIndex, 10 );
			this.config["UI-InfoPanel-Show"] = this.chkInfoPanelShow.checked;

			if ( this.configType === MyConfig.Greasemonkey ) {
				MyConfig.saveToGlobal( this.config );
			} else {
				MyConfig.saveToLocal( this.config );
			}

			return this;
		}
	};

	Singleton.evtHandler = function( self ) {
		var dlg = self.dialog,　$dlg = $( self.dialog );

		var updateUI = function() {
			IzConfig = MyConfig.load();
			self.app.configure();
			self.app.$IzImage.izImage( "setCustomMode", IzConfig["Image-CustomMode"] );
			self.app.$IzImage.izImage( "setFitMode",  IzConfig["Image-FitMode"] );
			self.app.$IzImage.izImageEx( "setBgColor", IzConfig["View-Overlay-BgColor"] );
			self.app.updatePageByIndex( self.app.currentPageIndex );
		};

		$dlg.find( ".xxOK" ).bind( 'click', function() {
			self.hide().saveConf();
			updateUI();
		} );

		$dlg.find( ".xxApply" ).bind( 'click', function() {
			self.saveConf();
			updateUI();
		} );

		$dlg.find( ".xxCancel" ).bind( 'click', function() {
			self.hide();
		} );

		$dlg.find( ".xxDefault" ).bind( 'click', function() {
			if ( confirm( "這將把設定中的組態回復成預設值,\n確定要繼續?" ) ) {
				self.loadConf( true );
			}
		} );

		$dlg.find( ".xxClear" ).bind( 'click', function() {
			var str = "瀏覽器";

			if ( self.configType === MyConfig.Greasemonkey ) {
				str =  "Greasemonkey";
			} else if ( self.configType === MyConfig.LocalStorage ) {
				if ( MyConfig.storageEnabled ) {
					str =  "LocalStorage";
				} else if ( MyConfig.cookieEnabled ) {
					str =  "Cookie";
				}
			}

			if ( confirm( "注意：\n這將移除儲存在 " + str + " 之中的組態,\n確定要繼續?" ) ) {
				if ( self.configType === MyConfig.Greasemonkey ) {
					MyConfig.removeGlobal();
				} else  {
					MyConfig.removeLocal();
				}
				self.hide();
				updateUI();
			}
		} );
	};

	var _instance = null;
	return ( {
		getInstance: function() {
			if ( _instance === null ) {
				_instance = new Singleton();
			}
			return _instance;
		}
	} );
} )();

//-- MyApp Constructor
var MyApp = function( settings ) {
	$(
'<div id="mmOutputList"><div id="mmOutputList-close">╳</div><div id="mmOutputList-clientArea"></div></div><div id="mmSidePanel" class="xxPanel"></div><div id="mmInfoPanel" class="xxPanel"><div id="mmComicName"></div><div id="mmVolumeNavigation"></div></div><div id="mmControlPanel" class="xxPanel"><div id="mmControlPanel-Message"><span class="mmImageStatus"></span><span class="mmPageNum"></span></div><div id="mmTools"><a href="#" class="xxButton menu-Advanced" title="更多功能"><span>更多...</span></a><div id="mmMenuAdvanced" class="xxMenu"><div><a href="#" class="xxButton tool-Settings-Global" title=""><span>設定通用選項</span></a></div><div><a href="#" class="xxButton tool-Settings-Local" title=""><span>設定個別網站</span></a></div><div><a href="#" class="xxButton tool-List" title=""><span>輸出圖片列表</span></a></div><div><a href="#" class="xxButton tool-Cache" title=""><span>檢視圖片預載</span></a></div><div><a href="#" class="xxButton view-TurboMode" title=""><span>切換覆蓋模式</span></a></div><div><a href="#" class="xxButton view-AutoSplit" title=""><span>切換自動分頁</span></a></div></div></div><div id="mmPageNavigation"><a href="#" class="xxButton page-First" title="第一頁"><span> |< </span></a><a href="#" class="xxButton page-Prev" title="上一頁"><span> < </span></a><select class="page-Number"></select><a href="#" class="xxButton page-Next" title="下一頁"><span> > </span></a><a href="#" class="xxButton page-Last" title="最後一頁"><span> >| </span></a></div><div id="mmPageDisplay"><div id="mmFitRadio" class="xxRadioGroup"><a href="#" class="xxRadio fit-IntrinsicSize" title="實際大小"><span>I</span></a><a href="#" class="xxRadio fit-BestSize" title="最適大小"><span>B</span></a><a href="#" class="xxRadio fit-Width" title="符合寬度"><span>W</span></a><a href="#" class="xxRadio fit-Height" title="符合高度"><span>H</span></a><a href="#" class="xxRadio fit-Custom" title="自訂大小"><span>C</span></a><div id="mmMenuCustomMode" class="xxMenu"><div id="mmCustomRadio" class="xxRadioGroup"><div><a href="#" class="xxRadio custom-MaxWidth" title=""><span>最大寬度</span></a> <span><input class="txtCustom-MaxWidth" size="5" /></span></div><div><a href="#" class="xxRadio custom-MaxHeight" title=""><span>最大高度</span></a> <span><input class="txtCustom-MaxHeight" size="5" /></span></div><div><a href="#" class="xxRadio custom-FixedSize" title=""><span>固定大小</span></a> <span>寬: <input class="txtCustom-FixedSize-Width" size="5"/></span> <span>高: <input class="txtCustom-FixedSize-Height" size="5" /></span></div><div><a href="#" class="xxRadio custom-Zoom" title=""><span>縮放大小</span></a> <span><input class="txtCustom-Zoom" size="5" /> %</span></div></div></div></div></div></div>'
	).appendTo( document.body );

	$.extend( this, settings || {} );
};

MyApp.Command_FirstPage = 0;
MyApp.Command_PreviousPage = 1;
MyApp.Command_JumpToPage = 2;
MyApp.Command_NextPage = 3;
MyApp.Command_LastPage = 4;

MyApp.prototype = {
	$ImageBox: null,
	currentPageIndex: 1,
	historyUrl: null,
	itemsDataSource: null,

	$IzMessageBox: null,
	$IzPhotoGird: null,
	$IzImage: null,
	$SidePanel: null,
	$mmInfoPanel: null,
	$ControlPanel: null,
	$ControlPanelMessage: null,

	oldPageIndex: 1, // for split
	currentCommand: null, // for split

	$PageNumberSelect: null, // for PhotoGird Click Event
	$PhotoGirdItems: null, // for preload

	checkPageIndexOutOfBound: function( pageIndex ) {
		if ( pageIndex < 1 ) {
			this.$IzMessageBox.izMessageBox( "show", "這是第一頁", { autoClose: true } );
			return true;
		} else if ( pageIndex > this.itemsDataSource.getRowCount() ) {
			this.$IzMessageBox.izMessageBox( "show", "這是最後一頁", { autoClose: true } );
			return true;
		}

		return false;
	},

	useOverlay: function( isUse ) {
		if ( isUse ) {
			if ( !this.$IzImage.hasClass( "izImageEx" ) ) {
				this.$IzImage.izImageEx( { overlayBgColor: IzConfig["View-Overlay-BgColor"] } );
			}
			this.$IzImage.izImageEx( "lock" );
			window.scrollTo( 0, 0 );
		} else {
			this.$IzImage.izImageEx( "unlock" );
			if ( IzConfig["Image-AutoTop"] ) {
				window.scrollTo( 0, this.$IzImage.position().top );
			}
		}
	},

	useAutoSplit: function( isUse ) {
		if ( isUse ) {
			if ( !this.$IzImage.hasClass( "izImageEx" ) ) {
				this.$IzImage.izImageEx( { overlayBgColor: IzConfig["View-Overlay-BgColor"] } );
			}
			this.$IzImage.izImageEx( "split" );
		} else {
			this.$IzImage.izImageEx( "unsplit" );
		}
	},

	updatePageByIndex: function( pageIndex, command ) {
		this.currentCommand = command;
		this.$IzPhotoGird.find( "li:nth-child(" + pageIndex + ")" ).trigger( 'click' );
	},

	initPhotoGird: function() {
		var myApp = this;

		myApp.$IzPhotoGird = $( '<div id="mmPhotoGird"></div>' ).appendTo( $( "#mmSidePanel" ) ).izPhotoGird( {
			visibleColumnCount: 3,
			height: "auto",
			itemWidth: 75,
			itemHeight: 90,
			isAutoScroll: false,
			itemCount: myApp.itemsDataSource.getRowCount(),
			itemClick: function( event, data ) {
				myApp.oldPageIndex = data.oldItemIndex;
				myApp.currentPageIndex = data.currentItemIndex;

				myApp.itemsDataSource.selectData( myApp.currentPageIndex, 1 + IzConfig["Image-Preload-Count-Next"] );

				if ( IzConfig["Image-Preload-Count-Perv"] && myApp.currentPageIndex !== 1  ) {
					var begin, count;
					if ( myApp.currentPageIndex > IzConfig["Image-Preload-Count-Perv"] ) {
						begin = myApp.currentPageIndex - IzConfig["Image-Preload-Count-Perv"];
						count = IzConfig["Image-Preload-Count-Perv"];
					} else {
						begin = 1;
						count = myApp.currentPageIndex - 1;
					}

					myApp.itemsDataSource.selectData( begin, count );
				}

				if ( IzConfig["Image-Preload-AutoClean"] ) {
					var autoCleanSize = DataSource.repairIndexToZero( myApp.currentPageIndex - IzConfig["Image-Preload-Count-Perv"] );
					for ( var i = 0; i < autoCleanSize; ++i ) {
						myApp.$PhotoGirdItems.eq( i ).find( "img" ).remove();
					}
				}

				var msg = "";
				if ( myApp.$IzImage.hasClass( "Splitted" ) ) {
					if ( myApp.$IzImage.hasClass( "Left" ) ) {
						msg = "(L)";
					} else {
						msg = "(R)";
					}
				}

				myApp.$ControlPanelMessage.find( ".mmPageNum" ).html( myApp.currentPageIndex + msg + " / " + myApp.itemsDataSource.getRowCount() );
				myApp.$PageNumberSelect.find( "option:nth-child(" +	myApp.currentPageIndex + ")" ).attr( 'selected', "selected" );

				if ( IzConfig["History-Replace-Enable"] && history.replaceState ) {
					history.replaceState( {}, document.title, myApp.historyUrl( myApp.currentPageIndex ) );
				}

				if ( IzConfig["Image-AutoTop"] ) {
					window.scrollTo( 0, myApp.$IzImage.position().top );
				}

				myApp.$IzPhotoGird.izPhotoGird( "slideTo", MyConfig.Slide_First, myApp.currentPageIndex );
			}
		} );

		myApp.$PhotoGirdItems = myApp.$IzPhotoGird.find( 'li' );

		myApp.$IzPhotoGird.find( ".izPhotoGird-Container" ).css( { "height": $( window ).height() } );
		$( window ).bind( 'resize.izPhotoGird', function() {
			myApp.$IzPhotoGird.find( ".izPhotoGird-Container" ).css( { "height": $( window ).height() } );
		} );
	},

	initImage: function() {
		var myApp = this;

		myApp.$IzImage = myApp.$ImageBox.izImage( {
			fitMode: IzConfig["Image-FitMode"],
			maxWidth: IzConfig["Image-MaxWidth"],
			maxHeight: IzConfig["Image-MaxHeight"],
			fixedSize: IzConfig["Image-FixedSize"],
			zoom: IzConfig["Image-Zoom"],
			customMode: IzConfig["Image-CustomMode"],
			click: function( event ) {
				var $img = $( this ), newPageIndex, newCommand;

				if ( $img.hasClass( "Splitted" ) ) {
					if ( $img.hasClass( "Right" ) ) {
						var isClickLeftOneThird = event.clientX - $img.offset().left < $img.width() / 2 + $img.width() / 6;
						if ( isClickLeftOneThird ) {
							newPageIndex = myApp.currentPageIndex - 1;
							if ( myApp.checkPageIndexOutOfBound( newPageIndex ) ) {
								return;
							}
							newCommand = MyApp.Command_PreviousPage;
						} else {
							newPageIndex = myApp.currentPageIndex;
							newCommand = MyApp.Command_NextPage;
						}

					} else if ( $img.hasClass( "Left" ) ) {
						var isClickLeftOneThird = event.clientX - $img.offset().left < $img.width() / 6;
						if ( isClickLeftOneThird ) {
							newPageIndex = myApp.currentPageIndex;
							newCommand = MyApp.Command_PreviousPage;
						} else {
							newPageIndex = myApp.currentPageIndex + 1;
							if ( myApp.checkPageIndexOutOfBound( newPageIndex ) ) {
								return;
							}
							newCommand = MyApp.Command_NextPage;
						}
					}
				} else {
					var isClickLeftOneThird = event.clientX - $img.offset().left < $img.width() / 3;
					if ( isClickLeftOneThird ) {
						newPageIndex = myApp.currentPageIndex - 1;
						if ( myApp.checkPageIndexOutOfBound( newPageIndex ) ) {
							return;
						}
						newCommand = MyApp.Command_PreviousPage;
					} else {
						newPageIndex = myApp.currentPageIndex + 1;
						if ( myApp.checkPageIndexOutOfBound( newPageIndex ) ) {
							return;
						}
						newCommand = MyApp.Command_NextPage;
					}
				}

				myApp.updatePageByIndex( newPageIndex, newCommand );
			}
		} );
	},

	initSidePanel: function() {
		var myApp = this;

		myApp.$SidePanel = $( "#mmSidePanel" );

		myApp.$SidePanel
			.hover( function( event ) {
				var $sp = $( this ), isHoverHandle = event.clientX - this.offsetLeft > $sp.outerWidth() - 8;
				if ( isHoverHandle ) {
					if ( parseInt( $sp.css( "left" ) ) < 0 ) {
						$sp.css( "left", 0 );
					}
				}
			}, function() {
				//do nothing
			} )
			.bind( 'click', function( event ) {
				var $sp = $( this ), isClickHandle = event.clientX - this.offsetLeft > $sp.outerWidth() - 8;
				if ( isClickHandle ) {
					if ( parseInt( $sp.css( "left" ) ) < 0 ) {
						$sp.css( "left", 0 );
					} else {
						var visibleBorderWidth = 1;
						$sp.css( "left", -$sp.outerWidth() + visibleBorderWidth );
					}
				}

				return false;
			} )
			.hide()
			.css( { left: -myApp.$SidePanel.outerWidth() + 1 } );
	},

	initControlPanel: function() {
		var myApp = this, timerID;

		myApp.$ControlPanelMessage = $( "#mmControlPanel-Message" );
		myApp.$PageNumberSelect = $( ".page-Number" );

		myApp.$ControlPanelMessage.bind( 'click', function( event ) {
			$( "#mmMenuAdvanced" ).hide();
			$( "#mmMenuCustomMode" ).hide();

			if ( parseInt( myApp.$ControlPanel.css( "bottom" ) ) < 0 ) {
				myApp.$mmInfoPanel.css( "top", 0 );
				myApp.$ControlPanel.css( "bottom", 0 );
			} else {
				myApp.$mmInfoPanel.css( "top", -myApp.$mmInfoPanel.height() );
				myApp.$ControlPanel.css( "bottom", -myApp.$ControlPanel.height() );
			}

			return false;
		} );

		////
		myApp.$mmInfoPanel = $( "#mmInfoPanel" )
			.hover( function( event ) {
					myApp.$mmInfoPanel.css( "top", 0 );
					myApp.$ControlPanel.css( "bottom", 0 );
					clearTimeout( timerID );
				}, function() {
					// auto hide
					timerID = window.setTimeout( function() {
						$( "#mmMenuAdvanced" ).hide();
						$( "#mmMenuCustomMode" ).hide();
						myApp.$PageNumberSelect.blur();
						myApp.$mmInfoPanel.css( "top", -myApp.$mmInfoPanel.height() );
						myApp.$ControlPanel.css( "bottom", -myApp.$ControlPanel.height() );
					}, 6000 );
				} )
			.bind( 'click', function( event ) {
				if ( event.target === this ) {
					$( "#mmMenuAdvanced" ).hide();
					$( "#mmMenuCustomMode" ).hide();

					if ( parseInt( myApp.$mmInfoPanel.css( "top" ) ) < 0 ) {
						myApp.$mmInfoPanel.css( "top", 0 );
						myApp.$ControlPanel.css( "bottom", 0 );
					} else {
						myApp.$mmInfoPanel.css( "top", -myApp.$mmInfoPanel.height() );
						myApp.$ControlPanel.css( "bottom", -myApp.$ControlPanel.height() );
					}
				}

				return false;
			} );

		$( "<span>" ).text( myApp.itemsDataSource.getComicName() ).appendTo(  $( "#mmComicName" ).width( 150 ) );

		if ( myApp.itemsDataSource.hasPrevVolume ) {
			$( '<a href="#" id="mmPrevVolume" class="xxButton vol-Prev" title="上一卷" accesskey="a"><span>Prev</span></a>' )
				.bind( "click", function() {
						var prevURL = myApp.itemsDataSource.getPrevVolume();
						if ( prevURL ) {
							window.location.href = prevURL;
						} else {
							myApp.$IzMessageBox.izMessageBox( "show", "找不到上一卷", { autoClose: true } );
						}
					} )
				.appendTo(  $( "#mmVolumeNavigation" ) );
		}

		if ( myApp.itemsDataSource.hasNextVolume ) {
			$( '<a href="#" id="mmNextVolume" class="xxButton vol-Next" title="下一卷" accesskey="z"><span>Next</span></a>' )
				.bind( "click", function() {
						var nextURL = myApp.itemsDataSource.getNextVolume();
						if ( nextURL ) {
							window.location.href = nextURL;
						} else {
							myApp.$IzMessageBox.izMessageBox( "show", "找不到下一卷", { autoClose: true } );
						}
					} )
				.appendTo( $( "#mmVolumeNavigation" ) );
		}

		myApp.$ControlPanel = $( "#mmControlPanel" )
			.hover( function( event ) {
				myApp.$mmInfoPanel.css( "top", 0 );
				myApp.$ControlPanel.css( "bottom", 0 );
				clearTimeout( timerID );
			}, function() {
				// auto hide
				timerID = window.setTimeout( function() {
					$( "#mmMenuAdvanced" ).hide();
					$( "#mmMenuCustomMode" ).hide();
					myApp.$PageNumberSelect.blur();
					myApp.$mmInfoPanel.css( "top", -myApp.$mmInfoPanel.height() );
					myApp.$ControlPanel.css( "bottom", -myApp.$ControlPanel.height() );
				}, 6000 );
			} )
			.bind( 'click', function( event ) {
				if ( event.target === this ) {
					$( "#mmMenuAdvanced" ).hide();
					$( "#mmMenuCustomMode" ).hide();

					if ( parseInt( myApp.$ControlPanel.css( "bottom" ) ) < 0 ) {
						myApp.$mmInfoPanel.css( "top", 0 );
						myApp.$ControlPanel.css( "bottom", 0 );
					} else {
						myApp.$mmInfoPanel.css( "top", -myApp.$mmInfoPanel.height() );
						myApp.$ControlPanel.css( "bottom", -myApp.$ControlPanel.height() );
					}
				}

				return false;
			} );

		//-- OutputList
		$( "#mmOutputList-close" ).bind( 'click', function() {
			$( "#mmOutputList" ).hide();
		} );

		//-- Advanced Menu
		$( ".xxButton.menu-Advanced" ).bind( 'click', function() {
			var $globalText = $( ".xxButton.tool-Settings-Global span" ),
				$localText = $( ".xxButton.tool-Settings-Local span" );

			if ( MyConfig.gmUsed ) {
				$globalText.html( $globalText.html().replace( "*", "" ) + "*" );
			} else {
				$globalText.html( $globalText.html().replace( "*", "" ) );
			}

			if ( MyConfig.cookieUsed || MyConfig.storageUsed ) {
				$localText.html( $localText.html().replace( "*", "" ) + "*" );
			} else {
				$localText.html( $localText.html().replace( "*", "" ) );
			}

			$( "#mmMenuAdvanced" ).slideToggle( "fast" );
		} );

		$( "#mmMenuAdvanced" ).append( "<div style='margin-right:5px;font:12px Helvetica,Arial,sans-serif;text-align:right;'><a href='http://userscripts.org/scripts/show/135690' target='_blank' title='MoreManga'>v" + _unsafeWindow.MoreManga.version + "</a></div>" );

		if ( MyConfig.gmEnabled ) {
			$( ".xxButton.tool-Settings-Global" ).bind( 'click', function( event ) {
				var dlg = OptionsDialog.getInstance();
				if ( dlg.dialog.style.display === "none" ) {
					dlg
						.setTitleText( "偏好設定 (通用) - Greasemonkey" )
						.init( {
							app: myApp,
							config: MyConfig.loadFromGlobal() || MyConfig.load( true ),
							configType: MyConfig.Greasemonkey
						} )
						.loadConf()
						.show();
				}
			} );
		} else {
			$( ".xxButton.tool-Settings-Global" ).parent().hide();
		}

		if ( MyConfig.cookieEnabled || MyConfig.storageEnabled ) {
			$( ".xxButton.tool-Settings-Local" ).bind( 'click', function( event ) {
				var dlg = OptionsDialog.getInstance();
				if ( dlg.dialog.style.display === "none" ) {
					dlg
						.setTitleText( "偏好設定 (個別) - " + ( MyConfig.storageEnabled ? "LocalStorage" : "Cookie" ) )
						.init( {
							app: myApp,
							config: MyConfig.loadFromLocal() || MyConfig.load( true ),
							configType: MyConfig.LocalStorage
						} )
						.loadConf()
						.show();
				}
			} );
		} else {
			$( ".xxButton.tool-Settings-Local" ).parent().hide();
		}

		$( ".xxButton.tool-List" ).bind( 'click', function() {
			var $btn = $( this ), $output = $( "#mmOutputList" );

			if ( $output.is( ":visible" ) ) {
				$output.hide();
				return;
			}

			if ( !$btn.hasClass( "selected" ) ) {
				$btn.addClass( "selected" );
				myApp.itemsDataSource.selectAllData();
			}
		} );

		$( ".xxButton.tool-Cache" ).bind( 'click', function() {
			var $btn = $( this );
			if ( $btn.hasClass( "selected" ) ) {
				$btn.removeClass( "selected" );
				myApp.$SidePanel.hide();
			} else {
				$btn.addClass( "selected" );
				myApp.$SidePanel.show().css( "left", 0 );
			}
		} );

		$( ".xxButton.view-TurboMode" ).bind( 'click', function() {
			var $btn = $( this );

			if ( $btn.hasClass( "selected" ) ) {
				$btn.removeClass( "selected" );
				myApp.useOverlay( false );
			} else {
				$btn.addClass( "selected" );
				myApp.useOverlay( true );
			}

			myApp.updatePageByIndex( myApp.currentPageIndex );
		} );

		$( ".xxButton.view-AutoSplit" ).bind( 'click', function() {
			var $btn = $( this );
			if ( $btn.hasClass( "selected" ) ) {
				$btn.removeClass( "selected" );
				myApp.useAutoSplit( false );
			} else {
				$btn.addClass( "selected" );
				myApp.useAutoSplit( true );
			}

			myApp.updatePageByIndex( myApp.currentPageIndex );
		} );

		//-- Page Navigation
		$( ".xxButton.page-First" ).bind( 'click', function() {
			if ( myApp.currentPageIndex === 1 ) {
				if ( !myApp.$IzImage.hasClass( "Splitted" ) || ( myApp.$IzImage.hasClass( "Splitted" ) && myApp.$IzImage.hasClass( "Right" ) ) ) {
					myApp.$IzMessageBox.izMessageBox( "show", "這是第一頁", { autoClose: true } );
					return;
				}
			}

			var newPageIndex = 1;
			myApp.updatePageByIndex( newPageIndex, MyApp.Command_FirstPage );
		} );

		$( ".xxButton.page-Prev" ).bind( 'click', function() {
			var newPageIndex;

			if ( myApp.$IzImage.hasClass( "Splitted" ) && myApp.$IzImage.hasClass( "Left" ) ) {
				newPageIndex = myApp.currentPageIndex;
			} else {
				newPageIndex = myApp.currentPageIndex - 1;
				if ( myApp.checkPageIndexOutOfBound( newPageIndex ) ) {
					return;
				}
			}

			myApp.updatePageByIndex( newPageIndex, MyApp.Command_PreviousPage );
		} );

		$( ".xxButton.page-Next" ).bind( 'click', function() {
			var newPageIndex;

			if ( myApp.$IzImage.hasClass( "Splitted" ) && myApp.$IzImage.hasClass( "Right" ) ) {
				newPageIndex = myApp.currentPageIndex;
			} else {
				newPageIndex = myApp.currentPageIndex + 1;
				if ( myApp.checkPageIndexOutOfBound( newPageIndex ) ) {
					return;
				}
			}

			myApp.updatePageByIndex( newPageIndex, MyApp.Command_NextPage );
		} );

		$( ".xxButton.page-Last" ).bind( 'click', function() {
			if ( myApp.currentPageIndex === myApp.itemsDataSource.getRowCount() ) {
				if ( !myApp.$IzImage.hasClass( "Splitted" ) || ( myApp.$IzImage.hasClass( "Splitted" ) && myApp.$IzImage.hasClass( "Left" ) ) ) {
					myApp.$IzMessageBox.izMessageBox( "show", "這是最後一頁", { autoClose: true } );
					return;
				}
			}

			var newPageIndex = myApp.itemsDataSource.getRowCount();
			myApp.updatePageByIndex( newPageIndex, MyApp.Command_LastPage );
		} );

			// init PageNumber select
		var rowCount = this.itemsDataSource.getRowCount(), pageText, elementsHtml = "";
		for ( var i = 1; i <= rowCount; ++i ) {
			pageText = i;
			if ( i < 10 ) {
				pageText = "00" + i;
			} else if ( i < 100 ) {
				pageText = "0" + i;
			}
			elementsHtml += "<option value='" + i + "'>第 "+ pageText + " 頁</option>";
		}
		myApp.$PageNumberSelect.html( elementsHtml );

		myApp.$PageNumberSelect.find( "option:nth-child(" + myApp.currentPageIndex + ")" ).attr( 'selected', "selected" );

		myApp.$PageNumberSelect
			.bind( 'change', function() {
				var newPageIndex = $( this ).val();
				myApp.updatePageByIndex( newPageIndex, MyApp.Command_JumpToPage );
			} );

		//--	Page Display
		var fitEventHelper = function( target, fitMode ) {
			myApp.$IzImage.izImage( "setFitMode",  fitMode );
			myApp.$IzImage.izImage( "fit" );

			if ( IzConfig["Image-AutoTop"] ) {
				window.scrollTo( 0, myApp.$IzImage.position().top );
			}

			$( "#mmFitRadio > .xxRadio").removeClass( "selected" );
			$( target ).addClass( "selected" );
			$( "#mmMenuCustomMode" ).hide();
		};

		var fitCustomEventHelper = function( target, customMode, settings ) {
			myApp.$IzImage.izImage( "setFitMode", MyConfig.View_Custom );
			myApp.$IzImage.izImage( "setCustomMode", customMode, settings );
			myApp.$IzImage.izImage( "fit" );

			if ( IzConfig["Image-AutoTop"] ) {
				window.scrollTo( 0, myApp.$IzImage.position().top );
			}

			$( "#mmMenuCustomMode .xxRadio").removeClass( "selected" );
			$( target ).addClass( "selected" );
		};

		$( ".xxRadio.fit-IntrinsicSize" ).bind( 'click', function() {
			fitEventHelper( this, MyConfig.View_IntrinsicSize );
		} );

		$( ".xxRadio.fit-BestSize" ).bind( 'click', function() {
			fitEventHelper( this, MyConfig.View_BestFit );
		} );

		$( ".xxRadio.fit-Width" ).bind( 'click', function() {
			fitEventHelper( this, MyConfig.View_Width );
		} );

		$( ".xxRadio.fit-Height" ).bind( 'click', function() {
			fitEventHelper( this, MyConfig.View_Height );
		} );

		//# $( "#mmMenuCustomMode" ).bind( 'click', function() {} );

		$( ".xxRadio.fit-Custom" ).bind( 'click', function() {
			myApp.$IzImage.izImage( "setFitMode", MyConfig.View_Custom );
			myApp.$IzImage.izImage( "fitCustom" );

			$( "#mmMenuCustomMode" ).toggle( "fast" );

			$( "#mmFitRadio > .xxRadio").removeClass( "selected" );
			$( this ).addClass( "selected" );
		} );

		$( ".xxRadio.custom-MaxWidth" ).bind( 'click', function() {
			fitCustomEventHelper( this, MyConfig.View_Custom_MaxWidth, { maxWidth: $( ".txtCustom-MaxWidth" ).val() } );
		} );

		$( ".xxRadio.custom-MaxHeight" ).bind( 'click', function() {
			fitCustomEventHelper( this, MyConfig.View_Custom_MaxHeight, { maxHeight: $( ".txtCustom-MaxHeight" ).val() } );
		} );

		$( ".xxRadio.custom-FixedSize" ).bind( 'click', function() {
			fitCustomEventHelper( this, MyConfig.View_Custom_FixedSize, { fixedSize: {	w: $( ".txtCustom-FixedSize-Width" ).val(), h: $( ".txtCustom-FixedSize-Height" ).val() } } );
		} );

		$( ".xxRadio.custom-Zoom" ).bind( 'click', function() {
			fitCustomEventHelper( this, MyConfig.View_Custom_Zoom, { zoom: $( ".txtCustom-Zoom" ).val() } );
		} );

		$( "#mmMenuCustomMode input" )
			.bind( 'focus', function() {
				this.setSelectionRange( 0, parseInt( this.value.length, 10 ) );
			} )
			.bind( 'keyup', function( event ) {
				if ( event.keyCode === KeyEvent.DOM_VK_RETURN ) { // 13
					switch ( this.className ) {
						case "txtCustom-MaxWidth":
							$( ".xxRadio.custom-MaxWidth" ).trigger( 'click' );
							break;

						case "txtCustom-MaxHeight":
							$( ".xxRadio.custom-MaxHeight" ).trigger( 'click' );
							break;

						case "txtCustom-FixedSize-Width":
						case "txtCustom-FixedSize-Height":
							$( ".xxRadio.custom-FixedSize" ).trigger( 'click' );
							break;

						case "txtCustom-Zoom":
							$( ".xxRadio.custom-Zoom" ).trigger( 'click' );
							break;
					}
				}
			} );
	},

	switchStyle: function() {
		if ( !$( "#izStyle-MoreManga-Base" ).length ) {
			$( "<style id='izStyle-MoreManga-Base' type='text/css'></style>" ).text(
'#mmImage {margin:0;padding:2px 0;border:none;}.izMessageBox-ClientArea {font:18px/50px "Microsoft JhengHei",sans-serif;text-align:center;}#mmPhotoGird {position:relative;}#mmPhotoGird .izPhotoGird-Container {text-align:left;}#mmPhotoGird li {border-color:#ccc;background:#eee;opacity:0.6;}#mmPhotoGird li:before {content:attr(title);display:block;position:absolute;width:75px;color:#eeee50;font:bold 32px Helvetica,Arial,sans-serif;text-align:center;text-shadow:1px 1px 0px #101000,-1px -1px 0px #101000;}#mmPhotoGird li.current {outline:2px solid #ff6f6f;outline-offset:-3px;color:#660000;text-shadow:1px 1px 0px #fff,-1px -1px 0px #fff;opacity:1;}#mmPhotoGird li:hover {color:#660000;text-shadow:1px 1px 0px #fff,-1px -1px 0px #fff;opacity:1;}#mmPhotoGird li img {width:75px;height:90px;border:none;}#mmSidePanel {position:fixed;z-index:1010;top:0;left:-242px;padding:0;border-right:5px solid rgba(125,125,125,0.1);background-color:rgba(255,255,255,0.9);-moz-user-select:-moz-none;-webkit-user-select:none;}#mmOutputList {display:none;position:fixed;z-index:1020;top:35px;left:100px;width:400px;height:500px;border:10px solid rgba(255,255,255,1);box-shadow:1px 1px 3px 1px rgba(215,215,215,0.9);background-color:#e7fbfe;}#mmOutputList-close {position:absolute;top:-23px;right:-23px;z-index:1021;width:20px;height:20px;border:2px solid #fff;border-radius:15px;box-shadow:0px 0px 1px 0px rgba(0,0,0,0.5);background-color:rgba(128,128,128,1);color:#fff;text-align:center;font:bold 12px/20px Helvetica,Arial,sans-serif; cursor:pointer;}#mmOutputList-close:hover {background-color:rgba(96,96,96,1);}#mmOutputList-clientArea {overflow:auto;width:390px;height:490px;padding:5px;white-space:nowrap;}#mmControlPanel, #mmInfoPanel {position:fixed;z-index:1010;right:0px;min-height:42px;width:100%;padding:0;border-radius:3px;border:1px solid rgba(215,215,215,0.9);background-color:rgba(255,255,255,0.9);-moz-transition:top 0.5s linear, bottom 0.5s linear;-webkit-transition:top 0.5s linear, bottom 0.5s linear;-moz-user-select:-moz-none;-webkit-user-select:none;}#mmInfoPanel {top:-42px;}#mmComicName {margin:0px 2px 0 0;color:#000;font:24px/42px "Microsoft JhengHei",sans-serif;text-align:center;vertical-align:middle;}#mmVolumeNavigation {position:absolute;top:0;right:0;margin:0;padding:3px 20px;}#mmControlPanel {bottom:-42px;}#mmControlPanel-Message {position:absolute;top:-33px;right:20px;height:32px;min-width:120px;border:1px solid rgba(215,215,215,0.9);border-bottom:1px solid #fff;border-radius:5px 5px 0 0;background-color:rgba(255,255,255,0.9);color:rgba(0,0,0,0.8);text-align:center;}#mmControlPanel-Message span {font:bold 18px/32px Helvetica,Arial,sans-serif;}#mmControlPanel-Message > span img {vertical-align:-6px;}a.xxButton,a.xxRadio {display:inline-block;height:32px;min-width:60px;margin:0px 2px 0 0;padding:0 3px;border:1px solid rgba(150,150,150,0.7);background-color:#fff;color:#000;font:18px/32px "Microsoft JhengHei",sans-serif;text-align:center;vertical-align:middle;text-decoration:none;cursor:pointer;}a.xxButton:hover,a.xxRadio:hover {box-shadow:0px 0px 3px 0px rgba(0,0,255,0.9);background-color:#fff;color:#ff3636;}a.xxButton span,a.xxRadio span {color:#000;font:18px/32px "Microsoft JhengHei",sans-serif;}a.xxButton.selected,a.xxRadio.selected {border:1px solid rgba(215,215,215,0.5);background-color:#929292;color:#fff;}a.xxButton:active,a.xxRadio:active {box-shadow:inset 0px 0px 8px 0px rgba(155,155,155,0.5);}a.xxButton:focus,a.xxRadio:focus {outline:0px solid #fff;}.xxMenu {border:10px solid rgba(255,255,255,1);box-shadow:1px 1px 3px 1px rgba(215,215,215,0.9);background-color:#e7fbfe;}#mmTools {position:absolute;top:0;left:0;margin:0;padding:3px 20px;}#mmMenuAdvanced {display:none;position:absolute;bottom:42px;left:10px;padding:5px;white-space:nowrap;}#mmMenuAdvanced > div {margin:5px 0;}#mmMenuAdvanced .xxButton {min-width:120px;}#mmPageNavigation {display:block;width:445px;margin:0px auto;padding:3px 0;white-space:nowrap;opacity:0.7;}#mmPageNavigation > .xxButton {width:75px;}#mmPageNavigation > select {margin:0;padding:0;border:1px solid rgba(150,150,150,0.7);background:#fff;font:24px "Microsoft JhengHei",sans-serif;vertical-align:middle;}#mmPageDisplay {position:absolute;top:0;right:0;margin:0;padding:3px 20px;}#mmFitRadio > .xxRadio:not(.selected) {display:none;}#mmPageDisplay:hover {padding:0px;}#mmPageDisplay:hover > #mmFitRadio > .xxRadio {display:inline-block;}#mmPageDisplay:hover > #mmFitRadio {padding:2px 20px;border:1px solid red;background-color:#eea;}#mmMenuCustomMode {display:none;position:absolute;bottom:42px;right:10px;padding:5px;padding:5px;text-align:left;}#mmCustomRadio > div {margin:5px 0;padding:0;border:1px solid rgba(255,255,255,0.1);font:18px/32px "Microsoft JhengHei",sans-serif;white-space:nowrap;}#mmCustomRadio input {font-size:18px;text-align:right;}#mmCustomRadio input:focus {box-shadow:0px 0px 3px 2px rgba(155,155,155,0.8);}#mmOptionsDialog {position:fixed;z-index:1030;top:10px;left:150px;min-width:450px;border:1px solid rgba(200,200,200,0.5);box-shadow:2px 2px 3px 0px rgba(0,0,0,0.5);background:#fff;text-align:left;}#mmOptionsDialog .xxTitlebar {padding:5px 10px;border-bottom:1px solid rgba(200,200,200,0.5);background:#eee;text-align:center;}#mmOptionsDialog .xxTab {margin:0 10px;}#mmOptionsDialog fieldset {margin:5px 0;padding:3px 10px;}#mmOptionsDialog input[type="checkbox"] {vertical-align:middle;}#mmOptionsDialog input[type="text"] {border:1px solid #aaa;text-align:right;}#mmOptionsDialog input[type="button"] {padding:2px 5px;border:1px solid #aaa;}#mmDialogBtn {margin:10px 0;text-align:center;}'
				).appendTo( document.head );
		}

		var $styleTheme = $( "#izStyle-MoreManga-Theme" );
		if ( !$styleTheme.length ) {
			$styleTheme = $( "<style id='izStyle-MoreManga-Theme' type='text/css'></style>" ).appendTo( document.head );
		}

		switch ( IzConfig["Theme-Style"] ) {
			case MyConfig.Style_iPad_White:
				$styleTheme.text(
'.izMessageBox,.izMessageBox-Titlebar {border-radius:8px;}.izMessageBox-ClientArea {font:20px "Microsoft JhengHei",sans-serif;}#mmOutputList {border:15px solid rgba(255,255,255,0.9);border-radius:20px;box-shadow:1px 1px 3px 1px rgba(215,215,215,0.9);background-color:#e7fbfe;background-image:-moz-linear-gradient(right bottom,#ccc,#eee,#eee);background-image:-webkit-linear-gradient(right bottom,#ccc,#eee,#eee);}#mmOutputList-close {top:-36px;right:-36px;width:32px;height:32px;border-radius:25px;font:bold 18px/32px Helvetica,Arial,sans-serif;}#mmControlPanel {bottom:-54px;min-height:54px;}#mmInfoPanel {top:-54px;min-height:54px;}#mmComicName {font:28px/54px "Microsoft JhengHei",sans-serif;}#mmControlPanel-Message {border-radius:8px 8px 0 0;text-shadow:rgba(50,50,50,0.2) 0px -1px 0px;}#mmControlPanel-Message span {font:18px/32px Helvetica,Arial,sans-serif;}a.xxButton,a.xxRadio {display:inline-block;height:44px;margin:1px 2px;padding:0 6px;box-shadow:0px 0px 1px 0px rgba(0,0,0,0.5);border:1px solid rgba(100,100,100,0.5);border-radius:8px;background-image:-moz-linear-gradient(top,#fff,#f8f8f8,#eee);background-image:-webkit-linear-gradient(top,#fff,#f8f8f8,#eee);color:#333;font:18px/44px "Microsoft JhengHei",sans-serif;text-shadow:rgba(50,50,50,0.2) 0px -1px 0px;}a.xxButton span,a.xxRadio span {color:#000;font:18px/44px "Microsoft JhengHei",sans-serif;}a.xxButton:hover,a.xxRadio:hover {box-shadow:0px 0px 1px 0px rgba(0,0,0,0.5),inset 0px 0px 1px 0px rgba(0,0,0,0.3);background-image:-moz-linear-gradient(top,#fff,#f8f8f8,#eee);background-image:-webkit-linear-gradient(top,#fff,#f8f8f8,#eee);color:#000;}a.xxButton.selected,a.xxRadio.selected {box-shadow:inset -1px -1px 1px 0px rgba(255,255,255,0.3),inset 1px 1px 1px 0px rgba(0,0,0,0.3);background-image:-moz-linear-gradient(bottom,#ccc,#bbb,#aaa);background-image:-webkit-linear-gradient(bottom,#ccc,#bbb,#aaa);text-shadow:rgba(150,150,150,0.7) 0px -2px 2px;}a.xxButton:active,a.xxRadio:active {box-shadow:inset 0px 0px 8px 0px rgba(155,155,155,0.5);}a.xxButton:focus,a.xxRadio:focus {outline:0px solid #fff;}.xxMenu {border:3px solid rgba(150,150,150,1);box-shadow:1px 2px 2px 1px rgba(215,215,215,0.9);background-color:#eee;background-image:-moz-linear-gradient(left,#eee,#fff 90%);background-image:-webkit-linear-gradient(left,#eee,#fff 90%);text-shadow:rgba(50,50,50,0.2) 0px -1px 0px;}#mmMenuAdvanced {bottom:55px;left:10px;}#mmPageNavigation {width:540px;}#mmPageNavigation > .xxButton {width:80px;}#mmPageNavigation > select {margin:0 2px;padding:5px 5px;border:1px solid rgba(180,180,180,0.8);border-radius:8px;box-shadow:1px 1px 1px 0px rgba(0,0,0,0.5);color:#000;text-shadow:rgba(50,50,50,0.5) 0px -1px 0px;}#mmPageDisplay {position:absolute;top:0;right:0;margin:0;padding:3px 20px;}#mmFitRadio > .xxRadio:not(.selected) {display:none;}#mmPageDisplay:hover {padding:0px;}#mmPageDisplay:hover > #mmFitRadio > .xxRadio {display:inline-block;}#mmPageDisplay:hover > #mmFitRadio {padding:2px 20px;border:1px solid rgba(100,100,100,0.1);border-radius:8px 0 0 8px;box-shadow:0px 0px 2px 0px rgba(155,155,155,0.5);background:#eee;background-image:-moz-linear-gradient(left,#f3f3f3,#fff 50%,#f3f3f3);background-image:-webkit-linear-gradient(left,#f3f3f3,#fff 50%,#f3f3f3);}#mmMenuCustomMode {bottom:55px;}#mmCustomRadio input {padding:0 2px;border:1px dashed rgb(204,204,204);border-radius:3px;font-size:18px;}#mmCustomRadio input:focus {box-shadow:0px 0px 3px 2px rgba(155,155,155,0.8);}#mmOptionsDialog {border:none;border-radius:15px;font:18px "Microsoft JhengHei",sans-serif;}#mmOptionsDialog * {font:18px "Microsoft JhengHei",sans-serif;}#mmOptionsDialog .xxTitlebar {border-bottom:1px solid rgba(180,180,180,0.5);border-radius:15px 15px 0 0;}#mmOptionsDialog fieldset {border:1px solid rgba(100,100,100,0.58);border-radius:8px;}#mmOptionsDialog input[type="button"] {height:44px;width:60px;margin:1px 2px;padding:2px 5px;box-shadow:0px 0px 1px 0px rgba(0,0,0,0.5);border:1px solid rgba(100,100,100,0.5);border-radius:8px;background-image:-moz-linear-gradient(top,#fff,#f8f8f8,#eee);background-image:-webkit-linear-gradient(top,#fff,#f8f8f8,#eee);color:#333;text-shadow:rgba(50,50,50,0.2) 0px -1px 0px;}#mmOptionsDialog input[type="text"] {margin:1px 3px;padding:0 5px;border-width:1px;border-style:solid;border-color:rgb(146,146,147) rgb(174,174,174) rgb(189,189,189);border-radius:3px;box-shadow:inset 0px 2px 3px -1px rgba(0,0,0,0.2),1px 1px 3px 0px rgba(255,255,255,0.3);}#mmOptionsDialog select {margin:1px 3px;padding:0 0 0 2px;border:1px solid rgba(180,180,180,0.8);border-radius:3px;color:#000;text-shadow:rgba(50,50,50,0.2) 0px -1px 0px;}'
					).removeClass().addClass( "iPad_White" );
				break;

			case MyConfig.Style_iPad_Black:
						$styleTheme.text(
'.izMessageBox {border:none;border-radius:6px;background-image:none;background:rgba(50,50,50,0.8);text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}.izMessageBox-Titlebar {border:none;border-top-left-radius:4px;border-top-right-radius:4px;background-image:none;background:rgba(50,50,50,0.8);text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}.izMessageBox-ClientArea {font:20px "Microsoft JhengHei",sans-serif;text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;}.izMessageBox-ButtonPane {border-radius:4px;}#mmPhotoGird li.current {outline:none;}#mmSidePanel {background-color:rgba(50,50,50,0.9);}#mmOutputList {border:15px solid rgba(50,50,50,1);border-radius:20px;box-shadow:1px 1px 3px 1px rgba(75,75,75,0.9);background-color:#e7fbfe;background-image:-moz-linear-gradient(right bottom,#ccc,#eee,#eee);background-image:-webkit-linear-gradient(right bottom,#ccc,#eee,#eee);}#mmOutputList-close {top:-36px;right:-36px;width:32px;height:32px;border-radius:25px;font:bold 18px/32px Helvetica,Arial,sans-serif;}#mmControlPanel, #mmInfoPanel {min-height:52px;border:none;border-top:1px solid rgba(20,20,20,0.9);border-radius:0;background-color:rgba(50,50,50,0.9);}#mmControlPanel {bottom:-54px;}#mmInfoPanel {top:-52px;}#mmComicName {color:#fff;font:25px/54px "Microsoft JhengHei",sans-serif;}#mmControlPanel-Message {top:-34px;border-radius:8px 8px 0 0;border:1px solid rgba(0,0,0,0.9);border-bottom:1px solid rgba(70,70,70,1);background-color:rgba(50,50,50,0.9);text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}#mmControlPanel-Message span {font:18px/32px Helvetica,Arial,sans-serif;color:#eee;}a.xxButton,a.xxRadio {display:inline-block;height:44px;margin:1px 2px;padding:0 6px;box-shadow:0px 1px 0px 0px rgba(120,120,120,1);border:1px solid rgba(96,96,96,1);border-radius:8px;background-image:-moz-linear-gradient(top,#888,#777,#333 60%);background-image:-webkit-linear-gradient(top,#888,#777,#333 60%);color:#fff;font:18px/44px "Microsoft JhengHei",sans-serif;text-shadow:rgba(255,255,255,0.8) 0px -1px 0px;}a.xxButton span,a.xxRadio span {color:#fff;font:18px/44px "Microsoft JhengHei",sans-serif;}a.xxButton:hover,a.xxRadio:hover {box-shadow:none;color:#fff;}a.xxButton.selected,a.xxRadio.selected {box-shadow:inset -1px -1px 1px 0px rgba(255,255,255,0.3),inset 1px 1px 1px 0px rgba(0,0,0,0.3);background-image:-moz-linear-gradient(top,#555,#aaa,#555);background-image:-webkit-linear-gradient(bottom,#555,#aaa,#555);text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}a.xxButton:active,a.xxRadio:active {box-shadow:inset 0px 0px 4px 4px rgba(255,255,255,0.5);}a.xxButton:focus,a.xxRadio:focus {outline:0px solid #fff;}.xxMenu {border:3px solid rgba(50,50,50,1);box-shadow:1px 2px 2px 1px rgba(75,75,75,0.9);background:#333;background-image:none;color:#eee;text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}#mmMenuAdvanced {bottom:70px;left:10px;padding:0;border-radius:8px;}#mmMenuAdvanced > div {margin:2px 0;padding:0;border:none;}#mmMenuAdvanced:after {display:block;position:absolute;bottom:-15px;left:40px;width:0;border-width:15px 15px 0px;border-style:solid;border-color:rgba(50,50,50,1) transparent;content:"";}#mmMenuAdvanced:before {display:block;position:absolute;bottom:-16px;left:42px;width:0;border-width:15px 15px 0px;border-style:solid;border-color:rgba(50,50,50,0.5) transparent;content:"";}#mmMenuAdvanced a.xxButton {min-width:150px;border-radius:4px;box-shadow:none;background:#fff;background-image:none;color:#000;text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}#mmMenuAdvanced a.xxButton span {color:#000;}#mmMenuAdvanced a.xxButton.selected {background:#bbb;color:#fff;}#mmPageNavigation {width:540px;}#mmPageNavigation > .xxButton {width:80px;}#mmPageNavigation > select {margin:0 2px;padding:5px 5px;border:1px solid rgba(180,180,180,0.8);border-radius:8px;box-shadow:1px 1px 1px 0px rgba(0,0,0,0.5);background:#333;color:#eee;font:24px/32px "Microsoft JhengHei",sans-serif;text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}#mmPageDisplay {position:absolute;top:0;right:0;margin:0;padding:3px 20px;}#mmFitRadio > .xxRadio:not(.selected) {display:none;}#mmPageDisplay:hover {padding:0px;}#mmPageDisplay:hover > #mmFitRadio > .xxRadio {display:inline-block;}#mmPageDisplay:hover > #mmFitRadio {padding:2px 20px;border:1px solid rgba(100,100,100,0.1);border-radius:8px 0 0 8px;box-shadow:0px 0px 2px 0px rgba(155,155,155,0.5);background:#555;background-image:-moz-linear-gradient(left,#555 90%,#333);background-image:-webkit-linear-gradient(left,#555 90%,#333);}#mmMenuCustomMode {bottom:55px;padding:3px;border-radius:8px;color:#000;}#mmCustomRadio {padding:5px;border-radius:4px;background:#ccc;}#mmCustomRadio > div {margin:0;padding:0 2px;border:none;}#mmCustomRadio a.xxRadio,#mmCustomRadio a.xxRadio span {height:30px;border-radius:4px;font:18px/30px "Microsoft JhengHei",sans-serif;}#mmCustomRadio input {padding:0 2px;border:2px dashed rgb(104,104,104);border-radius:3px;background:#eee;color:#000;font-size:18px;}#mmCustomRadio input:focus {box-shadow:0px 0px 1px 3px rgba(155,155,155,0.9);}#mmOptionsDialog {border:none;border-radius:15px;font:18px "Microsoft JhengHei",sans-serif;text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}#mmOptionsDialog * {font:18px "Microsoft JhengHei",sans-serif;}#mmOptionsDialog .xxTitlebar {border-bottom:1px solid rgba(180,180,180,0.5);border-radius:15px 15px 0 0;}#mmOptionsDialog fieldset {border:1px solid rgba(100,100,100,0.58);border-radius:8px;}#mmOptionsDialog input[type="button"] {height:44px;width:60px;margin:1px 2px;padding:2px 5px;box-shadow:0px 0px 1px 0px rgba(0,0,0,0.5);border:1px solid rgba(100,100,100,0.5);border-radius:8px;background-image:-moz-linear-gradient(top,#fff,#f8f8f8,#eee);background-image:-webkit-linear-gradient(top,#fff,#f8f8f8,#eee);color:#333;text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}#mmOptionsDialog input[type="text"] {margin:1px 3px;padding:0 5px;border-width:1px;border-style:solid;border-color:rgb(146,146,147) rgb(174,174,174) rgb(189,189,189);border-radius:3px;box-shadow:inset 0px 2px 3px -1px rgba(0,0,0,0.2),1px 1px 3px 0px rgba(255,255,255,0.3);}#mmOptionsDialog select {margin:1px 3px;padding:0 0 0 2px;border:1px solid rgba(180,180,180,0.8);border-radius:3px;color:#000;text-shadow:rgba(100,100,100,0.8) 0px -1px 0px;}'
					).removeClass().addClass( "iPad_Black" );
				break;
			default:
				$styleTheme.text( "" ).removeClass().addClass( "Default" );
				break;
		}
	},

	configure: function() {
		var myApp = this;

		if ( IzConfig["UI-InfoPanel-Show"] ) {
			myApp.$mmInfoPanel.show();
		} else {
			myApp.$mmInfoPanel.hide();
		}

		if ( IzConfig["Image-Split-Enable"] ) {
			if ( !myApp.$IzImage.hasClass( "izImageEx" ) || !myApp.$IzImage.izImageEx( "isAutoSplit" ) ) {
				$( ".xxButton.view-AutoSplit" ).addClass( "selected" )
				myApp.useAutoSplit( true );
			}
		} else {
			if ( myApp.$IzImage.hasClass( "izImageEx" ) && myApp.$IzImage.izImageEx( "isAutoSplit" ) ) {
				$( ".xxButton.view-AutoSplit" ).removeClass( "selected" )
				myApp.useAutoSplit( false );
			}
		}

		if ( IzConfig["View-Overlay-Enable"] ) {
			if ( !myApp.$IzImage.hasClass( "izImageEx" ) || !myApp.$IzImage.izImageEx( "isLocked" ) ) {
				$( ".xxButton.view-TurboMode" ).addClass( "selected" );
				myApp.useOverlay( true );
			}
		} else {
			if ( myApp.$IzImage.hasClass( "izImageEx" ) && myApp.$IzImage.izImageEx( "isLocked" ) ) {
				$( ".xxButton.view-TurboMode" ).removeClass( "selected" )
				myApp.useOverlay( false );
			}
		}

		$( ".txtCustom-MaxWidth" ).val( IzConfig["Image-MaxWidth"] );
		$( ".txtCustom-MaxHeight" ).val( IzConfig["Image-MaxHeight"] );
		$( ".txtCustom-FixedSize-Width" ).val( IzConfig["Image-FixedSize"].w );
		$( ".txtCustom-FixedSize-Height" ).val( IzConfig["Image-FixedSize"].h );
		$( ".txtCustom-Zoom" ).val( IzConfig["Image-Zoom"] );

		$( "#mmCustomRadio .xxRadio" ).removeClass( "selected" );
		$( "#mmFitRadio .xxRadio" ).removeClass( "selected" );

		switch ( IzConfig["Image-CustomMode"] ) {
			case MyConfig.View_Custom_MaxWidth: $( ".xxRadio.custom-MaxWidth" ).addClass( "selected" ); break;
			case MyConfig.View_Custom_MaxHeight: $( ".xxRadio.custom-MaxHeight" ).addClass( "selected" ); break;
			case MyConfig.View_Custom_FixedSize: $( ".xxRadio.custom-FixedSize" ).addClass( "selected" ); break;
			case MyConfig.View_Custom_Zoom: $( ".xxRadio.custom-Zoom" ).addClass( "selected" ); break;
		}

		switch ( IzConfig["Image-FitMode"] ) {
			case MyConfig.View_IntrinsicSize: $( ".xxRadio.fit-IntrinsicSize" ).addClass( "selected" ); break;
			case MyConfig.View_BestFit: $( ".xxRadio.fit-BestSize" ).addClass( "selected" ); break;
			case MyConfig.View_Width: $( ".xxRadio.fit-Width" ).addClass( "selected" ); break;
			case MyConfig.View_Height: $( ".xxRadio.fit-Height" ).addClass( "selected" ); break;
			case MyConfig.View_Custom: $( ".xxRadio.fit-Custom" ).addClass( "selected" ); break;
		}

		$( window ).unbind( 'load.izImage' );

		if ( IzConfig["Image-AutoTop"] ) {
			$( window ).bind( 'load.izImage', function() {
				window.scrollTo( 0, myApp.$IzImage.position().top );
			} );
		}

		$( window ).unbind( 'resize.izImage' );

		if ( IzConfig["Image-AutoResize"] ) {
			$( window ).bind( 'resize.izImage', function() {
				myApp.$IzImage.izImage( "fit" );
				if ( IzConfig["Image-AutoTop"] ) {
					window.scrollTo( 0, myApp.$IzImage.position().top );
				}
			} );
		}

		myApp.switchStyle();
	},

	init: function() {
		var myApp = this;

		myApp.$IzMessageBox = $( "<div id='mmMessageBox'></div>" ).izMessageBox( {
			caption: "訊息提示 - MoreManga",
			autoCloseSpeed: 2000,
			buttons: [{
				classname: 'izOK',
				name: 'OK',
				click: function(){ myApp.$IzMessageBox.izMessageBox( "hide" ) }
			}]
		} ).appendTo( document.body );

		myApp.initPhotoGird();

		myApp.initImage();

		myApp.initSidePanel();

		myApp.initControlPanel();

		myApp.configure();

		myApp.itemsDataSource
			.on( "izSelectDataCompletedEvent.DataSource", function( data ) {
				if ( data.beginPageIndex === myApp.currentPageIndex ) {
					if ( myApp.$IzImage.hasClass( "izImageEx" ) && myApp.$IzImage.izImageEx( "isAutoSplit" ) ) {
						var imageLoadOpts, gap = myApp.currentPageIndex - myApp.oldPageIndex;

						// 真實頁數的變動(gap), 可判斷是原頁(== 0) , 上頁(== -1), 下頁(== 1)
						switch ( myApp.currentCommand ) {
							case MyApp.Command_NextPage:
								if ( myApp.$IzImage.hasClass( "Splitted" ) && gap === 0 ) {
									imageLoadOpts = { part: MyConfig.Split_Left };
								} else {
									imageLoadOpts = { part: MyConfig.Split_Right };
								}
								break;

							case MyApp.Command_PreviousPage:
								if ( myApp.$IzImage.hasClass( "Splitted" ) && gap === 0 ) {
									imageLoadOpts = { part: MyConfig.Split_Right };
								} else {
									imageLoadOpts = { part: MyConfig.Split_Left };
								}
								break;

							case MyApp.Command_LastPage:
								imageLoadOpts = { part: MyConfig.Split_Left };
								break;

							case MyApp.Command_FirstPage:
							case MyApp.Command_JumpToPage:
							default:
								imageLoadOpts = { part: MyConfig.Split_Right };
								break;
						}

						myApp.$IzImage.izImageEx( "load", data.rows[0].src, imageLoadOpts );
					} else {
						myApp.$IzImage.izImage( "load", data.rows[0].src );
					}
				}

				// preload images to PhotoGird
				for ( var i = 0; i < data.rows.length; ++i ) {
					$li = myApp.$PhotoGirdItems.eq( DataSource.repairIndexToZero( data.beginPageIndex ) + i );
					if ( $li.find( "img" ).length ) {
						$li.find( "img" ).attr( 'src', data.rows[i].src );
					} else {
						$li.html( $( "<img/>" )
							.bind( 'mousedown', function( event ) {
								// for PhotoGird navigation
								event.preventDefault();
							} )
							.attr( 'src', data.rows[i].src ) );
					}
				}
			} )
			.on( "izSelectAllDataCompletedEvent.DataSource", function( data ) {
				var htmlList = "", $output = $( "#mmOutputList" );

				for ( var i = 0; i < data.rows.length; ++i ) {
					htmlList += "<a title='mm' href='" +  data.rows[i].src + "'>" +  data.rows[i].src + "</a><br />";
				}

				$output.find( "#mmOutputList-clientArea" ).html( htmlList );
				$output.show();

				$( ".xxButton.tool-List" ).removeClass( "selected" );
			} );

		var loadingImage = new Image, loadedImage = new Image, brokenImage = new Image;

		loadingImage.src = "http://imageshack.us/a/img6/1610/loadingqv.gif";
		loadedImage.src = "http://imageshack.us/a/img834/75/donw.png";
		brokenImage.src = "http://imageshack.us/a/img853/2047/errorii.png";

		myApp.$IzImage
			.bind( "izBeforeLoadEvent.izImage", function() {
				myApp.$ControlPanelMessage.find( ".mmImageStatus" ).html( "<img alt='載入中...' title='載入中...' height=24 width=24 src='" + loadingImage.src + "' /> " );
			} )
			.bind( "izLoadedEvent.izImage", function() {
				if ( /_file_broken.png$/.test( this.src ) ) {
					return;
				}

				myApp.$ControlPanelMessage.find( ".mmImageStatus" ).html( "<img alt='載入完成' title='載入完成' height=24 width=24 src='" + loadedImage.src + "' /> " );
			} )
			.bind( "izErrorEvent.izImage", function() {
				myApp.$ControlPanelMessage.find( ".mmImageStatus" ).html( "<img alt='載入錯誤' title='載入錯誤' height=24 width=24 src='" + brokenImage.src + " '/> " );
				$( this )
					.attr( 'src', "http://imageshack.us/a/img211/4175/filebroken.png" )
					.css( { width: 600,	height: 600 } );
			} );

		$( document )
			.bind( 'click', function( event ) {
				$( "#mmMenuAdvanced" ).hide();
				$( "#mmMenuCustomMode" ).hide();
			} )
			.bind( 'keyup', function( event ) {
				switch ( event.keyCode ) {
					case KeyEvent.DOM_VK_LEFT: // 37
						$( ".xxButton.page-Prev" ).trigger( 'click' );
						break;

					case KeyEvent.DOM_VK_RIGHT: // 39
						$( ".xxButton.page-Next" ).trigger( 'click' );
						break;
				}
			} );

		// Start
		myApp.updatePageByIndex( myApp.currentPageIndex, MyApp.Command_JumpToPage );
	}
};

///////////////////////////////////////////////////////////////////////////////

//-- Backbone.js 0.9.2    http://backbonejs.org
var BackboneEvents = {
	eventSplitter: /\s+/,

	on: function(events, callback, context) {
		var calls, event, list;
		if (!callback) return this;

		events = events.split(this.eventSplitter);
		calls = this._callbacks || (this._callbacks = {});

		while (event = events.shift()) {
			list = calls[event] || (calls[event] = []);
			list.push(callback, context);
		}

		return this;
	},

	off: function(events, callback, context) {
		var event, calls, list, i;

		if (!(calls = this._callbacks)) return this;
		if (!(events || callback || context)) {
			delete this._callbacks;
			return this;
		}

		events = events ? events.split(this.eventSplitter) : Object.keys(calls);

		while (event = events.shift()) {
			if (!(list = calls[event]) || !(callback || context)) {
				delete calls[event];
				continue;
			}

			for (i = list.length - 2; i >= 0; i -= 2) {
				if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
					list.splice(i, 2);
				}
			}
		}

		return this;
	},

	trigger: function(events) {
		var event, calls, list, i, length, args, all, rest;
		if (!(calls = this._callbacks)) return this;

		rest = [];
		events = events.split(this.eventSplitter);

		for (i = 1, length = arguments.length; i < length; i++) {
			rest[i - 1] = arguments[i];
		}


		while (event = events.shift()) {
			if (all = calls.all) all = all.slice();
			if (list = calls[event]) list = list.slice();

			if (list) {
				for (i = 0, length = list.length; i < length; i += 2) {
					list[i].apply(list[i + 1] || this, rest);
				}
			}

			if (all) {
				args = [event].concat(rest);
				for (i = 0, length = all.length; i < length; i += 2) {
					all[i].apply(all[i + 1] || this, args);
				}
			}
		}

		return this;
	}
};

//-- DataSource / DataSourceA Constructor
var DataSource = function( params ) {
	this.init( params );
};

// 0-indexed (dataTable) to 1-indexed (page)
// note: off-the-end index = last index - 1
DataSource.repairIndexToOne = function( arrayIndex ) {
	return arrayIndex < 0 ? 1 : arrayIndex + 1;
};

DataSource.repairIndexToZero = function( pageIndex ) {
	return 0 < pageIndex ? pageIndex - 1 : 0;
};

MyUtils.extend( DataSource.prototype, BackboneEvents, {
	name: "",
	dataTable: null,
	size: 0,

	parentPageURL: "",
	allVolumeURLs: [],
	comicName: "",
	hasPrevtVolume: false,
	hasNextVolume: false,

	getComicName: function() {
		return this.comicName;
	},

	getPrevVolume: function() {
		return;
	},

	getNextVolume: function() {
		return;
	},

	getRowCount: function() {
		return this.size;
	},

	selectData: function( begin, count ) {
		var beginIndex = Math.max( DataSource.repairIndexToZero( begin ), 0 ),
			endIndex = Math.min( beginIndex + Math.max( count, 1 ), this.getRowCount() ),
			data = { beginPageIndex: begin, rows: this.dataTable.slice( beginIndex, endIndex ) };

		this.trigger( "izSelectDataCompletedEvent.DataSource", data );
	},

	selectAllData: function() {
		var data = { rows: this.dataTable.slice( 0, this.getRowCount() ) };

		this.trigger( "izSelectAllDataCompletedEvent.DataSource", data );
	}
} );

var DataSourceA = function( params ) {
	var dataSource = this;

	this.$IzMessageBox = $( "<div id='mmDataSource-MessageBox'></div>" )
		.izMessageBox( {
			caption: "<img src='http://imageshack.us/a/img6/1610/loadingqv.gif' border=0 style='width:20px;height:20px;padding:0 5px;vertical-align:bottom;' />訊息提示 - MoreManga",
			offset: { top: "center", left: 10 },
			isUseAnimate: false,
			closeButton: false,
			buttons: [{
				classname: "izOK",
				name: "完成",
				click: function() {
					dataSource.$IzMessageBox.izMessageBox( "hide" );
				}
			}, {
				classname: "izAbort",
				name: "中止",
				click: function() {
					dataSource._abort();
				}
			}]
		} )
		.appendTo( document.body );

	this.init( params );
};

MyUtils.extend( DataSourceA.prototype, DataSource.prototype, {
	$IzMessageBox: null,

	linkCount: 1, // 每頁可取得的圖片網址的數目 the number of image urls per page
	isUseMT: true,
	maxConnection: 3,
	activeConnections: { length: 0 },

	_getUrl: null,
	_parse: null,

	selectData: function( begin, count ) {
		var beginIndex = Math.max( DataSource.repairIndexToZero( begin ), 0 ),
			endIndex = Math.min( beginIndex + Math.max( count, 1 ), this.getRowCount() );

		for ( var i = beginIndex; i < endIndex; ++i ) {
			if ( typeof this.dataTable[i] === 'undefined' ) {
				this._grabData( i );
				i += DataSource.repairIndexToZero( this.linkCount );
			} else {
				var beginIndex2 = i,
					endIndex2 = i + 1,
					data = { beginPageIndex: DataSource.repairIndexToOne( i ), rows: this.dataTable.slice( beginIndex2, endIndex2 ) };

				this.trigger( "izSelectDataCompletedEvent.DataSource", data );
			}
		}
	},

	_grabData: function( dataIndex ) {
		var dataSource = this, pageIndex = DataSource.repairIndexToOne( dataIndex );

		try {
			var xhr = new XMLHttpRequest;

			xhr.addEventListener( 'load', function () {
				if ( this.status === 200 ) {
					dataSource._parse( this.responseText, pageIndex );

					dataSource.selectData( pageIndex, dataSource.linkCount );
				}
			}, false );

			xhr.open( 'GET', this._getUrl( pageIndex ), true );
			xhr.send();
		} catch ( e ) {
			console.log( e.name + ": " + e.message + " ( MoreManga E3: " + ( e.number & 0xFFFF ).toString() + " )" );
			return;
		}
	},

	selectAllData: function() {
		if ( this.isUseMT ){
			this.selectAllDataMT();
		} else {
			this.selectAllDataST();
		}
	},

	selectAllDataST: function() {
		this.$IzMessageBox.izMessageBox( "show", "圖片列表 連線處理中... ", { closeButton: false } );

		for ( var i = 0; i < this.getRowCount(); ++i ) {
			if ( typeof this.dataTable[i] === 'undefined' ) {
				this._grabDataST( i );
				return;
			}
		}

		this.$IzMessageBox.izMessageBox( "hide" );
		var data = { beginPageIndex: 1, rows: this.dataTable };
		this.trigger( "izSelectAllDataCompletedEvent.DataSource", data );
	},

	_grabDataST: function( dataIndex ) {
		var dataSource = this, pageIndex = DataSource.repairIndexToOne( dataIndex );

		try {
			var xhr = new XMLHttpRequest;

			xhr.addEventListener( 'load', function () {
				if ( this.status === 200 ) {
					dataSource._parse( this.responseText, pageIndex );

					for ( var i = dataIndex; i < dataSource.getRowCount(); ++i ) {
						if ( typeof dataSource.dataTable[i] === 'undefined' ) {
							dataSource._grabDataST( i );
							return;
						}
					}

					dataSource.$IzMessageBox.izMessageBox( "hide" );
					var data = { beginPageIndex: 1, rows: dataSource.dataTable };
					dataSource.trigger( "izSelectAllDataCompletedEvent.DataSource", data );
				}
			}, false );

			xhr.open( 'GET', this._getUrl( pageIndex ), true );
			xhr.send();
		} catch ( e ) {
			console.log( e.name + ": " + e.message + " ( MoreManga E4: " + ( e.number & 0xFFFF ).toString() + " )" );
			return;
		}
	},

	selectAllDataMT: function() {
		var taskData = {};
		/*
			taskData: {
				beginIndex: 0,
				endIndex:0,

				activeConnections: this.activeConnections
				undefinedDataIndex: [],
				errorflag: false
			}
		*/

		taskData.activeConnections = this.activeConnections;

		if ( taskData.activeConnections.length ) {
		//	window.alert( "仍有非同步傳輸在進行中, 請稍後重試" );
		//	return;
			this._abort();
			taskData.activeConnections =  { length: 0 };
		}

		taskData.beginIndex = 0;
		taskData.endIndex = this.getRowCount();
		taskData.undefinedDataIndex = [];
		taskData.errorflag = false;

		for ( var i = taskData.beginIndex; i < taskData.endIndex; ++i ) {
			if ( typeof this.dataTable[i] === 'undefined' ) {
				taskData.undefinedDataIndex.push( i );
				i += DataSource.repairIndexToZero( this.linkCount );
			}
		}

		if ( taskData.undefinedDataIndex.length ) {
			this.$IzMessageBox.izMessageBox( "show", "圖片列表 連線處理中... ", [ "izAbort" ] );

			var dataIndex = taskData.undefinedDataIndex.pop(), connectionCount = 0;
			while ( dataIndex !== undefined ) {
				this._grabDataMT( dataIndex, taskData );
				++connectionCount;
				if ( connectionCount >= this.maxConnection ) {
					break;
				}

				dataIndex = taskData.undefinedDataIndex.pop();
			}
		} else {
			var data = { beginPageIndex: DataSource.repairIndexToOne( taskData.beginIndex ), rows: this.dataTable.slice( taskData.beginIndex, taskData.endIndex ) };
			this.trigger( "izSelectAllDataCompletedEvent.DataSource", data );
		}
	},

	_abort: function() {
		for ( var prop in this.activeConnections ) {
			if ( prop !== "length" ) {
				try {
					this.activeConnections[prop].abort();
				} catch( e ) {
				}
			}
		}
	},

	_loadend: function( dataIndex, taskData ) {
		--taskData.activeConnections.length;
		delete taskData.activeConnections[dataIndex];

		if ( taskData.errorflag ) {
			this.$IzMessageBox.izMessageBox( "show", "圖片列表 取消中" );

			if ( !taskData.activeConnections.length ) {
				this.$IzMessageBox.izMessageBox( "hide" );
				var data = { beginPageIndex: DataSource.repairIndexToOne( taskData.beginIndex ), rows: [] };
				this.trigger( "izSelectAllDataCompletedEvent.DataSource", data );
			}
		} else {
			var nextDataIndex = taskData.undefinedDataIndex.pop();

			if ( nextDataIndex !== undefined ) {
				this._grabDataMT( nextDataIndex, taskData );
			} else if ( !taskData.activeConnections.length ) {
				this.$IzMessageBox.izMessageBox( "hide" );
				var data = { beginPageIndex: DataSource.repairIndexToOne( taskData.beginIndex ), rows: this.dataTable.slice( taskData.beginIndex, taskData.endIndex ) };
				this.trigger( "izSelectAllDataCompletedEvent.DataSource", data );
			}
		}
	},

	_grabDataMT: function( dataIndex, taskData ) {
		var dataSource = this, pageIndex = DataSource.repairIndexToOne( dataIndex );

		try {
			++taskData.activeConnections.length;
			var xhr = taskData.activeConnections[dataIndex] = new XMLHttpRequest;

			xhr.addEventListener( 'load', function () {
				if ( this.status === 200 ) {
					dataSource._parse( this.responseText, pageIndex );
				} else {
					taskData.errorflag = true;
				}

				dataSource._loadend( dataIndex, taskData );
			}, false );

			xhr.addEventListener( 'error', function () {
				taskData.errorflag = true;
				dataSource._loadend( dataIndex, taskData );
			}, false );

			xhr.addEventListener( 'abort', function () {
				taskData.errorflag = true;
				dataSource._loadend( dataIndex, taskData );
			}, false );

			xhr.open( 'GET', this._getUrl( pageIndex ), true );
			xhr.send();
		} catch ( e ) {
			taskData.errorflag = true;
			dataSource._loadend( dataIndex, taskData );

			console.log( e.name + ": " + e.message + " ( MoreManga E2: " + ( e.number & 0xFFFF ).toString() + " )" );
			return;
		}
	}
} );

///////////////////////////////////////////////////////////////////////////////

//http://www.2comic.com/
//http://www.6comic.com/
//http://www.8comic.com/
if ( /^http:\/\/\w+.(2|6|8)comic.com\//.test( gBaseUrl ) || /comicvip.com/.test( gBaseUrl ) ) {
	var $oldImg = $( "#TheImg" );

	if ( $oldImg.length ) {

		document.oncontextmenu = function(){};

		var $newImg = $( "<img id='mmImage' />" ).insertAfter( $oldImg );

		$oldImg.remove();

		DataSource.prototype.init = function() {
			this.name = "8comic";
			this.dataTable = [];

			this.hasPrevVolume = true;
			this.hasNextVolume = true;

			// 2comic, 6comic, 8comic
			var ti = _unsafeWindow.ti;

			var f = _unsafeWindow.f;
			var pi = _unsafeWindow.pi;
			var ni = _unsafeWindow.ni;
			var c = _unsafeWindow.c;
			var ci = _unsafeWindow.ci;
			var ps = _unsafeWindow.ps;

			var ss = _unsafeWindow.ss;
			var nn = _unsafeWindow.nn;
			var mm = _unsafeWindow.mm;
			var si = function(c, p) {
				return 'http://img' + ss(c, 4, 2) + '.8comic.com/' + ss(c, 6, 1) + '/' + ti + '/' + ss(c, 0, 4) + '/' + nn(p) + '_' + ss(c, mm(p) + 10, 3, f) + '.jpg';
			};

			for ( var p = 1; p <= ps; ++p ) {
				this.dataTable[p - 1] = { src: si(c, p) };
			}

			this.size = this.dataTable.length;

			this.getPrevVolume = function() {
				if ( ci > 0 ) {
					return _unsafeWindow.replaceurl( "ch", pi );
				}

				return null;
			},

			this.getNextVolume = function() {
				if ( ci < _unsafeWindow.cs.length / f - 1 ) {
					return _unsafeWindow.replaceurl( "ch", ni );
				}

				return null;
			};
		};

		//
		var newApp = new MyApp( {
			$ImageBox: $newImg,
			currentPageIndex: _unsafeWindow.p,
			historyUrl: function( p ) { return "?ch=" + _unsafeWindow.ch  + "-" + p; },
			itemsDataSource: new DataSource
		} );

		newApp.init();
	}
}

//http://99comic.com/
//http://99manga.com/
//http://cococomic.com/
//http://99770.cc/
//http://99mh.com/
else if ( /^http:\/\/[\w]{0,3}[\.]?(99comic|99manga|cococomic|99mh|99770).(com|cc)/.test( gBaseUrl ) ) {

	if ( $( "#imgCurr" ).length ) {
		var $oldImg = $( "#imgCurr" ), $newImg = $( "<img id='mmImage' />" ).insertAfter( $oldImg );
		$oldImg.remove();

		DataSource.prototype.init = function() {
			var server = _unsafeWindow.getSLUrl( _unsafeWindow.cuD ),
				sPath = isNaN( _unsafeWindow.sPath ) ? _unsafeWindow.sPath : "",
				sFiles,
				total,
				i;

			if ( typeof _unsafeWindow.arrFiles !== 'undefined' ) {
				//www.99comic, mh.99770, dm.99manga, 99mh
				sFiles = _unsafeWindow.arrFiles;
			} else {
				alert( "無法取得圖像的網址資料" );
				return;
			}

			total = sFiles.length;

			this.name = "99comic";
			this.dataTable = [];

			for ( i = 0; i < total; ++i ) {
				this.dataTable[i] = { src: server + sPath + sFiles[i] };
			}

			this.size = this.dataTable.length;
		};

		var newApp = new MyApp( {
			$ImageBox: $newImg,
			currentPageIndex: _unsafeWindow.getCPD(),
			historyUrl: function( p ) { return "?s=" + _unsafeWindow.getCSL() + "&p=" + p; },
			itemsDataSource: new DataSource
		} );

		newApp.init();
	} else if ( $( "#ComicPic" ).length ) {
		var $oldImg = $( "#ComicPic" ), $newImg = $( "<img id='mmImage' />" ).insertAfter( $oldImg );
		$oldImg.remove();

		DataSource.prototype.init = function() {
			var server = _unsafeWindow.ServerList[_unsafeWindow.server - 1],
				arrPicListUrls,
				total,
				i;

			if ( typeof _unsafeWindow.arrPicListUrls !== 'undefined' ) {
				//99comic
				arrPicListUrls = _unsafeWindow.arrPicListUrls;
			} else if ( typeof _unsafeWindow.arrPicListUrl !== 'undefined' ) {
				//cococomic, www.cococomic, 99manga, 99770
				arrPicListUrls = _unsafeWindow.arrPicListUrl;
			} else {
				alert( "無法取得圖像的網址資料" );
				return;
			}

			total = arrPicListUrls.length;

			this.name = "99comic";
			this.dataTable = [];

			for ( i = 0; i < total; ++i ) {
				this.dataTable[i] = { src: server + arrPicListUrls[i] };
			}

			this.size = this.dataTable.length;
		};

		var newApp = new MyApp( {
			$ImageBox: $newImg,
			currentPageIndex: _unsafeWindow.page,
			historyUrl: function( p ) { return "?s=" + _unsafeWindow.server + "*v=" + p; },
			itemsDataSource: new DataSource
		} );

		newApp.init();
	}
}

//http://tel.dm5.com/
//http://cnc.dm5.com/
else if ( /^http:\/\/[\w]+.dm5.com\/m/.test( gBaseUrl ) && $( "#pagelist" ).length ) {
	var $oldImg = $( "#showimage" ), $newImg = $( "<img id='mmImage' />" ).insertBefore( $oldImg );
	$oldImg.remove();

	DataSourceA.prototype.init = function() {
		this.name = "dm5";
		this.dataTable = new Array( _unsafeWindow.DM5_IMAGE_COUNT );
		this.size = _unsafeWindow.DM5_IMAGE_COUNT;

		this.hasNextVolume = true;

		this.linkCount = 2;
		this.isUseMT = false;

		this.mkey = "";
		if ( $( "#dm5_key" ).length ) {
			this.mkey = encodeURIComponent( $( "#dm5_key" ).val() );
		}

		this._getUrl = function( page ) {
			return "chapterimagefun.ashx?d=" + (+ new Date) + "&cid=" + _unsafeWindow.DM5_CID + "&page=" + page + "&key=" + this.mkey + "&maxcount=10&language=1";
		};

		this._parse = function( responseText, page ) {
			eval( responseText );
			var len = d.length;
			for ( var i = 0, p = page - 1; i < len; ++i, ++p ) {
				if ( typeof this.dataTable[p] === 'undefined' ) {
					this.dataTable[p] = { src: d[i] };
				}
			}
		};

		this.getNextVolume = function() {
			//下一章节：
			var results = /\u4e0b\u4e00\u7ae0\u8282\uff1a<span><a class="redzia" href="(\/m[\d]+\/)">/.exec( document.body.innerHTML );

			if ( results instanceof Array ) {
				return results[1];
			}

			return null;
		};
	};

	var newApp = new MyApp( {
		$ImageBox: $newImg,
		currentPageIndex: _unsafeWindow.DM5_PAGE,
		historyUrl: function( p ) { return _unsafeWindow.DM5_COMIC_URL  + "#ipg" + p; },
		itemsDataSource: new DataSourceA
	} );

	newApp.init();
}

//http://tel.1kkk.com/
//http://cnc.1kkk.com/
else if ( /^http:\/\/[\w]+.1kkk.com\//.test( gBaseUrl ) && $( "#pagelist" ).length ) {
	var $newImg = $( "<img id='mmImage' />" );

	$( "<div id='mmBox' />" ).css( { "text-align": "center" } ).append( $newImg ).insertAfter( $( "#chapterpager" ) );

	$( "#showimage" ).remove();

	DataSourceA.prototype.init = function() {
		this.name = "1kkk";
		this.dataTable = new Array( _unsafeWindow.DM5_IMAGE_COUNT );
		this.size = _unsafeWindow.DM5_IMAGE_COUNT;

		this.hasNextVolume = true;

		this.linkCount = 2;
		this.isUseMT = false;

		this.mkey = "";
		if ( $( "#dm5_key" ).length ) {
			this.mkey = encodeURIComponent( $( "#dm5_key" ).val() );
		}

		this._getUrl = function( page ) {
			return "chapterimagefun.ashx?cid=" + _unsafeWindow.cid + "&page=" + page + "&key=" + this.mkey + "&maxcount=10";
		};

		this._parse = function( responseText, page ) {
			eval( responseText );
			var len = d.length;
			for ( var i = 0, p = page - 1; i < len; ++i, ++p ) {
				if ( typeof this.dataTable[p] === 'undefined' ) {
					this.dataTable[p] = { src: d[i] };
				}
			}
		};

		this.getNextVolume = function() {
			var $a = $( "#divEnd .tk22 a:first" );

			if ( $a.length && $a.attr( "id" ) != "addPl" ) {
				return  $a.attr( "href" );
			}

			return null;
		};
	};

	var newApp = new MyApp( {
		$ImageBox: $newImg,
		currentPageIndex: _unsafeWindow.currentrefreshpage,
		historyUrl: function( p ) { return _unsafeWindow.DM5_COMIC_URL  + "#ipg" + p; },
		itemsDataSource: new DataSourceA
	} );

	newApp.init();
}

} )( window, jQuery );
