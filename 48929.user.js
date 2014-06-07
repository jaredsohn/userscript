// By Ramanan Sivaranjan
// 
// ==UserScript==
// @name           Toronto Comment Killer
// @namespace      http://funkaoshi.com
// @description    Tired of cranks crapping on news articles? Me too.
// @include        http://*.thestar.com/*
// @include        http://thestar.com/*
// @include        http://*.healthzone.ca/*
// @include        http://healthzone.ca/*
// @include        http://*.nationalpost.com/*
// @include        http://nationalpost.com/*
// ==/UserScript==

(function() {

var COMMENT_IDS = new Array(
  'usercomment_wrapper',   // the star
  'ts-top_comments',       // the star
  'comment_top',  // the national post
  'comments', 	  // the national post
);

for ( var i = 0; i < COMMENT_IDS.length; ++i )
{
  var comments = document.getElementById(COMMENT_IDS[i]);
  if ( comments )
  {
    comments.parentNode.removeChild(comments);
    return;
  }
}

})()

