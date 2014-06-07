// ==UserScript==
// @name          Facebook - Common Error Page - Go Back
// @namespace     http://userscripts.org/users/36992/scripts
// @description   When we get to this stupid, useless, script killing page, go back!
// @author        Kwame Jeffers aka LordSnooze
// @version       0.03 : 30-Jun-2009
// @include       http://facebook.com/common/error.html
// @include       http://*.facebook.com/common/error.html
//
// ==/UserScript==
/*

History
-------------
0.03 : 30-Jun-2009 Added location.reload()
0.02 : 30-Jun-2009 Changed from history.back() to history.go(-1)
0.01 : 30-Jun-2009 Initial release
============
*/

//Keep count
var timesVisited = GM_getValue('Page_Visited_Count',0) +1
GM_setValue('Page_Visited_Count', timesVisited)

history.go(-1)
location.reload()