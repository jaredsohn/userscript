// ==UserScript== 
// @name           Neopets Snow Wars Auto-Player
// @namespace      Made by jcmaximus
// @description    Plays Snow Wars
// @include        http://www.neopets.com/games/snowwars.phtml*
// ==/UserScript== 

///////////////////////////////////////////////////////////////////////////
// Version history
//
// v1.0 First attempt!  first release	05-10-2010
//	1st attempt, , many possible errors, DO NOT INSTALL IT yet.
// v1.1 Trying a different stuff, thanks a LOT for w35l3y (http://userscripts.org/users/55607)
//      who made possible the whole script in only one line!
//
///////////////////////////////////////////////////////////////////////////

location.replace("http://www.neopets.com/games/snowwars.phtml?type=attack&cell=" + (/\bcell=(\d+)/.test(location.search) ? (2 + parseInt(RegExp.$1, 10)) % 47 : 0));