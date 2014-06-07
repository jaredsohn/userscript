// ==UserScript==
// @name           4chan menu example
// @version        1
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @run-at         document-end
// ==/UserScript==

(function() {
  var d = document;
  var a = d.createElement('a');
  a.href = 'javascript:;';

  var open = function(post) {
    if (post.isInlined || post.el.classList.contains('op')) {
      // We can't highlight inlined posts or OPs.
      return false;
    }
    a.textContent = "Hightlight " + post.ID;
    return true;
  };

  a.addEventListener('click', function() {
    // Get the post's root ID.
    var rootID = d.getElementById('menu').dataset.rootid;
    // Add the 'highlight' class to the post.
    d.getElementById(rootID).querySelector('.post').classList.toggle('highlight');
  });

  d.dispatchEvent(new CustomEvent('AddMenuEntry', {
    detail: {
      el: a,
      open: open
    }
  }));
})()