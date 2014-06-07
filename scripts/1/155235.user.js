// ==UserScript==
// @name        RT - Show All Quoted Text
// @namespace   com.maltera.rt
// @description Shows all quoted text in RT tickets and hides the toggle button.
// @include     http://issues.bestpractical.com/Ticket/Display.html?*
// @version     1
// @grant       none
// ==/UserScript==

(function(){ // begin anonymous scope

// find page elements
var history = jQuery( '.history' );
var folders = history.find( '.message-stanza-folder' );
var linkToggleAll = history.find(
        '.titlebox-title a[onclick*="toggle_all_folds"]' );

// wrap the "toggle all" link for hiding
linkToggleAllWrapper = jQuery( document.createElement( 'span' ) );
linkToggleAllWrapper.html( ' &mdash; ' );
linkToggleAll.replaceWith( linkToggleAllWrapper );
linkToggleAllWrapper.append( linkToggleAll );

// create the "toggle enabled" link
var linkToggleEnabled = jQuery( document.createElement( 'a' ) );
linkToggleEnabled.attr( 'data-direction', 'disable' );
linkToggleEnabled.attr( 'href', '#' );
linkToggleAllWrapper.before( linkToggleEnabled );

linkToggleEnabled.bind( 'click', function (event) {
    event.preventDefault();

    if ('disable' == linkToggleEnabled.attr( 'data-direction' )) {
        linkToggleAll.attr( 'data-direction', 'open' ).click();
        linkToggleEnabled.attr( 'data-direction', 'enable' );
        linkToggleEnabled.text( 'Enable quote folding' );
        linkToggleAllWrapper.hide();
        folders.hide();
        folders.next( 'br' ).hide();
    } else {
        linkToggleAll.attr( 'data-direction', 'closed' ).click().show();
        linkToggleEnabled.attr( 'data-direction', 'disable' );
        linkToggleEnabled.text( 'Disable quote folding' );
        linkToggleAllWrapper.show();
        folders.next( 'br' ).show();
        folders.show();
    }
});

// toggle the folders off
linkToggleEnabled.click();

})(); // end anonymous scope