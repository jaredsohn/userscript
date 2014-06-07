// ==UserScript==
// @name           Facebook Scrubber
// @namespace      shoecream@luelinks.net
// @description    "Scrubs" people's names so you can take a screenshot without having to edit out the names.
// @include        http://www.facebook.com/*
// ==/UserScript==

// usernames must be alphanumeric + period. periods cannot begin or end
// a username. usernames must be 5 characeters long.
var username_regex = /^[a-z0-9][a-z0-9\.]{3,}[a-z0-9]$/i;

// hacks because i don't know how to be a real programmer
var q_bl_hack = ['v=', 'story_fbid=', '#(?:wall)?']
var f_bl_hack = ['facebook', '\\.php$']
var q_bl = new RegExp('(?:' + q_bl_hack.join('|') + ')');
var f_bl = new RegExp('(?:' + f_bl_hack.join('|') + ')');

function is_profile_link(dom) {
  if (!dom) return false;
  var dc = dom.childNodes;
  if (dc && dc.length === 1 && dc[0].nodeType === 3) {
    var path = /http:\/\/[^\/]+\/(.*)/.exec(dom.href);
    if (path && path[1]) {
      var file; var query;
      [file, query] = path[1].split('?', 2);

      if (/profile\.php/.test(file)) {
        var id = /id=(\d+)/.exec(query);
        id = (id && id[1] || 'self')
        if (!q_bl.test(query)) {
          //console.log('id match %d (q: %s)', id, query);
          return id;
        }
      } else if (username_regex.test(file)) {
        if (!(q_bl.test(query) || f_bl.test(file))) {
          //console.log('path match %s (q: %s)', file, query, dom)
          return file;
        }
      } 
    }
  }
  return false;
}

var namebook = (function () {
    var book = {};
    return function (name) {
      if (book[name]) {
        return book[name];
      } else {
        book[name] = book.__count__ + 1; // firefox only
        return book[name];
      }
    }
  }());

function scrub() {
  var links = document.getElementsByTagName('a');
  Array.forEach(links, function (a) {
      var unique = is_profile_link(a);
      if (unique !== false) {
        if (!a.getAttribute('mangled_by_scrubber')) {
          a.setAttribute('mangled_by_scrubber', 1);
          var renamed = namebook(unique);
          // console.log('id %s (%s) renamed to Human %d', unique, a.textContent, renamed);
          a.textContent = 'Human ' + renamed;
        }
      }
    });
}

GM_registerMenuCommand('Scrub Names', scrub, 's', 'shift alt');
