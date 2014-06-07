// ==UserScript==
// @name           GMQuery
// @namespace      http://www.zhangjingwei.com
// @include        http://localhost/check/
// ==/UserScript==
(function( window, undefined ) {
var GM = function(xpath){
    return new GM.fn.init(xpath);
},
toString = Object.prototype.toString,
hasOwnProperty = Object.prototype.hasOwnProperty,
push = Array.prototype.push,
slice = Array.prototype.slice,
indexOf = Array.prototype.indexOf;


GM.isFunction = function( obj ) {
		return toString.call(obj) === "[object Function]";
}

GM.isArray = function( obj ) {
	return toString.call(obj) === "[object Array]";
}

GM.isPlainObject = function( obj ) {
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || obj.setInterval ) {
		return false;
	}
	
	// Not own constructor property must be Object
	if ( obj.constructor
		&& !hasOwnProperty.call(obj, "constructor")
		&& !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
		return false;
	}
	
	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.

	var key;
	for ( key in obj ) {}
	
	return key === undefined || hasOwnProperty.call( obj, key );
}

GM.isEmptyObject = function( obj ) {
	for ( var name in obj ) {
		return false;
	}
	return true;
}

GM.fn = GM.prototype = {
    init : function(xpath){
        var target  = document.evaluate(
            '//'+xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null),
        len = target.snapshotLength,
        objs = [];
        if(len>1){
            for(len>0;len--;){
                objs[len] = target.snapshotItem(len);
            }
        }else{
            objs = target.snapshotItem(0);
            this[0] = objs;
            return this;
        }
    }
}

GM.fn.init.prototype = GM.fn;

GM.extend = GM.fn.extend = function() {
	// copy reference to target object
	var target = arguments[0] || {}, i = 1, length = arguments.length, options, name, src, copy;
	
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging object literal values or arrays
				if ( copy && ( GM.isPlainObject(copy) || GM.isArray(copy) ) ) {
					var clone = src && ( GM.isPlainObject(src) || GM.isArray(src) ) ? src
						: GM.isArray(copy) ? [] : {};

					// Never move original objects, clone them
					target[ name ] = GM.extend(clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

function now() {
	return (new Date).getTime();
}

GM.extend({
    each: function( object, callback, args ) {
		var name, i = 0,
		length = object.length,
		isObj = length === undefined || GM.isFunction(object);
		if (args){
			if (isObj){
				for (name in object){
					if (callback.apply( object[ name ], args ) === false){
						break;
					}
				}
			}else{
				for ( ;i < length;){
					if (callback.apply( object[ i++ ], args ) === false){
						break;
					}
				}
			}
			
		// A special, fast, case for the most common use of each
		}else{
			if (isObj){
				for (name in object){
					if (callback.call( object[ name ], name, object[ name ] ) === false){
						break;
					}
				}
			}else{
				for (var value = object[0];
				i < length && callback.call( value, i, value ) !== false;
				value = object[++i]) {}
			}
		}
		return object;
	}
});

GM.fn.extend({
    html : function(value){
        this[0].innerHTML = value;
        return this;
    },
    
    empty : function(){
        for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				//jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}
		
		return this;
    },
    
    append : function(value){
    
    },
    
    prepend : function(){
    
    },
    
    before : function(){
    
    },
    
    after : function(){
    
    },
    
    remove : function(){
    
    },
    
    clone : function(){
    
    } 
});

GM.fn.extend({
    bind : function(){
 
    },
    
    unbind : function(){
 
    }
});

GM.extend({
    addClass : function(css){
        if( css  !== undefined){
            GM_addStyle( css );
        }
        return this;
    }
});

GM.fn.extend({
    addClass : function(css){
        if( css  !== undefined){
            GM_addStyle( css );
        }
        return this;
    },
    
    removeClass : function(){
    
    }
});

var jsc = now(),
	rscript = /<script(.|\s)*?\/script>/gi,
	rselectTextarea = /select|textarea/i,
	rinput = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
	jsre = /=\?(&|$)/,
	rquery = /\?/,
	rts = /(\?|&)_=.*?(&|$)/,
	rurl = /^(\w+:)?\/\/([^\/?#]+)/,
	r20 = /%20/g;
	
// Attach a bunch of functions for handling common AJAX events
GM.fn.ajaxStart = function( f ) {
    alert("ok");
};
	
GM.extend({
    ajaxSettings : {
		url: location.href,
		type: "GET",
		headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
		// sendAsBinary https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
		// new in Firefox3
		binary: false,
		accept: "_default"
	},
	
	mime: {
		xml: "application/xml, text/xml",
		html: "text/html",
		script: "text/javascript, application/javascript",
		json: "application/json, text/javascript",
		text: "text/plain",
		_default: "*/*"
    },
    
	/*lastModified : {},

	etag : {},*/
	
	ajax : function(origSettings){
        var s = GM.extend({}, GM.ajaxSettings, origSettings);
        
        var jsonp,
        data,
        status,
        type = s.type.toUpperCase();
        //s.headers.accept = GM.mime[s.accept];
		
		// Build temporary JSONP function
		if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
			jsonp = s.jsonpCallback || ("jsonp" + jsc++);

			// Replace the =? sequence both in the query string and the data
			if ( s.data ) {
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			}

			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			window[ jsonp ] = window[ jsonp ] || function( tmp ) {
				data = tmp;
				success();
				// Garbage collect
				window[ jsonp ] = undefined;

				try {
					delete window[ jsonp ];
				} catch(e) {}

				if ( head ) {
					head.removeChild( script );
				}
			};
		}
		
		if ( s.dataType === "script" && s.cache === null ) {
			s.cache = false;
		}
		
		if ( s.cache === false && type === "GET" ) {
			var ts = now();

			// try replacing _= if it is there
			var ret = s.url.replace(rts, "$1_=" + ts + "$2");

			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
		}
		
		// If data is available, append data to url for get requests
		if ( s.data && type === "GET" ) {
			s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
		}
		
		//GM.event.trigger( "ajaxStart" );
				
        GM_xmlhttpRequest({
          method: s.type,
          url: s.url,
          headers: s.headers,
          binary: s.binary,
          onload: function(response) {
            success(response);
          },
          onerror: function(response) {
            if(s.error){
               s.error.call(this, response, response.status)
            }
          },
          onreadystatechange: function(response) {
            if(s.progress){
               s.progress.call(this, response, response.status, responese.readyState)
            }
          }
        });
        
        // Matches an absolute URL, and saves the domain
		var parts = rurl.exec( s.url ),
			remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);
			
		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType === "script" && type === "GET" && remote ) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			script.src = s.url;
			if ( s.scriptCharset ) {
				script.charset = s.scriptCharset;
			}
            
			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						success();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
					}
				};
			}

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709 and #4378).
			head.insertBefore( script, head.firstChild );

			// We handle everything using the script element injection
			return undefined;
		}
        
        function success(response){
            if(s.success){
               s.success.call(window, response, response)
            }
        }
    },
    
    get : function( url, data, callback, type ){
        // shift arguments if data argument was omited
		if ( GM.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = null;
		}

		return GM.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
    },
    
    post : function(url,data,callback,type){
        // shift arguments if data argument was omited
		if ( GM.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = {};
		}
		
		return GM.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
    },
    
    getScript : function(url,callback){
        return GM.get(url, null, callback, "script");
    },
    
    getJSON : function(url,data,callback){
        return GM.get(url, data, callback, "json");
    }
    
});

GM.extend({
    include : function(){
    
    }
});

GM.extend({
    data : function( name, value){
        if ( name === undefined){
            return GM_listValues();
        }else{
            if(arguments.length == 1){
                return GM_getValue(name);
            }else{
                GM_setValue(name, value);
                return this;
            }
        }
    },
    
    removeData : function( name ){
        if( name === undefined){
            var data = GM.data(),
            i = data.length;
            for( i > 0; i--; ){
                GM.removeData(data[i]);
            }
        }else{
            GM_deleteValue(name);
        }
    }
});

GM.extend({
    queue : function(){
    
    },
    
    dequeue : function(){
    
    },
    
    clearQueue : function(){
    
    }
});

window.GM = window.$ = GM;

})(window);

$.getJSON("http://house.baidu.com/bj/search/keyword/?kw=z&n=10&callback=?",function(data){
    console.log(data)
});