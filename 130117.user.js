// ==UserScript==
// @name          Xooit Chat disable disconnection
// @namespace     http://userscripts.org/scripts/show/130117
// @description   Disable the shortly timeout disconnection of the xooit chats
// @match         http://*.xooit.com/*
// @match         https://*.xooit.com/*
// @match         http://*.xooit.fr/*
// @match         https://*.xooit.fr/*
// @copyright     2012+, Boboss (http://userscripts.org/users/117399)
// @license       (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @author        Boboss
// @version       1.4
// ==/UserScript==

// Clear timeout disconnection
location.assign("javascript:clearTimeout(xooitChat.idleTimeout);");
