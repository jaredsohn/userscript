// ==UserScript==
// @name Google Analytics Detector
// @namespace http://codeword.blogspot.com
// @description Detects if a page uses Google Analytics
// @include *
// ==/UserScript==

var URL = "http://www.google-analytics.com/urchin.js";
var TRACKER = "urchinTracker()";

var scripts = document.getElementsByTagName( "script" );

var refPresent = false, codePresent = false, log = false;

for ( var i = 0; i < scripts.length; ++i ) {
var script = scripts[ i ];

// Check reference if not already found
if ( !refPresent ) {
var ref = script.src;

if ( ref != null ) {
refPresent = ( ref.search( URL ) != -1 );

if( log )
GM_log( "Tested ref: " + ref + " Result: " + refPresent );
}
}

// Check code if not already found
if ( !codePresent ) {
var code = script.innerHTML;

if ( code != null ) {
codePresent = ( code.search( TRACKER ) != -1 );

if( log )
GM_log( "Tested code: " + code + " Result: " + codePresent );
}
}

if ( refPresent && codePresent ) {
var logo = document.createElement("div");
logo.id = "logo";
logo.innerHTML = '<div style="position: absolute; left: 0px; top: 0px;' +
'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
'font-size: small; background-color: #000000; z-index: 100;' +
'color: #ffffff; width:200px; opacity: .75;"><p style="margin: 2px 0 1px 0;"> ' +
'<b>Google Analytics enabled</b>' +
'</p></div>';

document.body.insertBefore( logo, document.body.firstChild );

window.setTimeout(
function() {
var logo = document.getElementById( "logo" );
if ( logo ) {
logo.parentNode.removeChild( logo );
}
}
, 5000 );
return;
}
}