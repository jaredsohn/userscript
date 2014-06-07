// ==UserScript==
// @name            Premium Link Transload Helper (RslinkGens, RapidIt, iTechnoHeaven)
// @namespace       http://userscripts.org/users/94156
// @description     Replace original page with clean, minimalistic alternative without ads, captchas or blinking distractions
// @include         http://rslinkgens.info/*
// @include         http://*.rslinkgens.info/*
// @include         http://rapidit.info/*
// @include         http://*.rapidit.info/*
// @include         http://itechnoheaven.com/*
// @include         http://*.itechnoheaven.com/*
// @require         http://code.jquery.com/jquery-1.3.2.min.js
// @copyright       2009, Henry 'Pi' James
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version         2010-01-16
// ==/UserScript==

/*
Changelog:
* 2010-01-16: Add new site iTechnoHeaven, use jQuery 1.3.2 as 1.4 seems to be incompatible with GreaseMonkey
* 2010-01-08: Add new site RapidIt, plus minor cleanup
* 2009-12-14: Complete rewrite to bypass the original page and emulate its entire operation using own code instead
* 2009-12-07: Initial release
*/

var win = window, doc = win.document, loc = win.location;

function init() {
  $('head').html('<title>' + host + ' Helper</title>');
  $('body').html('<table><thead id="link" /><tfoot id="stash" /><tbody id="status" /><tbody id="progress" /></table>');
  $('#link').html('<tr><th>Link</th><td><form id="start"><input type="text" value="" size="60" /><input type="submit" value="Start" /></form></td></tr>');
  $('#stash').html('<tr><th>Stash</th><td><form id="history"><span /><input id="recheck" type="submit" value="Recheck" /><ul /></form></td></tr>');
  GM_addStyle('body {background-color: #036; color: #fff; font-family: monospace} a {color: #0f3} th, td {padding: 0 0.5em; vertical-align: top} th {min-width: 5em; text-align: right; font-weight: normal} ul {margin: 0; padding-left: 2em} form {margin: 0} input {border: none; padding: 0; font-family: inherit; font-size: 100%} input[type=submit] {margin: 0 1em}');
  $('#start').submit(function(e) {start(); return false});
  $('#history').submit(function(e) {history(); return false});
  enable(start);
  enable(history);
  history();
}

function start() {
  var link = $('#start input:text'), linkurl = $.trim(link.val());
  link.val(linkurl);
  if (!linkurl) {return};
  linkid = randomstr(16);
  disable(start);
  $('#status').html('<tr><th>ID</th><td>' + linkid + '</td></tr><tr><th>Status</th><td><form id="update"><span /><input type="submit" value="Update" disabled="disabled" /></form></td></tr>');
  $('#progress').empty();
  $('#update').submit(function(e) {update(); return false});
  GM_xmlhttpRequest({
    method: 'GET',
    url: loc.href + '?mod=transload&id=' + linkid + '&link=' + encodeURIComponent(linkurl),
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    onload: function(r) {
      var t = r.responseText, m =t.match(/^Success\|\^\|/);
      if (m) {
        $('#status form span').text('Starting...');
        autoupdate(3000);
      } else {
        $('#status form span').text(t);
        cleanupstart();
      };
    },
    onerror: function(r) {cleanupstart()},
  });
}

function cleanupstart() {
  enable(update);
  enable(start);
}

function update() {
  disable(update);
  GM_xmlhttpRequest({
    method: 'GET',
    url: loc.href + '?mod=getProgress&id=' + linkid,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    onload: function(r) {
      var t = r.responseText, d = JSON.parse(r.responseText);
      if (!d.Status) {cleanupstart(); return};
      $('#status form span').text(d.Status);
      $('#progress').html('<tr><tr><th>Progress</th><td>' + d.Received + ' / ' + d.Size + ' = ' + d.Percentage +'%</td></tr><tr><th>ETA</th><td>' + d.Remain + ' @ ' + d.Speed + ' KB/s</td></tr>');
      switch (d.Status) {
        case 'Downloading...':
          autoupdate(1500);
          break;
        case 'Finished':
          finish();
          break;
        default:
          cleanupstart();
      }
    },
    onerror: function(r) {cleanupstart()},
  });
}

function autoupdate(delay) {
  enable(update);
  win.setTimeout(function(m) {disable(update)}, 0);
  win.setTimeout(update, delay);
}

function finish() {
  cleanupstart();
  GM_xmlhttpRequest({
    method: 'GET',
    url: loc.href + '?mod=retrieveLink&id=' + linkid,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    onload: function(r) {
      var t = r.responseText, u = baseuri + t;
      $('#progress').append('<tr><th>Result</th><td><a href="' + u + '">' + u + '</a></td></tr>');
      cleanupfinish();
    },
    onerror: function(r) {cleanupfinish()},
  });
}

function cleanupfinish() {
  history();
}

function history() {
  disable(history);
  GM_xmlhttpRequest({
    method: 'GET',
    url: baseuri + 'genlinks.php',
    onload: function(r) {
      var t = r.responseText, d = $(t), l = $('#main ol li', d);
      if (l.length) {
        $('#stash form span').text('Currently available:');
        $('#stash ul').html(l);
      } else {
        $('#stash form span').text('Empty');
        $('#stash ul').empty();
      };
      cleanuphistory();
    },
    onerror: function(r) {cleanuphistory()},
  });
}

function cleanuphistory() {
  enable(history);
}

function enable(func) {
  $('#' + func.name + ' input').removeAttr('disabled');
}

function disable(func) {
  $('#' + func.name + ' input').attr('disabled', 'disabled');
}

function randomstr(length) {
  var c = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  var n = c.length;
  var s = '';
  for (let i = 0; i < length; i++) {s += c[Math.floor(Math.random() * n)]};
  return s;
}

var hosts = {'RslinkGens': /(^|\.)(rslinkgens)(\.info$)/, 'RapidIt': /(^|\.)(rapidit)(\.info$)/, 'iTechnoHeaven': /(^|\.)(itechnoheaven)(\.com$)/}, host = 'Premium Link Transload';
for (let n in hosts) {if (hosts[n].test(loc.host)) {host = n}};
var baseuri = loc.protocol + '//' + loc.host + '/';
var linkid = null;
switch (loc.pathname) {
  case '/':
  case '/index.php':
    loc.href = baseuri + 'ajax.php';
    break;
  case '/ajax.php':
    if (!loc.search) $(init);
    break;
}
