// ==UserScript==
// @name           Simple Website Blocker
// @namespace      http://userscripts.org/users/yudha
// @description    simply block unwanted website; based on "close tab automatically by   domain" by Shikaku
// @include        http://
// ==/UserScript==

//Firefox configuration:
//1. Go to address bar and type "about:config" (without "")
//2. Go to parameter "dom.allow_scripts_to_close_windows" (without "")
//3. Set its value as "true" (without "")
//4. Manage User Scripts on Greasemonkey icon and add the unwanted website to block it (use asterisk (*) to customize the url)

window.close();