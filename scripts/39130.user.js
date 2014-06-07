// ==UserScript==
// @name           pixiv command
// @namespace      http://userscripts.org/users/75942
// @author         tokada http://twitter.com/tokada
// @version        2008.12.23
// @include        http://www.pixiv.net/*
// @description    shortcut key for pixiv. 't' will add image to bookmark.
// ==/UserScript==

// alternated from ReblogCommand http://userscripts.org/scripts/show/23365
// this script requires minibuffer.user.js and ldrize.user.js
(function(){
  if (!window.Minibuffer) return;
  var $X = window.Minibuffer.$X;
  var D  = window.Minibuffer.D;

  function isPixivListURL(url) {
    return url.match("^http://www\\.pixiv\\.net/(?:member_illust|bookmark|ranking)\\.php") ? true : false;
  }

  function isPixivIllustURL(url) {
    return url.match("^http://www\\.pixiv\\.net/member_illust\\.php.*illust_id=(\\d+)$") ? true : false;
  }

  function getIDByPermalink(url) {
    if (isPixivIllustURL(url)) {
      return RegExp.$1;
    } else {
      return false;
    }
  }

  function getURLByID(id) {
    return 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id='+id;
  }

  function bookmark(aURL) {
    var id = getIDByPermalink(aURL);
    var d;
    with (D()) {
      d = Deferred();
      if (!id) {
        wait(0).next(function() { d.call(); });
        return d;
      }
    }
    window.Minibuffer.status('pixiv_command_'+id, 'お気に入りに追加 ...');
    var params = 'mode=add&id=' + id + '&type=illust&restrict=0&ok=%E3%80%80%E3%81%AF%E3%80%80%E3%81%84%E3%80%80';
    d = D();
    d.xhttp.post('http://www.pixiv.net/bookmark_add.php', params).
    next(function(res) {
      var s = res.responseText;
      var r = '';
      if (s.match(/既に(お気に入り|ブックマーク)に追加済みです。/)) {
        r = '既にお気に入りに追加済みです';
      }
      else if (s.match('を(お気に入り|ブックマーク)に追加しました。')) {
        r = 'お気に入りに追加しました';
      }
      else {
        r = '失敗？';
      }
      window.Minibuffer.status('pixiv_command_'+id, r, 500);
      d.call();
    }).
    error(function() {
      d.call();
    });
    return d;
  }

  function spClearPins(url) {
    unsafeWindow.pin.remove(url);
  }

  function getTargetCommand() {
    var target_cmd = '';
    if (isPixivIllustURL(window.location.href)) {
      target_cmd = 'location';
    } else if (window.LDRize) {
      target_cmd = 'pinned-or-current-link';
    } else {
      target_cmd = 'location';
    }
    return target_cmd;
  }

  function getTargetURLs(stdin) {
    var urls = [];
    if(!stdin.length) {
      if(isPixivListURL(window.location.href.toString())) {
        var link = window.Minibuffer.execute('current-link');
        if (link) urls = [link.toString()];
      } else {
        // command line is just 'pixiv-b'
        urls = [window.location.href];
      }
    } else if (stdin.every(function(a) { return typeof a == 'string' })) {
      // command line is 'location | pixiv-b'
      urls = stdin;
    } else if (stdin.every(function(a) { return a && a.nodeName == 'A'; })) {
      // command line is 'pinned-or-current-link | pixiv-b'
      urls = stdin.map(function(node) { return node.href; });
    }
    return urls.filter(isPixivIllustURL);
  }

  window.Minibuffer.addCommand({
    name: 'pixiv-b',
    command: function(stdin) {
      getTargetURLs(stdin).map(bookmark);
      return stdin;
    }
  });

  window.Minibuffer.addShortcutkey({
    key: 't',
    description: 'add to pixiv bookmark',
    command: function() {
      var target_cmd = getTargetCommand();
      var clear_pin = (target_cmd == 'pinned-or-current-link') ? ' | clear_pin' : '';
      var cmd = target_cmd + ' | pixiv-b ' + clear_pin;
      window.Minibuffer.execute(cmd);
    }
  });

})();
