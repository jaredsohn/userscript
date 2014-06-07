// ==UserScript==
// @name          userscripts.org SourceCode TextArea Replacer
// @namespace     http://userscripts.org/
// @website       http://userscripts.org/scripts/review/156221
// @id            userscripts_org_sourcecode_textarea_replacer
// @author        d3n1c1d3
// @version       1.2
// @history       2013-01-31 02:30 meta data updated
// @history       2013-01-31 01:00 removed bug. after hitting the show syntax highlighting button shows now the syntax highlighted source code
// @history       2013-01-27 22:10 screnshots added
// @history       2013-01-27 21:45 integeration of sh_getText function in this script too
// @history       2013-01-27 20:30 completly without jQuery
// @include       http://userscripts.org/scripts/review/*
// @include       http://www.userscripts.org/scripts/review/*
// @match         http://userscripts.org/scripts/review/*
// @match         http://www.userscripts.org/scripts/review/*
// @license       creative commons share distribute modify
// @noframes
// @run-at        document-end
// @grant         none
// @description   adds an button to toggle between the syntax highlighted source code and a new plain text source code in a textarea html element. one click in this textarea element select the whole text. this might be usefull for manuall installations.
// ==/UserScript==

 ( function (){

    var DomReady = window.DomReady = {};

	// Everything that has to do with properly supporting our document ready event. Brought over from the most awesome jQuery. 

    var userAgent = navigator.userAgent.toLowerCase ();

    // Figure out what browser is being used
    var browser = {
    	version: ( userAgent.match ( /.+ (?:rv|it|ra|ie)[\/: ] ([\d.]+)/ ) || [] )[1],
    	safari: /webkit/.test ( userAgent ),
    	opera: /opera/.test ( userAgent ),
    	msie: ( /msie/.test ( userAgent ) ) && ( !/opera/.test ( userAgent ) ),
    	mozilla: ( /mozilla/.test ( userAgent) ) && ( !/ (compatible|webkit)/.test ( userAgent ) )
    };    

	var readyBound = false;	
	var isReady = false;
	var readyList = [];

	// Handle when the DOM is ready
	function domReady () {
		// Make sure that the DOM is not already loaded
		if ( !isReady ) {
			// Remember that the DOM is ready
			isReady = true;
        
	        if ( readyList ) {
	            for ( var fn = 0; fn < readyList.length; fn++ ) {
	                readyList[fn].call ( window, [] );
	            }
            
	            readyList = [];
	        }
		}
	};

	// From Simon Willison. A safe way to fire onload w/o screwing up everyone else.
	function addLoadEvent ( func ) {
	  var oldonload = window.onload;
	  if ( typeof window.onload != 'function' ) {
	    window.onload = func;
	  } else {
	    window.onload = function () {
	      if ( oldonload ) {
	        oldonload ();
	      }
	      func ();
	    }
	  }
	};

	// does the heavy work of working through the browsers idiosyncracies (let's call them that) to hook onload.
	function bindReady () {
		if ( readyBound ) {
		    return;
	    }
	
		readyBound = true;

		// Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
		if ( document.addEventListener && !browser.opera ) {
			// Use the handy event callback
			document.addEventListener ( "DOMContentLoaded", domReady, false );
		}

		// If IE is used and is not in a frame
		// Continually check to see if the document is ready
		if ( browser.msie && window == top ) ( function () {
			if ( isReady ) return;
			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll ( "left" );
			} catch ( error ) {
				setTimeout ( arguments.callee, 0 );
				return;
			}
			// and execute any waiting functions
		    domReady ();
		}) ();

		if ( browser.opera ) {
			document.addEventListener ( "DOMContentLoaded", function () {
				if ( isReady ) return;
				for ( var i = 0; i < document.styleSheets.length; i++ )
					if ( document.styleSheets[i].disabled ) {
						setTimeout ( arguments.callee, 0 );
						return;
					}
				// and execute any waiting functions
	            domReady ();
			}, false);
		}

		if ( browser.safari ) {
		    var numStyles;
			 ( function () {
				if ( isReady ) return;
				if ( document.readyState != "loaded" && document.readyState != "complete" ) {
					setTimeout ( arguments.callee, 0 );
					return;
				}
				if (numStyles === undefined) {
	                var links = document.getElementsByTagName ( "link" );
	                for ( var i=0; i < links.length; i++ ) {
	                	if ( links[i].getAttribute ( 'rel' ) == 'stylesheet' ) {
	                	    numStyles++;
	                	}
	                }
	                var styles = document.getElementsByTagName ( "style" );
	                numStyles += styles.length;
				}
				if ( document.styleSheets.length != numStyles ) {
					setTimeout ( arguments.callee, 0 );
					return;
				}
			
				// and execute any waiting functions
				domReady ();
			} ) ();
		}

		// A fallback to window.onload, that will always work
	    addLoadEvent ( domReady );
	};

	// This is the public function that people can use to hook up ready.
	DomReady.ready = function (fn, args) {
		// Attach the listeners
		bindReady ();
    
		// If the DOM is already ready
		if ( isReady ) {
			// Execute the function immediately
			fn.call ( window, [] );
	    } else {
			// Add the function to the wait list
	        readyList.push ( function () { return fn.call ( window, [] ); } );
	    }
	};
    
	bindReady ();
	
} ) ();

var source_code_replacer =
{
	debug: false ,
	executed: false ,
	iteration_handler: '' ,
	maximum_iterations: 100 ,
	current_iteration: 0 ,
	name: 'source_code_replacer' ,
	selectors: {
		link: '#content h3 a' ,
		source: '#source' ,
		button: '#source_code_replacer_button' ,
		textarea: '#source_code_replacer_textarea'
	} ,
	elements: {
		link: '' ,
		source: '' ,
		button: '' ,
		textarea: ''
	} ,
	source: {
		previous: '',
		next: ''
	} ,
	button: function ( ignore_errors ) {
		var fn_name = 'button';
		if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ()' );
		var replacer = document.createElement ( 'button' );
		if ( this.debug ) console && console.log ( 'document.createElement ( button )' );
		var id = this.selectors.button.substring ( 1, this.selectors.button.length );
		if ( this.debug ) console && console.log ( 'id : ', id );
		replacer.setAttribute ( 'id', id );
		replacer.style.position = 'fixed';
		replacer.style.bottom = '1em';
		replacer.style.right = '1em';
		replacer.innerHTML = 'show TextArea';
		document.getElementsByTagName ( 'body' )[0].appendChild ( replacer );
		if ( this.debug ) console && console.log ( 'body[0].appendChild ( replacer )' );
		var b = this.get ( this.selectors.button );
		if ( b ) {
			if ( this.debug ) console && console.log ( 'b fine' );
			b.addEventListener ( 'click', function () { source_code_replacer.toggle (); } );
			if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' () happy end' );
			return true;
		} else {
			if ( this.debug ) console && console.warn ( 'b fail' );
		}
		if ( ignore_errors != 'IGNORE_ERRORS' || this.debug ) console && console.warn ( this.name + '.' + fn_name + ' () FAILED' );
		return false;
	} ,
	sh_getText: function ( C ) {
		/* Copyright (C) 2007, 2008 gnombat@users.sourceforge.net */
		/* License: http://shjs.sourceforge.net/doc/license.html */
		if (C.nodeType === 3 || C.nodeType === 4) {
			return C.data
		} else {
			if (C.nodeType === 1 && C.tagName === "BR") {
				return "\n"
			} else {
				if (C.childNodes.length === 1) {
					return this.sh_getText(C.firstChild)
				} else {
					var A = "";
					for (var B = 0; B < C.childNodes.length; B++) {
						A += this.sh_getText(C.childNodes.item(B))
					}
					return A
				}
			}
		}
	} ,
	savePreviousContent: function ( ignore_errors ) {
		var fn_name = 'savePreviousContent';
		if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ()' );
		this.source.next = this.sh_getText ( this.elements.source );
		this.source.previous = this.elements.source.innerHTML;
		if ( this.source.next !== this.source.previous ) {
			if ( this.debug ) console && console.log ( 'everything is fine' );
			return true;
		}
		if ( ignore_errors != 'IGNORE_ERRORS' || this.debug ) console && console.warn ( this.name + '.' + fn_name + ' () FAILED' );
		return false;
	} ,
	textarea: function ( ignore_errors ) {
		var fn_name = 'textarea';
		if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ()' );
		var id = this.selectors.textarea.substring ( 1, this.selectors.textarea.length );
		if ( this.isFunction ( this.elements.source.previousSibling.appendChild ) ) {
			var txt = document.createElement ( 'textarea' );
			txt.setAttribute ( 'id', id );
			txt.setAttribute ( 'onclick', 'this.select();' );
			txt.setAttribute ( 'style', 'width: 98.7%;' );
			txt.innerHTML = this.source.next;
			this.elements.source.parentElement.appendChild ( txt );
			//var data = '<textarea id="' + id + '">' + source.next + '</textarea>';
			//this.elements.source.previousSibling.appendData ( data );
			if ( this.debug ) console && console.log ( 'define textarea element' );
			this.elements.textarea = this.get ( this.selectors.textarea );
			if ( this.elements.textarea ) {
				this.linkEvent ( 'add', 'IGNORE_ERRORS' );
				if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' () happy end' );
				return true;
			}
		}
		if ( ignore_errors != 'IGNORE_ERRORS' || this.debug ) console && console.warn ( this.name + '.' + fn_name + ' () FAILED' );
		return false;
	} ,
	toggle: function ( type, ignore_errors ) {
		var fn_name = 'toggle';
		if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ()' );
		if ( type != 'source' && type != 'textarea' ) type = 'toggle';
		if ( this.elements.source && this.elements.textarea )
		{
			if ( this.debug ) console && console.log ( 'source : ', this.elements.source, ' textarea : ', this.elements.textarea );
			if ( ( this.elements.source.style.display == 'none' && type == 'toggle' ) || type == 'source' ) {
				this.elements.source.style.display = 'block';
				this.elements.textarea.style.display = 'none';
				this.elements.button.innerHTML = 'show TextArea';
				if ( this.debug ) console && console.log ( 'now = source : block - textarea : none' );
			}
			else if ( ( this.elements.source.style.display !== 'none' && type == 'toggle' ) || type == 'textarea' ) {
				this.elements.source.style.display = 'none';
				this.elements.textarea.style.display = 'block';
				this.elements.button.innerHTML = 'show UserScripts.org PRE';
				if ( this.debug ) console && console.log ( 'now = source : none - textarea : block' );
			}
			if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' () happy end' );
			return true;
		} else {
			if ( this.debug ) console && console.log ( 'source : ', this.elements.source, ' textarea : ', this.elements.textarea );
			if ( ignore_errors != 'IGNORE_ERRORS' || this.debug ) console && console.warn ( this.name + '.' + fn_name + ' () FAILED' );
			return false;
		}
	} ,
	get: function ( selector, ignore_errors ) {
		var fn_name = 'get';
		if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ( ' + selector + ' )' );
		var element = '';
		var debug = false;
		if ( debug ) {
			var char_at = [ '0' ];
			var index_of = [ ' ', '[', ']', '"', "'", '0' ];
			for ( c in char_at ) {
				console && console.log ( char_at [ c ] + ' : ' + selector.charAt ( char_at [ c ] ) );
			}
			for ( i in index_of ) {
				console && console.log ( index_of [ i ] + ' : ' + selector.indexOf ( index_of [ i ] ) );
			}
		}
		if ( ( selector.charAt ( '0' ) == '#'
		    || selector.charAt ( '0' ) == '.' )
		   && ( selector.indexOf ( ' ' ) !== -1
		     && selector.indexOf ( '[' ) !== -1
		     && selector.indexOf ( ']' ) !== -1
			 && selector.indexOf ( '"' ) !== -1
			 && selector.indexOf ( "'" ) !== -1 ) ) {
			if ( selector.charAt ( '0' ) == '#' ) {
				element = document.getElementById ( selector.substring ( 1, selector.length ) );
				if ( this.debug ) console && console.log ( 'document.getElementById ( ' + selector + ' ) : ', element );
			} else if ( selector.charAt ( '0' ) == '.' ) {
				element = document.getElementsByClassNames ( selector.substring ( 1, selector.length ) );
				if ( this.debug ) console && console.log ( 'document.getElementsByClassNames ( ' + selector + ' ) : ', element );
			}
		}
		else
		{
			var element = document.querySelector ( selector );
			if ( this.debug ) console && console.log ( 'document.querySelector ( ' + selector + ' ) : ', element );
		}
		if ( typeof element == 'object' ) {
			if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ( ' + selector + ' ) happy end' );
			return element;
		}
		if ( ignore_errors != 'IGNORE_ERRORS' || this.debug )
		{
			if ( element ) {
				console && console.warn ( this.name + '.' + fn_name + ' ( ' + selector + ' ) FAILED - element : ', element );
			} else {
				console && console.warn ( this.name + '.' + fn_name + ' ( ' + selector + ' ) FAILED - element is falsy' );
			}
		}
		return false;
	} ,
	isFunction: function ( function_name ) {
		var fn_name = 'isFunction';
		if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ()' );
		if ( typeof function_name == 'function' ) {
			if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ( ' + function_name + ' ) happy end' );
			return true;
		}
		if ( ignore_errors != 'IGNORE_ERRORS' || this.debug ) console && console.warn ( this.name + '.' + fn_name + ' ( ' + function_name + ' ) FAILED' );
		return false;
	},
	linkEvent: function ( type, ignore_errors ) {
		var fn_name = 'linkEvent';
		if ( this.debug ) console && console.error ( this.name + '.' + fn_name + ' ( ' + type + ' (string) )' );
		if ( type == 'add' ) {
			if ( this.debug ) console && console.log ( type + ' before get' );
			this.elements.link = this.get ( this.selectors.link, 'IGNORE_ERRORS' );
			if ( this.debug ) console && console.log ( type + ' after get' );
			if ( this.debug ) console && console.log ( type + ' this.elements.link : ', this.elements.link , ' this.selectors.link : ', this.selectors.link );
			if ( this.elements.link ) {
				this.elements.link.addEventListener (
						'click' ,
						function () {
							deb_ug = source_code_replacer.debug;
							if ( deb_ug ) console && console.log ( 'link clicked START' );
							source_code_replacer.toggle ( 'source' );
							source_code_replacer.linkEvent ( 'remove' );
							if ( deb_ug ) console && console.log ( 'link clicked STOP' );
						} ,
						false
					);
				if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ( ' + type + ' (string) ) happy end' );
				return true;
			} else if ( this.debug ) {
				console && console.log ( 'this.elements.link id falsy' );
			}
		} else if ( this.elements.link ) {
			if ( this.debug ) console && console.log ( 'remove' );
			this.elements.link.removeEventListener (
					'click' ,
					function () {
						var deb_ug = source_code_replacer.debug;
						source_code_replacer.toggle ( 'source' );
						if ( deb_ug ) console && console.log ( 'removed' );
					} ,
					false
				);
			if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ( ' + type + '(string) ) happy end' );
			return true;
		}
		if ( ignore_errors != 'IGNORE_ERRORS' || this.debug )
		console && console.warn ( this.name + '.' + fn_name + ' ( ' + type + ' (string) ) FAILED' );
			console && console.log ( this.name + '.' + fn_name + ' () - arguments : ', arguments );
		return false;
	} ,
	init: function ( callback, ignore_errors ) {
		var fn_name = 'init';
		if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ()' );
		var found = false;
		this.current_iteration++;
		if ( this.debug ) console && console.warn ( this.current_iteration + ' of ' + this.maximum_iterations );
		var source = document.getElementById ( 'source' );
		if ( this.debug ) console && console.log ( 'document.getElementById ( source ) : ', source );
		if ( this.debug ) console && console.log ( this.get ( this.selectors.source ) );
		
		if ( typeof source !== 'object' ) // || source instanceof HTMLElement === false )
		{
			if ( this.debug ) console && console.log ( '#source failed' );
			if ( this.debug ) console && console.log ( 'typeof this.iteration_handler : ' + typeof this.iteration_handler );
			
			if ( !this.iteration_handler )
			{
				if ( this.debug ) console && console.log ( 'this.iteration_handler will be set' );
				this.iteration_handler = window.setInterval (
					function () {
						source_code_replacer.init (
							function ( ) {
								var deb_ug = this.debug;
								if ( deb_ug ) {
									console && console.log ( 'this.iteration_handler = window.setInterval ();' );
									console && console.log ( 'init() from setInterval' );
								}
							}
						);
					} ,
					1000
				);
				return false;
			}
		} else if ( typeof source == 'object' ) { //document.getElementById ( 'source' ) instanceof HTMLElement ) {
			if ( this.debug ) console && console.error ( 'source FOUND' );
			found = true;
		}
		if ( ( this.current_iteration > this.maximum_iterations && this.iteration_handler ) || ( found && this.iteration_handler ) ) {
			console && console.log ( 'window.clearInterval ( this.iteration_handler )' );
			window.clearInterval ( this.iteration_handler );
		}
		if ( found ) {
			if ( this.debug ) console && console.warn ( 'FOUND... YEAH' );
			this.button ();
			this.elements.button = this.get ( this.selectors.button );
			this.elements.source = this.get ( this.selectors.source );
			if ( this.elements.source ) {
				this.savePreviousContent ();
				this.textarea ();
				this.toggle ();
				if ( typeof callback == 'function' ) {
					if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' ( ' + callback + ' )' );
					callback ();
				}
				executed = true;
				if ( this.debug ) console && console.log ( this.name + '.' + fn_name + ' () happy end' );
				return true;
			}
		}
		console && console.log ( this.name + '.' + fn_name + ' () FAILED' );
		return false;
	}
}

if ( typeof DomReady !== undefined ) {
	if ( typeof DomReady.ready === 'function' ) {
		DomReady.ready ( function () {
			// if document is loaded and ready for manipulation START
				if ( source_code_replacer.debug ) console && console.log ( 'DomReady START' );
				source_code_replacer.init (
					function () {
						if ( source_code_replacer.debug ) {
							console && console.log ( 'executed in DomReady' );
						}
					}
				);
				if ( source_code_replacer.debug ) console && console.log ( 'DomReady END' );
			// if document is loaded and ready for manipulation STOP
				//alert ( 'should be ready to replace now' );
		} );
	};
};
/*
CONSOLE TESTS NEEDED?
if ( !source_code_replacer.executed ) {
	if ( source_code_replacer.debug ) console && console.log ( 'Outside DomReady START' );
	source_code_replacer.init (
		function ()	{
			if ( source_code_replacer.debug ) {
				console && console.log ( 'executed outside DomReady' );
			}
		}
	);
	if ( source_code_replacer.debug ) console && console.log ( 'Outside DomReady END' );
}
*/