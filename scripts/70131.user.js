// ==UserScript==
// @name           456
// @namespace      http://userscripts.org/users/64431
// @description    Localize and format 4chan timestamps
// @version        1.4.2
// @include        http://boards.4chan.org/*
// @include        http://dis.4chan.org/*
// @include        http://4chanarchive.org/brchive/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
// ==/UserScript==

//PREFERENCES
var chan_offset = -0;
var am_pm = true;
//END PREFERENCES

var parse;
var server = location.hostname.match(/\w+/)[0];
switch (server) {
  case 'archive':
    break;
  case 'dis':
    parse = parseTB;
    break;
  default:
    parse = parseChan;
    break;
}
parse(document.body);
document.body.addEventListener('DOMNodeInserted', nodeInserted, true);

function nodeInserted(e) {
  var target = e.target;
  if (target.nodeName == 'TABLE')
    parse(target);
}

function parseTB(root) {
  var nodes = X('.//span[@class="posterdate"]/text()', root);
  nodes.forEach(function (node) {
    var d = node.textContent.match(/(\d+)-(\d+)-(\d+) (\d+)(:\d+)/);
    format(node, d[1], d[2], d[3], d[4], d[5], ' ');
  });
}

function parseChan(root) {
  var nodes = X('.//span[@class="commentpostername" or @class="postername"]/' +
               'following-sibling::text()[string-length(.) > 1][1]', root);
  nodes.forEach(function (node) {
    var d = node.textContent.match(/(\d+)\/(\d+)\/(\d+)(.[A-z]+.)(\d+)(\S+)/);
    format(node, d[3], d[1], d[2], d[5], d[6], d[4]);
  });
}

function format(dateNode, year, month, day, hour, min_sec, day_of_week) {
  year = Number(year);
  month = Number(month);
  day = Number(day);
  hour = Number(hour) + chan_offset;
  var leap = year % 4 ? 0 : 1;
  if (hour < 0) {//prev day
    hour = hour + 24;
    day = day - 1;
    day_of_week = yesterday();
    if (day < 1) {//prev month
      month = month - 1;
      if (month < 1) {//prev year
        month = 12;
        year = year - 1;
      }
      day = last_day_of_month();
    }
  }
  if (hour > 23) {//next day
    hour = hour - 24;
    day = day + 1;
    day_of_week = tomorrow();
    if (day > last_day_of_month()) {//next month
      month = month + 1;
      if (month > 12) {//next year
        month = 1;
        year = year + 1;
      }
      day = 1;
    }
  }
  if (am_pm) {
    if (hour > 12) {
      hour = hour - 12;
      min_sec = min_sec + 'PM';
    } else
      min_sec = min_sec + 'AM';
  }
  dateNode.textContent = ' ' + zeroPad(month) + '/' + zeroPad(day) + '/' +
    zeroPad(year) + day_of_week + zeroPad(hour) + min_sec + ' ';
  //dateNode.textContent = ' ' + day_of_week + ' ' + monthShort() + ' ' + day + ', ' + hour + min_sec + ' '

  function last_day_of_month() {
    switch (month) {
      case 1: return 31;
      case 2: return (28 + leap);
      case 3: return 31;
      case 4: return 30;
      case 5: return 31;
      case 6: return 30;
      case 7: return 31;
      case 8: return 31;
      case 9: return 30;
      case 10: return 31;
      case 11: return 30;
      case 12: return 31;
    }
  }

  function yesterday() {
    switch (day_of_week) {
      case '(Sun)' : return '(Sat)';
      case '(Mon)' : return '(Sun)';
      case '(Tue)' : return '(Mon)';
      case '(Wed)' : return '(Tue)';
      case '(Thu)' : return '(Wed)';
      case '(Fri)' : return '(Thu)';
      case '(Sat)' : return '(Fri)';
      default      : return ' ';
    }
  }

  function tomorrow() {
    switch (day_of_week) {
      case '(Sun)' : return '(Mon)';
      case '(Mon)' : return '(Tue)';
      case '(Tue)' : return '(Wed)';
      case '(Wed)' : return '(Thu)';
      case '(Thu)' : return '(Fri)';
      case '(Fri)' : return '(Sat)';
      case '(Sat)' : return '(Sun)';
      default      : return ' ';
    }
  }

  function zeroPad(el) {
    if (el < 10)
      el = '0' + el;
    return el;
  }

  function monthShort() {
    switch (month) {
      case 1: return 'Jan';
      case 2: return 'Feb';
      case 3: return 'Mar';
      case 4: return 'Apr';
      case 5: return 'May';
      case 6: return 'Jun';
      case 7: return 'Jul';
      case 8: return 'Aug';
      case 9: return 'Sep';
      case 10: return 'Oct';
      case 11: return 'Nov';
      case 12: return 'Dec';
    }
  }
}

//utility
function X(xpath, root) {
  if (!root) root = document.body;
  var result = document.evaluate(
    xpath, root, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var a = [], item;
  while (item = result.iterateNext())
    a.push(item);
  return a;
}