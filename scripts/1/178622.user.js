// ==UserScript==
// @name do-fixup
// @namespace   acr
// @grant GM_registerMenuCommand
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_openInTab
// @grant  GM_addStyle
// @description fix sorting for do pages
// @include https://www.do.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require http://tinysort.sjeiti.com/dist/jquery.tinysort.min.js
// for the GM_config
// @require http://userscripts.org/scripts/source/49700.user.js 
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     4.14
// @updateURL   https://userscripts.org/scripts/source/178622.meta.js
// @installURL  https://userscripts.org/scripts/source/178622.user.js
// @downloadURL https://userscripts.org/scripts/source/178622.user.js

// ==/UserScript==

function sort_by_name() { 
  $('ul.item-wrapper li[data-type=task][class!="selected highlighted"]').
    tsort('span.name', 
      {place:'start'} 
  ); 
}

function sort_by_name_if() {  
  if (GM_config.get('autosort')) 
    sort_by_name(); 
}

function openCfg() {  GM_config.open(); }

GM_config.init(
  'auto-sort settings', {
    'autosort': { // This is the id of the field
      'label': 'Always Sort By Name', // Appears next to field
      'type': 'checkbox', // Makes this setting a text field
      'default': false // Default value if user doesn't change it
    }
  }
);



var menu = '<menu type="context" id="someMenu"><menuitem label="Sort Tasks By Name" id="sort_by_name"/></menu>';
var menuDiv = document.createElement('div');
document.body.appendChild(menuDiv);
menuDiv.innerHTML = menu;
document.body.setAttribute('contextmenu', 'someMenu');
document.getElementById('sort_by_name').addEventListener('click', sort_by_name);
GM_registerMenuCommand("Sort Tasks By Name", sort_by_name, false);
GM_registerMenuCommand("Auto-Sort Settings", openCfg, false);
waitForKeyElements('ul.item-wrapper', sort_by_name_if, false);

