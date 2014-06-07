// ==UserScript==
// @name            Storage.to Helper
// @namespace       http://userscripts.org/users/94156
// @description     Circumvent the hourly traffic limit and show download link immediately without popup ad
// @include         http://storage.to/*
// @include         http://*.storage.to/*
// @version         2009-07-19
// ==/UserScript==

/*
Changelog:
* 2009-07-19: Show countdown to the time (or just the time if "countdown" is off or site JavaScript is being blocked) at which the download link becomes active, as skipping the nuisance delay is no longer possible (at least for the time being) now Storage.to has changed its download ticket reservation mechanism
* 2009-07-17: Adjust to new session cookies with explicit domain attribute
* 2009-07-08: Now work even with site JavaScript being blocked
* 2009-07-07: Initial release
*/

// Change "countdown" to "false" if you don't want to see a second-by-second countdown, instead just the time at which the download link becomes active:
var countdown = true;

var w = window, d = w.document;

function getlink(r) {
  l = r.responseText.match(/'link'\s*:\s*'(http.*?)'/)[1];
  c = r.responseText.match(/'countdown'\s*:\s*(\d+)/)[1];
  t = Date.now() + parseInt(c) * 1000;
  d.getElementById('ct').innerHTML = '<p><a id="helper_link" href="' + l + '">' + l + '</a></p><p><span id="helper_status">The download link will not become active until: </span><span id="helper_time">' + new Date(t).toLocaleTimeString() + '</span></p>';
  GM_addStyle('#helper_link {color: #999} #helper_status {color: #009} #helper_time {color: #900}');
  if (countdown) {i = w.setInterval(update, 1000)};
}

function update(m) {
  c = (t - Date.now()) / 1000;
  if (c > 0) {
    d.getElementById('helper_status').textContent = 'The download link will become active in: ';
    d.getElementById('helper_time').textContent = Math.round(c);
  }
  else {
    w.clearInterval(i);
    d.getElementById('helper_status').textContent = 'The download link is now active.';
    d.getElementById('helper_time').textContent = '';
    GM_addStyle('#helper_link {color: #009} #helper_status {color: #999}');
  }
}

d.cookie = 'sid=; expires=Tue, 07-Jul-2009 00:00:00 UTC; path=/; domain=storage.to';
var t = 0, i = 0;
u = d.URL.replace(/\/get\//, '/getlink/');
GM_xmlhttpRequest({method: 'GET', url: u, onload: getlink});
