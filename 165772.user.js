// ==UserScript==
// @name        TVTorrents HTTPS Fix
// @description TVT serves torrent download links over HTTP no matter what. This will make it serve the link over HTTPS instead.
// @namespace   userscripts.org
// @include     https://www.tvtorrents.com/loggedin/shared.do
// @grant       none
// @version     1
// @license GPL version 3; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

jQuery(document).ready(function() {
  var js_text = jQuery("head > script:nth-child(25)").attr("innerHTML");
  var hash = /hash='([0-9|A-F|a-f]+)'/.exec(js_text)[1];
  var digest = /digest='([0-9|A-F|a-f]+)'/.exec(js_text)[1];

  for (var i = 1; i <= 20; i++)
  {
    var a = (i % 2 == 1 ? "1" : "2");
    var b = String(i * 3);

    var selector = "tr.list" + a + ":nth-child(" + b + ") > td:nth-child(4) > a:nth-child(1)";

    var node = jQuery(selector);

    //set the a href
    var html = node.attr("outerHTML");
    var info_hash = /loadTorrent\('([0-9|A-F|a-f]+)'\)/.exec(html)[1];
    var new_link = 'https://www.tvtorrents.com/FetchTorrentServlet?info_hash='+info_hash+'&digest='+digest+'&hash='+hash;
    node.attr("href", new_link);

    //get rid of the onClick event
    node.attr("onClick", null);
  }
});
