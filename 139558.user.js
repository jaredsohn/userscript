// ==UserScript==
// @id             Yet Another 4Shared
// @name           Yet Another 4Shared
// @description    No countdown timer, no login. Using 4server.info service.
// @icon           http://puu.sh/MGns
// @version        20130710|
// @namespace      http://www.4server.info
// @updateURL      https://userscripts.org/scripts/source/139558.meta.js
// @author         AMZMA
// @homepage       Teras
	// @include        http://www.4shared.com/android/*
	// @include        http://www.4shared.com/archive/*
	// @include        http://www.4shared.com/file/*
	// @include        http://www.4shared.com/get/*
	// @include        http://www.4shared.com/mobile/*
	// @include        http://www.4shared.com/mp3/*
	// @include        http://www.4shared.com/music/*
	// @include        http://www.4shared.com/office/*
	// @include        http://www.4shared.com/photo/*
	// @include        http://www.4shared.com/rar/*
	// @include        http://www.4shared.com/video/*
	// @include        http://www.4shared.com/zip/*
	// @include        http://www.4shared-china.com/android/*
	// @include        http://www.4shared-china.com/archive/*
	// @include        http://www.4shared-china.com/download/*
	// @include        http://www.4shared-china.com/file/*
	// @include        http://www.4shared-china.com/get/*
	// @include        http://www.4shared-china.com/mobile/*
	// @include        http://www.4shared-china.com/mp3/*
	// @include        http://www.4shared-china.com/music/*
	// @include        http://www.4shared-china.com/office/*
	// @include        http://www.4shared-china.com/photo/*
	// @include        http://www.4shared-china.com/rar/*
	// @include        http://www.4shared-china.com/video/*
	// @include        http://www.4shared-china.com/zip/*
	
	// @include        http://www.4server.info/download/*
// @run-at         document-start
// ==/UserScript==

if (window.location.host !="4server.info")
{	
	var ready = (function(){    

    var readyList,
        DOMContentLoaded,
        class2type = {};
        class2type["[object Boolean]"] = "boolean";
        class2type["[object Number]"] = "number";
        class2type["[object String]"] = "string";
        class2type["[object Function]"] = "function";
        class2type["[object Array]"] = "array";
        class2type["[object Date]"] = "date";
        class2type["[object RegExp]"] = "regexp";
        class2type["[object Object]"] = "object";

    var ReadyObj = {
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,
        // Hold (or release) the ready event
        holdReady: function( hold ) {
            if ( hold ) {
                ReadyObj.readyWait++;
            } else {
                ReadyObj.ready( true );
            }
        },
        // Handle when the DOM is ready
        ready: function( wait ) {
            // Either a released hold or an DOMready/load event and not yet ready
            if ( (wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady) ) {
                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if ( !document.body ) {
                    return setTimeout( ReadyObj.ready, 1 );
                }

                // Remember that the DOM is ready
                ReadyObj.isReady = true;
                // If a normal DOM Ready event fired, decrement, and wait if need be
                if ( wait !== true && --ReadyObj.readyWait > 0 ) {
                    return;
                }
                // If there are functions bound, to execute
                readyList.resolveWith( document, [ ReadyObj ] );

                // Trigger any bound ready events
                //if ( ReadyObj.fn.trigger ) {
                //  ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
                //}
            }
        },
        bindReady: function() {
            if ( readyList ) {
                return;
            }
            readyList = ReadyObj._Deferred();

            // Catch cases where $(document).ready() is called after the
            // browser event has already occurred.
            if ( document.readyState === "complete" ) {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                return setTimeout( ReadyObj.ready, 1 );
            }

            // Mozilla, Opera and webkit nightlies currently support this event
            if ( document.addEventListener ) {
                // Use the handy event callback
                document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                // A fallback to window.onload, that will always work
                window.addEventListener( "load", ReadyObj.ready, false );

            // If IE event model is used
            } else if ( document.attachEvent ) {
                // ensure firing before onload,
                // maybe late but safe also for iframes
                document.attachEvent( "onreadystatechange", DOMContentLoaded );

                // A fallback to window.onload, that will always work
                window.attachEvent( "onload", ReadyObj.ready );

                // If IE and not a frame
                // continually check to see if the document is ready
                var toplevel = false;

                try {
                    toplevel = window.frameElement == null;
                } catch(e) {}

                if ( document.documentElement.doScroll && toplevel ) {
                    doScrollCheck();
                }
            }
        },
        _Deferred: function() {
            var // callbacks list
                callbacks = [],
                // stored [ context , args ]
                fired,
                // to avoid firing when already doing so
                firing,
                // flag to know if the deferred has been cancelled
                cancelled,
                // the deferred itself
                deferred  = {

                    // done( f1, f2, ...)
                    done: function() {
                        if ( !cancelled ) {
                            var args = arguments,
                                i,
                                length,
                                elem,
                                type,
                                _fired;
                            if ( fired ) {
                                _fired = fired;
                                fired = 0;
                            }
                            for ( i = 0, length = args.length; i < length; i++ ) {
                                elem = args[ i ];
                                type = ReadyObj.type( elem );
                                if ( type === "array" ) {
                                    deferred.done.apply( deferred, elem );
                                } else if ( type === "function" ) {
                                    callbacks.push( elem );
                                }
                            }
                            if ( _fired ) {
                                deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
                            }
                        }
                        return this;
                    },

                    // resolve with given context and args
                    resolveWith: function( context, args ) {
                        if ( !cancelled && !fired && !firing ) {
                            // make sure args are available (#8421)
                            args = args || [];
                            firing = 1;
                            try {
                                while( callbacks[ 0 ] ) {
                                    callbacks.shift().apply( context, args );//shifts a callback, and applies it to document
                                }
                            }
                            finally {
                                fired = [ context, args ];
                                firing = 0;
                            }
                        }
                        return this;
                    },

                    // resolve with this as context and given arguments
                    resolve: function() {
                        deferred.resolveWith( this, arguments );
                        return this;
                    },

                    // Has this deferred been resolved?
                    isResolved: function() {
                        return !!( firing || fired );
                    },

                    // Cancel
                    cancel: function() {
                        cancelled = 1;
                        callbacks = [];
                        return this;
                    }
                };

            return deferred;
        },
        type: function( obj ) {
            return obj == null ?
                String( obj ) :
                class2type[ Object.prototype.toString.call(obj) ] || "object";
        }
    }
    // The DOM ready check for Internet Explorer
    function doScrollCheck() {
        if ( ReadyObj.isReady ) {
            return;
        }

        try {
            // If IE is used, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
        } catch(e) {
            setTimeout( doScrollCheck, 1 );
            return;
        }

        // and execute any waiting functions
        ReadyObj.ready();
    }
    // Cleanup functions for the document ready method
    if ( document.addEventListener ) {
        DOMContentLoaded = function() {
            document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            ReadyObj.ready();
        };

    } else if ( document.attachEvent ) {
        DOMContentLoaded = function() {
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( document.readyState === "complete" ) {
                document.detachEvent( "onreadystatechange", DOMContentLoaded );
                ReadyObj.ready();
            }
        };
    }
    function ready( fn ) {
        // Attach the listeners
        ReadyObj.bindReady();

        var type = ReadyObj.type( fn );

        // Add the callback
        readyList.done( fn );//readyList is result of _Deferred()
    }
    return ready;
})();

ready(function(){
    var css = "#kanan, iframe, noscript, blink, h2, p, a[target*=\"_blank\"], script[type*=\"text/javascript\"], div[id*=\"chitikaAdBeacon\"], font[color=\"ff00ff\"] {\n    display: none !important;\n    }\n    \n#center {\n    margin: 15% 20% !important;\n    }\n    \nfont[color=\"000080\"] {\n    font-size: 20px !important;\n    }\n    \nhtml, html > *, * {\n	background-color: #CFCFCF !important;\n	color: black !important;\n	}\n	\na, font[color=\"000080\"] {\n	color: black !important;\n	text-shadow: 0 0 5px white !important;\n	font-weight: bold !important;\n	}\n\na:visited, font[color=\"000080\"]:visited {\n	color: #996633 !important;\n    text-decoration: line-through !important;\n	}\n\na:hover, a:focus, font[color=\"000080\"]:hover {\n	color: white !important;\n	text-shadow: 0 0 4px black !important;\n	transition: all 0.3s ease-in-out 0s !important;\n	font-size: 18px !important;\n	}";
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(css);
			} else if (typeof PRO_addStyle != "undefined") {
				PRO_addStyle(css);
			} else if (typeof addStyle != "undefined") {
				addStyle(css);
			} else {
				var heads = document.getElementsByTagName("head");
				if (heads.length > 0) {
					var node = document.createElement("style");
					node.type = "text/css";
					node.appendChild(document.createTextNode(css));
					heads[0].appendChild(node); 
				}
			}
	});
}
	
if (document.domain ="4shared.com")
	{
		window.location="http://www.4server.info/download/"+window.location.href;
	}


