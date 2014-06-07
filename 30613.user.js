// ==UserScript==
// @name           Google Reader Unread Count in Gmail
// @description    Shows google reader unread count in Gmail nav bar.
// @namespace      http://thinlight.org/
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var readerLink = null;
var timer = null;
var timeout = null;
var attemptCount = 0;
var interval = 480000;
var step = 60000;
var minInterval = 60000;
var maxInterval = 480000;

GM_addStyle('.reader-unread .gbts {font-weight:bold;color:#EEEEEE;}');

function checkUnreadCount() {
  GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://www.google.com/reader/api/0/unread-count?all=true&output=xml',
      headers: {
        'Accept': 'text/xml',
      },
      onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
          "application/xml");
        var entries = dom.getElementsByTagName('string');
        var unread = false;
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].textContent.indexOf('reading-list') > -1) {
            var count = entries[i].nextSibling.textContent;
            readerLink.innerHTML = '<span class="gbtb2"></span><span class="gbts">Reader (' + count + ')</span>';
            readerLink.className += ' reader-unread';
            unread = true;
            break;
          }
        }
        if (!unread) {
          readerLink.innerHTML = '<span class="gbtb2"></span><span class="gbts">Reader</span>';
          readerLink.className = readerLink.className.replace(' reader-unread', '');
        }
      }
    });
  if (interval < maxInterval) {
    interval += step;
  }

  timeout = setTimeout(checkUnreadCount, interval);
}

function initCount() {
  attemptCount += 1;
  if (attemptCount > 10) { // To stop the timers on "dumb" pages
    clearInterval(timer);
    return;
  }

  var gbar = (document.getElementById('gbz') ||
    window.frames['canvas_frame'].contentDocument.getElementById('gbz'));
  if (!gbar) {
    return;
  } else {
    var links = gbar.getElementsByClassName('gbzt');
    var lastLink = null;
    for (var i = 0; i < links.length; i++) {
      lastLink = links[i];
      if (lastLink.innerHTML.indexOf('Reader') > -1) {
        readerLink = lastLink;
        break;
      }
    }

    if (! readerLink) {
      // reader link is hidden. swap it with lastLink
      readerLink = lastLink;
      links = gbar.getElementsByClassName('gbmt');
      for (var i = 0; i < links.length; i++) {
        if (links[i].innerHTML.indexOf('Reader') > -1) {
          // found
          var someLink = links[i];

          readerLink.innerHTML = '<span class="gbtb2"></span><span class="gbts">Reader</span>';
          someLink.innerHTML = readerLink.textContent;

          href = someLink.href;
          someLink.href = readerLink.href;
          readerLink.href = href;

          break;
        }
      }
    }

    if (readerLink) {
      readerLink.addEventListener('click', function(e) {
          interval = minInterval;
          clearTimeout(timeout);
          setTimeout(checkUnreadCount, interval);
        }, false);
      checkUnreadCount();
    }
    clearInterval(timer);
  }
}

window.addEventListener('load', function(e) {
    timer = setInterval(initCount, 3000);
  }, false);
