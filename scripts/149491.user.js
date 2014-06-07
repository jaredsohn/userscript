// ==UserScript==
// @name           GDO LA Customizations
// @description    These are settings to customize the experience on groups.drupal.org specifically for LA Drupal
// @author         Ashok Modi (BTMash)
// @version        0.1
// @include        http://groups.drupal.org/*
// @include        https://groups.drupal.org/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$(document).ready(function() {
  $('.view-upcoming-group .node-content > p').hide();
  $('.view-upcoming-group .node-content .field-field-url + p, .view-upcoming-group .node-content .field-field-organizers + p').show();
});
