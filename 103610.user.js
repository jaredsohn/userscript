// ==UserScript==
// @name	Togetter Self-Gathering Visualizer
// @namespace	http://userscripts.org/users/mstm
// @description	Highlights tweets by the Togetter entry owner and visualize the percentage of her/his tweets.
// @version	0.6
// @include	http://togetter.com/li/*
// @grant	GM_addStyle
// ==/UserScript==

(function(){
  GM_addStyle('body { background-attachment: fixed !important; } div.balloon_body.self, div.balloon_body.info_description { background-color: #ffe0e0 !important; }');

  const selfID = document.evaluate('/descendant::DIV[@class="profile_box"]/descendant::A[@class="status_name"]', document, null, XPathResult.STRING_TYPE, null).stringValue;
  const title = document.title;

  const tweetsExp = document.createExpression('count(descendant::DIV[@class="balloon_body rad5"])', null);
  const selvesExp = document.createExpression('descendant::DIV[@class="balloon_body rad5"][descendant::A[@class="status_name"]="' + selfID + '"]', null);

  var counters = [];

  counters.update = function () {
    var c = this.reduce(function(a, b) {
      return { tweets: a.tweets + b.tweets, selves: a.selves + b.selves };
    });
    document.title = title.concat(' ', '(', c.selves, '/', c.tweets, ')');
    document.body.style.backgroundImage = c.selves > 0 ? '-moz-linear-gradient(top, rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0) ' + c.selves / c.tweets * 100 + '%)' : 'none';
    this.tid = void 0;
  }
  
  counters.append = function (target) {
    if (!target) return;
    var tweets = tweetsExp.evaluate(target, XPathResult.NUMBER_TYPE, null).numberValue;
    var selves = selvesExp.evaluate(target, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    this.push({ tweets: tweets, selves: selves.snapshotLength });
    for (var i = 0; i < selves.snapshotLength; ++i) {
      var e = selves.snapshotItem(i);
      e.className += ' self ';
    }
    if (this.tid) return;
    this.tid = setTimeout(function () {
      counters.update();
    }, 0);
  }

  counters.append(document.evaluate('/descendant::DIV[@class="tweet_box"]/UL', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  counters.append(document.evaluate('id("comment_box")/UL', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
  
  var more = document.evaluate('/descendant::DIV[@class="tweet_box"][DIV[starts-with(@id, "more_tweet_box")]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

  if (more) {
    more.addEventListener('DOMNodeInserted', function (e) {
      setTimeout(function () {
        counters.append(e.target);
      }, 0);
    }, false);
  }
})()

