// ==UserScript==
// @name           Hide Facebook Presence Bar
// @namespace      fb
// @description    Adds a "Toggle Presence Bar" menu item to the Settings drop down which, when clicked, shows or hides the presence bar applications, bookmarks, chat and notifications)
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @version        1.02a - 26th August 2009
// ==/UserScript==

//
// (C) Benjamin Gagnon 2009
//

// UPDATES
// 1.02a  26th August 2009 State is maintained between page loads, moved "Toggle Presence Bar" menu item to "Settings"
// 1.01a  26th August 2009 Added "Toggle Presence" Menu Item
// 1.00a  26th August 2009 Initial Version



// ****************************************************************************
// BEGIN GLOBAL VARIABLES
// ****************************************************************************


var presenceBarElementId = 'presence';
var settingsDropdownElementId = 'fb_menu_settings_dropdown';


// ****************************************************************************
// END GLOBAL VARIABLES
// ****************************************************************************



// ****************************************************************************
// BEGIN FUNCTIONS
// ****************************************************************************


/**
 * Short form for DOM getElementByID( )
 */
function $( ID ) {

  return document.getElementById( ID );

}  // end function $( )


/**
 * Shows the presence bar
 */
function show_presence_bar( ) {

  $( presenceBarElementId ).style.display = 'block';

}  // end function show_presence_bar( )


/**
 * Hides the presence bar
 */
function hide_presence_bar( ) {

  $( presenceBarElementId ).style.display = 'none';

}  // end function hide_presence_bar( )


/**
 * Hides or shows the presence bar according to it's state the last time the page was loaded
 */
function init_presence_bar( ) {

  if ( GM_getValue( 'presenceBarIsVisible', true ) ) {
    show_presence_bar( );
  } else {
    hide_presence_bar( );
  }

}  // end function init_presence_bar( )


/**
 * Injects the "Toggle Presence" menu item into the facebook code
 *
 * Adds a click event listener to the menu item so that greasemonkey can toggle the presence bar directly
 */
function inject_toggle_presence_bar_menu_item( ) {

  var menubar = $( settingsDropdownElementId );

  var togglePresenceMenuItem = document.createElement( 'div' );
  togglePresenceMenuItem.setAttribute( 'class', 'fb_menu_item apps' );
  togglePresenceMenuItem.innerHTML = '<a class="fb_menu_item_link"><small>&nbsp;</small>Toggle Presence Bar</a>';

  togglePresenceMenuItem.addEventListener( 'click', toggle_presence_bar( ), true );

  menubar.appendChild( togglePresenceMenuItem );

}  // end function inject_toggle_presence_bar_menu_item( )


/**
 * Hides or shows the presence bar according to the state of the presenceBarIsVisible greasemonkey variable
 */
function toggle_presence_bar( ) {

  return function () {

    if ( GM_getValue( 'presenceBarIsVisible', true ) ) {
      hide_presence_bar( );
      GM_setValue( 'presenceBarIsVisible', false );
    } else {
      show_presence_bar( );
      GM_setValue( 'presenceBarIsVisible', true );
    }

  }

}  // end function toggle_presence_bar( )


// ****************************************************************************
// END FUNCTIONS
// ****************************************************************************



// ****************************************************************************
// BEGIN MAIN
// ****************************************************************************

// code is called in response to the load event
window.addEventListener( 'load', function( e ) {

  if( $( presenceBarElementId ) && $( settingsDropdownElementId ) ) {

    init_presence_bar( );

    inject_toggle_presence_bar_menu_item( );

  }

}, false );


// ****************************************************************************
// END MAIN
// ****************************************************************************

