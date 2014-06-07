// ==UserScript==
// @name        del.icio.us - show user comments inline
// @description del.icio.us - show user comments inline
// @namespace   http://loonyone.livejournal.com
// @include     http://del.icio.us/*
// @include     http://del.icio.us/url/*
// @include     http://del.icio.us/help/*
// @creator     Manpreet Singh <junkblocker@yahoo.com>
// @source      http://userscripts.org/scripts/show/9297
// @identifier  http://userscripts.org/scripts/source/9297.user.js
// @version     0.4
// @date        2007-05-29
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
    name: 'del.icio.us - show user comments inline',
    url: 'http://userscripts.org/scripts/source/9297.user.js',
    version: '0.4'
  });
  function $x(exp, ctx) {
    if (!ctx) ctx = document;
    var i, arr = [], r = document.evaluate(exp, ctx, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = r.snapshotItem(i); i++) arr.push(item);
    return arr;
  }
  function $(id) {
    return document.getElementById(id);
  }
  function comment(a, where) {
    var hash = a.href;
    hash = hash.replace(/.*\//);
    var commentsNode = document.createElement('a');
    commentsNode.innerHTML = 'comments <img src="http://del.icio.us/static/img/arrow.r.gif"/>';
    commentsNode.href = "";
    commentsNode.id = 'click'+hash;
    commentsNode.alt = 'click to view comments made by other users here';
    commentsNode.title = 'click to view comments made by other users here';
    commentsNode.setAttribute('histurl', a.href);
    commentsNode.addEventListener('click', function (event) {
      event.stopPropagation();
      event.preventDefault();
      var commentsdiv = document.getElementById('comments'+hash);
      if (commentsdiv) {
         this.innerHTML = 'comments <img src="http://del.icio.us/static/img/arrow.r.gif"/>';
         this.alt = 'click to view comments made by other users here';
         this.title = 'click to view comments made by other users here';
         commentsdiv.parentNode.removeChild(commentsdiv);
         return;
      }
      var url = this.getAttribute('histurl');
      GM_xmlhttpRequest({
        method: 'GET',
        url: a.href,
        onload: function(result) {
          var commentsHTML = '';
          if (result.status != 200) {
            commentsHTML = '<font color="red"><b>Could not retrieve comments.<br/>' + result.status + ' ' +  result.statusText + '</b></font>';
          } else {
            var content = result.responseText;
            var idx = content.indexOf('<ul class="notelist">');
            while (idx != -1) {
              content = content.substring(idx);
              var idxend = content.indexOf('</ul>');
              commentsHTML += content.substring(0, idxend+5);
              content = content.substring(idxend+5);
              idx = content.indexOf('<ul class="notelist">');
            }
            if (commentsHTML == '') {
              commentsHTML = '<ul><li>No comments found.</li></ul>';
            }
          }
          commentsHTML = '<blockquote>'+commentsHTML+'</blockquote>';

          var commentsDiv = document.createElement('div');
          commentsDiv.id = 'comments'+hash;
          commentsDiv.innerHTML = commentsHTML;
          var thisEl = document.getElementById('click'+hash);
          thisEl.parentNode.appendChild(commentsDiv);
          thisEl.innerHTML = 'comments <img src="http://del.icio.us/static/img/arrow.d.gif"/>';
          thisEl.alt = 'click to hide the comments';
          thisEl.title = 'click to hide the comments';
        }
      });
    }, false);
    if (a.getAttribute('class') == 'pop') {
      a.parentNode.insertBefore(commentsNode, a.nextSibling);
      a.parentNode.insertBefore(document.createTextNode(" "), commentsNode);
    } else {
      var newDiv = document.createElement('div');
      newDiv.id = 'div' + hash;
      newDiv.style.textAlign = 'right';
      newDiv.appendChild(commentsNode);
      a.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(newDiv);
    }
  }
  $x("//a[@class='pop']", $("main")).forEach(comment);
  $x("//span[@class='numbox']/a", $("main")).forEach(comment);
})();
