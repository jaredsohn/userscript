// ==UserScript==
// @name           Hatena Bookmark Reply
// @namespace      http://www.ohaco.jp
// @include        http://b.hatena.ne.jp/entry/*
// @version        1.0
// ==/UserScript==

(function() {
  var bookmarked_user = document.getElementById('bookmarked_user');
  var allSpan = bookmarked_user.getElementsByTagName('span');

  for (i = 0; i < allSpan.length; i++ ) {
    if (allSpan[i].className == 'comment') {
      if(allSpan[i].innerHTML.match(/id:[0-9a-zA-Z_\-]+/)) {
        var replyId = allSpan[i].innerHTML.match(/id:[0-9a-zA-Z_\-]+/)[0].substr(3);
        var callId = allSpan[i].parentNode.getElementsByTagName('a')[1].innerHTML;

        if(document.getElementById('bookmark-user-' + replyId)) {
          var replyLi = document.getElementById('bookmark-user-' + replyId);

          if(!document.getElementById( 'hatena_bookmark_reply_' + replyId)) {
            var replyChild = document.createElement('div');
            replyChild.setAttribute('id', 'hatena_bookmark_reply_' + replyId);
            replyChild.innerHTML = '&nbsp;Reply&nbsp;:&nbsp;';
            replyChild.style.display = 'inline';
            replyLi.appendChild(replyChild);
          }

          var replyAnchor = document.createElement('a');
          replyAnchor.setAttribute('href', location.href.split('#')[0] + '#bookmark-user-' + callId);

          var callIcon = document.createElement('img');
          callIcon.setAttribute('src', allSpan[i].parentNode.getElementsByTagName('img')[0].src);
          callIcon.setAttribute('title', callId);

          replyAnchor.appendChild(callIcon);
          document.getElementById( 'hatena_bookmark_reply_' + replyId).appendChild(replyAnchor);
        }
      }
    }
  }
})();