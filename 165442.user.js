// ==UserScript==
// @name Firefox Userscript To Remove Scroll Bar
// @description hopefully remove the scroll bar at the side of the screen
// @namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"); /* only needed once */
// ==/UserScript==

#content browser { margin-right:-14px!important; overflow-y:scroll; overflow-x:hidden;}