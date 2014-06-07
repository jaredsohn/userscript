// ==UserScript==	
// @name steach
// @namespace
// @description steach - vkontakte.ru audio scrobbler
// @include http://vkontakte.ru/*
// @match http://vkontakte.ru/*
// @match http://*.vkontakte.ru/*
// @match http://vk.com/*
// @match http://*.vk.com/*
// ==/UserScript==
// Author: ебло
// Version: 1
// Site: http://code.google.com/

/*


    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html
*/
if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}}());

/*
 * md5
 */
function utf8_encode(str_data){str_data=str_data.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<str_data.length;n++){var c=str_data.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext}
function md5(str){var RotateLeft=function(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits))};var AddUnsigned=function(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8)}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8)}else{return(lResult^0x40000000^lX8^lY8)}}else{return(lResult^lX8^lY8)}};var F=function(x,y,z){return(x&y)|((~x)&z)};var G=function(x,y,z){return(x&z)|(y&(~z))};var H=function(x,y,z){return(x^y^z)};var I=function(x,y,z){return(y^(x|(~z)))};var FF=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var GG=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var HH=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var II=function(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};var ConvertToWordArray=function(str){var lWordCount;var lMessageLength=str.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(str.charCodeAt(lByteCount)<<lBytePosition));lByteCount++}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray};var WordToHex=function(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2)}return WordToHexValue};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;str=this.utf8_encode(str);x=ConvertToWordArray(str);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD)}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase()}

// Lastfm API
/*
 *
 * Copyright (c) 2008-2010, Felix Bruns <felixbruns@web.de>
 *
 */

function LastFM(options){
	/* Set default values for required options. */
	var apiKey    = options.apiKey    || '';
	var apiSecret = options.apiSecret || '';
	var apiUrl    = options.apiUrl    || 'http://ws.audioscrobbler.com/2.0/';
	var apiUrl2  = 'http://post.audioscrobbler.com/2.0/';
	var cache     = options.cache     || undefined;
	
	/* Set API key. */
	this.setApiKey = function(_apiKey){
		apiKey = _apiKey;
	};

	/* Set API key. */
	this.setApiSecret = function(_apiSecret){
		apiSecret = _apiSecret;
	};

	/* Set API URL. */
	this.setApiUrl = function(_apiUrl){
		apiUrl = _apiUrl;
	};

	/* Set cache. */
	this.setCache = function(_cache){
		cache = _cache;
	};

	/* Internal call (POST, GET). */
	var internalCall = function(params, callbacks, requestMethod,api2)
	{
		// метод из нового Api 2.0
		api2 = !!api2;
		var _apiUrl = api2 ? apiUrl2 : apiUrl;
		
		
		/* Cross-domain POST request (doesn't return any data, always successful). */
		if(requestMethod == 'POST'){
			/* Create iframe element to post data. */
			var html   = document.getElementsByTagName('body')[0];
			var iframe = document.createElement('iframe');
			var doc;

			/* Set iframe attributes. */
			iframe.width        = 1;
			iframe.height       = 1;
			iframe.style.border = 'none';
			iframe.onload       = function(){
				/* Remove iframe element. */
				//html.removeChild(iframe);

				/* Call user callback. */
				if(typeof(callbacks.success) != 'undefined'){
					callbacks.success();
				}
			};

			/* Append iframe. */
			html.appendChild(iframe);

			/* Get iframe document. */
			if(typeof(iframe.contentWindow) != 'undefined'){
				doc = iframe.contentWindow.document;
			}
			else if(typeof(iframe.contentDocument.document) != 'undefined'){
				doc = iframe.contentDocument.document.document;
			}
			else{
				doc = iframe.contentDocument.document;
			}

			/* Open iframe document and write a form. */
			doc.open();
			doc.clear();
			doc.write('<form method="post" action="' + _apiUrl + '" id="form" accept-charset="UTF-8">');

			/* Write POST parameters as input fields. */
			for(var param in params){
				doc.write('<input type="text" name="' + param + '" value="' + params[param] + '">');
			}

			/* Write automatic form submission code. */
			doc.write('</form>');
			doc.write('<script type="application/x-javascript">');
			doc.write('document.getElementById("form").submit();');
			doc.write('</script>');

			/* Close iframe document. */
			doc.close();
		}
		/* Cross-domain GET request (JSONP). */
		else{
			/* Get JSONP callback name. */
			var jsonp = 'jsonp' + new Date().getTime();

			/* Calculate cache hash. */
			var hash = auth.getApiSignature(params);

			/* Check cache. */
			if(typeof(cache) != 'undefined' && cache.contains(hash) && !cache.isExpired(hash)){
				if(typeof(callbacks.success) != 'undefined'){
					callbacks.success(cache.load(hash));
				}

				return;
			}

			/* Set callback name and response format. */
			params.callback = jsonp;
			params.format   = 'json';

			/* Create JSONP callback function. */
			window[jsonp] = function(data){
				/* Is a cache available?. */
				if(typeof(cache) != 'undefined'){
					var expiration = cache.getExpirationTime(params);

					if(expiration > 0){
						cache.store(hash, data, expiration);
					}
				}

				/* Call user callback. */
				if(typeof(data.error) != 'undefined'){
					if(typeof(callbacks.error) != 'undefined'){
						callbacks.error(data.error, data.message);
					}
				}
				else if(typeof(callbacks.success) != 'undefined'){
					callbacks.success(data);
				}

				/* Garbage collect. */
				window[jsonp] = undefined;

				try{
					delete window[jsonp];
				}
				catch(e){
					/* Nothing. */
				}

				/* Remove script element. */
				if(head){
					//head.removeChild(script);
				}
			};

			/* Create script element to load JSON data. */
			var head   = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");

			/* Build parameter string. */
			var array = [];

			for(var param in params){
				array.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]));
			}

			/* Set script source. */
			script.src = _apiUrl + '?' + array.join('&').replace(/%20/g, '+');

			/* Append script element. */
			head.appendChild(script);
		}
	};

	/* Normal method call. */
	var call = function(method, params, callbacks, requestMethod, api2){
		/* Set default values. */
		params        = params        || {};
		callbacks     = callbacks     || {};
		requestMethod = requestMethod || 'GET';

		/* Add parameters. */
		params.method  = method;
		params.api_key = apiKey;
		/* Call method. */
		internalCall(params, callbacks, requestMethod, !!api2);
	};

	/* Signed method call. */
	var signedCall = function(method, params, session, callbacks, requestMethod, api2){
		/* Set default values. */
		params        = params        || {};
		callbacks     = callbacks     || {};
		requestMethod = requestMethod || 'GET';

		/* Add parameters. */
		params.method  = method;
		params.api_key = apiKey;

		/* Add session key. */
		if(session && typeof(session.key) != 'undefined'){
			params.sk = session.key;
		}

		/* Get API signature. */
		params.api_sig = auth.getApiSignature(params);

		/* Call method. */
		internalCall(params, callbacks, requestMethod, !!api2);
	};

	/* Album methods. */
	this.album = {
		addTags : function(params, session, callbacks){
			/* Build comma separated tags string. */
			if(typeof(params.tags) == 'object'){
				params.tags = params.tags.join(',');
			}

			signedCall('album.addTags', params, session, callbacks, 'POST');
		},

		getBuylinks : function(params, callbacks){
			call('album.getBuylinks', params, callbacks);
		},

		getInfo : function(params, callbacks){
			call('album.getInfo', params, callbacks);
		},

		getTags : function(params, session, callbacks){
			signedCall('album.getTags', params, session, callbacks);
		},

		removeTag : function(params, session, callbacks){
			signedCall('album.removeTag', params, session, callbacks, 'POST');
		},

		search : function(params, callbacks){
			call('album.search', params, callbacks);
		},

		share : function(params, session, callbacks){
			/* Build comma separated recipients string. */
			if(typeof(params.recipient) == 'object'){
				params.recipient = params.recipient.join(',');
			}

			signedCall('album.share', params, callbacks);
		}
	};

	/* Artist methods. */
	this.artist = {
		addTags : function(params, session, callbacks){
			/* Build comma separated tags string. */
			if(typeof(params.tags) == 'object'){
				params.tags = params.tags.join(',');
			}

			signedCall('artist.addTags', params, session, callbacks, 'POST');
		},

		getEvents : function(params, callbacks){
			call('artist.getEvents', params, callbacks);
		},

		getImages : function(params, callbacks){
			call('artist.getImages', params, callbacks);
		},

		getInfo : function(params, callbacks){
			call('artist.getInfo', params, callbacks);
		},

		getPastEvents : function(params, callbacks){
			call('artist.getPastEvents', params, callbacks);
		},

		getPodcast : function(params, callbacks){
			call('artist.getPodcast', params, callbacks);
		},

		getShouts : function(params, callbacks){
			call('artist.getShouts', params, callbacks);
		},

		getSimilar : function(params, callbacks){
			call('artist.getSimilar', params, callbacks);
		},

		getTags : function(params, session, callbacks){
			signedCall('artist.getTags', params, session, callbacks);
		},

		getTopAlbums : function(params, callbacks){
			call('artist.getTopAlbums', params, callbacks);
		},

		getTopFans : function(params, callbacks){
			call('artist.getTopFans', params, callbacks);
		},

		getTopTags : function(params, callbacks){
			call('artist.getTopTags', params, callbacks);
		},

		getTopTracks : function(params, callbacks){
			call('artist.getTopTracks', params, callbacks);
		},

		removeTag : function(params, session, callbacks){
			signedCall('artist.removeTag', params, session, callbacks, 'POST');
		},

		search : function(params, callbacks){
			call('artist.search', params, callbacks);
		},

		share : function(params, session, callbacks){
			/* Build comma separated recipients string. */
			if(typeof(params.recipient) == 'object'){
				params.recipient = params.recipient.join(',');
			}

			signedCall('artist.share', params, session, callbacks, 'POST');
		},

		shout : function(params, session, callbacks){
			signedCall('artist.shout', params, session, callbacks, 'POST');
		}
	};

	/* Auth methods. */
	this.auth = {
		getMobileSession : function(params, callbacks){
			/* Set new params object with authToken. */
			params = {
				username  : params.username,
				authToken : md5(params.username + md5(params.password))
			};

			signedCall('auth.getMobileSession', params, null, callbacks);
		},

		getSession : function(params, callbacks){
			signedCall('auth.getSession', params, null, callbacks);
		},

		getToken : function(callbacks){
			signedCall('auth.getToken', null, null, callbacks);
		},

		/* Deprecated. Security hole was fixed. */
		getWebSession : function(callbacks){
			/* Save API URL and set new one (needs to be done due to a cookie!). */
			var previuousApiUrl = apiUrl;

			apiUrl = 'http://ext.last.fm/2.0/';

			signedCall('auth.getWebSession', null, null, callbacks);

			/* Restore API URL. */
			apiUrl = previuousApiUrl;
		}
	};

	/* Event methods. */
	this.event = {
		attend : function(params, session, callbacks){
			signedCall('event.attend', params, session, callbacks, 'POST');
		},

		getAttendees : function(params, session, callbacks){
			call('event.getAttendees', params, callbacks);
		},

		getInfo : function(params, callbacks){
			call('event.getInfo', params, callbacks);
		},

		getShouts : function(params, callbacks){
			call('event.getShouts', params, callbacks);
		},

		share : function(params, session, callbacks){
			/* Build comma separated recipients string. */
			if(typeof(params.recipient) == 'object'){
				params.recipient = params.recipient.join(',');
			}

			signedCall('event.share', params, session, callbacks, 'POST');
		},

		shout : function(params, session, callbacks){
			signedCall('event.shout', params, session, callbacks, 'POST');
		}
	};

	/* Geo methods. */
	this.geo = {
		getEvents : function(params, callbacks){
			call('geo.getEvents', params, callbacks);
		},

		getMetroArtistChart : function(params, callbacks){
			call('geo.getMetroArtistChart', params, callbacks);
		},

		getMetroHypeArtistChart : function(params, callbacks){
			call('geo.getMetroHypeArtistChart', params, callbacks);
		},

		getMetroHypeTrackChart : function(params, callbacks){
			call('geo.getMetroHypeTrackChart', params, callbacks);
		},

		getMetroTrackChart : function(params, callbacks){
			call('geo.getMetroTrackChart', params, callbacks);
		},

		getMetroUniqueArtistChart : function(params, callbacks){
			call('geo.getMetroUniqueArtistChart', params, callbacks);
		},

		getMetroUniqueTrackChart : function(params, callbacks){
			call('geo.getMetroUniqueTrackChart', params, callbacks);
		},

		getMetroWeeklyChartlist : function(params, callbacks){
			call('geo.getMetroWeeklyChartlist', params, callbacks);
		},

		getTopArtists : function(params, callbacks){
			call('geo.getTopArtists', params, callbacks);
		},

		getTopTracks : function(params, callbacks){
			call('geo.getTopTracks', params, callbacks);
		}
	};

	/* Group methods. */
	this.group = {
		getMembers : function(params, callbacks){
			call('group.getMembers', params, callbacks);
		},

		getWeeklyAlbumChart : function(params, callbacks){
			call('group.getWeeklyAlbumChart', params, callbacks);
		},

		getWeeklyArtistChart : function(params, callbacks){
			call('group.group.getWeeklyArtistChart', params, callbacks);
		},

		getWeeklyChartList : function(params, callbacks){
			call('group.getWeeklyChartList', params, callbacks);
		},

		getWeeklyTrackChart : function(params, callbacks){
			call('group.getWeeklyTrackChart', params, callbacks);
		}
	};

	/* Library methods. */
	this.library = {
		addAlbum : function(params, session, callbacks){
			signedCall('library.addAlbum', params, session, callbacks, 'POST');
		},

		addArtist : function(params, session, callbacks){
			signedCall('library.addArtist', params, session, callbacks, 'POST');
		},

		addTrack : function(params, session, callbacks){
			signedCall('library.addTrack', params, session, callbacks, 'POST');
		},

		getAlbums : function(params, callbacks){
			call('library.getAlbums', params, callbacks);
		},

		getArtists : function(params, callbacks){
			call('library.getArtists', params, callbacks);
		},

		getTracks : function(params, callbacks){
			call('library.getTracks', params, callbacks);
		}
	};

	/* Playlist methods. */
	this.playlist = {
		addTrack : function(params, session, callbacks){
			signedCall('playlist.addTrack', params, session, callbacks, 'POST');
		},

		create : function(params, session, callbacks){
			signedCall('playlist.create', params, session, callbacks, 'POST');
		},

		fetch : function(params, callbacks){
			call('playlist.fetch', params, callbacks);
		}
	};

	/* Radio methods. */
	this.radio = {
		getPlaylist : function(params, session, callbacks){
			signedCall('radio.getPlaylist', params, session, callbacks);
		},

		tune : function(params, session, callbacks){
			signedCall('radio.tune', params, session, callbacks);
		}
	};

	/* Tag methods. */
	this.tag = {
		getSimilar : function(params, callbacks){
			call('tag.getSimilar', params, callbacks);
		},

		getTopAlbums : function(params, callbacks){
			call('tag.getTopAlbums', params, callbacks);
		},

		getTopArtists : function(params, callbacks){
			call('tag.getTopArtists', params, callbacks);
		},

		getTopTags : function(callbacks){
			call('tag.getTopTags', null, callbacks);
		},

		getTopTracks : function(params, callbacks){
			call('tag.getTopTracks', params, callbacks);
		},

		getWeeklyArtistChart : function(params, callbacks){
			call('tag.getWeeklyArtistChart', params, callbacks);
		},

		getWeeklyChartList : function(params, callbacks){
			call('tag.getWeeklyChartList', params, callbacks);
		},

		search : function(params, callbacks){
			call('tag.search', params, callbacks);
		}
	};

	/* Tasteometer method. */
	this.tasteometer = {
		compare : function(params, callbacks){
			call('tasteometer.compare', params, callbacks);
		}
	};

	/* Track methods. */
	this.track = {
		addTags : function(params, session, callbacks){
			signedCall('track.addTags', params, session, callbacks, 'POST');
		},

		ban : function(params, session, callbacks){
			signedCall('track.ban', params, session, callbacks, 'POST');
		},

		getBuylinks : function(params, callbacks){
			call('track.getBuylinks', params, callbacks);
		},

		getInfo : function(params, callbacks){
			call('track.getInfo', params, callbacks);
		},

		getSimilar : function(params, callbacks){
			call('track.getSimilar', params, callbacks);
		},

		getTags : function(params, session, callbacks){
			signedCall('track.getTags', params, session, callbacks);
		},

		getTopFans : function(params, callbacks){
			call('track.getTopFans', params, callbacks);
		},

		getTopTags : function(params, callbacks){
			call('track.getTopTags', params, callbacks);
		},

		love : function(params, session, callbacks){
			signedCall('track.love', params, session, callbacks, 'POST');
		},

		removeTag : function(params, session, callbacks){
			signedCall('track.removeTag', params, session, callbacks, 'POST');
		},

		search : function(params, callbacks){
			call('track.search', params, callbacks);
		},

		share : function(params, session, callbacks){
			/* Build comma separated recipients string. */
			if(typeof(params.recipient) == 'object'){
				params.recipient = params.recipient.join(',');
			}

			signedCall('track.share', params, session, callbacks, 'POST');
		},
		
		scrobble: function(params, session, callbacks)
		{
			params.timestamp = Math.round((new Date()).getTime() / 1000);
			signedCall('track.scrobble', params, session, callbacks, 'POST', true);
		}
	};

	/* User methods. */
	this.user = {
		getArtistTracks : function(params, callbacks){
			call('user.getArtistTracks', params, callbacks);
		},

		getEvents : function(params, callbacks){
			call('user.getEvents', params, callbacks);
		},

		getFriends : function(params, callbacks){
			call('user.getFriends', params, callbacks);
		},

		getInfo : function(params, callbacks){
			call('user.getInfo', params, callbacks);
		},

		getLovedTracks : function(params, callbacks){
			call('user.getLovedTracks', params, callbacks);
		},

		getNeighbours : function(params, callbacks){
			call('user.getNeighbours', params, callbacks);
		},

		getPastEvents : function(params, callbacks){
			call('user.getPastEvents', params, callbacks);
		},

		getPlaylists : function(params, callbacks){
			call('user.getPlaylists', params, callbacks);
		},

		getRecentStations : function(params, session, callbacks){
			signedCall('user.getRecentStations', params, session, callbacks);
		},

		getRecentTracks : function(params, callbacks){
			call('user.getRecentTracks', params, callbacks);
		},

		getRecommendedArtists : function(params, session, callbacks){
			signedCall('user.getRecommendedArtists', params, session, callbacks);
		},

		getRecommendedEvents : function(params, session, callbacks){
			signedCall('user.getRecommendedEvents', params, session, callbacks);
		},

		getShouts : function(params, callbacks){
			call('user.getShouts', params, callbacks);
		},

		getTopAlbums : function(params, callbacks){
			call('user.getTopAlbums', params, callbacks);
		},

		getTopArtists : function(params, callbacks){
			call('user.getTopArtists', params, callbacks);
		},

		getTopTags : function(params, callbacks){
			call('user.getTopTags', params, callbacks);
		},

		getTopTracks : function(params, callbacks){
			call('user.getTopTracks', params, callbacks);
		},

		getWeeklyAlbumChart : function(params, callbacks){
			call('user.getWeeklyAlbumChart', params, callbacks);
		},

		getWeeklyArtistChart : function(params, callbacks){
			call('user.getWeeklyArtistChart', params, callbacks);
		},

		getWeeklyChartList : function(params, callbacks){
			call('user.getWeeklyChartList', params, callbacks);
		},

		getWeeklyTrackChart : function(params, callbacks){
			call('user.getWeeklyTrackChart', params, callbacks);
		},

		shout : function(params, session, callbacks){
			signedCall('user.shout', params, session, callbacks, 'POST');
		},
		
		updateNowPlaying: function(params, session, callbacks){
			signedCall('user.updateNowPlaying', params, session, callbacks, 'POST', true);
		}
	};

	/* Venue methods. */
	this.venue = {
		getEvents : function(params, callbacks){
			call('venue.getEvents', params, callbacks);
		},

		getPastEvents : function(params, callbacks){
			call('venue.getPastEvents', params, callbacks);
		},

		search : function(params, callbacks){
			call('venue.search', params, callbacks);
		}
	};
	
	/* Private auth methods. */
	var auth = {
		getApiSignature : function(params){
			var keys   = [];
			var string = '';

			for(var key in params){
				keys.push(key);
			}

			keys.sort();

			for(var index in keys){
				var key = keys[index];

				string += key + params[key];
			}

			string += apiSecret;

			/* Needs lastfm.api.md5.js. */
			return md5(string);
		}
	};
};

/**
 * steach - vkontakte scrobbler
 * @constructor
 * @return {Kikuyutoo}
 */
var steach= function()
{
	var debug = true;
	
	var ao = {};
    if (typeof(AudioObject) !== 'undefined')
    {
    	ao = AudioObject;
    }
    else
    {
        //throw 'Не найден объект AudioObject. Возможно файл player.js изменён';
    };
    
	var pass = function(){};
	
	var log = debug ? debugLog : pass;
	
	// Префикс переменных в localstorage
	var localstorage_prefix = 'kikuyutoo_';
	// Настройки клиента last.fm
	var apiKey = 'bd51d4cc4ae2ce6be98e4008c6ba60e4';
	var apiSecret = 'f1ce75e817a2a4e2701357aa47405d4e';
	
	// Ключ сессии и имя пользователя
	var session = getValue('session');
	var username = getValue('username');
	
	var version = 1;
	var installedVersion = getValue('version');
	
	// Обёртка для работы с API
    var lastfm = new LastFM({apiKey: apiKey, apiSecret: apiSecret});
    var KikuyutooObject = this;
	
	// Набор отладочных колбеков для lastfm
	var debugCallbacks = {success: function(data){
		log('result: ' + JSON.stringify(data));
	}, error: function(code, message){
		log('error: ' + message);
	}};
	
	// Таймаут, по истечении которого трек скробблится
	var scrobbleTimeout = null;
	
	// Функция скроблинга выполняемая по таймауту
	var scrobbleFunc = null;
	
	// Иконка напротив трека
	var playIcon = ce("div");
	playIcon.style.paddingRight = "5px";
	playIcon.style.height = "12px";
	playIcon.className = "duration";
	playIcon.style.marginLeft = "-20px";	// позволяет избежать перескакивания заголовка трека на новую строку
	playIcon.id = 'lastfm_playicon';
	playIcon.innerHTML = '<img src="http://kikuyutoo.googlecode.com/files/check.png" style="padding-right:5px;display:none" id="scrobbled_icon"><img src="http://cdn.last.fm/flatness/global/icon_eq.gif" id="playingicon"><img src="http://kikuyutoo.googlecode.com/files/playing_stopped.gif" style="display:none" id="stoppedicon">';
	
	this.setSession = function (name,session_key)
	{
		username = name;
		session = session_key;
		
		setValue('username',name);
		setValue('session',session_key);
		
	};
	
    /**
     * Получение данных из локальной памяти
     * @param {string} name Имя переменной
     * @return {object}
     */
    function getValue(name)
    
    {
        var val = localStorage.getItem(localstorage_prefix+name);
        if (val !== null)
        {
            return JSON.parse(val);
        }
        else
        {
            return null;
        }
    };
    
    /**
     * Сохранение данных в локальной памяти
     * @param {string} name Имя переменной
     * @param {Object} value Значение
     */
    function setValue(name,value) 
    {
        localStorage.setItem(localstorage_prefix+name,JSON.stringify(value));
    };
    
	/**
	 * Вывод строки сообщения
	 * @param {string} message Текст сообщения
	 * @param {bool} error Сообщения-ошибка
	 */
	function showMessageLine(message, error)
	{
		error = Boolean(error);
		var mes = ce('div');
		if (error)
		{
			mes.innerHTML = '<div id="messageWrap"><div id="error">'+message+'</div></div>';
		}
		else
		{
			mes.innerHTML = '<div style="background-color:#F7F7F7;padding:10px"><div class="msg" style="margin:0px">'+message+'</div></div>';
		}
		var container = geByClass('editorPanel',ge('content'),'div')[0];
        ge('content').insertBefore(mes,container);
	}
	
    /**
     * Отображение настроек
     */
    function showSettingsForm()
    {
        // форма настроек
        var content = '<div class="settingsPanel"><h4><img src="http://cdn.last.fm/flatness/favicon.2.png"> Kikuyutoo</h4></div>            \
	            <form method="post" id="kikuyutoo_settings" name="kikuyutoo_settings" action="#">                    \
	            <div class="buttons">                    \
	                <ul class="nNav"><li>                    \
                            <b class="nc"><b class="nc1"><b></b></b><b class="nc2"><b></b></b></b>            \
	                        <span class="ncc"><a id="kikiyutoo_submit" href="#">Связать с Last.fm</a></span>    \
	                        <b class="nc"><b class="nc2"><b></b></b><b class="nc1"><b></b></b></b>    \
	           </li></ul></div></form>';
        
        // Помещаем в объект, чтобы сгенерировать dom.
        var c = ce('div');
        c.innerHTML = content;
        
        // Добавляем на панель
        var container = geByClass('editorPanel',ge('content'),'div')[0];
        container.appendChild(c);
        
	    ge('kikiyutoo_submit').onclick = function(e)
             {
                 e.preventDefault();
                 
                 gotoGetToken();
             }
    };
    
    /**
     * Текущее время
     * @return {int} время в миллисекундах
     */
    function nowTime(){return (new Date).valueOf()};
    
    /**
     * Событие при окончании трека (переключен или конец)
     */
    function onFinish(id,wall)
    {
        //getTrackInfo(id);
    };
    
    /**
     * Получение текстового содержания элемента
     * @param {Object} element DOM-элемент
     * @return {string}
     */
    function getInnerText(element)
    {
        if (element.innerText)
        {
            return element.innerText;
        }
        else
        {
            return element.textContent;
        }
    };
    
	/**
	 * Расположить иконку напротив аудиозаписи
	 * @param {Object} id
	 */
	function placeIcon(id)
	{
		var container = ge('performer'+id).parentNode;
		//container.style.width = "300px";	// сжимаем заголовок трека, чтобы вместились иконки
		container.parentNode.appendChild(playIcon);
		
		// Скрываем иконку "скробблено"
		ge('scrobbled_icon').style.display = 'none';
	};
	
	/**
	 * Удалить иконку
	 */
	function removeIcon()
	{
		playIcon.parentNode.removeChild(playIcon);
	};
	
	/**
	 * Установить активность иконки в зависимости от состояния воспроизведения
	 * @param {Object} playing Трек проигрывается
	 */
	function changeIconsState(playing)
	{
		playing = !!playing;
		ge('playingicon').style.display = playing ? 'inline' : 'none';
		ge('stoppedicon').style.display = playing ? 'none' : 'inline';
	};
	
    /**
     * Добавление времени проигрывания
     */
    function addTime()
    {
        KikuyutooObject.total_time += nowTime() - KikuyutooObject.start_playing_time;
    };
    
	
    /**
     * Поличить информацию о треке
     * @param {string} id
     * @return {Object}
     */
    function getTrackInfo(id)
    {
        var result = 
            {
                artist: '',
                title: '',
                duration: 0
            };
        
        // получаем из DOM
        result.artist = getInnerText( ge('performer' + id) );
        result.track = getInnerText( ge('title' + id) );
        
        // из AudioObject
        result.duration = ~~ao.fileInfo[id].duration;
        
        return result;
    };
    
    /**
     * Прикрепление функции к другой функции объекта.
     * @param {Object} obj Объект с оригинальной функцией
     * @param {string} name Имя функции в объекте
     * @param {func} func Дополняющая функция. Она будет вызвана со всеми аргументами перед вызовом исходной.
     */
    function funcListening(obj,name,func)
    {
        var origin = obj[name];
        obj[name] = function()
        {
            func.apply(this, arguments);
            origin.apply(this, arguments);
        };
    };
    
    /**
     * Событие при смене состояния
     * @param {string} id
     * @param {string} state
     * @param {string} message
     */
    function changeState(id, state, message)  
    {
   
        switch (state)
        {
            case 'play':

                log('из паузы ' + id);
				// начинаем отчет начала воспроизведения с текущего момента времени
                KikuyutooObject.start_playing_time = nowTime();
				
				// заново создаём таймаут
				createTimeout(KikuyutooObject.total_time, getTrackInfo(id).duration*1000);
				
				// иконка "воспроизводится"
				changeIconsState(true);

                break;
                
            case 'pause':
                log('на паузу ' + id);
				// удаляем таймаут. Он не должен безать вовремя паузы
                stopTimeout();
				
				// добавляем проигранное время
                addTime();
				
				// иконка "пауза"
				changeIconsState(false);
				
                break;
        }
    };
    
    /**
     * Событие при начале воспроизведения
     * @param {string} id
     */
    function beginPlay(id)
    {
        log('начало воспроизведения ' + id);
        var info = getTrackInfo(id);
		
		// Удаляем таймаут
		stopTimeout();
		
		
		// сбрасываем все параметры воспроизведения
	    KikuyutooObject.total_time = 0;
	    KikuyutooObject.last_id = id;
	    KikuyutooObject.start_playing_time = nowTime();
		
		// Отправляем информацию "Сейчас проигрывается" на ластфм
		lastfm.user.updateNowPlaying({
				artist: info.artist,
				track: info.track,
				duration: info.duration
			}, {key: session},debugCallbacks);

		
		// Создаём новый таймаут для скробблинга текущего трека
		scrobbleFunc = function(){testToScrobble(id)};
		createTimeout(0, info.duration*1000);
		
		// располагаем иконка напротив трека
		placeIcon(id);
		changeIconsState(true);
		
        log([info.artist,info.track,info.duration].toString());
        
    };
    
	/**
	 * Устанавливает таймаут, по истечению которого трек скробблится
	 * @param {Object} played_time Проигранное время, мсек
	 * @param {Object} duration Длина трека, мсек
	 */
	function createTimeout(played_time, duration)
	{
		var halftime = Math.round(duration/2);
		var time;
		
		if (halftime < 240000)			// если половина трека меньше 240 секунд, то ориентируемся на половину
		{
			time = halftime - played_time;
		}
		else			// иначе на 240 секунд
		{
			time = 240000 - played_time;
		};
		
		/*
		 * Если время отрицательное, то значит где-то произошёл сбой 
		 * (вероятней всего сбой из-за округления времени)
		 * мы немедленно скробблим этот трек
		 * Это скорее зашлушка бага, который надо бы отловить
		 * TODO: отловить баг с отрицательным временем таймаута
		 */
		if (time <= 0)		
		{
			scrobbleFunc();
		}
		else
		{
			log('Установлен таймаут скробблинга: ' + time + ' сек.');
			scrobbleTimeout = setTimeout(scrobbleFunc,time + 500);
		};
		
	};
	
	/**
	 * Удаляет таймаут скробблинга
	 */
	function stopTimeout()
	{
		log('Таймаут удалён');
		clearTimeout(scrobbleTimeout);
	};
	
    /**
     * Событие при конце воспроизведения (закончен или переключен)
     * @param {string} id
     */
    function endPlay(id)
    {
        log('конец воспроизведения ' + id +' (' + Math.floor(KikuyutooObject.total_time/1000) + ' сек)');
		// Добавляем проигранное время
		addTime();
		// Удаляем таймаут
		stopTimeout();

		//testToScrobble(id);
		
		// удаляем иконки
		removeIcon();
    };
        
    /**
     * Считать полученный токен. Он передается параметром ?token=...
     * @return {string}
     */
	function getToken()
	{
		var match = /[?&]token=([a-z0-9]{32})&?/.exec(location.search);
		if (match !== null)
		{
			return match[1];
		}
		else
		{
			return null;
		}
	};
	
	/**
	 * Скробблить трек с проверкой необходимости
	 * @param {Object} id
	 */
	function testToScrobble(id)
	{
		// Проигранное время
		var playingTime = Math.floor(KikuyutooObject.total_time/1000 + ( nowTime() - KikuyutooObject.start_playing_time ) );
		// Информация о треке
		var info = getTrackInfo(id);
		
		log('scrobble test: ' + id);
		// Выполняем проверки
		if (   playingTime >= 30 && ( playingTime >= Math.round(info.duration / 2) || playingTime >= 240 ))
		{
			log('scrobble test passed: ' + id);
			// скробблим
			onScrobble(info.artist, info.track, info.duration);
			// удаляем таймаут
			stopTimeout();
			// удаляем функцию по таймауту
			scrobbleFunc = pass;
		}
		else
		{
			/*
			 * По идее случая, когда проверки не прошли не должно быть, так как
			 * время таймаута расчитывется специально для этого.
			 */
			log('scrobble test error: ' + [playingTime, info.duration, Math.round(info.duration / 2)].toString());
		}
	};
	
	/**
	 * Отправиться за получением токена
	 */
	function gotoGetToken()
	{
		location.href = 'http://www.last.fm/api/auth/?api_key=' + apiKey;
	};
	
	/**
	 * Скробблить трек напрямую
	 * @param {Object} artist Название исполнителя
	 * @param {Object} track Название трека
	 * @param {Object} duration Длина трека в секундах
	 */
	function onScrobble(artist,track,duration)
	{
		log('sending song to scrobble');
		// Отправляем информацию на ластфм
		lastfm.track.scrobble({
			artist: artist,
			track: track,
			duration: duration
			}, {key: session}, 
			{success:function()
				{
					
					/*
					 * В результате успеха показываем иконку "скробблено"
					 */
					showScrobbledIcon();
				}
			});
			
		
	};

	/**
	 * Показать иконку "трек скробблен"
	 */
	function showScrobbledIcon()
	{
		ge('scrobbled_icon').style.display = 'inline';
	};
	
	function showSplashScreen()
	{
		var msgbox = MessageBox({title:'Привет, я - Kikuyutoo',closeButton:true});
		msgbox
			.content("<b>steach успешно установлен!</b> Скоро он начнёт скробблить музыку, которую вы слушаете. Но перед этим Вам надо связать Кикуюту с Вашим аккаунтом на Last.fm. Вы можете сделать это прямо сейчас, или позже. Для этого зайдите в Настроки на этом сайте и внизу нажмите кнопку 'Связать с Last.fm'.")
			.addButton({label:'Связать с аккаунтом на Last.fm',onClick: gotoGetToken})
			.show();
	}
	
    // Отображаем настройки
    if (ge('services_container'))
    {
        showSettingsForm();
		// Проверяем, не получили мы токен
		if (location.search !== '')
		{
			var token = getToken();
			if (token !== null)
			{
				// если токен получен, пытаемся получить сессию
				lastfm.auth.getSession({token:token},{
					success: function(data)
						{
							// сохраняем сессию
							KikuyutooObject.setSession(data.session.name,data.session.key);
							showMessageLine('steach связан с вашим профилем ' + data.session.name + ' на Last.fm')
						},
					error: function(code, message)
						{
							log('error: ' + message);
							// выводим ошибку
							showMessageLine('Произошла ошибка при связывании steach с вашим профилем Last.fm')
						}
					});
			};
			
		};
	
    };
    
    
	if (username == null || session == null)
	{
		if (installedVersion !== version)
		{
			showSplashScreen();
			setValue('version',version);
		}
		else
		{
			return;
		}
	};
	
	// Модифицируем вконтактовский объект AudioObject чтобы отлавливать события треков
	
    // Прикрепляемся к функциям AudioObject 
    funcListening(ao,'changeState',changeState);
    funcListening(ao,'showPlayer',beginPlay);
    funcListening(ao,'hidePlayer',endPlay);

}
var kik = new Kikuyutoo();
debugLog('steach loaded');