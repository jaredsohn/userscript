// ==UserScript==
// @name Facebook Chat: Kill the sidebar!
// @version 1.1
// @description Brings back the old Facebook Chat, disabling the sidebar.
// @include http*://*.facebook.tld
// @icon http://static.ak.fbcdn.net/rsrc.php/v1/za/r/3HjfDY8tjji.gif
// @namespace com.infinity-cubed.lycoris.userscripts
// ==/UserScript==

// sirocyl (Tyler True), 2011
// sirocyl at live dot com

// Just one line of code.
window.onload = ChatConfig.set({"sidebar.minimum_width":100000})
// Painless, simple, and easy.
// There's probably a better way to disable this, but meh.

// Bugs: If you have a screen wider than 100,000 pixels, and you maximize your browser, the script will not work as intended.