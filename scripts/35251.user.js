// Replaces Applet Tags by Object Tag
// version 0.1 beta
// Copyright (c) 2008, AppleGrew
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// Usage: When using this script then a new word 'Print' will appear
// beside every post's posting date header.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ReplaceTag
// @namespace     http://applegrew.blogspot.com/search/label/Greasemonkey%20Scripts/
// @description   Replaces deprecated applet tags by object tags
// @include       *
// ==/UserScript== 

document.addEventListener(
	'load',
	function () {
		//var matchThis = new RegExp('^'+location.protocol+'\\\/\\\/'+location.hostname.replace(/\./g,'\\.')+'\\\/','i');
		//var x = 0;
		//while( document.images[x] ) {
		//	if( !document.images[x].src.match(matchThis) ) {
		//		document.images[x].parentNode.removeChild(document.images[x]);
		//	} else { x++; }
		//}
		//var x = 0, y = document.getElementsByTagName('iframe');
		//while( y[x] ) {
		//	if( !y[x].getAttribute('src').match(matchThis) ) {
		//		y[x].parentNode.removeChild(y[x]);
		//	} else { x++; }
		//}
		var y = [document.getElementsByTagName('applet')];
		for( var x = 0; y[x]; x++ ) {
                  for( var z = 0; y[x][z]; z++ ) {
                    var oSrc = y[x][z].getAttribute('src');
                    if(!oSrc) oSrc = y[x][z].getAttribute('archive');
                    var code = y[x][z].getAttribute('code');
                    var codebase = y[x][z].getAttribute('codebase');
                    var w = y[x][z].getAttribute('width');
                    var h = y[x][z].getAttribute('height');
                    var name = y[x][z].getAttribute('name');
                    var children = y[x][z].childNodes;
			
			
			if( oSrc ) {
				y[x][z].parentNode.removeChild(y[x][z]);
                                
                                var newObj = y[x][z].createElement('object');
                                newObj.childNodes = children;
                                newObj.setAttribute('codetype','application/java');
                                newObj.setAttribute('name',name);
                                newObj.setAttribute('classid','java:'+code);
                                if(!codebase)
                                        newObj.setAttribute('codebase',codebase);
                                newObj.setAttribute('archive',oSrc);
                                if(!w)
                                        newObj.setAttribute('width',w);
                                if(!h)
                                        newObj.setAttribute('height',h);
                                
				z--;
		} } }
	},
	false
);