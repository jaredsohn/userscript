// ==UserScript==
// @name	  Remove notification rw and power spin
// @version  	  1
// @author	  DiM
// @namespace	  notification_powerspin
// @include       http*://*.erepublik.com/*
// ==/UserScript==
function addGlobalStyle(css) {
  var style = $j("<style></style>");
  style.attr('type', 'text/css').text(css);
  $j('head').append(style);
}
$j(document).ready( function() {
  addGlobalStyle('#notification_area {display:none;}');
});