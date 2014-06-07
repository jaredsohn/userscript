// ==UserScript==
// @name           GDO Customizations
// @description    These are settings to customize the experience on groups.drupal.org
// @author         Ashok Modi (BTMash)
// @version        0.1
// @include        http://groups.drupal.org/*
// @include        https://groups.drupal.org/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$(document).ready(function() {
  $('.vud-widget').hide();
  $('.vud-comment-dimmed').removeClass('vud-comment-dimmed');
});
