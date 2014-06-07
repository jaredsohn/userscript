// ==UserScript==
// @name           flaker_actions
// @namespace      file:///home/d3x/flaker_actions.user.js
// @include        *flaker.pl*
// ==/UserScript==
var flaker_actions = {
  generateStyle: function() {
    var style = document.createElement('style');
    style.innerHTML='.nint .ecmts li.comment_action {font-weight: bold; font-style: italic; background-image:  url(data:image/gif;base64,R0lGODlhDgAOAKEDAKyuAO7uAOrsYv///yH5BAEKAAMALAAAAAAOAA4AAAImnD+Ae6KMRAgPDkmZ2Hj66oVTZYgj1GWouFKfpp6Lg6gIaeAWUgAAOw==)}';
    document.body.insertBefore(style, document.body.firstChild);
  },
  upgradeComments: function() {
    if(!document.getElementById('flaker_actions_lock')) {
      var lock = document.createElement('li');
      lock.id = 'flaker_actions_lock';
      lock.style.display = 'none';
      document.getElementsByClassName('ecmts').item(0).insertBefore(lock, document.getElementsByClassName('ecmts').item(0).firstChild);
      var comments = document.getElementsByClassName('comment');
      var comments_count = comments.length;
      for(var i=0; i < comments_count; i++) {
        if(comments[i].childNodes[1].childNodes[4].textContent.replace(/^\s+/,'').substr(0,4) == "/me ") {
          comments[i].childNodes[1].childNodes[4].textContent = comments[i].childNodes[1].childNodes[4].textContent.replace(/^\s+/,'').substr(3);
          comments[i].childNodes[1].childNodes[2].textContent = "* " + comments[i].childNodes[1].childNodes[2].textContent;
          comments[i].setAttribute('class', comments[i].getAttribute('class') + " comment_action");
        }
      }
    }
  },
  init: function() {
    flaker_actions.generateStyle();
    flaker_actions.upgradeComments();
    setInterval(flaker_actions.upgradeComments, 100);
  }
};
flaker_actions.init();