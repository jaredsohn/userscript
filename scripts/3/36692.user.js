// Auto Reload Zap2It
// version 0.1
// 2008-11-07
// --------------------------------------------------------------------
// ==UserScript==
// @name            Auto Reload Zap2It
// @namespace       http://userscripts.org/users/47423
// @description     Zap2It tvlistings will reload on the whole hour.
// @include         http://tvlistings.zap2it.com/tvlistings/ZCGrid.do?fromTimeInMillis=*
// ==/UserScript==

var today = new Date() ;
var minutes = 60 -today.getMinutes() ;

var gLastDay = GM_getValue( "gLastDay", 0 ) ;

if( gLastDay != today.getDate() )
{
   GM_setValue( "gLastDay", today.getDate() ) ;
   document.location.reload();
}

GM_log( minutes ) ;

setTimeout(function() { document.location.reload(); } , minutes *60 *1000);

