// ==UserScript==
// @name        Pyongyang Downvote
// @namespace   https://github.com/kvonhorn/pyongyangdownvote
// @description Inserts a downvote button in /r/pyongyang
// @downloadURL https://github.com/kvonhorn/PyongyangDownvote/raw/master/Pyongyang_Downvote.user.js
// @include     http://www.reddit.com/r/pyongyang/*
// @include     http://www.reddit.com/r/pyongyang
// @version     20120626
// @run-at      document-end
// ==/UserScript==


var addStyle = function(style) {
  console.log('Adding Pyongyang Downvote button');
  var s = document.createElement('style');
  s.type = 'text/css';
  s.innerHTML = style;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(s);
};

addStyle( '.arrow.down { visibility: visible; display: block; background-image: url("https://github.com/kvonhorn/PyongyangDownvote/raw/master/us_flag.png"); background-position: 0 0; }' );

