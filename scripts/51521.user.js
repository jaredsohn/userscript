// ==UserScript==
// @name		Google Analytics Detector
// @fullname	Google Analytics 2.0 Detector
// @namespace	http://linhost.org/
// @author		ppalli
// @version		1.1
// @description	Detects if a page uses Google Analytics, old and new script version
// @include *
// ==/UserScript==

// Old Script Detector

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
logo.id = "logo_gad";
logo.innerHTML = '<div style="position: absolute; left: 0px; top: 0px;' +
'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
'font-size: small; background-color: #000000; z-index: 100;' +
'color: #ffffff; width:200px; opacity: .75;"><p style="margin: 2px 0 1px 0;"> ' +
'<b>Google Analytics enabled</b>' +
'</p></div>';

document.body.insertBefore( logo, document.body.firstChild );

window.setTimeout(
function() {
var logo = document.getElementById( "logo_gad" );
if ( logo ) {
logo.parentNode.removeChild( logo );
}
}
, 5000 );
return;
}
}

// New Script Detector

var URL = "google-analytics.com/ga.js";
var TRACKER = "_gat._getTracker()";

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
logo.id = "logo_gad";
logo.innerHTML = '<div style="position: absolute; left: 0px; top: 0px;' +
'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
'font-size: small; background-color: #000000; z-index: 100;' +
'color: #ffffff; width:220px; opacity: .75;"><p style="margin: 2px 0 1px 0;"> ' +
'<b>Google Analytics 2.0 enabled</b>' +
'</p></div>';

document.body.insertBefore( logo, document.body.firstChild );

window.setTimeout(
function() {
var logo = document.getElementById( "logo_gad" );
if ( logo ) {
logo.parentNode.removeChild( logo );
}
}
, 5000 );
return;
}
}