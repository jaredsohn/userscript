// ==UserScript==
// @name        Edge.org - Full Width Pages
// @description Make the content on edge.org pages use full page width available
// @namespace   http://loonyone.livejournal.com
// @include     http://edge.org
// @include     http://edge.org/
// @include     http://edge.org/*
// @include     http://*.edge.org
// @include     http://*.edge.org/
// @include     http://*.edge.org/*
// @creator     Manpreet Singh <junkblocker@yahoo.com>
// @source      http://userscripts.org/scripts/show/10331
// @identifier  http://userscripts.org/scripts/source/10331.user.js
// @version     0.2
// @date        2007-06-29
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
// 0.2 - Extended to work with without www. also
// 0.1 - First released

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
    name: 'Edge.org - Full Width Pages',
    url: 'http://userscripts.org/scripts/source/10331.user.js',
    version: '0.2'
  });
  var tables = document.getElementsByTagName("table");
  for (var i = 0, len = tables.length; i < len; i++) {
    tables[i].setAttribute('width', '100%');
  }
})();
