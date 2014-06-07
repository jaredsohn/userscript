// ==UserScript==
// @name           ReformatCode_Temp
// @namespace      http://onyxstone.stumbleupon.com/
// @description    ReformatCode_Temp
// @include        http://*.stumbleupon.com/*
// ==/UserScript==

var blogEntries;
var $;



if( window.wrappedJSObject.stumbler ) {

  $ = window.wrappedJSObject.$;
  blogEntries = $('#blogEntries');
  
  var cont = document.createElement( 'div' );
  blogEntries.prepend( cont );
  $( cont ).html('<textarea id="txbox" style="width: 100%; height: 100px;" ></textarea><br /><br /><button id="translate" type="button">Reformat code</button>');
  $('#translate')[0].addEventListener('click', translate , false);
}







function translate( e ) {
 var s = $( '#txbox' ).attr('value');
 var ss = s.replace( /\[/g , '%5B' );
 ss = ss.replace( /\]/g , '%5D' );
 //ss = ss.replace( /\</g , '%3C' );
 //ss = ss.replace( /\>/g , '%3E' );
 //ss = escape( s );
  $( '#txbox' ).attr('value', ss );
  
}

function translate_back( str ) {

  var ss = str.replace( /%5B/g , '[' );
 ss = ss.replace( /%5D/g , ']' );
 ss = ss.replace( /%3C/g , '<' );
 ss = ss.replace( /%3E/g , '>' );
 return ss;
}


