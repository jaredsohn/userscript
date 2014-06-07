// ==UserScript==
// @name           Slashdot without the idiots
// @namespace      sdwti
// @description    Removes all comments from Slashdot, as the users have gotten waayy too retarded.
// @include        http://*.slashdot.org/story/*
// ==/UserScript==

function sdwti() {
  var comments = document.getElementById('comments')
  comments.parentNode.removeChild(comments)
}
sdwti()