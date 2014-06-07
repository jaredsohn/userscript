// ==UserScript==
// @name           js Library Load
// @namespace	  http://d.hatena.ne.jp/bluerabbit/
// @include		  http://*
// @exclude        https://*
// @description   
// @version        0.0.1
// ==/UserScript==

(function () {

// -- [Main] --------------------------------------------------------------------------------------

function main() {
	log('call main');
}

// -- [Templete] ----------------------------------------------------------------------

/*----------------------------------------------------------------------------
 * Option
 *--------------------------------------------------------------------------*/

// Firefox log
var DEBUG = true;
//var LIB_NAME = 'Prototype';
//var LIB_URL = 'http://prototype.conio.net/dist/prototype-1.4.0.js';
var LIB_NAME = 'jQuery';
var LIB_URL = 'http://code.jquery.com/jquery-latest.pack.js';
var isLibLoaded = function (){
	if (eval('unsafeWindow.' + LIB_NAME)) return true;
	return false;
}

/*----------------------------------------------------------------------------
 * Function
 *--------------------------------------------------------------------------*/

// Firefox log api
function log() {
	if (!DEBUG) return;
	unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) 
};

function libraryLoad() {
	if (isLibLoaded()) return;
	log('load start');
	var permanent = GM_getValue(LIB_NAME);
	if( typeof permanent == "undefined" ) {
		GM_xmlhttpRequest({
		    method: 'get',
		    url: LIB_URL,
		    onload: function(details){
				var script = details.responseText;
			    GM_setValue( LIB_NAME, script );
				unsafeWindow.eval( script );
		    }
	   	});
		return;
	}
	unsafeWindow.eval( permanent );
}

// add event
window.addEventListener('load', function(){libraryLoad();main();}, false);

})();
