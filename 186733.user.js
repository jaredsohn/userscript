// ==UserScript==
// @name	  Remove notification area in eRepublik
// @version  	  0.1
// @author	  scyzoryck
// @namespace	  notification_area
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

