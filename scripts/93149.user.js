// ==UserScript==
// @name           favstar link to twitter
// @revision       1.1
// @author         blueberrystream a.k.a. KID
// @namespace      http://kid0725.usamimi.info
// @include        http://favstar.fm/*
// @include        http://*.favstar.fm/*
// ==/UserScript==

void(function() {

/* 定数定義 */
var TWEETS = "tweetWithStats";
var TWEET_BY = "tweetBy";
var INTERVAL = 1000;

/* 共通変数 */
var current = 0;


var LINK2TWITTER = function() {
  /* テキスト選択状態のときは処理しない */
  if (getSelection() != "") {
    return;
  }

  /* 変数 */
  var tweets = null;
  var tweetByElement = null

  /* 処理 */
  tweets = document.getElementsByClassName(TWEETS);
  for (; current < tweets.length; current++) {
    /* Twitterへのリンクにする */
    tweetByElement = tweets[current].getElementsByClassName(TWEET_BY)[0];
    tweetByElement.innerHTML = tweetByElement.innerHTML.split("/users/").join("http://twitter.com/");

    // あとしまつ
    tweetByElement = null;
  }
};
setInterval(LINK2TWITTER, INTERVAL);
})();