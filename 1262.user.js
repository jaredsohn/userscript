// ==UserScript==
// @name          MozillaZine Forums Sidebar Toggle
// @namespace     http://loucypher.wordpress.com/
// @include       http://forums.mozillazine.org/*
// @include       http://kb.mozillazine.org/*
// @description	  Shows/hides sidebar when click the blimp logo
// ==/UserScript==
// Changelog:
// - 20050921: Now using EventListener instead of inline script
// - 20050930: Added GM_setValue and GM_getValue
// - 20051015: @include kb.mozillazine.org

var sprite = document.getElementById('sprite');
sprite.title = 'Hide Sidebar';
sprite.style.cursor = 'pointer';
sprite.addEventListener('click', function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  if(!sidebar.style.display) {
    sidebar.style.display = 'none';
    this.title = 'Show sidebar';
    GM_setValue('hideSidebar', true);
  } else {
    sidebar.removeAttribute('style');
    this.title = 'Hide sidebar';
    GM_setValue('hideSidebar', false);
  }
}, false);

try {
  var config = GM_getValue('hideSidebar');
} catch(ex) {
  GM_setValue('hideSidebar', false);
};
if(!config) return;
document.getElementById('sidebar').style.display = 'none';

