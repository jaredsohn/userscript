// ==UserScript==
// @name            beautifulagony.com - flying sample box
// @namespace       http://userscripts.org/users/porncodemonkey
// @description     generates direct links to sample content
// @include         http://beautifulagony.com/public/main.php*
// @match           http://beautifulagony.com/public/main.php*
// @version         0.18
// @author          porncodemonkey
// @license         public domain
// @icon            http://s3.amazonaws.com/uso_ss/icon/155947/large.png?1357652519
// @homepage        http://userscripts.org/scripts/source/155947/
// @homepage        http://beautifulagony.com/
// @updateURL       http://userscripts.org/scripts/source/155947.meta.js
// @downloadURL     http://userscripts.org/scripts/source/155947.user.js
// @update-0.7-0.18 (2013-04-11) browser tests (firefox,chrome,opera) and changed run-at to document-start, meta data updated
// @update-0.6      (2013-04-10) version number changed back to floats, compressed version for publishing, description changed, check in chrome
// @update-0.5      (2013-04-03) rebuild (cause of site change)
// @update-0.4      (2013-01-07) version number changed to dates (Year.Month.Day)
// @update-0.3      version and name added to script
// @update-0.2      debug hash check added - include url asterix added
// @run-at          document-start
// ==/UserScript==

var bacfsb = {
	name : 'beautifulagony.com - flying sample box' ,
	date : '2013.04.11' ,
	version : '0.18' ,
	show_info : true ,
	str_repeat : function ( num, chr ) {
		var function_name = 'bacfsb.str_repeat ( ' + Object.prototype.toString.call ( num ) + ' , ' + Object.prototype.toString.call ( chr ) + ' );';
		var debug = getDebug ( function_name );
		var for_return = '';
		if ( num && chr ) {
			for ( var i = 0; i < num; i++ ) {
				for_return += chr;
			}
		}
		return for_return;
	} ,
	hash : function () {
		var hashs = window.location.hash.split ( '+' );
	} ,
	output : function ( direction ) {
		var function_name = 'bacfsb.output ();';
		if ( direction == 'script-start'
		&& ( this.show_info 			
		  || hasHash ( 'script-start' ) ) ) {
			var ignore = {
				keys : {
					'debug' : true ,
					'show_it' : true
				} ,
				type_of : {
					'function' : true
				}
			};
			var key_length = 0;
			var type_length = 0;
			for ( key in this ) {
				key_length = Math.max ( key.length, key_length );
				typeo_length = Math.max ( Object.prototype.toString.call ( this [ key ] ).length, type_length );
			}
			for ( key in this ) {
				if ( !ignore.keys [ key ] && !ignore.type_of [ typeof this [ key ] ] ) {
					var type = Object.prototype.toString.call ( this [ key ] );
					console && console.log ( key + this.str_repeat ( key_length - key.length, ' ' ) + ' ( ' + type + ' ) ' + this.str_repeat ( type_length - type.length, ' ' ) + ' : ' + this [ key ] );	
				}
			}
			console && console.log ( 'getBrowser = ' + getBrowser () );
			console && console.log ( '<<< bacfsb.output ();' );
			console && console.log ( ' ' );
		} if ( direction == 'script-before-init'
		  && ( this.show_info 			
		  || hasHash ( 'script-before-init' ) ) ) {
			console && console.log ( bacfsb.name + ' DomReady Started' );
		}
		if ( direction == 'script-end'
		&& ( this.show_info 			
		  || hasHash ( 'script-end' ) ) ) {
			console && console.log ( bacfsb.name + ' END OF SCRIPT' );
		}
	} ,
	setFavIcon : function () {
		var function_name = 'bacfsb.setFavIcon ();';
		var debug = getDebug ( function_name );
		var id = function_name.replace ( /[^0-9A-Za-z]/g, '' );
		// <link href="/images/script_icon.png" rel="shortcut icon" type="image/x-icon">
		var links = document.getElementsByTagName ( 'link' ) ,
		    favicon = '' ,
			insert = false;
		for ( l in links ) {
			if ( isHTMLElement ( links [ l ] ) ) {
				if ( links [ l ].hasOwnProperty ( 'rel' ) || links [ l ].rel ) {
					if ( links [ l ].rel == 'shortcut icon' ) {
						favicon = links [ l ];
					}
				}
			}
		}
		if ( !favicon ) {
			favicon = document.createElement ( 'link' );
			insert = true;
		}
		
		favicon.setAttribute ( 'href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozRTM0ODJENDc0ODJFMjExQUVEOTlEQzdCOTFBRUVDNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQUE0M0JGODlDQjQxMUUyQUYwQ0Q3NEIxRjU4NzgwRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQUE0M0JGNzlDQjQxMUUyQUYwQ0Q3NEIxRjU4NzgwRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzOUIxMzU2N0I4MkUyMTFBRUQ5OURDN0I5MUFFRUM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNFMzQ4MkQ0NzQ4MkUyMTFBRUQ5OURDN0I5MUFFRUM3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WodLVAAAAoBJREFUeNqMU79PWlEU/hBFEIEaYwKlxglpYSExCANxtJtjQxNJ/QeMg2mUQI2WmNTFCOlK+mtoaLs5aGLTLgQ3BweTGtG+KhgexECg/gDk9Z7TQEQXv+Gdd9+95zvf+c59qud+v8br9S5kstmpi4sLK+4Bg8GQcblc751O5+tOh9O5lJPl+b/lCgwmI6TfEjRdGvz88R0WixmS9AeKArz7+AE+nw/1eh1UaGNjI5RMJtVqt9v9eWxsTF+rVfHty1dks1ns7e0hMPUCz/x+7O/v45H1IV7OzaG3txdarZYUwGQyYWtry94p2AYymQz6HvRhcnISw4/tsA3b4HjiYLLwqwUUCnlUKhURC+ju7uY21tfXcXl5OdBJC4vFwoyjo6M4Pz9Hl2hBEPO38afjyOfzODs7w/X1NarVKvR6PYRyHB4eggnMZjP6+/uhUqlgNBo5+eqqyv3WajWuSElUqNFoMJHVakUikfhPYLPZEA6H25xeXV3lw4pwkFRFIpHW3vLycqsVTE9PK+KgQpEg+lLK5TKvRaXWXi6XU9LptCLLMq+FMo6sgKQTRCJHjUaDm98Jp6enrGZoaKhNKRNQr4RQKNTaiEajTND0IB6Pc1xbW7tLQOyExcVFTlKr1ZiZmeHDOzs7vBeLxdoSyUhCBz3oHhDIfZKp0+l4vbu7i56eHn5vuk9jvKOARkdYWVlpbQQCAU4eHBxs+XHTk2ZrmJ2dlSVJUsSoeAqlUklJpVKKuCTs9G3QZGgiR0dHSjAYlDpGRkbeip8CxWKRp3BycsJO0+Ui2bdBLVKr29vb8Hg8cdXx8bF6c3Nz/uDgICBU2O/zO4uWf4nCnyYmJt78E2AA6ZRplPfMl5EAAAAASUVORK5CYII=' );
		favicon.setAttribute ( 'rel', 'shortcut icon' );
		favicon.setAttribute ( 'type', 'image/png' );
		favicon.setAttribute ( 'id', id );
		if ( insert ) {
			document.getElementsByTagName ( 'head' ) [ 0 ].appendChild ( favicon );
		}
		var check = document.getElementById ( id );
		if ( check ) {
			return check;
		}
		return false;
	}
};

function getHashs () {
	var hashs = {};
	if ( window.location.hash ) {
		var has = window.location.hash.split ( '+' );
		for ( h in has ) {
			if ( typeof has [ h ] == 'string' ) {
				hashs [ has [ h ] ] = true;
			}
		}
	}
	return hashs;
};

function hasHash ( id ) {
	var hashs = getHashs ();
	if ( hashs.hasOwnProperty ( id ) || hashs [ id ] ) {
		return hashs [ id ];
	}
};

function getBrowser () {
	var ua = navigator.userAgent.toLowerCase ();
	var is_mozilla = ( ua.indexOf ( 'mozilla' ) !== -1 ) ? true : false,
	    is_gecko = ( ua.indexOf ( 'gecko' ) !== -1 ) ? true : false,
		is_chrome = ( ua.indexOf ( 'chrome' ) !== -1 ) ? true : false,
		is_opera = ( ua.indexOf ( 'opera' ) !== -1 ) ? true : false,
		is_presto = ( ua.indexOf ( 'presto' ) !== -1 ) ? true : false;
	if ( is_mozilla && is_gecko && is_chrome ) {
		return 'chrome';
	} else if ( is_mozilla && is_gecko && !is_chrome ) {
		return 'firefox';
	} else if ( is_opera && is_presto ) {
		return 'opera';
	} else {
		return 'unknown';
	}
};

function getDebug ( id ) {
	var function_name = 'getDebug ( id ' + Object.prototype.toString.call ( id ) + ' : ' + id + ' );' ,
		debug = false,  // only used inside method getDebug ()
		for_return = false; // default fall back
	var default_return = for_return;
	// override
	if ( hasHash ( 'debug' ) ) {
		console && console.log (
			function_name, "\n",
			"\t", 'debug in hash detected'
		);
		return true;
	} else if ( hasHash ( id ) ) {
		console && console.log (
			function_name, "\n",
			"\t", id + ' in hash detected'
		);
		return true;
	} else {
		// define global Methods here
		var methods = {
			'beautifulAgonyFlyingSampleBox.default' : true
		};
		var	method_name = '' ,
			return_type = '';
			for ( met_name in methods ) {
				var met_name_num = id.indexOf ( met_name );
				if ( met_name_num !== -1 ) {
					method_name = met_name;
				}
			}
		if ( method_name ) {
			if ( Object.prototype.toString.call ( methods [ method_name ] ) === '[object Boolean]' ) {
				return_type = 'methods.' + method_name;
				for_return = methods [ method_name ];
			}
		}
		if ( Object.prototype.toString.call ( for_return ) !== '[object Boolean]' && Object.prototype.toString.call ( default_return ) === '[object Boolean]' ) {
			return_type = 'default_return';
			for_return = default_return;
		}
		debug && console && console.log (
			function_name, "\n",
			"\t", 'id : ', id, "\n",
			"\t", 'method_name : ', method_name, "\n",
			"\t", 'return ( ' + return_type + ' ) : ', for_return
		);
	}
	return for_return;
};

bacfsb.output ( 'script-start' );

/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {

	var done = false, top = true,

	doc = win.document, root = doc.documentElement,

	add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
	rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
	pre = doc.addEventListener ? '' : 'on',

	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) fn.call(win, e.type || e);
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}

}

function makeHttpObject() {
	// http://eloquentjavascript.net/chapter14.html
	var throw_error = false;
	try {
		return new XMLHttpRequest ();
	}
	catch ( error ) {
		// avoid error message
	}
	
	try {
		return new ActiveXObject ( "Msxml2.XMLHTTP" );
	}
	catch ( error ) {
		// avoid error message
	}
	
	try {
		return new ActiveXObject ( "Microsoft.XMLHTTP" );
	}
	catch ( error ) {
		// avoid error message
	}
	
	if ( throw_error ) {
		throw new Error ( "Could not create HTTP request object." );
	}
	return false;
};


function simpleHttpRequest ( url, success, failure ) {
	var function_name = 'simpleHttpRequest ( ' + Object.prototype.toString.call ( url ) + ' , ' + Object.prototype.toString.call ( success ) + ' , ' + Object.prototype.toString.call ( failure ) + ');';
	var debug = false;
	// requires makeHttpObject () function // to set up the XMLHttpRequest and work arounds
	//function simpleHttpRequest ( url, success, failure ) {
	var request = makeHttpObject ();
	if ( request && typeof success == 'function' && typeof failure == 'function' ) {
		debug && console && console.log (
			function_name ,
			' connecting to url : ', url
		);
		request.open ( "GET", url, true );
		request.send ( null );
		request.onreadystatechange = function () {
			debug && console && console.log (
				function_name ,
				' readyState : ', request.readyState ,
				' status : ', request.status ,
				' statusText : ', request.statusText ,
				' request : ', request
			);
			if ( request.readyState == 4 ) {
				if ( request.status == 200 ) {
					debug && console && console.log (
						function_name , 
						' connection success ' ,
						' status : ', request.status ,
						' statusText : ', request.statusText ,
						' responseText : ', request.responseText ,
						' request : ', request
					);
					success ( request );
					return true;
				}
				else {
					debug && console && console.log (
						'connection failure ' ,
						' status : ', request.status ,
						' statusText : ', request.statusText ,
						' request : ', request
					);
					failure ( request );
					return false;
				}
			}
		};
	} else {
		if ( typeof failure == 'function' ) {
			failure ();
		}
		debug && console && console.log ( 'http request failure : ' );
		return false;
	}
};

function sampleVideoHttpRequest ( url, id, success, failure ) {
	var function_name = 'simpleHttpRequest ( ' + Object.prototype.toString.call ( url ) + ' , ' + Object.prototype.toString.call ( success ) + ' , ' + Object.prototype.toString.call ( failure ) + ');';
	var debug = getDebug ( function_name );
	// requires makeHttpObject () function // to set up the XMLHttpRequest and work arounds
	//function simpleHttpRequest ( url, success, failure ) {
	var request = makeHttpObject ();
	if ( request && typeof success == 'function' && typeof failure == 'function' ) {
		debug && console && console.log (
			function_name ,
			' connecting to url : ', url
		);
		request.open ( "GET", url, true );
		request.send ( null );
		request.onreadystatechange = function () {
			debug && console && console.log (
				function_name ,
				' readyState : ', request.readyState ,
				' status : ', request.status ,
				' statusText : ', request.statusText ,
				' request : ', request
			);
			if ( request.readyState == 4 ) {
				if ( request.status == 200 ) {
					debug && console && console.log (
						function_name , 
						' connection success ' ,
						' status : ', request.status ,
						' statusText : ', request.statusText ,
						' responseText : ', request.responseText ,
						' request : ', request
					);
					success ( request, url, id );
					return true;
				}
				else {
					debug && console && console.log (
						'connection failure ' ,
						' status : ', request.status ,
						' statusText : ', request.statusText ,
						' request : ', request
					);
					failure ( request, url, id );
					return false;
				}
			}
		};
	} else {
		if ( typeof failure == 'function' ) {
			failure ();
		}
		debug && console && console.log ( 'http request failure : ' );
		return false;
	}
};

function isHTMLElement ( o ) {
	var function_name = 'isHTMLElement ( ' + Object.prototype.toString.call ( o ) + ' );';
	var debug = getDebug ( function_name );
	var html_search = '[object HTML';
	var html = Object.prototype.toString.call ( o ).indexOf ( html_search );
	var element_search = 'Element]';
	var element = Object.prototype.toString.call ( o ).indexOf ( element_search );
	debug && console && console.log (
		'Object.prototype.toString.call ( o ) : ', Object.prototype.toString.call ( o ) ,
		' html ( ' + html_search + ' ): ' , html ,
		' element ( ' + element_search + ' ) : ' , element
	);
	if ( html >= 0 ) {
		if ( element >= 0 ) {
			return true;
		}
	}
	return false;
};

function monthNameToInt ( str ) {
	var function_name = 'monthNameToInt ( ' + Object.prototype.toString.call ( str ) + ' );';
	var debug = getDebug ( function_name );
	var string_search = '[object String]';
	var object_string = Object.prototype.toString.call ( str );
	if ( object_string.indexOf ( string_search ) >= 0 ) {
		var month_names = {
			'1' : 'Jan' ,
			'2' : 'Feb' ,
			'3' : 'Mar' ,
			'4' : 'Apr' ,
			'5' : 'May' ,
			'6' : 'Jun' ,
			'7' : 'Jul' ,
			'8' : 'Aug' ,
			'9' : 'Sep' ,
			'10' : 'Oct' ,
			'11' : 'Nov' ,
			'12' : 'Dec'
		};
		for ( mona in month_names ) {
			if ( month_names [ mona ] == str ) {
				debug && console && console.log (
					function_name, "\n",
					"\t" + 'str ( input ) : ', str, "\n",
					"\t" + 'object_string : ', object_string, "\n",
					"\t" + 'object_string.indexOf ( ' + string_search + ' ) : ', object_string.indexOf ( string_search ), "\n",
					"\t" + 'mona ( return / index ) : ', parseInt ( mona ), "\n"
				);
				return parseInt ( mona );
			}
		}
	}
	debug && console && console.log (
		function_name, "\n",
		"\t" + 'str ( input ) : ' , str, "\n", 
		"\t" + 'object_string : ', object_string, "\n",
		"\t" + 'object_string.indexOf ( ' + string_search + ' ) : ', object_string.indexOf ( string_search ), "\n",
		"\t" + 'return : ', false, "\n"
	);
	return false;
};

//    json2.js
//    2012-10-08
//    Public Domain.
//    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//    See http://www.JSON.org/js.html
//    minified using http://compressor.ebiene.de/
if(typeof window.JSON !=='object'){JSON={};}(function(){'use strict';function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON !=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value && typeof value==='object' &&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case 'string':return quote(value);case 'number':return isFinite(value)?String(value):'null';case 'boolean':case 'null':return String(value);case 'object':if(!value){return 'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep && typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?':':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?':':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify !=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer && typeof replacer !=='function' &&(typeof replacer !=='object'||typeof replacer.length !=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse !=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value && typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v !==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return '\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());

function saveToLocalStorage ( key, obj ) {
	var function_name = 'saveToLocalStorage ( ' + Object.prototype.toString.call ( key ) + ' , ' + Object.prototype.toString.call ( obj ) + ' );';
	var debug = getDebug ( function_name );
	if ( typeof localStorage == 'object'
	  && typeof JSON == 'object' ) {
		if ( typeof key == 'string'
		  && typeof obj == 'object'
		  && typeof localStorage.setItem == 'function'
		  && typeof JSON.stringify == 'function' ) {
			localStorage.setItem ( key, JSON.stringify ( obj ) );
		} else if ( typeof key == 'object'
		         && !obj
				 && typeof JSON.stringify == 'function'
				 && typeof localStorage.setItem == 'function' ) {
			for ( id in key ) {
				if ( typeof key [ id ] !== 'function' ) {
					localStorage.setItem ( id, JSON.stringify ( key [ id ] ) );
				}
			}
		} else {
			debug && console && console.log (
				function_name, "\n",
				"\t" + 'nothing to save to localStorage', "\n",
				"\t" + 'typeof key ( ' + ( ( typeof key == 'object' && key ) ? Object.keys ( key ).length : ( key && key.length ) ? key.length : '-' ) + ' ) : ', typeof key, "\n",
				"\t" + 'typeof obj ( ' + ( ( typeof obj == 'object' && obj ) ? Object.keys ( obj ).length : ( obj && obj.length ) ? obj.length : '-' ) + ' ) : ', typeof obj, "\n",
				"\t" + 'typeof JSON.stringify : ', typeof JSON.stringify, "\n",
				"\t" + 'typeof localStorage.setItem : ', typeof localStorage.setItem, "\n"
			);
		}
	} else {
		console && console.log (
			function_name, "\n",
			"\t" + 'error ', "\n",
			"\t" + 'typeof localStorage : ', typeof localStorage, "\n",
			"\t" + 'typeof JSON : ', typeof JSON, "\n"
		);
	}
};

function loadFromLocalStorage ( key ) {
	var function_name = 'loadFromLocalStorage ( ' + Object.prototype.toString.call ( key ) + ' );';
	var debug = getDebug ( function_name );
	if ( typeof localStorage == 'object'
	  && typeof JSON == 'object'
	  && typeof JSON.parse == 'function' ) {
		debug && console && console.log (
			function_name , "\n",
			"\t", 'key ( ' + ( typeof key ) + ' ) : ', key, "\n",
			"\t", 'localStorage (length) : ', Object.keys ( localStorage ).length, "\n"
		);
		if ( Object.prototype.toString.call ( key ) === '[object String]'
		  && Object.keys ( localStorage ).length >= 1
		  && typeof localStorage.getItem == 'function' ) {
			debug && console && console.log ( 'key is String AND localStorage( length ) >= 1 AND localStorage.getItem' );
			beautifulAgonyFlyingSampleBox.storage [ key ] = JSON.parse ( localStorage.getItem ( key ) );
		} else if ( Object.prototype.toString.call ( key ) !== '[object String]' // not String
		         && Object.keys ( localStorage ).length >= 1 ) {
			debug && console && console.log ( '!key not String and localStorage( length ) >= 1' );
			for ( key in localStorage ) {
				if ( typeof localStorage [ key ] != 'function' ) {
					debug && console && console.log ( 'beautifulAgonyFlyingSampleBox.storage [ ' + key + ' ] = JSON.parse ( localStorage [ ' + key + ' ] ) : ' + JSON.parse ( localStorage [ key ] ).length + ';' );
					beautifulAgonyFlyingSampleBox.storage [ key ] = JSON.parse ( localStorage [ key ] );
				}
			}
		} else {
			debug && console && console.log (
				function_name, "\n",
				"\t" + 'nothing to load from localStorage', "\n"
			);
		}
	} else {
		console && console.log (
			function_name, "\n",
			"\t" + 'error ', "\n",
			"\t" + 'typeof localStorage : ', typeof localStorage, "\n",
			"\t" + 'typeof JSON : ', typeof JSON, "\n",
			"\t" + 'typeof JSON.parse : ', typeof JSON.parse, "\n"
		);
	}
};

var beautifulAgonyFlyingSampleBox = {
	object_name : 'beautifulAgonyFlyingSampleBox' ,
	querySelectorAll : function ( query ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.grab ( ' + Object.prototype.toString.call ( query ) + ' );';
		var debug = getDebug ( function_name );
		var elements = document.querySelectorAll ( query );
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'elements : ', elements, "\n"
		);
		return elements;
	} ,
	sample_query : 'img[alt="sample"]' ,
	sampleImageBackgroundURL : function ( element ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.imageBackgroundURL ( ' + Object.prototype.toString.call ( element ) + ' );';
		var debug = getDebug ( function_name );
		var bg = element.style.backgroundImage;
		var start_search = 'url(';
		var start = bg.indexOf ( start_search );
		var stop_search = ')';
		var stop = bg.indexOf ( stop_search );
		var url = bg.substring ( start + start_search.length, stop ).replace ( /"/g, '' );
		if ( url ) {
			debug && console && console.log (
				function_name, "\n",
				"\t" + 'bg : ', bg, "\n",
				"\t" + 'start ( ' + start_search + ' ) : ', start, "\n",
				"\t" + 'stop ( ' + stop_search + ' ) : ', stop, "\n",
				"\t" + 'url ( return ) : ', url, "\n"
			);
			return url;
		}
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'bg : ', bg, "\n",
			"\t" + 'start ( ' + start_search + ' ) : ', start, "\n",
			"\t" + 'stop ( ' + stop_search + ' ) : ', stop, "\n",
			"\t" + 'url : ', url, "\n",
			"\t" + 'return : ', false, "\n"
		);
		return false;
	} ,
	sampleId : function ( element ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.id ( ' + Object.prototype.toString.call ( element ) + ' );';
		var debug = getDebug ( function_name );
		var id = false;
		if ( element.hasOwnProperty ( 'innerHTML' ) || element.innerHTML ) {
			id = element.innerHTML.replace ( /[^0-9]/g, '' );
			if ( !Number ( parseInt ( id ) ) ) {
				id = false;
			}
		}
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'id : ', id , "\n",
			"\t" + 'Number ( parseInt ( id ) ) : ', Number ( parseInt ( id ) ), "\n",
			"\t" + 'element : ', element
		);
		return id;
	} ,
	sampleDuration : function ( element ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.sampleDuration ( ' + Object.prototype.toString.call ( element ) + ' );';
		var debug = getDebug ( function_name );
		//  16 Mar 2013 - 6:38
		var innerHTML = element.innerHTML;
		var start_search = ' - ';
		var start = innerHTML.indexOf ( start_search );
		if ( start >= 0 ) {
			start = start + start_search.length;
			var stop_search = /[0-9]$/;
			var stop = innerHTML.search ( stop_search );
			if ( stop !== -1 ) {
				stop = stop + 1;
				var substring = innerHTML.substring ( start, stop );
				if ( substring.indexOf ( ':' ) !== -1 ) {
					debug && console && console.log (
						function_name, "\n",
						"\t" + 'innerHTML : ', innerHTML, "\n",
						"\t" + 'start ( ' + start_search + ' ) : ', start, "\n",
						"\t" + 'stop ( ' + stop_search.toString () + ' ) : ', stop, "\n",
						"\t" + 'substring ( return ) : ', substring, "\n"
					);
					return substring
				}
			}
		}
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'innerHTML : ' , innerHTML, "\n",
			"\t" + 'start ( ' + start_search + ' ) : ', start, "\n",
			"\t" + 'return : ', false, "\n"
		);
		return false;
	} ,
	sampleRelease : function ( element ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.sampleRelease ( ' + Object.prototype.toString.call ( element ) + ' );';
		var debug = getDebug ( function_name );
		//  16 Mar 2013 - 6:38
		var innerHTML = element.innerHTML;
		var stop_search = ' - ';
		var stop = innerHTML.indexOf ( stop_search );
		var start_search = /[0-9A-Za-z]/;
		var start = innerHTML.search ( start_search );
		if ( stop >= 0 ) {
			var release = innerHTML.substring ( start, stop );
			var split = release.split ( ' ' );
			debug && console && console.log (
				function_name, "\n",
				"\t" + 'innerHTML : ' , innerHTML, "\n",
				"\t" + 'start ( ' + start_search.toString () + ' ): ', start, "\n",
				"\t" + 'stop ( ' + stop_search.toString () + ' ) : ', stop, "\n",
				"\t" + 'release : ', release, "\n",
				"\t" + 'split : ', split, "\n"
			);
			if ( split.length == 3 ) {
				var date_ = {
					year : parseInt ( split [ 2 ] ) ,
					month : monthNameToInt ( split [ 1 ] ) ,
					day : parseInt ( split [ 0 ] ) 
				};
				var date_return = '';
				// add leading zero 
				for ( key in date_ ) {
					if ( key !== 'year' ) {
						debug && console && console.log ( key + ' ( ' + key.length + ' ) : ' + date_ [ key ] + ' ( ' + date_ [ key ].length + ' )' );
						if ( date_ [ key ].length == 1 || date_ [ key ] < 10 ) {
							date_ [ key ] = '0' + date_ [ key ];
						}
						date_return += '-' + date_ [ key ]
					} else {
						date_return += date_ [ key ];
					}
				}
				if ( date_return ) {
					debug && console && console.log (
						function_name, "\n",
						"\t" + 'return : ', date_return, "\n"
					);
					return date_return; 
				}
			}
		}
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'innerHTML : ' , innerHTML, "\n",
			"\t" + 'start ( ' + start_search.toString () + ' ) : ' , start, "\n",
			"\t" + 'stop ( ' + stop_search.toString () + ' ) : ', stop, "\n",
			"\t" + 'return : ', false, "\n"
		);
		return false;
	} ,
	samplePlayer : function ( element ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.samplePlayer ( ' + Object.prototype.toString.call ( element ) + ' );';
		var debug = getDebug ( function_name );
		var href = element.getAttribute ( 'href' );
		var split = href.split ( ' ' );
		var indie = {};
		for ( key in split ) {
			var temp = split [ key ].replace ( /[^A-Z0-9]/g, '' );
			if ( !temp ) {
				split.splice ( key, 1 );
			} else if ( temp ) {
				split [ key ] = temp;
			}
		}
		for ( key in split ) {
			var temp = split [ key ].replace ( /[^A-Z0-9]/g, '' );
			if ( temp ) {
				switch ( key ) {
					case '0' :
						indie [ 'media_id' ] = temp;
						break;
					case '1' :
						indie [ 'person_number' ] = temp;
						break;
					case '2' :
						indie [ 'type' ] = temp;
						break;
				}
			}
		}
		debug && console && console.log ( 
			function_name, "\n",
			"\t" + 'indie : ', indie, "\n"
		);
		if ( Object.keys ( indie ).length == 3 ) {
			return indie;
			
		}
		// javascript:global.player.show( '12283', '2952', 'A')
		// http://beautifulagony.com/public/main.php
		// ?page=player
		// &out=bkg
		// &media_id=12283
		// &person_number=2952
		// &type=A
	} ,
	sampleCreateLink : function ( data ) {
		var function_name = 'beautifulAgonyFlyingSampleBox.sampleCreateLink ( data : ' + Object.prototype.toString.call ( data ) + ' );', 
			debug = false ,
			link_href_properties = [
				'media_id',
				'person_number',
				'type'
			] ,
		    link_href = [
				'page=player' ,
				'out=bkg'
			];
		for ( key in link_href_properties ) {
			if ( data.hasOwnProperty ( link_href_properties [ key ] ) ) {
				link_href.push ( link_href_properties [ key ] + '=' + data [ link_href_properties [ key ] ] );
			}
		}
		debug && console && console.log (
			function_name, "\n",
			"\t", 'data : ', data, "\n",
			"\t", 'link_href_properties : ', link_href_properties, "\n",
			"\t", 'link_href : ', link_href, "\n"
		);
		if ( link_href.length === 5 ) {
			// javascript:global.player.show( '12283', '2952', 'A')
			// http://beautifulagony.com/public/main.php?page=player&out=bkg&media_id=12283&person_number=2952&type=A
			return 'http://beautifulagony.com/public/main.php?' + link_href.join ( '&' );
		}
		return false;
		
	} ,
	sampleVideoLink : function ( url, id, stored_info ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.sampleVideoLink ( url : ' + Object.prototype.toString.call ( url ) + ' , id : ' + Object.prototype.toString.call ( id ) + ' , stored_info : ' + Object.prototype.toString.call ( stored_info ) + ' );' ,
		    debug = false,
			called = [];
		if ( typeof sampleVideoHttpRequest == 'function' && url && id ) {
			if ( !stored_info.hasOwnProperty ( 'mov' ) ) {
				sampleVideoHttpRequest ( url + '&format=mov', id, this.sampleVideoLinkSuccess, this.sampleVideoLinkFailure );
				called.push ( 'mov' );
			}
			if ( !stored_info.hasOwnProperty ( 'mp4' ) ) {
				sampleVideoHttpRequest ( url + '&format=mp4', id, this.sampleVideoLinkSuccess, this.sampleVideoLinkFailure );
				called.push ( 'mp4' );
			}
			if ( !stored_info.hasOwnProperty ( 'wmv' ) ) {
				sampleVideoHttpRequest ( url + '&format=wmv', id, this.sampleVideoLinkSuccess, this.sampleVideoLinkFailure );
				called.push ( 'wmv' );
			}
			if ( !stored_info.hasOwnProperty ( 'flv' ) ) {
				sampleVideoHttpRequest ( url + '&format=flv', id, this.sampleVideoLinkSuccess, this.sampleVideoLinkFailure );
				called.push ( 'flv' );
			}
		}
		debug && console && console.log (
			function_name, "\n" ,
			"\t", 'url : ', url, "\n",
			"\t", 'id : ', id, "\n",
			"\t", 'stored_info : ', stored_info, "\n",
			"\t", 'typeof sampleVideoHttpRequest : ', typeof sampleVideoHttpRequest, "\n",
			"\t", 'sampleVideoHttpRequest called for : ', called, "\n"
		);
	} ,
	sampleVideoLinkSuccess : function ( request, url, id ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.sampleVideoLinkCollect ( ' + Object.prototype.toString.call ( request ) + ' );';
		var debug = getDebug ( function_name );
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'request.status : ' , request.status, "\n",
			"\t" + 'request.statusText : ', request.statusText, "\n",
			"\t" + 'request.responseText.length : ', request.responseText.length, "\n",
			"\t" + 'request : ', request, "\n"
		);
		
		var resplit = request.responseText.split ( "\n" );
		for ( num in resplit ) {
			var stop_search_strings = [
				'.flv',
				'.mp4',
				'.mov',
				'.wmv'
			];
			var start_search = 'http://';
			for ( key in stop_search_strings ) {
				var stop_search = stop_search_strings [ key ];
				var stop = resplit [ num ].indexOf ( stop_search );
				if ( stop !== -1 ) {
					var start = resplit [ num ].indexOf ( start_search );
					if ( start !== -1 ) {
						var substring = resplit [ num ].substring ( start, stop + stop_search.length );
						//console && console.log ( 'substring : ', substring + "\n" );
						if ( id ) {
							beautifulAgonyFlyingSampleBox.storageSetTo ( id,  stop_search.replace ( '.', '' ), substring, true );
						}
					}
				}
			}
		}
		beautifulAgonyFlyingSampleBox.sampleBuild ( id ); // renew output
	} ,
	sampleVideoLinkFailure : function ( request, url, id ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.sampleVideoLinkFailure ();';
		var debug = getDebug ( function_name );
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'status : ', request.status, "\n",
			"\t" + 'statusText : ', request.statusText, "\n",
			"\t" + 'request : ', request, "\n"
		);
	} ,
	samplePrepare : function ( ima ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.samplePrepare ( ' + Object.prototype.toString.call ( ima ) + ' );',
		    debug = false ,
			stored_ = [];
		if ( Object.keys ( ima ).length >= 1 ) {
			for ( ge in ima ) {
				if ( isHTMLElement ( ima [ ge ] ) ) {
					var id_element = ima [ ge ].parentElement.parentElement.parentElement.children [ 0 ].children [ 0 ].children [ 0 ].children [ 0 ].children [ 0 ];
					var id = this.sampleId ( id_element );
					if ( id ) {
						var stored_info = this.storageGet ( id );
						if ( !stored_info ) {
							stored_info = {};
							stored_.push ( '608 initialisation' );
						} else {
							stored_.push ( '610 NOT initialisation' );
						}
						var bg_element = ima [ ge ].parentElement.parentElement;
						var link_element = ima [ ge ].parentElement;
						var release_duration = ima [ ge ].parentElement.parentElement.parentElement.children [ 2 ];
						debug && console && console.log (
							function_name, "\n",
							"\t" + 'id element : ' , id_element, "\n",
							"\t" + 'bg element : ' , bg_element, "\n",
							"\t" + 'link element : ' , link_element, "\n",
							"\t" + 'release_duration : ', release_duration, "\n"
						);
						if ( !stored_info.hasOwnProperty ( 'id' ) ) {
							this.storageSetTo ( id, { 'id' : id } );
							stored_.push ( '624 id' );
						} else {
							stored_.push ( '626 NOT id' );
						}
						if ( !stored_info.hasOwnProperty ( 'image' ) ) {
							var image = this.sampleImageBackgroundURL ( bg_element );
							if ( image ) {
								image.replace ( /"/g, '' );
								this.storageSetTo ( id, { 'image' : image } );
								stored_.push ( '632 image' );
							} else {
								stored_.push ( '634 NOT image' );
							}
						}
						if ( !stored_info.hasOwnProperty ( 'duration' ) ) {
							var duration = this.sampleDuration ( release_duration );
							if ( duration ) {
								this.storageSetTo ( id, { 'duration' : duration } );
								stored_.push ( '641 duration' );
							} else {
								stored_.push ( '643 NOT duration' );
							}
						}
						if ( !stored_info.hasOwnProperty ( 'release' ) ) {
							var release = this.sampleRelease ( release_duration );
							if ( release ) {
								this.storageSetTo ( id, { 'release' : release } );
								stored_.push ( '650 release' );
							} else {
								stored_.push ( '652 NOT release' );
							}
						}
						var player = this.samplePlayer ( link_element );
						if ( player ) {
							if ( !stored_info.hasOwnProperty ( 'media_id' ) || !stored_info.hasOwnProperty ( 'person_number' ) || !stored_info.hasOwnProperty ( 'type' ) ) {
								this.storageSetTo ( id, player ); // saving media_id, person_number, type
								stored_.push ( '696 media_id, person_number, type' );
							} else {
								stored_.push ( '698 NOT media_id, person_number, type' );
							}
							if ( !stored_info.hasOwnProperty ( 'player' ) ) {
								var player_link = this.sampleCreateLink ( this.storageGet ( id ) );
								if ( player_link ) {
									this.storageSetTo ( id, { 'player' : player_link } );
									stored_.push ( '704 player' );
								} else {
									stored_.push ( '706 NOT player' );
								}
							}
							if ( this.storage [ id ].player ) {
								this.sampleVideoLink ( this.storage [ id ].player, id, stored_info );
							} else {
								console && console.log (
									function_name, "\n",
									"\t", 'this.storage [ ' + id + ' ].player : is falsy', "\n"
								);
							}
							
							// later initalisation for iFrame through function playerInfo(); // injecting code START
							var link_function = function () {
								debug && console && console.log ( 'clicked : ', this, "\n",
								'calling : beautifulAgonyFlyingSampleBox.playerInfo (); in ' + beautifulAgonyFlyingSampleBox.playerInfo_looptime + ' milliseconds'
								);
								window.setTimeout (
									function () {
										var debug = getDebug ( function_name );
										debug && console && console.log ( 'calling : beautifulAgonyFlyingSampleBox.playerInfo (); NOW' );
										//                                         debug
										beautifulAgonyFlyingSampleBox.playerInfo ( debug )
									} ,
									beautifulAgonyFlyingSampleBox.playerInfo_looptime
								);
							};
							if ( link_element.addEventListener ) {
								link_element.addEventListener ( 'click', link_function, false );
							} else if ( link_element.attachEvent ) {
								link_element.attachEvent ( 'onclick', link_function );
							}
							// later initalisation for iFrame through function playerInfo(); // injecting code STOP
						}
					}
				}
			}
		} else if ( Object.keys ( ima ).length == 0 ) {
			debug && console && console.log (
				function_name, "\n",
				"\t" + 'nothing grabbed from document.querySelectorAll ( ' + this.sample_query + ' );', "\n"
			);
		}
		debug && console && console.log (
			function_name, "\n",
			"\t", 'stored_ : ', stored_, "\n"
		);
	} ,
	prepareSampleBuild : function ( ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + 'prepareSampleBuild ();';
		var debug = getDebug ( function_name );
		// <td>
		//     <font class="agonyid">#?????</font>
		// </td>
		var agony_id = document.getElementsByClassName ( 'agonyid' );
		if ( agony_id ) {
			for ( a_num in agony_id ) {
				if ( isHTMLElement ( agony_id [ a_num ] ) ) {
					var sample_id = beautifulAgonyFlyingSampleBox.sampleId ( agony_id [ a_num ] );
					var base = agony_id [ a_num ].parentElement;
					if ( base.nodeName.toLowerCase () == 'td' && sample_id ) {
						var download_css = [
							'display: none;' ,
							'position: absolute;' ,
							'z-index: 1;' ,
							//'margin-left: 78px;' , // defined later due to browser compatibility
							'background-color: whitesmoke;' ,
							'border: 1px solid burlywood;' ,
							'border-radius: 5px;' ,
							'padding: 0px;' ,
							'padding-right: 5px;' ,
							'margin-top: 3px;' ,
							'line-height: 14px;' ,
							'height: 14px;' ,
							'overflow: hidden;'
						];
						// OPERA AND PRESTO BROWSER ENGINE
						var browser = getBrowser ();
						if ( browser == 'opera' ) {
							download_css.push ( 'margin-left: 76px;' );
						}
						// MOZILLA FIREFOX AND GECKO BROWSER ENGINE
						else if ( browser == 'firefox' ) {
							download_css.push ( 'margin-left: 80px;' );
						}
						// FOR GOOLE CHROME AND WEBKIT BROWSER ENGINE
						else if ( browser == 'chrome' || browser == 'unknown' ) {
							download_css.push ( 'margin-left: 78px;' );
						}
						debug && console && console.log (
							function_name + "\n",
							"\t", 'css for ' + browser + "\n",
							"\t", 'download css', download_css
						);
						var download = document.createElement ( 'span' );
						download.setAttribute ( 'style', download_css.join ( ' ' ) );
						download.setAttribute ( 'id', 'beautifulAgonyFlyingSampleBox_id_' + sample_id );
						download.setAttribute ( 'data-agony-id', sample_id );
						download.setAttribute ( 'class', 'beautifulAgonyFlyingSampleBox_injected' );
						download.addEventListener ( 'mouseover', function () { this.style.height = ''; }, false );
						download.addEventListener ( 'mouseout', function () { this.style.height = '14px'; }, false );
						base.appendChild ( download );
					}
				}
			}
		}
	} ,
	sampleBuild : function ( num ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.sampleBuild ( ' + ( ( Object.prototype.toString.call ( num ) !== '[object Undefined]' ) ? num + ' [optional]' : 'undefined [optional]' ) + ' );';
		var debug = getDebug ( function_name );
		//debug && console && console.log (
		//	function_name, "\n",
				//"\t" + 'this will create a flying sample Box', "\n"
				//"\t" + 'this will insert a flv or mp4 download link to the video id', "\n"
		//);
		var elements = '';
		if ( !num ) {
			elements = document.getElementsByClassName ( 'beautifulAgonyFlyingSampleBox_injected' );
		} else if ( num ) {
			elements = document.querySelectorAll ( '#beautifulAgonyFlyingSampleBox_id_' + num );
		}
		debug && console && console.log (
			function_name, "\n",
			"\t", 'elements : ', elements, "\n"
		);
		if ( elements ) {
			for ( element_num in elements ) {
				if ( isHTMLElement ( elements [ element_num ] ) ) {
					debug && console && console.log (
						function_name, "\n",
						"\t", 'element : ', elements [ element_num ], "\n"
					);
					var sample_id = elements [ element_num ].getAttribute ( 'data-agony-id' );
					var store = beautifulAgonyFlyingSampleBox.storageGet ( sample_id );
					var nfo = beautifulAgonyFlyingSampleBox.buildNfoContent ( sample_id );
					if ( store && typeof store == 'object' ) {
						if ( Object.keys ( store ).length ) {
							var store_properties = [
								'nfo' ,
								'image' ,
								'player' ,
								'flv' ,
								'mp4' ,
								'mov' ,
								'wmv'
							];
							for ( sp_num in store_properties ) {
								var property = store_properties [ sp_num ] ,
									a_id = 'beautifulAgonyFlyingSampleBox_' + sample_id + '_' + property;
								debug && console && console.log ( property + ' : ' + ( store.hasOwnProperty ( property ) ? store [ property ] : 'NOT defined' ) );
								if ( typeof property == 'string'
								  && ( store.hasOwnProperty ( property ) || property == 'nfo' ) ) {
									var a_exists = document.getElementById ( a_id );
									var a = ( a_exists )
											? a_exists
											: document.createElement ( 'a' );
									a.setAttribute ( 'id', a_id );
									a.setAttribute ( 'style', 'font-size : 9px; margin-left : 3px; text-transform : uppercase; display : block;' );
									if ( property == 'nfo' ) {
										a.setAttribute ( 'download', sample_id + '.nfo.txt' );
										a.setAttribute ( 'href', nfo );
									} else {
										a.setAttribute ( 'href', store [ property ] );
									}
									a.innerHTML = property;
									if ( !a_exists ) {
										debug && console && console.log ( 'added' );
										elements [ element_num ].appendChild ( a );
										elements [ element_num ].style.display = 'inline-block';
									} else {
										debug && console && console.log ( 'NOT added' );
									}
								}
							}
						}
					}
				}
			}
		}
	} ,
	storage : {
		// id : {
			// id : 'identificator' ,
			// number
			// 
		//}
	} ,
	storageDump : function () {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.storageDump ();';
		var debug = getDebug ( function_name );
		debug && console && console.log (
			function_name, "\n",
			"\t", this.storageGet (), "\n"
		);
	} ,
	storageGet : function ( id ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.storageGet ( ' + Object.prototype.toString.call ( id ) + ' );';
		var debug = getDebug ( function_name );
		if ( this.storage && id ) {
			if ( this.storage.hasOwnProperty ( id ) ) {
				var element = this.storage [ id ];
				debug && console && console.log (
					function_name, "\n",
					"\t" + 'element ( return ) : ', element, "\n"
				);
				return element;
			}
		} else if ( this.storage && !id ) {
			debug && console && console.log (
				function_name, "\n",
				"\t" + 'this.storage ( return ) : ', this.storage, "\n"
			);
			return this.storage;
		}
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'return : ', false, "\n"
		);
		return false;
	} ,
	storageSetTo : function ( id, key, data, autoSaveToLocalStorage ) {
		autoSaveToLocalStorage = ( typeof autoSaveToLocalStorage == 'boolean' )
									? autoSaveToLocalStorage
									: false;
		var exit_on_startup = false;
		if ( !id || ( id && !key ) || ( id && !key && !data ) ) {
			exit_on_startup = true;
		}
		if ( typeof key == 'object' && !data && key ) {
			data = key;
		}
		var function_name = beautifulAgonyFlyingSampleBox.object_name +
			'.storageSetTo ( ' +
			'id ' + Object.prototype.toString.call ( id ) + ' : ' + id.toString() + ' , ' + 
			'key ' + Object.prototype.toString.call ( key ) + ' : ' + key.toString() + ' , ' + 
			'data ' + Object.prototype.toString.call ( data ) + ' : ' + data.toString() + ' , ' +
			'autoSaveToLocalStorage ' + Object.prototype.toString.call ( autoSaveToLocalStorage ) + ' : ' + autoSaveToLocalStorage.toString () + ' );';
		if ( exit_on_startup ) {
			console && console.log (
				function_name, "\n",
				"\t", 'abnormal abort in function', "\n"
			);
		}
		var debug = getDebug ( function_name );
		var noError = true;
		if ( ( typeof id == 'string' || typeof id == 'number' )
           && ( ( data && typeof data == 'object' )
			  && typeof this.storage == 'object' ) ) {
			if ( !this.storage.hasOwnProperty ( id ) ) {
				this.storage [ id ] = {};
			}
			if ( this.storage.hasOwnProperty ( id ) ) {
				for ( key in data ) {
					if ( !this.storage [ id ].hasOwnProperty ( key ) ) {
						this.storage [ id ] [ key ] = '';
					}
					this.storage [ id ] [ key ] = data [ key ];
				}
			}
		} else if ( ( typeof id == 'string' || typeof id == 'number' )
				  && ( typeof data == 'string' && typeof key == 'string' ) ) {
			if ( !this.storage.hasOwnProperty ( id ) ) {
				this.storage [ id ] = {};
			}
			if ( this.storage.hasOwnProperty ( id ) ) {
				if ( !this.storage [ id ].hasOwnProperty ( key ) ) {
					this.storage [ id ] [ key ] = '';
				}
				this.storage [ id ] [ key ] = data;
			}
		} else {
			noError = false;
		}
		// save to localStorage point defined Init();
		if ( noError === true && autoSaveToLocalStorage === true && typeof saveToLocalStorage == 'function' ) {
			saveToLocalStorage ( this.storage );
		} else {
			debug && console && console.log (
				function_name, "\n",
				"\t", 'noError : ', noError, "\n"
			);
		}
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'this.storage [ ' + id + ' ] : ', this.storage [ id ], "\n"
		);
	} ,
	playerInfo_maximum : 5 , // mutiply with playerInfo_looptime to get seconds
	playerInfo_current : 0 ,
	playerInfo_start_default : 0 , // used to reset counter
	playerInfo_looptime : 1000 , // milliseconds
	playerInfo : function ( debug ) {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.playerInfo ( debug : ' + Object.prototype.toString.call ( debug ) + ' );';
		if ( typeof debug !== 'boolean' ) {
			debug = getDebug ( function_name );
		}
		var checkLocation = function ( loc ) {
			var find_search = [
				'page=player' ,
				'out=bkg' ,
				'media_id=' ,
				'person_number='
			] ,
			found_search = [
			] ,
			loop_it = false;
			for ( fsnum in find_search ) {
				if ( find_search [ fsnum ] !== 'function' ) {
					if ( loc.indexOf ( find_search [ fsnum ] ) !== -1 ) {
						found_search.push ( find_search [ fsnum ] );
					}
				}
			}
			return ( find_search.length === found_search.length ) ? true : false;
		};
		// http://beautifulagony.com/public/main.php?page=player&out=bkg&media_id=12283&person_number=2952&type=A
		var loop_it = checkLocation ( window.location.search ),
		    final_manipulation = false;
		var iframes = document.getElementsByTagName ( 'iframe' ) ,
		    h2 = '' ,
			innerHTML = '' ,
			artist_query = '#playerpage .artistinfo h2';
		if ( iframes ) {
			debug && console && console.log (
				function_name, "\n",
				"\t", 'iframe loop start', "\n",
				"\t", 'loop_it : ', loop_it
			);
			for ( if_num in iframes ) {
				if ( isHTMLElement ( iframes [ if_num ] ) ) {
					debug && console && console.log (
						if_num ,
						iframes [ if_num ].contentDocument ,
						iframes [ if_num ]
					);
					if ( iframes [ if_num ].contentDocument ) {
						h2 = iframes [ if_num ].contentDocument.querySelector ( artist_query );
						debug && console && console.log ( '.contentDocument : ', iframes [ if_num ].contentDocument );
					}
					if ( !h2 ) {
						loop_it = checkLocation ( iframes [ if_num ].src );
					}
				}
			}
			debug && console && console.log (
				function_name, "\n",
				"\t", 'iframe loop stop', "\n",
				"\t", 'loop_it : ', loop_it
			);
		}
		if ( !h2 ) {
			h2 = document.querySelector ( artist_query );
		}
		debug && console && console.log (
			"\t", 'h2 : ', h2, "\n"
		);
		if ( h2 ) {
			if ( isHTMLElement ( h2 ) ) {
				h2.className += ' isHeadline';
				innerHTML = h2.innerHTML;
				innerHTML = innerHTML.replace ( /[^0-9]/g, '' );
				debug && console && console.log (
					function_name, "\n",
					"\t", 'innerHTML : ', innerHTML, "\n" ,
					'h2 : ', h2, "\n"
				);
				if ( innerHTML ) {
					var stored_info = this.storageGet ( innerHTML );
					if ( stored_info ) {
						h2.className += ' hasId';
						var div = document.createElement ( 'div' );
						div.setAttribute ( 'style', 'line-height : 14px;' );
						var getStyle = function ( style_id ) {
							var style_elements = {
								'player' : 'display : none;' ,
								'type' : 'display : none;' ,
								'id' : 'display : none;' ,
								'media_id' : 'display : none;' ,
								'person_number' : 'display : none;' ,
								'default' : 'display : block;'
							};
							if ( style_elements.hasOwnProperty ( style_id ) ) {
								return style_elements [ style_id ];
							} else {
								return style_elements [ 'default' ];
							}
						};
						var getClass = function ( id ) {
							var class_elements = {
								'player' : 'download' ,
								'wmv' : 'download' ,
								'flv' : 'download' ,
								'mov' : 'download' ,
								'mp4' : 'download' ,
								'image' : 'image' ,
								'default' : 'default'
							};
							if ( class_elements.hasOwnProperty ( id ) ) {
								return class_elements [ id ];
							} else {
								return class_elements [ 'default' ];
							}
						};
						
						var stored_keys = Object.keys ( stored_info );
						stored_keys.push ( 'nfo' );
						var zeiger = {};
						for ( sk_key in stored_keys ) {
							zeiger [ stored_keys [ sk_key ] ] = '';
						}
						
						for ( st_key in stored_info ) {
							if ( typeof stored_info [ st_key ] !== 'function' ) {
								var span = '' ,
									img = '' ,
									a = '';
								switch ( st_key ) {
									case 'image' :
										img = document.createElement ( 'img' );
										img.setAttribute ( 'src', stored_info [ st_key ] );
										span = document.createElement ( 'span' );
										span.appendChild ( img );
										break;
									case 'flv' :
									case 'mp4' :
									case 'mov' :
									case 'wmv' :
									case 'player' :
										a = document.createElement ( 'a' );
										a.setAttribute ( 'href', stored_info [ st_key ] );
										a.setAttribute ( 'style', 'display : inline-block; width : 100%;' );
										a.innerHTML = st_key;
										span = document.createElement ( 'span' );
										span.appendChild ( a );
										break;
									default :
										span = document.createElement ( 'span' );
										span.innerHTML = st_key + ' : ' + stored_info [ st_key ];
										break;
								}
								if ( span ) {
									span.setAttribute ( 'style', getStyle ( st_key ) );
									span.setAttribute ( 'class', 'beautifulAgonyFlyingSampleBox_player_' + getClass ( st_key ) );
									span.setAttribute ( 'id', 'beautifulAgonyFlyingSampleBox_player_' + st_key );
									div.appendChild ( span );
								}
								if ( zeiger.hasOwnProperty ( st_key ) && span ) {
									zeiger [ st_key ] = span;
								}
							}
						}
						// ADD NFO DOWNLOAD LINK
							var a = document.createElement ( 'a' );
							a.setAttribute ( 'href', beautifulAgonyFlyingSampleBox.buildNfoContent ( innerHTML ) );
							a.setAttribute ( 'download', innerHTML + '.nfo.txt' );
							a.setAttribute ( 'style', 'display : inline-block; width : 100%;' );
							a.innerHTML = 'nfo';
							var span = document.createElement ( 'span' );
							span.appendChild ( a );
							span.setAttribute ( 'style', getStyle ( 'nfo' ) );
							if ( zeiger [ 'player' ] ) {
								div.insertBefore ( span, zeiger [ 'player' ] );
								debug && console && console.log ( 'inserted Before : ', zeiger [ 'player' ] );
							} else {
								div.appendChild ( span );
								console && console.log ( 'appended' );
							}
							if ( zeiger.hasOwnProperty ( 'nfo' ) && span ) {
								zeiger [ 'nfo' ] = span;
							}
										
						debug && console && console.log (
							function_name, "\n",
							"\t", 'innerHTML : ', innerHTML, "\n" ,
							'h2 : ', h2, "\n",
							'h2.parentElement : ', h2.parentElement, "\n"
						);
						if ( h2.parentElement ) {
							debug && console && console.log ( 'parentElement' );
							if ( h2.parentElement.className.indexOf ( 'artistinfo' ) !== -1 ) {
								debug && console && console.log ( 'className contains artistinfo' );
								var base = h2.parentElement;
								if ( typeof base.appendChild == 'function' ) {
									debug && console && console.log ( 'appendChild is a function' );
									if ( div.hasChildNodes () ) {
										debug && console && console.log ( 'div has Child Nodes' );
										base.appendChild ( div );
										h2.className += ' gotChilds';
										final_manipulation = true;
									}
								}
							}
						}
					}
				}
			}
		}
		
		debug && console && console.log (
			function_name, "\n",
			"\t", 'loop_it : ', loop_it, "\n",
			"\t", 'playerInfo_current : ', beautifulAgonyFlyingSampleBox.playerInfo_current, "\n",
			"\t", 'playerInfo_maximum : ', beautifulAgonyFlyingSampleBox.playerInfo_maximum, "\n"
		);
		if ( !final_manipulation && loop_it ) {
			beautifulAgonyFlyingSampleBox.playerInfo_current++; // increase
			if ( beautifulAgonyFlyingSampleBox.playerInfo_current <= beautifulAgonyFlyingSampleBox.playerInfo_maximum ) {
				debug && console && console.log ( 'calling beautifulAgonyFlyingSampleBox.playerInfo (); in ' + beautifulAgonyFlyingSampleBox.playerInfo_looptime + ' milliseconds' );	
				window.setTimeout (
					function () {
						var debug = getDebug ( function_name );
						debug && console && console.log ( 'calling beautifulAgonyFlyingSampleBox.playerInfo (); NOW' );
						//                                         debug
						beautifulAgonyFlyingSampleBox.playerInfo ( debug );
					} ,
					beautifulAgonyFlyingSampleBox.playerInfo_looptime
				);
			} else {
				beautifulAgonyFlyingSampleBox.playerInfo_current = beautifulAgonyFlyingSampleBox.playerInfo_start_default;
				console && console.log ( 'final_manipulation : ', final_manipulation );
			}
		} else {
			beautifulAgonyFlyingSampleBox.playerInfo_current = beautifulAgonyFlyingSampleBox.playerInfo_start_default;
			debug && console && console.log ( 'final_manipulation : ', final_manipulation );
		}
	} ,
	buildNfoContent : function ( id ) {
		var function_name = 'beautifulAgonyFlyingSampleBox.buildNfoContent ( ' + Object.prototype.toString.call ( id ) + ' );',
		    store = beautifulAgonyFlyingSampleBox.storageGet ( id ) ,
		    debug = getDebug ( function_name );
		if ( store ) {
			debug && console && console.log (
				function_name + "\n",
				"\t", 'id : ', id, "\n",
				"\t", 'beautifulAgonyFlyingSampleBox.storageGet ( ' + id + ' ) : ', store
			);
			var content = '' ,
			    column_length = 0;
			var str_repeat = function ( num, chr ) {
				repeated_chr = '';
				if ( num ) {
					for ( var i = 0; i < num; i++ ) {
						repeated_chr += chr;
					}
				}
				return repeated_chr;
			};
			for ( key in store ) {
				if ( typeof store [ key ] !== 'function' ) {
					column_length = Math.max ( key.length, column_length ) ;
				}
			}
			for ( key in store ) {
				if ( typeof store [ key ] !== 'function' ) {
					content += key + ( str_repeat ( ( column_length - key.length ), ' ' ) ) + ' : ' + store [ key ] + "\n";
				}
			}
			debug && console && console.log (
				function_name, "\n",
				"\t", '(return) = data:application/txt;charset=utf-8,', encodeURI ( content ) , "\n",
				"\t", 'decodeURI ( content ) : ', decodeURI ( content ), "\n"
			);
			return 'data:application/txt;charset=utf-8,' + encodeURI ( content );
		}
		return false;
	} ,
	Init : function () {
		var function_name = beautifulAgonyFlyingSampleBox.object_name + '.Init ();';
		var debug = getDebug ( function_name );
		loadFromLocalStorage ();
		beautifulAgonyFlyingSampleBox.prepareSampleBuild ();
		beautifulAgonyFlyingSampleBox.samplePrepare ( beautifulAgonyFlyingSampleBox.querySelectorAll ( beautifulAgonyFlyingSampleBox.sample_query ) );
		debug && console && console.log (
			function_name, "\n",
			"\t" + 'return : ', true, "\n"
		);
		beautifulAgonyFlyingSampleBox.storageDump ();
		beautifulAgonyFlyingSampleBox.playerInfo ( debug );
		//beautifulAgonyFlyingSampleBox.buildNfoContent ();
		saveToLocalStorage ( beautifulAgonyFlyingSampleBox.storage );
		beautifulAgonyFlyingSampleBox.sampleBuild ();
		return true;
	}
};

function mainInit () {
	var debug = getDebug ( 'script-start' );
	bacfsb.output ( 'script-before-init' );
	var started = false;
	if ( typeof beautifulAgonyFlyingSampleBox == 'object' ) {
		if ( typeof beautifulAgonyFlyingSampleBox.Init == 'function' ) {
			beautifulAgonyFlyingSampleBox.Init ();
			started = true;
		}
	}
	if ( started ) {
		bacfsb.setFavIcon ();
		debug && console && console.log (
			'beautifulAgonyFlyingSampleBox.Init();', "\n",
			"\t" + 'called successfully', "\n"
		);
	} else {
		debug && console && console.log (
			'beautifulAgonyFlyingSampleBox.Init();', "\n",
			"\t" + 'error', "\n"
		);
	}
};
contentLoaded ( window, function () { mainInit (); } );
bacfsb.output ( 'script-end' );