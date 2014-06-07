// ==UserScript==
// @name           Facebook-Friends On Sale-Italian Version-MrFLY
// @description    Up yours credits By MrFLY
// @namespace      http://www.MrFLY.in.allestimento.com
// @include        http://apps.facebook.com/gli-amici-in-vendita/
// ==/UserScript==

to = (2 * 60 + 5) * 60 * 1000; // Timeout 2 hours 5 minutes
now = new Date();
refresh = new Date(now.getTime() + to);

parent = document.getElementById('dropmenu_container');
child = document.getElementById('fb_menubar');

div = document.createElement('div');
div.setAttribute('style','position:absolute;top:30px;padding-left:10px;');
div.innerHTML = 'Load time : '+now.toLocaleString()+' | Reload time : '+refresh.toLocaleString();

parent.insertBefore(div,child);

window.setTimeout('document.location.href="http://apps.facebook.com/gli-amici-in-vendita/"',to);