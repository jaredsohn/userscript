// ==UserScript==
// @name        Del.icio.us soft green restyle enhanced skin
// @description Del.icio.us soft green restyle enhanced skin
// @namespace   http://loonyone.livejournal.com
// @include     http://del.icio.us/*
// @include     https://secure.del.icio.us/*
// @creator     Manpreet Singh <junkblocker@yahoo.com>
// @source      http://userscripts.org/scripts/show/7332
// @identifier  http://userscripts.org/scripts/source/7332.user.js
// @version     1.3
// @date        2007-05-27
// ==/UserScript==

/*
 * Copyright (c) 2006-2007, Manpreet Singh <junkblocker@yahoo.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Changelog
// =========
//
// Version 1.3 - Fixed popularity color on front page
// Version 1.2 - Fixed partially broken auto update.
//               Don't increase the install count on userscripts.org while checking for updates
// Version 1.1 - Misc code cleanup
// Version 1.0 - Added auto update without requiring an external script
// Version 0.9 - Minor update. Removed a warning.
// Version 0.8 - Removed video linking code as it is better done by standalone apps (user choice)
// Version 0.7 - Added help and settings pages etc.
// Version 0.6 - Updated contact info
// Version 0.5 - Truncate overflowing URLs display
// Version 0.4 - Added optional auto-update facility
// Version 0.3 - Added matching favicon
// Version 0.2 - Updated logo colors
// Version 0.1 - First release

/*
 * Contains code/userstyles leeched and modified from
 * 1) Del.icio.us (delicious) restyle - soft green- http://userstyles.org/style/show/277
 * 2) del.icio.us depinked  - version 0.1 by S Waters - http://userscripts.org/scripts/show/4697
 * 3) Image linking code - http://d.hatena.ne.jp/higeorange/20070106/1168044431
 * 4) delicious show URL - http://userscripts.org/scripts/show/7043
 * 5) delicios-otherpeople fix - http://userscripts.org/scripts/show/3093
 * 6) Delicious Tag Focus - http://userscripts.org/scripts/show/1927
 * 7) Delicious post restyle - http://userstyles.org/style/show/1072
 */

(function() {
  function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
    // Note: Version numbers must be in x.y float format
    try {
      if (!GM_getValue) return;
      // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage and a script with * includes
      var DoS_PREVENTION_TIME = 2 * 60 * 1000;
      var isSomeoneChecking = GM_getValue('CHECKING', null);
      var now = new Date().getTime();
      GM_setValue('CHECKING', now.toString());
      if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
      var lastChecked = GM_getValue('LAST_CHECKED', null);

      var ONE_DAY = 24 * 60 * 60 * 1000;
      if (lastChecked && (now - lastChecked) < ONE_DAY) return;

      GM_xmlhttpRequest({
        method: 'GET',
        url: SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
        onload: function(result) {
          if (result.status != 200) return;
          if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
          var theOtherVersion = parseFloat(RegExp.$1);
          if (theOtherVersion <= parseFloat(SCRIPT.version)) return;
          if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
            GM_openInTab(SCRIPT.url);
          }
        }
      });
      GM_setValue('LAST_CHECKED', now.toString());
    } catch (ex) {
    }
  }
  autoUpdateFromUserscriptsDotOrg({
    name: 'Del.icio.us soft green restyle enhanced skin',
    url: 'http://userscripts.org/scripts/source/7332.user.js',
    version: '1.3'
  });

  // modifyPopularity START
  // From - del.icio.us-otherpeoplefix
  var head = document.getElementsByTagName('head')[0];
  var gRGBRegex = /^rgb\((\d+), (\d+), (\d+)\)$/;

  function modifyPopularity(aLink) {
    var rgb_vals = gRGBRegex.exec(aLink.style.backgroundColor);

    // 1. Maipulate the font
    //
    // Convert the background gradient to a font size gradient. The
    // font increases from 80% by jumps of 5%, and goes bold roughly
    // when the number crosses into the thousands.

    var scale = ((255 - rgb_vals[3])/255.0 * 100).toFixed();

    var weight;
    if (scale > 34) { weight = "bold"; } else { weight = "normal"; }

    var size = ((scale/5).toFixed() * 5) + 80;

    aLink.style.fontWeight = weight;
    aLink.style.fontSize = size + "%";

    // 2. Make the gradient background green, not pink, by swapping the rgb values
    // Note: Alsoscale the colors as per our style background of f7f7f0 (247, 247, 240)
    var r = ((rgb_vals[3] * 247.0) / 255.0).toFixed();
    var g = ((rgb_vals[1] * 247.0) / 255.0).toFixed();
    var b = ((rgb_vals[2] * 240.0) / 255.0).toFixed();
    aLink.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
  }
  function $x(exp, ctx) {
    if (!ctx) ctx = document;
    var i, arr = [], r = document.evaluate(exp, ctx, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = r.snapshotItem(i); i++) arr.push(item);
    return arr;
  }
  function $(id) {
    return document.getElementById(id);
  }
  $x("//a[@class='pop']", $("main")).forEach(function(a){
    modifyPopularity(a);
  });

  if (head) {
    // Add style
    // the style is from userstyles 'restyle soft green' modified to
    // 1) allow 'saved by n people' highlighting
    // 2) Add green favicon
    // 3) Change header icon color
    var favicon = 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AGWvFQDd3d0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgEBAQEBAQEBAgICAgICAgIBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgEBAQEBAQEBAgICAgICAgIBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
    var theLinks = head.getElementsByTagName('link');
    for (var i = 0, l = theLinks.length; i < l; i++) {
      var theLink = theLinks[i];
      if (!theLink) {
        continue;
      }
      var relValue = theLink.getAttribute('rel');
      if (relValue) {
        relValue = relValue.match(/^\W*(.*?)\W*$/)[1];
        if ((relValue == 'shortcut icon' || relValue == 'icon') && theLink && theLink.parentNode) {
          theLink.parentNode.removeChild(theLink);
          i--; // theLinks array is somehow dynamic :/
        }
      }
    }
    var  style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = unescape(
'body%20{%0Apadding:%200%2030px%200%2030px%20%21important%3B%0Abackground-color:%20%23F7F7F0%20%21important%3B%0A}%0Aa:link%2C%20a:visited%2C%20a:hover%2C%20a:active%2C%20%23header%20a:visited%20{%0Acolor:%20%2365AF15%20%21important%3B%0A}%0Aa:visited%20{color:%23829F63%20%21important%3B}%0Aa:hover%20{%0Acolor:%232D4F05%20%21important%3B%0Atext-decoration:underline%20%21important%3B%0A}%0A%0A/%2A%20header%20%2A/%0A%0A%23header%20{%0Amargin:0%20%21important%3B%0Apadding:2px%2015px%205px%2015px%20%21important%3B%0Aborder:%201px%20solid%20%23CFCFCF%20%21important%3B%0Aborder-width:%200%201px%201px%201px%20%21important%3B%0Aborder-bottom-color:%20%23EFEFEF%20%21important%3B%0A}%0A%23header-l%20{%0Abackground-image:%20url(data:image/png%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAACoAAAAqBAMAAAA37dRoAAAAMFBMVEX////d3d1lrxUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvSbw0AAAAH0lEQVR42mNggAMmJThgGBUdmqLGcGAoCAejokNTFADzDFfcWJyubwAAAABJRU5ErkJggg%3D%3D)%20%21important%3B%0A}%0A%23infobar%20{%0Amargin:0%20%21important%3B%0Amargin-bottom:0%20%21important%3B%0Apadding:2px%2015px%200%2015px%20%21important%3B%0Aborder:%201px%20solid%20%23CFCFCF%20%21important%3B%0Aborder-width:%200%201px%201px%201px%20%21important%3B%0Acolor:%20%236F6F6F%20%21important%3B%0A}%0A%23header%2C%20%23infobar%20{%0Abackground-color:%20%23ffffff%20%21important%3B%0A}%0A.search-box%20form%20input%20{%0Afont-size:%2011px%20%21important%3B%0A}%0A%0A/%2A%20content%20%2A/%0A%0A%23main%20{margin-left:0%20%21important%3B}%0Ali.post%20{%0Aborder-top:%201px%20dotted%20%23DFDFDF%20%21important%3B%0Abackground-color:%20transparent%20%21important%3B%0Amargin-bottom:%200px%20%21important%3B%0Apadding-bottom:%200px%20%21important%3B%0Apadding-top:%205px%20%21important%3B%0A}%0Ah4.desc%20{%20/%2A%20link%20text%20%2A/%0Abackground-color:%20transparent%20%21important%3B%0Afont-weight:bold%20%21important%3B%0Aline-height:%201em%20%21important%3B%0Afont-size:%2014px%20%21important%3B%0Apadding:%203px%205px%202px%202px%20%21important%3B%0Aoverflow:%20auto%20%21important%3B%0Adisplay:%20block%20%21important%3B%0A}%0Adiv.commands%20{%20/%2A%20edit%2C%20delete%20links%20%2A/%0A/%2A%20background-color:%20%23ffffff%20%21important%3B%20%2A/%0Abackground-color:%20transparent%20%21important%3B%0A}%0Adiv.commands%20a:link%2C%20div.commands%20a:visited%2C%20div.commands%20a:active%20{%0Acolor:%20%237F3737%20%21important%3B%0Atext-decoration:%20none%20%21important%3B%0A}%0Adiv.commands%20a:hover%20{%0Acolor:%20%23000000%20%21important%3B%0Atext-decoration:%20underline%20%21important%3B%0A}%0Ap.notes%20{%20/%2A%20description%20%2A/%0Amargin-top:%202px%20%21important%3B%0Amargin-bottom:%200px%20%21important%3B%0A}%0Adiv.meta%20{%20/%2A%20tags%20etc%20%2A/%0Atext-align:%20right%20%21important%3B%0Afont-size:%2010px%20%21important%3B%0Afont-family:%20verdana%20%21important%3B%0Amargin-bottom:%20%202px%20%21important%3B%0A}%0Ap.notes%2C%20div.meta%20{margin-left:%2025px%20%21important%3B}%0Adiv.meta%20a:hover%20{%0Acolor:%20%23000000%20%21important%3B%0A}%0A/%2A%20sidebars%20%2A/%0A%23sidebar%20{%0Apadding-top:%2015px%20%21important%3B%0Aborder:%20none%20%21important%3B%0A}%0A.sidebar-inner%20{%0Abackground:%20transparent%20%21important%3B%0Aborder:%20none%20%21important%3B%0A}%0A%23related-sidebar%20{border:%20none%20%21important%3B}%0A%23related-sidebar%20li.bundle%20li%20{%0Amargin-bottom:%205px%20%21important%3B%0A}%0A%23related-sidebar%20li.bundle%20li%20span%20%2B%20a%20{%20/%2A%20the%20%22%2B%22%20links%20%2A/%0Abackground-color:%20%23F1FFEF%20%21important%3B%0Apadding:%200%203px%200%203px%20%21important%3B%0Aborder:%201px%20solid%20%2365AF15%20%21important%3B%0A}%0A%0A/%2A%20footer%20%2A/%0A%23footer%20{%0Amargin:%200%20%21important%3B%0Apadding:%200%20%21important%3B%0Aclear:%20both%20%21important%3B%0A}%0A%23footer-inner%20{%0Amargin:%200%20%21important%3B%0Apadding:%200%20%21important%3B%0A}%0A%23footer-hr%20{%0Aheight:%200px%20%21important%3B%0Aline-height:%200px%20%21important%3B%0Abackground-color:%20transparent%20%21important%3B%0Aborder:none%20%21important%3B%0Amargin:%200%20%21important%3B%0Apadding:%200%20%21important%3B%0A}%0A%23items-per-page%20{%0Amargin:%200%200%205px%200%20%21important%3B%0Apadding:%200%20%21important%3B%0A}%0A%23footer%20ul%20{%0Amargin-top:%200%20%21important%3B%0Amargin-bottom:%200%20%21important%3B%0Apadding:%205px%2015px%2010px%2015px%20%21important%3B%0Abackground-color:%20%23ffffff%20%21important%3B%0Aborder:%201px%20solid%20%23CFCFCF%20%21important%3B%0Aborder-width:%201px%201px%200%201px%20%21important%3B%0A}%0A%23inline-suggestions%20{display:none%20%21important%3B}%0A.numbox%20{background-color:%20%2365AF15%20%21important%3B}%0A.numbox%20a:link%2C%20.numbox%20a:visited%2C%20.numbox%20a:active%20{color:%20white%20%21important%3B}%0A.bundle%20.ten%20{font-size:%20140%25%20%21important%3B}%0A'
    );
    var newLink = document.createElement('link');
    newLink.setAttribute('rel', 'icon');
    newLink.setAttribute('href', favicon);
    head.appendChild(style);
    head.appendChild(newLink);
    var smallImg = $('footer-inner');
    if (smallImg) {
      smallImg = smallImg.getElementsByTagName('img');
      if (smallImg) {
        for (var i = 0, il = smallImg.length; i < il ;i++) {
          var img = smallImg[i];
          if (img.src.match(/\/delicious.small.gif$/)) {
            img.src = favicon;
          }
        }
      }
    }
  }

  var imageReg = /\.(jpe?g|gif|png)$/i;

  var entry = document.getElementsByTagName('h4');
  for(var i=0, len=entry.length; i < len; i++) {
    // URL Displayer
    if (entry[i].className.match(/\bdesc\b/)) {
      var p = document.createElement('p');
      p.appendChild( document.createTextNode(entry[i].firstChild.href) );
      p.style.overflow = 'auto';
      p.style.display = 'block';
      p.style.color='gray';
      entry[i].parentNode.insertBefore(p, entry[i].parentNode.getElementsByTagName('div')[0].nextSibling);
    }
    // Image linker
    var link = entry[i].getElementsByTagName('a')[0];
    if (link && link.href && link.href.match(imageReg)) {
      var img = document.createElement('img');
      img.src = link.href;
      img.setAttribute('alt', 'img');
      img.setAttribute('width', '250px');
      img.setAttribute('height', '150px');
      img.style.marginRight = '5px';
      entry[i].insertBefore(img, entry[i].firstChild);
      continue;
    }
  }


  window.addEventListener("load", function(e) {
    // Focus tagfield on post pages
    var tagfield = $("tags");
    if (tagfield) {
      tagfield.focus();
    }
  }, false);
})();
