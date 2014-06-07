// ==UserScript==
// @name Disable Confluence Section Editing
// @namespace http://wiki.skplanet.co.kr/
// @version 0.1
// @description Disable Confluence Section Editing
// @match http://wiki.skplanet.co.kr/display/*
// @match http://wiki.skplanet.co.kr/pages/*
// @copyright SK planet
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var $headers = $('.wiki-content').find('h1,h2,h3,h4,h5,h6');
var removeEventHandlers = function () {
  "use strict";

  // remove event handlers
  var old_element = this;
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
};

$headers.find('.cipe-edit-link-placeholder').remove();
$headers.each(removeEventHandlers);
