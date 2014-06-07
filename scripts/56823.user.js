// ==UserScript==
// @name         pwnlast.fm - mininova.org
// @namespace    http://pwnlast.fm/
// @include      http://www.last.fm/music/*
// @include      http://www.lastfm.*/music/*
// @include      http://cn.last.fm/music/*
// @exclude      http://www.last.fm/music/*/*
// @exclude      http://www.lastfm.*/music/*/*
// @exclude      http://cn.last.fm/music/*/*
// @include      http://www.mininova.org/pwn/direct_link/*
// @description  Torrent links in the last.fm pages
// @author       Nikita Vasilyev
// @version      1.2
// @licence      MIT
// ==/UserScript==

(function(){


  /**
   * Proxy iframe for direct links fix
   */
  if (document.location.href.indexOf('http://www.mininova.org/pwn/direct_link/') == 0) {
    var direct_link = document.location.pathname.match(RegExp('direct_link/(.+)'))[1];
    if (typeof direct_link == 'string') {
      document.location.replace(direct_link);
    }
    return;
  }


  /**
   * Window shortcut
   * @see http://wiki.greasespot.net/UnsafeWindow
   */
  var w = window.wrappedJSObject || window;


  /**
   * 'Nirvana' and 'Michael+Jackson' are examples
   */
  var artist_name = document.location.pathname.match(RegExp('music/([^/]+)/?$'))[1];
  if (!artist_name) {
    return;
  }


  /**
   * 'http://www.mininova.org/vuze.php?search=Nirvana&cat=5&callback=pwn' is example
   */
  var url = 'http://www.mininova.org/vuze.php?search=' + artist_name +'&cat=5&callback=pwn&num=15';


  // Workaround for non-greasemonkey compatible browsers (Opera, maybe Chrome)
  if (typeof GM_addStyle == 'undefined') {
    /**
     * GM_addStyle('* {color:red}') is an example
     * @param css String
     */
    window.GM_addStyle = function (css) {
      var heads = document.evaluate('//head',document,null,XPathResult.ANY_TYPE,null);
      var head = heads.iterateNext();
      if (head) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
      }
    };
  }


  GM_addStyle(
    '#torrent_search_block {}\
     #torrent_search_block h2.heading .h2Wrapper {padding-bottom:0; margin-bottom:-.5em;}\
     #torrent_search_block table {text-align:right; table-layout:fixed;}\
     #torrent_search_block thead td.playbuttonCell {width:17px;}\
     #torrent_search_block td {white-space:nowrap;}\
     #torrent_search_block .subjectCell {text-align:left; width:80%;}\
     #torrent_search_block .subjectCell a {display:inline-block; width: 100%; vertical-align:top; width:100%; overflow:hidden;}\
     #torrent_search_block td.play,\
     #torrent_search_block td.download {width:1.6em; padding-left:0; padding-right:0;}\
     #torrent_search_block td.size {width:4.5em;}\
     #torrent_search_block td.size small {font-size:9px; color:#666; margin-left:2px}\
     #torrent_search_block td.seeds,\
     #torrent_search_block td.leechers {width:3em;}\
     #torrent_search_block td.play a,\
     #torrent_search_block td.download a {opacity:.3; text-decoration:none; padding: 0 .3em;}\
     #torrent_search_block td.play a:hover,\
     #torrent_search_block td.download a:hover {opacity:1;}'
  );


  /**
   * Box for torrent search result
   */
  var catalogueHead = document.getElementById('catalogueHead');
  var torrent_search_block = document.createElement('div');
  torrent_search_block.id = 'torrent_search_block';
  catalogueHead.parentNode.insertBefore( torrent_search_block, catalogueHead.nextSibling );
  torrent_search_block.innerHTML = '<h2 class="heading"><span class="h2Wrapper"><a class="icon" href="http://www.mininova.org/search/'+ artist_name +'/5/seeds">\
    Torrents from Mininova</a></span></h2>';


  /**
   * Direct links fix
   * Mininova doesn't allow links to torrent files from another sites. Fix it.
   */
  var iframe = document.createElement('iframe');
  iframe.src = 'http://www.mininova.org/pwn/direct_link/';
  iframe.name = 'mininova_direct_links_fix';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  /**
   * Fix bug:
   * 1. Click ▼ and download some torrent
   * 2. Leave this page
   * 3. Back to previous page and torrent will be downloaded again
   */
  w.addEventListener('beforeunload', function(){
    document.body.removeChild(iframe);
  }, false);


  /**
   * Callback function
   * @param json
   */
  w.pwn = function (json) {

    var results = json.results;

    /**
     * @example format_size(1048576) == '1<small>MB</small>'
     * @param size Number
     * @return String like '87<small>MB</small>'
     */
    var format_size = function(size) {
      return Math.round(size/1048576) + '<small>MB</small>';
    };

    var str = '<table class="chart"><thead><tr><td class="playbuttonCell"></td><td class="subjectCell"></td><td class="download"></td><td class="size">Size</td><td title="Seeds" class="seeds">S</td><td title="Leechers" class="leechers">L</td></tr></thead><tbody>';
    for (var i=0; i<results.length; i++) {
      str += '<tr '+ ((i&1)==0 ? 'class="odd"' : '') +'>'
        + '<td class="playbuttonCell">'
        +   '<a href="http://www.bitlet.org/music/play?torrent='+ encodeURIComponent(results[i].download) +'"><img width="17" height="17" src="http://cdn.last.fm/flatness/clear.gif" alt="▶" class="icon play_icon"/></a>'
        + '</td>'
        + '<td class="subjectCell"><a href="' + results[i].cdp + '">' + results[i].title + '</a></td>'
        + '<td class="download">' +
          (typeof w.frames['mininova_direct_links_fix'] != 'undefined' ?
            '<a target="mininova_direct_links_fix" href="http://www.mininova.org/pwn/direct_link/' :
            '<a href="')
        + results[i].download +'">▼</a></td>'
        + '<td class="size">' + format_size(results[i].size) + '</td>'
        + '<td class="seeds">' + results[i].seeds + '</td>'
        + '<td class="leechers">' + results[i].peers + '</td></tr>';
    }
    str += '</tbody></table>';
    torrent_search_block.innerHTML += str;
    return json;
  };


  if (w.document.body) {
    var script = document.createElement("script");
    script.src = url;
    w.document.body.appendChild(script);
  }


})();
