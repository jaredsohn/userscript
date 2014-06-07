// Locator user script
// version 0.1
// 2006.01.22
// Copyright (c) 2006
// @author Robert D. Rice <rapido@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Locator", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This script is designed to make Rapattoni's Locator tool available to 
// Firefox on Windows, Mac and Linux.  The functionality implemented has
// been tested to work against two different MLS(s) using this system.
// In theory, it should work for many more.  Any url patterns for such
// MLS(s) not included below, can simply be added through Firefox.  To
// do so, under Tools/Manage User Scripts, select Locator then add
// Included Pages.
//
// This script includes the following functionality:
// Login:
//  * Fixed NWMLS login, which disallowed Mac and Linux Firefox users.
// Navigation:
//  * Provides replacement "pop-up" menus for all known navigation: Search, Listings,
//    Contact, Links, Admin, Help.  Menu items are dynamically created.  Original
//    menus were IE specific, and simply failed to operate in Firefox.
// Content:
//  * No work has yet been done to review the functionality of content pages 
//    ( the pages that come up after choosing a menu item ).
//
// Version History
// Version 0.1 (2006.01.22) initial release
//
// ==UserScript==
// @name          Locator
// @namespace     http://www.piston.com/scripts
// @description   Designed to make Rapattoni's Locator tool available to Firefox on Windows, Mac and Linux
// @include       http://nwmls.com/*
// @include       http://*.nwmls.com/*
// @include       http://rapmls.com/*
// @include       http://*.rapmls.com/*
// ==/UserScript==

var url = window.location.href;
var host = window.location.host;

window.addEventListener( 'load', function( ) {
  // patterns that match for all domains first
  if ( url.match( /MLSPageFrameset/i ) ) {
	handleLocatorNavigation( );
  // nwmls specific pages
  } else if ( host.match( /nwmls.com/i ) ) {
    if ( url.match( /\blogin.cfm/i ) ) {
      handleNwmlsLoginScreen( );
    }
  }

}, true );

/** retrieve the login screen as ie if necessary */
function handleNwmlsLoginScreen( ) {
  var forms = document.getElementsByTagName( "form" );
  if ( forms.length == 0 ) {

    document.getElementsByTagName( "body" )[0].innerHTML = 
        "<center>Please be patient while the page loads.</center>";
    replacePageAsIE( );
   }
}

/** replace the current page, as ie, 
    this helps resolver server user-agent detection, 
    without requiring Firefox User Agent extension */
function replacePageAsIE( ) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)'
    },
    onload: function(responseDetails) {
        document.write( responseDetails.responseText );
    }
   });
}

/** retool the navigation */
function handleLocatorNavigation( ) {
  // set the event handlers on the original navigation
  var els = new Array( "linkSearchID", "linkListingsID", "linkContactsID", 
                       "linkLinksID", "linkAdminID", "linkHelpID" );
  for ( var i = 0; i < els.length; i++ ) {
    addHandlersToLocatorNavigation( els[i] );
  }
}

/** override the navigation event handlers */
function addHandlersToLocatorNavigation( id ) {
  var el = document.getElementById( id );
  if ( el ) {
    el.addEventListener( "click", handleLocatorNavigationClick, true );
  }
}

/** respond when a click is received on the navigation */
function handleLocatorNavigationClick( event ) {
  var targetName = event.target.name;
  var menus = getLocatorMenus( parent.frames[1] );
  
  for( var i = 0; i < menus.length; i++ ) {
    var compare = "link" + menus[i].menuName;
    if ( compare == targetName ) {
      var el = getLocatorMenuWindow( );
      el.innerHTML = displayLocatorMenu( menus[i] );
      var left = event.target.offsetLeft;
      if ( ( left + el.offsetWidth ) > el.offsetParent.offsetWidth ) {
         left = el.offsetParent.offsetWidth - el.offsetWidth;
      }
      el.style.left = "" + left + "px";
      el.style.visibility = 'visible';

      break;
    }
   }
   event.stopPropagation( );
   event.preventDefault();
}

/** find the locator menu objects */
function getLocatorMenus( target ) {
  target = target ? target : window;
  var menus = target.wrappedJSObject.IMenus ?
              target.wrappedJSObject.IMenus : null;
  return menus;
}

/** to string method for a menu for debugging */
function toStringLocatorMenu( menu ) {
  var buf = menu.menuName + " { ";
  var delim = "";
  for ( var i = 0; i < menu.items.length; i++ ) {
    var item = menu.items[i];
    var itemDesc = item;
    if ( typeof item == "object" ) {
      itemDesc = "[ " + toStringLocatorMenu( item ) + " ]";
    }
    buf = buf + delim + itemDesc + ":" + menu.actions[i]; 
    delim = ", ";
  }
  buf = buf + " }";
  return buf;
}

/** display the locator menu */
function displayLocatorMenu( menu, level ) {

  var topLevel = level == false ? false : true;
  var buf = menu.menuName;

  if ( topLevel ) {
    buf = buf + ' <a style="color:blue;text-decoration:none" ' + 
    'onmouseover="this.style.color=\'red\';" onmouseout="this.style.color=\'blue\';" href="#" onclick="' + 
    hideLocatorMenu( ) + '">[ close ]</a>';
  }
  buf = buf + '<ul style="list-style:none;padding:0px;margin:0px;">'

  for ( var i = 0; i < menu.items.length; i++ ) {
    var item = menu.items[i];
    var action = menu.actions[i];
    var itemDesc = item;
    if ( typeof item == "object" ) {
      itemDesc = displayLocatorMenu( item, false );
    }
    if ( action && action != "" ) {
      buf = buf + '<li style="padding:1px;margin-left:5px;margin-right:5px;">'
      + '<a style="color:blue;text-decoration:none" ' + 
      'onmouseover="this.style.color=\'red\';" onmouseout="this.style.color=\'blue\';" ' + 
      'href="#" onclick="' + hideLocatorMenu( ) + action + '">' + 
            itemDesc + '</a></li>';      
    } else {
      if ( itemDesc == "separator" ) {
        buf = buf + '<li style="padding:1px;margin-left:5px;margin-right:5px;"><hr /></li>';
      } else {
        buf = buf + '<li style="padding:1px;margin-left:5px;margin-right:5px;">' + itemDesc + "</li>";
      }
    }
  }
  buf = buf + "</ul>";
  return buf;
}

function hideLocatorMenu( ) {
  return "document.getElementById( 'locatorMenuWindow').style.visibility = 'hidden';";
}

/** retrieve the menu window.  create if doesn't exist */
function getLocatorMenuWindow( ) {
  var navHolder = parent.frames[1].document.getElementById( "locatorMenuWindow" );

  if ( !navHolder ) {

    // push the div layer into the body
    var body = parent.frames[1].document.getElementsByTagName( "html" )[0];

    if ( body ) {
      // create the div layer
      navHolder = document.createElement( "div" );
      navHolder.style.position = "absolute";
      navHolder.style.zIndex = 100;
      navHolder.style.top = "0px";
      navHolder.style.left = "Opx";
      navHolder.style.backgroundColor = "white";
      navHolder.style.fontSize = "10pt";
      navHolder.style.fontStyle = "bold";
      navHolder.style.visibility = "hidden";
      navHolder.style.border = "1px solid black";
      navHolder.id = "locatorMenuWindow";
      navHolder.innerHTML = "Hello World";

      body.insertBefore(navHolder, body.firstChild);
      }
    }

    return navHolder;
}
