// ==UserScript==
// @name           USO Google Translate
// @description    A @require Greasemonkey Library for Google Translate
// @namespace      http://userscripts.org/users/tim
// @license        http://uso-google-translate.googlecode.com/svn/trunk/license.txt
// @copyright      (c) 2009 Tim Smart
// @version        25
// ==/UserScript==

if ( typeof USO !== 'object' )
	var USO = {};

USO.googleTranslate = function( options ) {
	return new USO.googleTranslate.prototype.construct( options );
}

USO.googleTranslate.prototype = {
	construct: function( options ) {
		this.input = options.input;
		this.inputLanguage = typeof options.inputLanguage === 'string' ? options.inputLanguage : this.inputLanguage;
		this.defaultLanguage = typeof options.defaultLanguage === 'string' ? options.defaultLanguage : this.defaultLanguage;
		this.targetLanguage = typeof options.targetLanguage === 'string' ? options.targetLanguage : this.detectLanguage();
		this.expires = typeof options.expires === 'number' && options.expires !== 0 ?
			( options.expires === Infinity ? Infinity : new Date().getTime() + ( options.expires * 60 * 1000 ) ) :
			( options.expires === 0 ? 0 : this.expires );
		this.callback = options.callback || this.callback;
		this.translate();
		return this;
	},
	input: null,
	output: null,
	inputLanguage: '',
	defaultLanguage: 'en',
	outputLanguage: null,
	targetLanguage: null,
	callback: null,
	expires: new Date().getTime() + ( 24 * 60 * 60 * 1000 ),
	detectLanguage: function() {
		if ( window.navigator && typeof window.navigator.language === 'string' ) {
			var language = window.navigator.language.substr(0, 2);
			switch ( language ) {
				case 'us':
					language = 'en';
					break;
				case 'zh':
					language = window.navigator.language;
					break;
			}
			return language;
		}
		return this.defaultLanguage;
	},
	jsonDecode: function( string ) {
		if ( typeof JSON === 'object' && typeof JSON.parse === 'function' )
			return JSON.parse( string );
		else
			return Function('return (' + string + ');')();
	},
	translate: function() {
		if ( this.inputLanguage === this.targetLanguage ) {
			this.expires = Infinity;
			this.sendOutput( this.input, this.inputLanguage );
			return;
		}

		var cache = this.expires === 0 ? null : Function('return ' + GM_getValue('USOGoogleTranslate/cache', 'null') + ';')();
		if ( cache !== null && cache[ this.targetLanguage ] instanceof Array ) {
			var inputSource = this.input.toSource(),
				time = new Date().getTime(),
				rest,
				cacheArray = cache[ this.targetLanguage ],
				removing = false;

			for ( var i = 0; cacheItem = cacheArray[ i ]; i++ ) {
				if ( cacheItem.input.toSource() === inputSource && cacheItem.expires > time ) {
					if ( removing === true ) {
						cache[ this.targetLanguage ] = cacheArray;
						GM_setValue( 'USOGoogleTranslate/cache', cache.toSource() );
					}
					this.output = cacheItem.output;
					this.expires = cacheItem.expires;
					this.outputLanguage = cacheItem.outputLanguage;
					if ( typeof this.callback === 'function' )
						this.callback.call( cacheItem.output, cacheItem, cacheItem.output );
					cacheArray = inputSource = rest = removing = null;
					return;
				} else if ( cacheItem.expires <= time ) {
					removing = true;
					rest = cacheArray.splice( i + 1, cacheArray.length );
					cacheArray.length = i;
					cacheArray.push.apply( cacheArray, rest );
				}
			}
			if ( removing === true ) {
				cache[ this.targetLanguage ] = cacheArray;
				GM_setValue( 'USOGoogleTranslate/cache', cache.toSource() );
			}
			cacheArray = inputSource = rest = removing = null;
		}
		cache = null;

		var url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&langpair=' +
				encodeURIComponent( this.inputLanguage ) + '|' +
				encodeURIComponent( this.targetLanguage ) + '&',
			inputType = this.input instanceof Array ? 'array' : ( typeof this.input === 'object' ? 'object' : 'string' ),
			fn = this;

		if ( inputType === 'object' ) {
			for ( key in this.input )
				url += 'q=' + encodeURIComponent( this.input[ key ] ) + '&';
			url = url.substr( 0, url.length - 1 );
		} else if ( inputType === 'array' ) {
			for ( var i = 0, il = this.input.length; i < il; i++ )
				url += 'q=' + encodeURIComponent( this.input[ i ] ) + '&';
			url = url.substr( 0, url.length - 1 );
		} else
			url += 'q=' + encodeURIComponent( this.input );

		GM_xmlhttpRequest({
			url: url,
			method: 'GET',
			onload: function( xhr ) {
				fn.parseResponse.call( fn, xhr.responseText, inputType );
			}
		});
	},
	parseResponse: function( response, inputType ) {
		response = this.jsonDecode( response );
		if ( 200 === parseInt( response.responseStatus, 10 ) ) {
			var textarea = document.createElement('textarea'),
				inputLanguages = inputType === 'object' ? {} : ( inputType === 'array' ? [] : '' ),
				output = inputType === 'object' ? {} : ( inputType === 'array' ? [] : '' ),
				dataType = response.responseData instanceof Array ? 'array' : 'string',
				subject;
			if ( inputType === 'object' ) {
				var i = 0;
				for ( key in this.input ) {
					subject = dataType === 'array' ? response.responseData[ i ].responseData : response.responseData;
					output[ key ] = this.decodeHTMLEntities( subject.translatedText, textarea );
					inputLanguages[ key ] = this.inputLanguage === '' ? subject.detectedSourceLanguage : this.inputLanguage;
					if ( dataType === 'string' )
						break;
					i++;
				}
			} else if ( inputType === 'array' ) {
				for ( var i = 0, il = this.input.length; i < il; i++ ) {
					subject = dataType === 'array' ? response.responseData[ i ].responseData : response.responseData;
					output[ i ] = this.decodeHTMLEntities( subject.translatedText, textarea );
					inputLanguages[ i ] = this.inputLanguage === '' ? subject.detectedSourceLanguage : this.inputLanguage;
					if ( dataType === 'string' )
						break;
				}
			} else {
				output = this.decodeHTMLEntities( response.responseData.translatedText, textarea );
				inputLanguages = this.inputLanguage === '' ? response.responseData.detectedSourceLanguage : this.inputLanguage;
			}
			this.sendOutput( output, this.targetLanguage, inputLanguages, this.expires !== 0 );
			textarea = output = inputLanguages = dataType = subject = null;
		} else {
			this.expires = Infinity;
			this.sendOutput( this.input, this.defaultLanguage );
		}
		return;
	},
	sendOutput: function( output, outputLanguage, inputLanguages, cache ) {
		this.output = output;
		this.outputLanguage = outputLanguage;
		this.inputLanguage = inputLanguages === false ? this.inputLanguage : inputLanguages;
		this.expires = this.expires === 0 ? new Date().getTime() : this.expires;
		var callback = typeof this.callback === 'function';
		cache = cache === true;
		if ( cache || callback ) {
			var ret = {
				input: this.input,
				inputLanguage: this.inputLanguage,
				output: this.output,
				outputLanguage: this.outputLanguage,
				targetLanguage: this.targetLanguage,
				expires: this.expires
			};
			if ( cache ) {
				cache = Function('return ' + GM_getValue('USOGoogleTranslate/cache', 'null') + ';')();
				if ( cache === null || typeof cache !== 'object' )
					cache = {};
				if ( cache[ this.outputLanguage ] instanceof Array === false )
					cache[ this.outputLanguage ] = [];
				cache[ this.outputLanguage ].push( ret );
				GM_setValue( 'USOGoogleTranslate/cache', cache.toSource() );
			}
			if ( callback )
				this.callback.call( this.output, ret, this.output );
			ret = null;
		}
		cache = callback = null;
	},
	decodeHTMLEntities: function( string, textarea ) {
		textarea.innerHTML = string.replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
		return textarea.value;
	}
};

USO.googleTranslate.prototype.construct.prototype = USO.googleTranslate.prototype;
