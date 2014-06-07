// Delicious Ego
// $Id: delicious.ego.user.js 29 2005-07-04 20:12:16Z jon $
// Copyright (C) 2005 by Jonathon Ramsey (jon@bangoid.com)

// This file is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published
// by the Free Software Foundation; either version 2, or (at your
// option) any later version.

// This file is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this software; see the file COPYING. If not, write to
// the Free Software Foundation, Inc., 59 Temple Place - Suite 330,
// Boston, MA 02111-1307, USA.

// Version: 0.5

// ==UserScript==
// @name           Delicious Ego
// @namespace      htt://babylon.idlevice.co.uk/javascript/greasemonkey/
// @description    But where am I?
// @include        http://del.icio.us/url/*
// ==/UserScript==

(function() {
  var style = "\
h3.ego { margin-left:0.5ex; }\
.date { %; \
}\
div.ego { margin:0 0 0.5ex 10ex; padding:0 0.5ex; }\
div.ego p { margin:0; padding:0; }\
div.me { margin-left:8ex; max-width:60ex; padding:0.5ex; \
  border-left:2ex solid #f00; }\
div.me p { margin:0 0 0.5ex; }\
a.ego { font-size:120%; }\
p.me { color:#393; }\
.rm { margin-left:4em; }\
";

  /* ---------------------------------------------------------------- */
  /* Dates */
  Date.parseISO8601Date = function (iso_date) {
    var parts = iso_date.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  Date.getDifferenceInDays = function(date1, date2) {
    return Math.round(Math.abs(date2 - date1) / 60 / 60 / 24 / 1000);
  }

  Date.prototype.toString = function() {
    var months = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];
    var date = this.getDate() + ' ';
    date += months[this.getMonth()] + ', ';
    date += this.getFullYear();
    return date;
  }

  /* ---------------------------------------------------------------- */
  /* Posts wide stuff */
  function Posts() {
    this.count =
      (function() {
        var xpath = "count(/html/body/div/div[contains(@class, 'post')])";
        return document.evaluate(xpath,
                                 document,
                                 null,
                                 XPathResult.ANY_TYPE,
                                 null).numberValue;
      })();
    this.contains_me =
      (function() {
        var xpath = "1 = count(/html/body/div/div[contains(@class,'highlighted')])";
        return document.evaluate(xpath,
                                 document,
                                 null,
                                 XPathResult.ANY_TYPE,
                                 null).booleanValue;
      })();
  }

  /* ---------------------------------------------------------------- */
  /* Post dates */
  function PostDates() {
    this.getDates();
    this.first = null;
  }
  PostDates.prototype.getDates = function() {
    var xpath = "/html/body/div/div[@class='date']";
    this.days = document.evaluate(xpath,
                                  document,
                                  null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
    this.index = -1;
  }
  PostDates.prototype.next = function() {
    this.index++;
    return this.days.snapshotItem(this.index);
  }
  PostDates.prototype.firstPostDate = function() {
    if (! this.first) {
      var day, first, i = 0;
      while (day = this.days.snapshotItem(i++)) {
        first = day.textContent;
      }
      this.first = Date.parseISO8601Date(first);
    }
    return this.first;
  }
  PostDates.prototype.getDateDiff = function() {
    day = this.days.snapshotItem(this.index);
    return Date.getDifferenceInDays(Date.parseISO8601Date(day.textContent),
                                    this.firstPostDate());
  }

  /* ---------------------------------------------------------------- */
  /* A user's link */
  function DeliciousLink(node, days, position) {
    this.node = node;
    this.days = days;
    this.position = position;
    this.is_me = (-1 < node.className.indexOf('highlighted'));
    var metadata = node.getElementsByTagName('div');
    this.setExtended(metadata);
    this.setLinks(metadata);
  }
  DeliciousLink.prototype.setExtended = function(metadata) {
    if (2 == metadata.length) {
      this.extended = metadata[0];
    }
  }
  DeliciousLink.prototype.setLinks = function(metadata) {
    var links = metadata[metadata.length -1].getElementsByTagName('a');
    var len = links.length;
    if (this.is_me) {           /* get delete link */
      this.deletelink = links[len -1];
      len--;
    }
    this.copylink = links[len - 1];
    this.by = links[len - 2];
    this.tags = new Array();
    for (var i = 0; i < (len - 2); i++) {
      this.tags.push(links[i]);
    }
  }
  DeliciousLink.prototype.getOutputNode = function(posts) {
    var div = el('div');
    div.className = 'ego';
    if (this.is_me) {
      div.className += ' highlighted me';
      var a  = el('a');
      a.name = 'me';
      a.id = 'me';
      div.appendChild(a);
    }
    var by = el('p');
    this.by.className = 'ego';
    by.appendChild(this.by);
    by.appendChild(this.getToLinks());
    div.appendChild(by);
    if (this.extended) {
      div.appendChild(this.extended);
    }
    if (this.is_me) {
      var behind = el('p');
      behind.className = 'meta me';
      behind.appendChild(tn(getDateDiffText(this.days.getDateDiff()) +
                            ', ' + this.position + ' of ' + posts.count));
      div.appendChild(behind);
      var edit = el('p');
      edit.className = 'meta';
      edit.appendChild(this.copylink);
      edit.appendChild(tn(' this post ... '));
      edit.appendChild(this.deletelink);
      edit.appendChild(tn(' this post'));
      div.appendChild(edit);
    }
    if (! posts.contains_me) {
      var copy = el('p');
      copy.className = 'meta';
      copy.appendChild(this.copylink);
      copy.appendChild(tn(' this link'));
      div.appendChild(copy);
    }
    return div;
  }
  DeliciousLink.prototype.getToLinks = function() {
    if (0 == this.tags.length) {
      return tn('');
    }
    var to = el('span');
    to.className = 'meta';
    to.appendChild(tn(' to '));
    for (var i = 0; i < this.tags.length; i++) {
      to.appendChild(this.tags[i]);
      to.appendChild(tn(', '));
    }
    to.removeChild(to.lastChild);
    return to;
  }

  /* ---------------------------------------------------------------- */
  /* Global functions */
  function addHeader(posts) {
    var header = document.getElementById('content');
    var h = el('h3');
    h.className = 'ego';
    var post = header.nextSibling.nextSibling.childNodes[3];
    h.appendChild(post.getElementsByTagName('h3')[0].firstChild);
    header.parentNode.replaceChild(h, header);
    
    if (posts.contains_me) {
      var link = document.createElement('a');
      link.appendChild(document.createTextNode('Jump to me'));
      link.href = '#me';
      var div = document.createElement('div');
      div.className = 'ego';
      div.appendChild(link);
      h.parentNode.insertBefore(div, h.nextSibling);
    }
  }

  function addStyle(style) {
    var egostyle = document.createElement('style');
    egostyle.type = 'text/css';
    egostyle.innerHTML = style;
    document.body.appendChild(egostyle);    
  }

  function addDayTitle(day, days) {
    day.title = getDateDiffText(days.getDateDiff());
  }

  function getDateDiffText(datediff) {
    return datediff + ' day' + (1 == datediff ? '' : 's') + ' late';
  }

  function el(tag) {
    return document.createElement(tag);
  }
  function tn(text) {
    return document.createTextNode(text);
  }
  

  /* ---------------------------------------------------------------- */
  /* do the work */
  addStyle(style);

  var posts = new Posts();
  addHeader(posts);
  var days = new PostDates();

  var day, node, nextnode, link, position = posts.count;
  while (day = days.next()) {
    addDayTitle(day, days);
    node = day.nextSibling.nextSibling;
    while (node && node.className != 'date') {
      link = new DeliciousLink(node, days, position--);
      nextnode = node.nextSibling.nextSibling;
      node.parentNode.replaceChild(link.getOutputNode(posts), node);
      node = nextnode;
    }
  }
})();
