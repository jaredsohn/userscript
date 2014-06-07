// ==UserScript==
// @name        doodle_highlight
// @namespace   http://userscripts.org/users/433894
// @description Highlights the next event in a Doodle table.
// @copyright   2012-2013 Jens Wille <jens.wille@gmail.com>
// @license     AGPL; http://gnu.org/licenses/agpl.html
// @include     http://www.doodle.com/*
// @include     http://doodle.com/*
// @grant       none
// @version     0.3.0
// ==/UserScript==

var highlightPollTable = function() {
  var container = document.getElementById('ptContainer');
  if (container) {
    var table = container.getElementsByTagName('table')[0];
    if (table) {
      var rows = table.getElementsByTagName('tr');
      if (rows.length > 2) {
        var row_m = rows[0].getElementsByTagName('th');
        var row_d = rows[1].getElementsByTagName('th');

        var now = new Date(), months = [], k = 0, t = false;
        var day = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        var month = {
          _t: function(m) { return this[m] || m; },

          'JANUAR':   'JANUARY',
          'FEBRUAR':  'FEBRUARY',
          'MÄRZ':     'MARCH',
          'MAI':      'MAY',
          'JUNI':     'JUNE',
          'JULI':     'JULY',
          'OKTOBER':  'OCTOBER',
          'DEZEMBER': 'DECEMBER'
        }

        for (var i = 0, l = row_m.length; i < l; ++i) {
          var row_h = row_m[i];
          var row_p = row_h.getElementsByTagName('div');

          if (row_p.length > 0) {
            var row_t = row_p[0].innerHTML.split('&nbsp;');
            if (row_t.length === 2) {
              row_t = month._t(row_t[0]) + ' ' + row_t[1];

              for (var j = 0, m = row_h.colSpan; j < m; ++j) {
                months[k++] = row_t;
              }
            }
          }
        }

        k = 0;

        var style_head = function(i) {
          i.style.fontWeight = 'bold';
        };

        var style_rows = function(i, f) {
          for (var j = 0, m = rows.length; j < m; ++j) {
            var row = rows[j];
            if (row) {
              var cell = row.getElementsByTagName('td')[i] ||
                         row.getElementsByTagName('th')[i];

              if (cell) {
                if (f && /\bparticipant\b/.test(row.className)) {
                  f(cell.style);
                }
                else if (!f && /\bheader\b/.test(row.className)) {
                  style_head(cell);
                }
              }
            }
          }
        };

        for (var i = 0, l = row_d.length; i < l; ++i) {
          var row_p = row_d[i].getElementsByTagName('div');
          if (row_p.length > 0) {
            var row_i = row_p[0];
            var row_h = row_i.innerHTML;
            if (row_h.length > 0) {
              var row_t = new Date(months[k++] + row_h.replace(/^\D+/, ' '));

              if (row_t.getTime() < day.getTime()) {
                style_rows(i, function(i) { i.opacity = '0.4'; });
              }
              else if (t) {
                style_rows(i, function(i) { i.opacity = '0.8'; });
              }
              else {
                style_head(row_i);
                style_rows(i);

                t = true;
              }
            }
          }
        }
      }
    }
  }
};

window.setTimeout(highlightPollTable, 1000);
