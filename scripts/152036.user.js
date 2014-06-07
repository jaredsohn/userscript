// ==UserScript==
// @name        kiirosora-test
// @namespace   test
// @description test
// @include     http://userscripts.org/guides/22
// @version     1
// ==/UserScript==

$.noConflict();

$( function() {

//====disable item selection
$.support.selectstart = "onselectstart" in document.createElement( "div" );
$.fn.disableSelection = function() {
	if( $.support.selectstart ) {	//ie,chrome
		return this.bind( "selectstart.ui-disableSelection", function( e ) {
			e.preventDefault();
		} );
	} else { //firefox
		return $( this ).css( 'MozUserSelect', 'none' );
	}
};

$("body *").disableSelection();

//=====disable ctrl keys
$( document ).keydown( function( e ) {
	var keyCode  = e.keyCode ? e.keyCode : e.which;
	var keys = [ 65, 80, 78, 67, 84, 83, 85, 82, 87, 122, 123 ];	// if pressed hotkeys Ctrl+[A|P|N|C|T|S|U|R|W|F11|F12]
	for( i in keys ) {
		if( e.ctrlKey ) {
			if( keyCode == keys[i] ) {
				return false;
			}
		}
	}
	if( keyCode == 122 || keyCode == 123 ) { //F11 and F12
		return false;
	}
} );

//=====disable img drag
$( 'img' ).bind( 'dragstart', function( e ) { e.preventDefault(); } );

//=====disable right click context menu
$( document ).bind( 'contextmenu', function( e ) { e.preventDefault(); } ); 

} );