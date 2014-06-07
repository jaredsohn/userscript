// ==UserScript==
// @name           WordPress Admin - Big Excerpts
// @namespace      http://internetducttape.com
// @description    Greatly increase the size of the excerpt box when writing WordPress posts. Because 12 lines are better than 4.
// @include        */wp-admin/post-new.php
// @include        */wp-admin/post.php*action=edit*
// ==/UserScript==


(function() {
  GM_addStyle('#excerpt { height:12em; }');
 })();
