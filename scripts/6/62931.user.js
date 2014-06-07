// ==UserScript==
// @name Twitter Relateful Timeline
// @include http://twitter.com/*
// @include https://twitter.com/*
// @description タイムライン上のツイートに発言者との関係性を表示する
// ==/UserScript==

(function() {
  function checkTimeline(timeline) {
    var tweets =
    document.evaluate('.//li[contains(concat(" ",@class," ")," hentry ")]',
    timeline, null, 7, null);
    for (var i = 0; i < tweets.snapshotLength; ++i)
      checkTweet(tweets.snapshotItem(i));
  };
  function checkTweet(tweet) {
    var s =
    document.evaluate('.//span[contains(concat(" ",@class," ")," meta ")]',
    tweet, null, 9, null).singleNodeValue.lastChild;
    if (s.nodeType === 3 && !/\S/.test(s.nodeValue))
      s.parentNode.removeChild(s);
    if ((" " + tweet.className + " ").indexOf(" mine ") === -1) {
      tweet.className += " loading";
      checkRelation(tweet);
    }
  };
  function checkRelation(tweet) {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", "/friendships/show?target_screen_name=" +
    /\su-(\w+)\s/.exec(" " + tweet.className + " ")[1], true);
    xhr.onreadystatechange = function() {
      if (this.readyState < 4) return;
      var rel = "unknown";
      if (this.status === 200) {
        var following =
        this.responseXML.evaluate('.//source/following', this.responseXML,
        null, 9, null).singleNodeValue.lastChild.nodeValue === "true";
        var followers =
        this.responseXML.evaluate('.//source/followed_by', this.responseXML,
        null, 9, null).singleNodeValue.lastChild.nodeValue === "true";
        rel = following && followers ? "mutural" : following ? "following" :
        followers ? "followers" : "unrelated";
      }
      tweet.className = (" " + tweet.className + " ").
      replace(" loading ", " " + rel + " ");
      xhr = xhr.onreadystatechange = null;
    };
    xhr.send(null);
  };
  function addRelationCSS() {
    function rule(r) {
      var ja = document.documentElement.lang === "ja";
      var rel = {
        "mine": ja ? "あなた" : "you",
        "mutural": ja ? "相互" : "mutural",
        "following": ja ? "フォロー" : "following",
        "followers": ja ? "フォロワー" : "follower",
        "unrelated": ja ? "無関係" : "unrelated",
        "unknown": ja ? "不明" : "unknown",
        "loading": ja ? "読み込み中" : "loading..",
      };
      // .meta = tweet, retweeter, retweet latest 15 info
      // .entry-meta = tweet, retweeter
      // .retweet-meta = retweeter
      return ".hentry." + r + " .entry-meta:not(.retweet-meta):after" +
      '{content:"' + rel[r] + '";margin-left:1ex}';
    };
    document.getElementsByTagName("style")[0].lastChild.nodeValue +=
    rule("mine") + rule("mutural") + rule("following") + rule("followers") +
    rule("unrelated") + rule("unknown") + rule("loading");
  };
  if (document.getElementsByName("session-loggedin")[0].content === "y" &&
  document.getElementById("timeline") && document.body.id !== "profile") {
    addRelationCSS();
    checkTimeline(document.getElementById("timeline"));
    document.body.addEventListener("DOMNodeInserted", function(v) {
      if (v.target.nodeType !== 1) return;
      if ((" " + v.target.className + " ").indexOf(" hentry ") > -1)
        checkTweet(v.target);
      else if (v.target.id === "timeline") checkTimeline(v.target);
    }, false);
  }
})();
