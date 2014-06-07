// ==UserScript==
// @name          body_onclick_block
// @namespace     http://zzo38computer.cjb.net/userjs/
// ==/UserScript==

// Blocks setting of body.onclick attribute.

// Latest version is available at:
//  http://zzo38computer.cjb.net/userjs/body_onclick_block.user.js

fake_onclick_setter=function() {
 return -31337;
}

unsafeWindow.document.body.onclick=null;
unsafeWindow.document.documentElement.__defineSetter__("onclick",fake_onclick_setter);
unsafeWindow.document.body.__defineSetter__("onclick",fake_onclick_setter);
