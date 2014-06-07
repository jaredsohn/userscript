// ==UserScript==
// @name           Keyboard-Friendly YouTube Character Counter (Obsolete)
// @namespace      youtube.com
// @description    Prevents YouTube's Character Counter from Becoming Active through the Tab Key
// @include        http://youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch#*
// @include        http://*.youtube.com/watch#*
// @include        http://youtube.com/comment_servlet?*
// @include        http://*.youtube.com/comment_servlet?*
// @include        http://www.youtube.com/all_comments?*
// @version        0.02 (FINAL) - Google finally fixed YouTube's character counter, making this script obsolete.  Please uninstall.
// ==/UserScript==

//set the variable cCounter as a reference to the first (and only, if I recall correctly) element with a class name
//of "comments-post-count-textbox"
var cCounter = document.getElementsByClassName('comments-post-count-textbox')[0]

//Change the value of the Character Counter's tabIndex attribute to -1
cCounter.tabIndex=-1