// Copyright (C) 1997-2004  Daniel W. Crompton <daniel.crompton@gmail.com>
//
//  This program is free software; you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation; either version 2 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program; if not, write to the Free Software
//  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307 USA
//
// CVSVERSION: $Id: $
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Roxen CMS", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           YouTube Unsubscribe
// @namespace      http://specialbrands.net/2010/05/22/youtube-channel-unsubscribe-bookmarklet-greasemonkey/
// @description    Add "Unsubscribe" buttons to YouTube's My Feeds / My Subscriptions page.
// @include        http*://www.youtube.com/my_subscriptions*
// @version        1.2
// ==/UserScript==

// Version 1.1:
//	Corrected missing code.
// Version 1.0:
// 	Started life as a bookmarklet.

var script = "(function(){if(window.subscribeaxc===undefined) window.subscribeaxc = gSecureTokens[\"ajax_subscriptions\"];var in_el = document.createElement(\"INPUT\");in_el.setAttribute(\"id\",\"subscription_level_unsubscribe\");in_el.setAttribute(\"name\",\"subscription_level\");in_el.setAttribute(\"type\",\"radio\");in_el.setAttribute(\"value\",\"unsubscribe\");in_el.checked=false;in_el.style.visibility='hidden';in_el.style.color='blue';in_el2 = in_el.cloneNode(true);in_el2.setAttribute(\"id\",\"subscription_level_uploads\");in_el2.setAttribute(\"value\",\"uploads\");in_el3 = in_el.cloneNode(true);in_el3.setAttribute(\"id\",\"subscription_level_all_activity\");in_el3.setAttribute(\"value\",\"all_activity\");var in_el4 = in_el.cloneNode(true);in_el4.setAttribute(\"id\",\"edit_subscription\");in_el4.setAttribute(\"name\",\"edit_subscription\");in_el4.setAttribute(\"type\",\"hidden\");in_el4.setAttribute(\"value\",\"\");var in_el5 = in_el.cloneNode(true);in_el5.setAttribute(\"id\",\"username\");in_el5.setAttribute(\"name\",\"username\");in_el5.setAttribute(\"type\",\"hidden\");in_el5.setAttribute(\"value\",\"\");in_el.checked=true;var fr = document.createElement(\"FORM\");fr.setAttribute(\"name\",\"subscription_level_form\");fr.style.visibility='hidden';fr.appendChild(in_el);fr.appendChild(in_el2);fr.appendChild(in_el3);fr.appendChild(in_el4);fr.appendChild(in_el5);fr.style.color='blue';document.getElementsByTagName(\"BODY\")[0].appendChild(fr); var dv = document.createElement(\"DIV\");dv.setAttribute(\"id\",\"edit_subscription_opener\");dv.setAttribute(\"class\",\"edit_subscription_opener\");dv.style.visibility='hidden';var dv2 = dv.cloneNode(true);var dv3 = dv.cloneNode(true);var dv4 = dv.cloneNode(true);document.getElementsByTagName(\"BODY\")[0].appendChild(dv);dv2.setAttribute(\"id\",\"subscribeMessage\");dv2.setAttribute(\"class\",\"hid\");dv2.appendChild(document.createTextNode(\"text\"));document.getElementsByTagName(\"BODY\")[0].appendChild(dv2);dv3.setAttribute(\"id\",\"edit_subscription_wrapper\");dv3.setAttribute(\"class\",\"hid\");document.getElementsByTagName(\"BODY\")[0].appendChild(dv3);dv4.setAttribute(\"id\",\"edit_subscription_arrow\");dv4.setAttribute(\"class\",\"hid\");document.getElementsByTagName(\"BODY\")[0].appendChild(dv4);var el = document.createElement(\"A\");el.setAttribute(\"href\",\"#\");el.setAttribute(\"class\",\"name\");el.appendChild(document.createTextNode(\"unsub\"));var nl = document.getElementsByClassName(\"subfolder\"); for (var i = 0; i < nl.length; ++i) {var item = nl.item(i).getElementsByTagName(\"A\")[0]; var re = new RegExp(/\'.*\'/); var m = new String(re.exec(item.getAttribute(\"onclick\"))); if(m===null) continue; m = m.replace(/\'/g,\"\"); /* alert(\"_\"+ m +\"_\"); */ el_ = el.cloneNode(true);var re = new RegExp(/[a-zA-Z0-9]+/); var x = new String(re.exec(item.innerHTML));el_.setAttribute(\"username\",x);el_.setAttribute(\"subscription\",m); nl.item(i).appendChild(document.createTextNode(\". . .\")); nl.item(i).appendChild(el_); el_.onclick = function(event){document.getElementById(\"username\").setAttribute(\"value\",event.target.getAttribute(\"username\"));document.getElementById(\"edit_subscription\").setAttribute(\"value\",event.target.getAttribute(\"subscription\"));try { yt.www.subscriptions.edit.onUpdateSubscription(window.subscribeaxc, event.target.getAttribute(\"subscription\"), null);}catch(e){alert(\"error\");}finally{if(event.target.parentNode && event.target.parentNode.parentNode){event.target.parentNode.parentNode.removeChild(event.target.parentNode);}}};}})();"

var runscript = document.createElement("div");
runscript.innerHTML = '<script>'+ script +'</script>';
document.body.insertBefore(runscript, document.body.firstChild);
