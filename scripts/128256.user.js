// ==UserScript==
// @name           code-reviewable-relevance
// @namespace      code-reviewable-relevance
// @description    Tells you which reviewable issues are relevant still.
// @match          http://codereview.chromium.org/
// @match          https://codereview.chromium.org/
// @match          http://chromiumcodereview.appspot.com/
// @match          https://chromiumcodereview.appspot.com/
// @match          http://codereview.chromium.org/mine
// @match          https://codereview.chromium.org/mine
// @match          http://chromiumcodereview.appspot.com/mine
// @match          https://chromiumcodereview.appspot.com/mine
// @version        0.4
// ==/UserScript==

(function(document) {

  var me = (document.querySelector('#help + div b').textContent.match(/^(\S+) /) || [0,0])[1];
  var trs = document.querySelectorAll('#queues tr');
  var h3s = document.querySelectorAll('#queues tr > td > h3');

  if (!me || !trs || !h3s)
    return;

  var reviewable = Array.prototype.slice.call(
      trs,
      Array.prototype.indexOf.call(trs, h3s[h3s.length - 3].parentNode.parentNode) + 2,
      Array.prototype.indexOf.call(trs, h3s[h3s.length - 2].parentNode.parentNode));
    
  if (!reviewable)
    return;

  function getJson(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        try {
          cb.call(xhr, JSON.parse(xhr.responseText));
        } catch(e) {
          console.warn('malformed response from ' + url);
        }
      }
    };
    xhr.send();
  }

  function lgtm(msgs) {
    for (var i = 0, l = msgs.length; i < l; ++i) {
      if (msgs[i].approval)
        return msgs[i];
    }
  }

  function mine(msgs) {
    var mine = [];
    msgs.forEach(function(msg) {
      if (msg.sender == me)
        mine.push(msg);
    });
    return mine;
  }

  reviewable.forEach(function(row) {
    var apiUrl = row.querySelector('a[id^="issue-title"]').href.replace(/([0-9]+)\/?$/, 'api/$1') + '?messages=true';
    getJson(apiUrl, function(res) {
      var relevance;
      var comments = mine(res.messages);
      if (!comments.length) {
        if (res.commit)
          relevance = 'more-relevant';
      } else {
        var lg = lgtm(comments);
        var modified = Date(res.modified) > Date(comments.slice(-1).date);
        if (modified) {
          if (res.commit)
            relevance = 'more-relevant';
          else if (lg)
            relevance = 'less-relevant';
        } else {
          relevance = lg && res.commit ? 'irrelevant' : 'less-relevant';
        }
      }
      if (relevance)
        row.classList.add(relevance);
    });
  });

  var style = document.createElement('style');
  style.innerText = '' + function() {/*
    tr[class$='relevant'] {
      -webkit-transition: opacity 200ms, background-color 200ms;
    }
    .irrelevant {
      opacity: .2;
    }
    .less-relevant {
      opacity: .6;
    }
    .more-relevant {
      background-color: rgba(255, 0, 0, .2);
    }
    tr[class$='relevant']:hover {
      background-color: white;
      opacity: 1;
    }
  */}.toString().split('\n').slice(1, -1).join('\n');
  document.body.appendChild(style);

}(unsafeWindow.document));
