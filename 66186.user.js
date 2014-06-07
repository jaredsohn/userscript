// ==UserScript==
// @name           jQueryPlay
// @namespace      http://wiki.greasespot.net
// @description    GM jQuery
// @include        http://*
// ==/UserScript==

if( document.contentType.search( /\b(?:xml|xhtml|html)\b/ ) == -1 ) {
	return;
}

load_javascript = function( uri ) {
	if( document.createElement ) {
		var e = document.createElement( "script" );
		e.type = "text/javascript";
		e.src = uri;
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};

load_javascript_inline = function( sourceCode ) {
	if( document.createElement ) {
		var e = document.createElement( "script" );
		e.type = "text/javascript";
		e.text = sourceCode;
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};

load_stylesheet = function( uri ) {
	if( document.createElement ) {
		var e = document.createElement( "link" );
		e.rel = "stylesheet";
		e.type = "text/css";
		e.href = uri;
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};

load_stylesheet_inline = function( sourceCode ) {
	if( document.createElement ) {
		var e = document.createElement( "style" );
		e.type = "text/css";
		var t = document.createTextNode( sourceCode );
		e.appendChild( t );
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};


var $, uw=unsafeWindow;
var chk = function(arg) {
  return typeof(arg) != 'undefined';
};
var cc = function(args) {
  if (chk(uw.console) && chk(uw.console.log)) {
    uw.console.log(arguments);
  }
};

var ___Trace = {
  url: 'http://localhost:4567/',
  encode: window.encodeURIComponent ? encodeURIComponent: escape,
  getReferrer: function(){
		return this.encode(document.referrer);
	},
	getCurrent: function(){
		return this.encode(document.location);
	},
  logPage: function() {
    
    cc({
      referrer: ___Trace.getReferrer(),
      current: ___Trace.getCurrent()
    });
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://localhost:4567/',
        onload: function(response) {
          cc(1);
          cc(response);
        }
    });

    cc("referrer: " + this.getReferrer(), "current: " + this.getCurrent());
  }
};

uw.___callback = function() { 
	$ = uw.jQuery; 
	
	___callback(); 
};

addEventListener( 'load', function() { 

	// start of config --------------------------------------------------------------

	/**
	 * mode:
	 *   remote = you need an active internet connection and remote sites need to be active too
	 *   local  = you need an active web server on your machine
	 *   file   = you need to allow javascript access your filesystem
	 */
	var mode = 'remote';

	/**
	 * path: config system / local properties to reflect your setup
	 */
	var path = {};
	path[ 'jquery' ] = { 
		  system: 'file:///Users/panfu/jsApp/ups/', local:  'http://localhost/jquery/', remote: 'http://jquery.com/src/'
	};

	// end of config --------------------------------------------------------------

	/**
	 * jQuery installation
	 */
	if (!uw.jQuery) {
	  load_javascript( path[ 'jquery' ][ mode ] + 'jquery-latest.pack.js' ); 
  	load_javascript_inline( 'jQuery.noConflict();' );
	}
	load_javascript_inline( '___callback();' );
}, true );

//-----------------------------------------------------------------------------

/**
 * put here your jQuery code
 * remember that $ is a safe alias for jQuery in here
 */
function ___callback() {
  
  // function get(url, cb) {
  //   GM_xmlhttpRequest({
  //     method: "GET",
  //      url: url,
  //      onload: function(xhr) { alert(1); cb(xhr.responseText); }
  //   });
  // }
  // 
  // get("http://xxxx.com:4567/?a=1111", cc);
  
  cc(GM_xmlhttpRequest);
  
  GM_xmlhttpRequest({
    method: "GET",
     url: "http://baidu.com/?a=1111",
     onload: function(xhr) { alert(1); }
  });
  
  $( 'p' ).css( {border:'1px dashed red'} );
  
  ___Trace.logPage();
  
}


