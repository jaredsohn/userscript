// ==UserScript==
// @name           FlickrMoreStats
// @namespace      vispillo
// @version        1.5
// @grant          GM_getValue
// @grant          GM_setValue
// @grant	   GM_addStyle
// @description    Display extended stats on your Flickr account's stats page.
// @include        http*://www.flickr.com/photos/*/stats
// @require        http://userscripts.org/scripts/source/78952.user.js
// @require        http://userscripts.org/scripts/source/90251.user.js
// @require        http://simplemodal.googlecode.com/files/jquery.simplemodal.1.4.1.min.js
// ==/UserScript==

jQuery.noConflict();
var interval;
interval = window.setInterval(checkExpandGraph,100);

if (window.location.href.split('/').length >= 6) {
  var se = new Array("search.yahoo.com", "images.search.yahoo.com", "google.com", "images.google.com", "aol.com", "msn.com", "ask.com", "bing.com");
  var types = new Object({
    "photos": "Photo",
    "photostream": "Photostream",
    "sets": "Photoset",
    "collections": "Collection",
    "galleries": "Galleries"
  });
  var smallheaders = new Object({
    "yesterday": "So far today...",
    "alltime": "Yesterday",
    "flickr": "Flickr",
    "searchengines": "Search Engines",
    "regular": "Other Sites"
  });
  var key = unsafeWindow.global_magisterLudi;
  var hash = unsafeWindow.global_auth_hash;
  var today = new Date();
  var yest = new Date();
  yest.setDate(yest.getDate() - 1);
  var def_table = '<div><h3></h3><table border="0" cellspacing="0" cellpadding="0" class="breakdown"><thead><tr><th class="name">&nbsp;</th><th class="num">Visits</th><th class="per">%</th></tr></thead><tbody></tbody></table><table border="0" cellspacing="0" cellpadding="0" class="detail"><thead><tr><th class="dicon">&nbsp;</th><th class="name">Domain</th><th class="num">Visits</th><th class="per">%</th></tr></thead><tbody></tbody></table></div>';

  jQuery('h2.refs').attr('id', 'photorefhead').html('Referrers (Photos)');
  jQuery('<h2 id="photostreamhead" class="refs">Referrers (Photostream)</h2><img id="photostreampulser" src="https://l.yimg.com/www.flickr.com/images/pulser2.gif" style="display: inline-block;">').insertBefore('h2.breakdown');
  jQuery('<div id="photostreamrefs" style="display:none" class="refdiv"><div class="clearer" style="clear: both;"></div></div>').insertAfter('#photostreamhead');
  jQuery('<h2 id="setshead" class="refs">Referrers (Sets)</h2><img id="setspulser" src="https://l.yimg.com/www.flickr.com/images/pulser2.gif" style="display: inline-block;">').insertBefore('h2.breakdown');
  jQuery('<div id="setsrefs" style="display:none" class="refdiv"><div class="clearer" style="clear: both;"></div></div>').insertAfter('#setshead');
  jQuery('<h2 id="collectionshead" class="refs">Referrers (Collections)</h2><img id="collectionspulser" src="https://l.yimg.com/www.flickr.com/images/pulser2.gif" style="display: inline-block;">').insertBefore('h2.breakdown');
  jQuery('<div id="collectionsrefs" style="display:none" class="refdiv"><div class="clearer" style="clear: both;"></div></div>').insertAfter('#collectionshead');
  //$('<h2 id="gallerieshead" class="refs">Referrers (Galleries)</h2>').insertBefore('h2.breakdown');
  GM_addStyle('.refdiv .yesterday { float:left; }');
  GM_addStyle('.refdiv .alltime { float:right; }');
  GM_addStyle('.refdiv .yesterday, .refdiv .alltime { padding-bottom: 10px;padding-left: 10px;padding-right: 10px;padding-top: 10px;width:355px; }');
  GM_addStyle('.refdiv table.detail td.dicon img {border-bottom-color: -moz-use-text-color; border-bottom-style: none; border-bottom-width:medium; border-left-color-ltr-source: physical; border-left-color-rtl-source: physical; border-left-color-value: -moz-use-text-color; border-left-style-ltr-source: physical; border-left-style-rtl-source: physical; border-left-style-value: none; border-left-width-ltr-source: physical; border-left-width-rtl-source: physical; border-left-width-value: medium; border-right-color-ltr-source: physical;  border-right-color-rtl-source: physical; border-right-color-value: -moz-use-text-color; border-right-style-ltr-source: physical; border-right-style-rtl-source: physical; border-right-style-value: none; border-right-width-ltr-source: physical; border-right-width-rtl-source: physical; border-right-width-value: medium; border-top-color: -moz-use-text-color; border-top-style: none; border-top-width: medium;}');
  GM_addStyle('.refdiv table { margin-bottom: 0; margin-left: 0; margin-right: 0; margin-top: 0;}');
  GM_addStyle('.refdiv table td { padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px;}');
  GM_addStyle('.refdiv table td.num { text-align: right; }');
  GM_addStyle('.refdiv table td.per { text-align: right; width: 30px;}');
  GM_addStyle('.refdiv table.detail { margin-top: 30px;}');
  GM_addStyle('.refdiv table.detail thead th.name { padding-left: 5px !important; text-align: left !important;}');
  GM_addStyle('.refdiv table.detail td.dicon { width: 16px;}');
  GM_addStyle('.refdiv div div { font-size: 80%; margin-top: 10px;}');
  GM_addStyle('.refdiv a { display: block;}');
  GM_addStyle('.refdiv div div a { color: #000000; display: inline;text-decoration: underline;}');
  GM_addStyle('.refdiv div div a:hover { background-color: transparent; color: #0063DC; text-decoration: underline;}');
  GM_addStyle('#simplemodal-overlay {background-color:#000;}');
  GM_addStyle('#simplemodal-container {height:360px; width:500px; color:#222; background-color:#F5F5F5; border:4px solid #444; padding:12px;text-align:left; overflow-y: auto; overflow-x:hidden}');
  GM_addStyle('#simplemodal-container .simplemodal-data {padding:8px;}');
  GM_addStyle('#simplemodal-container a {color:#111;}');
  GM_addStyle("#simplemodal-container a.modalCloseImg {background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAdCAYAAABfeMd1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8xJREFUeNqclktIVFEYx%2BfO%2BGjUGqw0S%2FIRGtTKENtkqJTkooUwC0EQNNpEEiJYoISbKAhcCYogagvBlbRQW%2FkAIdAkbRGIi3RiNIfJR%2Bqk4zxO%2F2%2F4zu3cOw%2BtA7%2B5c8%2Fj%2B5%2FvfN8592hCCMspSy4o4acXLIHVU40kkQTkglfgm4hd3KAb3PxfESf4KU5XAuBRPA0tznINgCa1Yn193bK0tBR5ZmVlWUpKSiyFhYXmcfPgiaZpn0%2FyZEKd4vLysqioqKCZRAEhMTc3Z%2Fbqy0nL9Uzt3dXVJex2e0wBic1mEx0dHcLv96tDX8cTyVN7tbW1JTRupr6%2B3uzR7Vgib2Tr5ORklJHa2lrDe0FBgVhcXDTUDw8PqyIfY4m4ZGt5ebnB4OrqaqS%2BsrJSj8XOzk6kbnBwUO9XVFQkgsGgKmTTRQ4PD%2FNlrcvlivKis7Mz0kZiJBRLQDI7O%2Fs3rwOBu7oI1B%2FKhrGxsaiBtDTSsCyxBIj%2B%2Fn69D%2Bw%2BJg0r%2FYTD4Wy5fF6vNyoD19bWLENDQ4b3pqammBtPHQ%2BdiF0rNo4GxT3Z4HA4ogbSxmtsbNTf4ZnhXS1Ief1%2FKBQ6og0f2fXIkuJ4MVGDLBOACtVRW6KYuN3ue7oISIc3btmoDp6enjYYbWlp0Y3Qf1UAx40hu0pLSx0yJPRz1uPxvJONo6OjhswiAZm%2BBBlX3yU9PT26gM%2Fno%2FPrHLDpIr29vQ%2FU7GloaDBk10k7vrq62uDF%2BPg4ZYbDIAKuzc%2FPD8hOdBbRUXGaI6Wmpkbs7%2B%2FrAltbW19RX2wWSQd54A6WzaV6REcFjvSYxikGtESqBwcHB7vt7e30bSngyVtl4M%2BAHHCrubn5%2BcbGxqb5tFtYWBB9fX2iu7s78pyZmYn6ciF2e62trS9hpwxcAWlqdqWA8%2BA6uA%2BejoyMfBL%2FUFZWVjbr6ureYmwNuAEugtSIff4y0rpl8CWhFDjBC6fT%2BR4BdB8dHYXiGZ%2BamvJgY35A%2F3ZQB%2BiIv8pLlaR%2FfrHpad2S2b1McJk75vPzUlVVVV5ZWdmF5ORkGw6%2BEL6YvyYmJlyIxyba3eA7swG2gQ8E6NSSIhoHKIWTgISyWSyH%2F2fyJMjrMPgNdvl6REI%2FgAfsgANwTCcLJYh%2BkWAhGwulcfplcqwyeWPZuQ8NpnNpn41uM3vsAQkEOQuNtxWTUCp7lcHPNK6zsifH7I2PZ%2B5j4QBPIhz3SqQsXRLHKZVFU%2Fhd4xkGWcjPT7k8IelBwnsXC0kxK3tn4%2F9SJKwYDTPCLJDocmcWlPtJUy86isGERv4IMACaz3RmXeGcqwAAAABJRU5ErkJggg%3D%3D') no-repeat; width:25px; height:29px; display:inline; z-index:3200; position:absolute; top:0px; right:0px; cursor:pointer;}");
  GM_addStyle('#simplemodal-container h3 {color:#84b8d9;}');

  jQuery('#refs').attr('id', 'photosrefs').addClass('refdiv');

  var strings = new Object({
    'yesterday': makeString(today),
    'alltime': makeString(yest)
  });

  var views = {};

  jQuery('#photosrefs.refdiv table.detail a').each(function(j, k) {
    jQuery(k).click(clickHandler)
  });

  jQuery.fn.outerHTML = function() {
    return jQuery(jQuery('<div></div>').html(this.clone())).html();
  }

  getData(makeString(today), 'yesterday');
  getData(makeString(yest), 'alltime');
}

function makeString(date) {
  day = date.getUTCDate();
  month = date.getUTCMonth();
  year = date.getUTCFullYear();
  month++;
  string = year.toString() + '-';
  if (month.toString().length == 1) string += '0';
  string += month.toString() + "-";
  if (day.toString().length == 1) string += '0';
  string += day.toString();
  return string;
}

function clickHandler(e) {
  e.preventDefault();
  var modal = jQuery('<div id="modalpopup"><h3>' + jQuery(e.target).html() + '</h3><img id="modalpulser" src="https://l.yimg.com/www.flickr.com/images/pulser2.gif" style="display: inline-block;"><ul></ul></div>');
  modal.modal();
  var url = 'https://www.flickr.com/services/rest/?method=flickr.stats.get' + types[jQuery(e.target).parents('div.refdiv').attr('id').replace('refs', '')] + 'Referrers&domain=' + jQuery(e.target).html() + '&format=json&per_page=100&api_key=' + key + '&date=' + strings[jQuery(e.target).parents('div:not(.refdiv):not(#Main)').attr('class')] + '&auth_hash=' + hash + '&nojsoncallback=1';
  jQuery.getJSON(url, function(data) {
    if (data.stat == 'ok') {
      jQuery('#modalpulser').hide();
      jQuery.each(data.domain.referrer, function(s, ref) {
        if ('searchterm' in ref) {
          modal.find('ul').append('<li><a href="' + ref['url'] + '">Searched for "' + ref['searchterm'] + '"</a>&nbsp;(' + ref['views'] + ')</li>');
        }
        else {
          modal.find('ul').append('<li><a href="' + ref['url'] + '">' + ref['url'] + '</a>&nbsp;(' + ref['views'] + ')</li>');
        }
      });
    }
  });
}

function getData(ds, dy) {
  var comp = JSON.parse(GM_getValue('views-' + ds, '{"photostream":"x","sets":"x","collections":"x"}'));
  var update = 0;
  var url = 'https://www.flickr.com/services/rest/?method=flickr.stats.getTotalViews&format=json&api_key=' + key + '&date=' + ds + '&auth_hash=' + hash + '&nojsoncallback=1';
  jQuery.getJSON(url, function(totaldata) {
    var datestring = ds;
    var day = dy;
    if (totaldata.stat == 'ok') {
      jQuery.each(totaldata.stats, function(i, item) {
        if (i != 'total' && i != 'galleries' && i != 'photos') {
          if ((comp[i] == 'x') || (comp[i].toString() != item.views.toString())) {
            update = 1;
            comp[i] = item.views;
            GM_setValue('views-' + datestring, JSON.stringify(comp));
            var url = 'https://www.flickr.com/services/rest/?method=flickr.stats.get' + types[i] + 'Domains&format=json&per_page=100&api_key=' + key + '&date=' + datestring + '&auth_hash=' + hash + '&nojsoncallback=1';
            jQuery.getJSON(url, function(data) {
              var views = new Object({
                'flickr': 0,
                'searchengines': 0,
                'regular': 0
              });
              if (data.stat == 'ok') {
                if (parseInt(data.domains.total) > 0) {
                  var tab = jQuery(def_table);
                  tab.find('h3').html(smallheaders[day]);
                  tab.addClass(day);
                  jQuery.each(data.domains.domain, function(k, dom) {
                    img_url = jQuery('table.detail tr:has(a[href$="' + dom.name + '/"]) td.dicon img').attr('src');
                    if (!img_url) img_url = 'https://l.yimg.com/g/images/spaceball.gif';
                    tab.find('table:eq(1) tbody').append('<tr><td class="dicon"><img width="16" height="16" class="favicon" alt="' + dom.name + '" src="' + img_url + '"></td><td class="name"><a href="javascript:;">' + dom.name + '</a></td>			<td class="num">' + dom.views + '</td><td class="per">' + Math.round(100 * dom.views / item.views) + '%</td></tr>');
                    if (se.join('|').indexOf(dom.name) != -1) {
                      views.searchengines += parseInt(dom.views);
                    }
                    else if (dom.name == 'flickr.com') {
                      views.flickr += parseInt(dom.views);
                    }
                    else {
                      views.regular += parseInt(dom.views);
                    }

                  });
                  tab.find('table:eq(1) tbody tr:eq(0)').addClass('first');
                  tab.find('table:eq(1) tbody tr:odd').addClass('even');
                  tab.find('table:eq(1) tbody tr:even').addClass('odd');
                  var order = new Array('flickr', 'searchengines', 'regular');
                  known_views = 0;
                  for (n in order) {
                    tab.find('table:eq(0) tbody').append('<tr><td class="name">' + smallheaders[order[n]] + '</td><td class="num">' + views[order[n]] + '</td><td class="per">' + Math.round(100 * views[order[n]] / item.views) + '%</td></tr>');
                    known_views += parseInt(views[order[n]]);
                  }
                  unknown_views = item.views - known_views;
                  unknown_perc = 0;
                  if (unknown_views != 0) unknown_perc = Math.round(100 * unknown_views / item.views);
                  tab.find('table:eq(0) tbody').append('<tr><td class="name">Unknown Source</td><td class="num">' + unknown_views + '</td><td class="per">' + unknown_perc + '%</td></tr>');
                  tab.find('table:eq(0) tbody tr:eq(0)').addClass('first');
                  tab.find('table:eq(0) tbody tr:odd').addClass('even');
                  tab.find('table:eq(0) tbody tr:even').addClass('odd');
                  tab.insertBefore('#' + i + 'refs .clearer');
                  tab.find('table.detail a').each(function(j, k) {
                    jQuery(k).attr('href', 'javascript:;').click(clickHandler)
                  });
                  GM_setValue('html.' + datestring + '.' + i, tab.outerHTML());
                  if (jQuery('#' + i + 'refs div').length == 3) {
                    jQuery('#' + i + 'pulser').hide();
                    jQuery('#' + i + 'refs').slideDown();
                  }
                }
                else {
                  if (item.views > 0) {
                    var tab = jQuery(def_table);
                    tab.find('h3').html(smallheaders[day]);
                    tab.addClass(day);
                    var views = new Object({
                      'flickr': 0,
                      'searchengines': 0,
                      'regular': 0
                    });
                    var order = new Array('flickr', 'searchengines', 'regular');
                    for (n in order) {
                      tab.find('table:eq(0) tbody').append('<tr><td class="name">' + smallheaders[order[n]] + '</td><td class="num">' + views[order[n]] + '</td><td class="per">' + Math.round(100 * views[order[n]] / item.views) + '%</td></tr>');
                    }
                    tab.find('table:eq(0) tbody').append('<tr><td class="name">Unknown Source</td><td class="num">' + item.views + '</td><td class="per">100%</td></tr>');
                    tab.find('table:eq(0) tbody tr:eq(0)').addClass('first');
                    tab.find('table:eq(0) tbody tr:odd').addClass('even');
                    tab.find('table:eq(0) tbody tr:even').addClass('odd');
                    tab.find('table:eq(1)').remove();
                    tab.insertBefore('#' + i + 'refs .clearer');
                    tab.find('table.detail a').each(function(j, k) {
                      jQuery(k).attr('href', 'javascript:;').click(clickHandler)
                    });
                    GM_setValue('html.' + datestring + '.' + i, tab.outerHTML());
                    if (jQuery('#' + i + 'refs div').length == 3) {
                      jQuery('#' + i + 'pulser').hide();
                      jQuery('#' + i + 'refs').slideDown();
                    }
                  }
                  else {
                    if (i == 'photostream') item = 'Photostream';
                    else item = types[i] + 's';
                    jQuery('<div class="' + day + '"><h3>' + smallheaders[day] + '</h3><p class="nodata">You had no views on your ' + item + ' on ' + datestring + '</p></div>').insertBefore('#' + i + 'refs .clearer');
                    GM_setValue('html.' + datestring + '.' + i, '<div class="' + day + '"><h3>' + smallheaders[day] + '</h3><p class="nodata">You had no views on your ' + item + ' on ' + datestring + '</p></div>');
                    if (jQuery('#' + i + 'refs div').length == 3) {
                      jQuery('#' + i + 'pulser').hide();
                      jQuery('#' + i + 'refs').slideDown();
                    }
                  }
                }
              }
            });
          }
          else {
            var tab = jQuery(GM_getValue('html.' + datestring + '.' + i,'<div>No data available.</div>'));
            tab.attr('class',day);
            tab.find('h3').html(smallheaders[day]);
            tab.insertBefore('#' + i + 'refs .clearer');
            tab.find('table.detail a').each(function(j, k) {
              jQuery(k).attr('href', 'javascript:;').click(clickHandler)
            });
            if (jQuery('#' + i + 'refs div').length == 3) {
              jQuery('#' + i + 'pulser').hide();
              jQuery('#' + i + 'refs').slideDown();
            }
          }
        }
      });
    }
  });
}

function checkExpandGraph () {
  if (unsafeWindow.F.graph) {
    clearInterval(interval);
    var frac = Math.pow(10,unsafeWindow.F.graph.max.toString().length-1);
    if (parseInt(unsafeWindow.F.graph.max)/frac < 3) {
      frac = frac/2;
    }
    height = 300;
    unsafeWindow.F.graph.clearGraph();
    jQuery('#graph').height(height);
    jQuery('#graph-canvas').attr('height',height);
    jQuery('#graph-canvas-proxy').height(height);
    jQuery('.hover-info-nubs').remove();
    unsafeWindow.F.graph.height = height;
    unsafeWindow.F.graph.calculateScale();
    unsafeWindow.F.graph.linePositions = [];
    for (i = frac; i < parseInt(unsafeWindow.F.graph.max); i += frac) {
      unsafeWindow.F.graph.linePositions.push(unsafeWindow.F.graph.height-unsafeWindow.F.graph.paddingBottom-(i*unsafeWindow.F.graph.scale.vert));
    }
    unsafeWindow.F.graph.drawGrid().drawScale().drawGraph().drawLabels();
  }
}

