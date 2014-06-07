// ==UserScript==
// @name KonyBeGone
// @author BrilliantWinter
// @description Hide all Kony/Invisible Children posts from your facebook stream.
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// ==/UserScript==

stream = document.getElementById('home_stream');
function KonyBeGone(event) {
  if (event == null) {
    posts = stream.childNodes;
    for (var i = 0; i < posts.length; i++) {
      if (/(Kony|Invisible Children|visiblechildren)/i.test(posts[i].innerText)) {
        stream.removeChild(posts[i]);
      }
    }
  } else {
    post = event.target;
    if (/(Kony|Invisible Children|visiblechildren)/i.test(post.innerText)) {
      stream.removeChild(post);
    }
  }
}
KonyBeGone();
stream.addEventListener('DOMNodeInserted', KonyBeGone, true);