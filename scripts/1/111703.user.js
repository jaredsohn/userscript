// ==UserScript==
// @name           Source Monitor
// @description    Display a panel on each secure page showing elements that are sourcing absolute URLs and flag the unsecure ones.
// @require        http://code.jquery.com/jquery-latest.min.js
// @include        https://*
// @grant          none
// @version        1
// ==/UserScript==

$(document).ready(function() {
  // Get all sources.
  var sources = $('*[src^="http"]');

  // Generate the title and pretext.
  var title = '<h3 style="margin-top: 0;">External Sources on <em>' + location.href + '</em></h3><p style="font-size: 0.85em;">This is a list of all content on this page that is being sourced by an absolute URL.  <span class="gm-item-secure">Green items</span> are sourced using a secure protocol.  <span class="gm-item-unsecure">Red items</span> are being sourced from an unsecure protocol (http) and may cause SSL notices.</p>';

  // Generate the display panel.
  var html = '<style type="text/css">.gm-item-secure{color: green;} .gm-item-unsecure{color: red;}</style><div id="gm-secure-panel" style="max-height: 100px; width: 100%; position: fixed; left: 0; bottom: 0; border-top: 2px solid #ccc; background-color: #eee; padding: 10px; overflow: auto; font-weight: normal; font-size: 10pt; font-family: arial, sans-serif; box-shadow: 0 -2px 10px #666666;"></div>';

  // Adjust the body to clear the panel at the bottom.
  $("body").append(html).css('padding-bottom', '120px');

  // Generate the message
  var content = '';
  sources.each(function(i) {
    var src = $(this).attr('src');
    var s_class = (src.match(/^https/) ? 'gm-item-secure' : 'gm-item-unsecure');
    content += '<div id="gm-item-' + i + '" class="gm-item ' + s_class + '">' + $(this).attr('src') + '</div>';
  });

  // Set the value of the content.
  content = (content == '' ? 'No external sources.' : content + "<br />Done");

  // Set the content into the display panel and adjust the width to the actual,
  // usbale width of the page.
  $("#gm-secure-panel").html(title + "\n" + content).width($(document).width() - parseInt($("#gm-secure-panel").css('padding-left')) - parseInt($("#gm-secure-panel").css('padding-right')));
});
