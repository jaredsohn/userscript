// ==UserScript==
// @name        Show Me the Cache
// @description Show me the cached pages in the Google search results
// @version     1.0  2013-05-02
// @author      FannPR
// @include     http://www.google.*
// @include     https://www.google.*
// @include     http://webcache.googleusercontent.*
// @include     https://webcache.googleusercontent.*
// @grant GM_addStyle
// @grant GM_log
// ==/UserScript==

// anonymous function expression (JavaScript 1.5)
(
function()
{

var c = document.createElement( "style" );
c.setAttribute( "type", "text/css" );
c.appendChild( document.createTextNode( ".action-menu .clickable-dropdown-arrow {display:none !important;} .action-menu-panel, .action-menu-panel ul, .action-menu-item {display:inline !important; visibility: visible !important; border:none !important; box-shadow:none !important; background-color:transparent !important; margin:0  !important; padding:0 !important; top:0 !important; height:auto !important; line-height:auto !important;} .action-menu-item a.fl {color:blue; padding:0 6px !important; display:inline !important;} .action-menu-panel {position:static;} .action-menu-item a.fl:hover {text-decoration:underline !important;}"));

/*
.action-menu .clickable-dropdown-arrow {display:none !important;}
.action-menu-panel, .action-menu-panel ul, .action-menu-item {display:inline !important; visibility: visible !important; border:none !important; box-shadow:none !important; background-color:transparent !important; margin:0  !important; padding:0 !important; top:0 !important; height:auto !important; line-height:auto !important;}
.action-menu-item a.fl {color:blue; padding:0 6px !important; display:inline !important;}
.action-menu-panel {position:static;}
.action-menu-item a.fl:hover {text-decoration:underline !important;}
*/

document.body.appendChild( c );

}
)();

