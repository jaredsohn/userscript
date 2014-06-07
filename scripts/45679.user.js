// ==UserScript==
// @name           Remove 'Invite friends'
// @namespace      Subin Varghese
// @description    Removes the 'Invite friends' module on the left side of the page.
// @include        http://*.orkut.*
// ==/UserScript==

var tables = document.getElementById('HomePage').getElementsByTagName('table');
var inviteModule = tables[0];
inviteModule.style.display = 'none';