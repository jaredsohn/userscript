// ==UserScript==
// @name           yes paste - box.net
// @namespace      http://userscripts.org/topics/20535?page=1#posts-90566
// @description    breaks draconian clipboard disallow functions on box.net (and other sites with same funtion)
// @author         copy pasting by Good To Too
// @version        0.0.2
// @identifier     http://userscripts.org/scripts/source/40760.user.js
// @source         http://userscripts.org/scripts/show/40760
// @include        http://box.net/
// @include        https://box.net/
// @include        http://www.box.net/
// @include        https://www.box.net/
// @include        https://www.box.net/signup
// ==/UserScript==

// all credit to JoeSimmons :: http://userscripts.org/users/23652
//
// inspired by box.net and other fascist JS abuse
// enable selectively for best results
//
// dig through JS on other sites to find JS function to break
// this one found in http://ak1.boxcdn.net/js_box/box_global.js
//
// http://userscript-yespaste.groups.live.com/

unsafeWindow.disable_paste = function(){return true;};

