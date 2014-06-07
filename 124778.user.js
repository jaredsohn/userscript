// ==UserScript==
// @name           hn_unread
// @namespace      http://userscripts.org/users/433894
// @description    Marks Hacker News comments read/unread.
// @copyright      2011-2012 Jens Wille <jens.wille@gmail.com>
// @license        AGPL; http://gnu.org/licenses/agpl.html
// @include        http://news.ycombinator.org/item?id=*
// @include        http://news.ycombinator.com/item?id=*
// @include        http://apps.ycombinator.com/item?id=*
// @include        http://hackerne.ws/item?id=*
// @grant          GM_getValue
// @grant          GM_setValue
// @version        0.1.1
// ==/UserScript==

HN_UNREAD = function() {
  var storage_key = 'hn_unread';
  var regex       = /item\?id=(\d+)/;
  var separator   = ',';

  var class_name   = 'comhead';
  var color_read   = 'green';
  var color_unread = 'red';
  var limit        = 10000;
  var count        = 0;

  var storage;

  function mark(string, elements, title) {
    var id;

    var match = regex.exec(string);
    if (match) {
      id = match[1];
    }
    else {
      throw 'ID not found';
    }

    if (elements) {
      var unread = false;

      for (var i = 0, l = elements.length; i < l; i++) {
        if (check(elements[i])) {
          unread = true;
        }
      }

      var element = document.getElementById('score_' + id);
      if (element) {
        highlight(element, unread);
      }
    }

    if (title) {
      title.innerHTML = '(' + count + ') ' + title.innerHTML;
    }

    if (storage.indexOf(id) === -1) {
      storage.push(id);
      count++;

      return true;
    }
    else {
      return false;
    }
  }

  function check(element) {
    if (element.className === class_name) {
      try {
        return highlight(element, mark(element.innerHTML));
      }
      catch (e) {}
    }

    return false;
  }

  function highlight(element, unread) {
    var color = unread ? color_unread : color_read;

    element.style.borderLeft  = '14px solid ' + color;
    element.style.paddingLeft = '4px';

    return unread;
  }

  return {
    load: function() {
      storage = GM_getValue(storage_key, '').split(separator);
    },

    save: function() {
      var excess = storage.length - limit;
      if (excess > 0) {
        storage.splice(0, excess);
      }

      GM_setValue(storage_key, storage.join(separator));
    },

    mark: mark,

    hide: function() {
      var a = document.getElementsByTagName('a');
      var f = false;

      for (var i = 0, l = a.length; i < l; i++) {
        if (/^(up|down)_/.test(a[i].id)) {
          f ? a[i].style.visibility = 'hidden' : f = true;
        }
      }
    }
  };
}();

try {
  HN_UNREAD.load();

  HN_UNREAD.mark(
    window.location.href,
    document.getElementsByTagName('span'),
    document.getElementsByTagName('title')[0]
  );

  HN_UNREAD.save();
  HN_UNREAD.hide();
}
catch(e) {}
