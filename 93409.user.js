// ==UserScript==
// @name Open all links in a new tab V2
// @description Open every clicked link in new tab - Fixed javascript links
// @include *kaskus.us
// ==/UserScript==

var all = document.all.tags("a");
for (var i = 0; i < all.length; i++) {
if(all[i].target like "javas%") then {
} else {
all[i].target=all[i].target==""?"_new":all[i].target;
}
} 