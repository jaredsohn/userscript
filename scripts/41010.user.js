// ==UserScript==
// @name           filter out old results from websearch (manual toggle)
// @namespace      http://userscripts.org/topics/20677
// @description    appends years to block from results to every google search
// @version        0.1.0
// @identifier     http://userscripts.org/scripts/source/41010.user.js
// @source         http://userscripts.org/scripts/show/41010
// @include        http://www.google.com/search*
// @
// ==/UserScript==
//
// original request thread: http://userscripts.org/topics/20677
//
// all credit to 
// znerp : http://userscripts.org/users/22480
//
//  extra helping of kudos for znerp 
//
// I should consider a better attribution layout
//

searchString = "-2000 -2001 -2002 -2003 -2004 -2005 -2006 -2007 -2008 "
if (location.search.indexOf(encodeURI(searchString)) == -1)
  location.search += "&q=" + searchString



