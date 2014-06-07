// ==UserScript==
// @name           CSM Admin - Admin name in tickets
// @namespace      None
// @include        http://*.cs-manager.com/admin/?p=support_tickets&s=ticket&n=*
// ==/UserScript==

var sign = '';
var textarea = '';

sign = "Hello,\n\n\n\nRegards,\n> depmod // French Game Admin";

// ---------------------------------------------- DONT EDIT AFTER THIS LINE OR SOME CHILDRENS ARE GONNA DIE!!! ---------------------------------------------- //

textarea = document.getElementById('msg');
textarea.innerHTML = sign;