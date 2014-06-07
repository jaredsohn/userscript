(function () {
// ==UserScript==
// @name           Simple Twitter RT
// @author         Haranobu
// @description    Just Simple Twitter RT
// @homepage       http://www.bloodeerz.us
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @match          http://twitter.com/*
// @match          https://twitter.com/*

// ==/UserScript==

function c1 (q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

// phpjs
function addslashes (str) {
  return (str+'').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0').replace(/\r/g,"").replace(/\n/g,"");
}

// click
function rt_click (screen_name, content) {
  return function (e) {
    var gmbinder, s_gm = document.createElement('script');
    if (gmbinder = c1('.//script[contains(@id,"gmbinder")]')) {
      document.body.removeChild(gmbinder);
    }
    s_gm.type = 'text/javascript';
    s_gm.id = 'yodgmbinder';
    s_gm.innerHTML = "yodShowTweetBox('" + addslashes(screen_name) + "','" + addslashes(content) + "')";
    document.body.appendChild(s_gm);
  }
}

// make retweet action
function make_retweet_action (entry) {

  // return if no Target
  var target;
  if (!(target = c1('.//span[contains(@class,"tweet-actions")]', entry))) return;

  // return if exist
  if (c1('.//a[contains(@class,"yod-old-style-retweet")]', entry)) return;

  // screen name
  var hh, screen_name;
  if (hh = c1('.//div[contains(@class,"stream-item-content")]', entry)) {
    screen_name = hh.getAttribute('data-screen-name');
  } else return;

  // tweet text
  var tt;
  if (!(tt = c1('.//div[contains(@class,"tweet-text")]', entry))) return;
  // RT text
  var content = tt.innerHTML.replace(/<\/?[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

  // make action
  // img tag
  var img = document.createElement('img');
  img.setAttribute('style', 'margin: 5px 5px 0px;');
  img.setAttribute('src', 'data:image/gif;base64,R0lGODlhDQANAMQdALe3t6urq/z8/GNjY5eXl4ODg7a2tomJicDAwPn5+YaGhpmZmfv7+6enp/39/aOjo+Tk5Lu7u/b29ry8vKmpqaamprCwsJubm6ysrPLy8u/v78HBwf///////wAAAAAAACH5BAEAAB0ALAAAAAANAA0AAAVmYCdqW3VVmyauEZZxcIZF6wTBOAxNnUbBDILFcjFwMBqEg6PgJGCCCyezCUgOhcEL9uM8GhLAYrPhkBcASePBxWUGhYMksHldBLBn04HQYDgGF0MEDFwqNjk4OywubjMrIyUnKSshADs=');

  // b tag
  var b = document.createElement('b');
  b.appendChild(document.createTextNode('RT'));

  // span tag
  var span = document.createElement('span');
  span.appendChild(img);
  span.appendChild(b);

  // a tag
  var a = document.createElement('a');
  a.setAttribute('class', 'yod-old-style-retweet');
  a.setAttribute('href', '#');
  a.addEventListener('click', rt_click(screen_name, content), false);
  a.appendChild(span);
  // add action
  //entry.getElementsByClassName('tweet-actions')[0].appendChild(a);
  target.appendChild(a);
}


// make all retweet actions
function make_all() {
  var si = document.getElementsByClassName('stream-item');
  var si_length = si.length;
  for (var i = 0; i < si_length; i++) {
    make_retweet_action(si[i]);
  }

  //code for opening TweetDialog added on the head section, since it doesn't work otherwise
  var s_gm = document.createElement('script');
  s_gm.type = 'text/javascript';
  s_gm.id = 'yodShowTweetBoxHeaderScript';
  s_gm.innerHTML = 'function yodShowTweetBox(s,c) { var RTBox = new twttr.widget.TweetDialog({modal: false,draggable: true,template: {title: _("ReTweet @"+s+" (The Real Retweet by Haranobu)")},defaultContent:" RT @"+s+": "+c,origin: "Traditional-RT"}); RTBox.open(); var Inputs = document.getElementsByClassName("twitter-anywhere-tweet-box-editor"); var aInput = Inputs[Inputs.length - 1]; aInput.focus(); aInput.setSelectionRange(0,0);}';

  var headElm = document.getElementsByTagName('head');
  headElm[0].appendChild(s_gm);
}

var logged = false;

if (logged = c1('.//a[contains(@id,"new-tweet")]')) {
  // DOM node inserted event
  document.addEventListener('DOMNodeInserted', function (event) {
    var cname, elmt = event.target;
    if (!(/DIV/.test(elmt.tagName))) return;
    if (cname = elmt.className) {
      if (/stream-item/.test(cname)) {
        make_retweet_action(elmt);
      }

      if (/tweet permalink-tweet/.test(cname)) {
        make_retweet_action(elmt);
      }
    }
  }, false);

  // make all retweet actions
  make_all();
}
})();