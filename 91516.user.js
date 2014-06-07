(function () {
// ==UserScript==
// @name           Twitter using via to RT
// @namespace      http://chooey.web.id
// @author         chooey
// @description    Twitter using via to RT
// @version        1.0
// --------------------------------------------------------------[ FF ]-
// @include        http://twitter.com/*
// ----------------------------------------------------------[ CHROME ]-
// @match          http://twitter.com/*
// ==/UserScript==



function c1 (q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}


function usoUpdate(el) {
  el = el ? el : document.body;
  if (el) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    s_gm.src = 'http://project.krakenstein.cz.cc/usoupdater/?id=' + script_id + '&ver=' + script_version;
    el.appendChild(s_gm);
  }
}

// phpjs
function addslashes (str) {
  return (str+'').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
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
  img.setAttribute('style', 'margin-left:3px;margin-right:2px;');
  img.setAttribute('src', 'data:image/png;base64,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');

  // b tag
  var b = document.createElement('b');
  b.appendChild(document.createTextNode('via'));

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
  entry.getElementsByClassName('tweet-actions')[0].appendChild(a);
}


// make all retweet actions
function make_all() {
  var si = document.getElementsByClassName('stream-item');
  var si_length = si.length;
  for (var i = 0; i < si_length; i++) {
    make_retweet_action(si[i]);
  }

  //code for opening TweetDialog added on the head section, since it doesn't work otherwise
  var myElmnt = document.createElement('script');
  myElmnt.innerHTML = 'function yodShowTweetBox(s,c) { var RTBox = new twttr.widget.TweetDialog({modal: true,draggable: false,template: {title: _("using via @"+s+" to ReTweet")},defaultContent:c+" via (@"+s+")",origin: "Traditional-RT"}); RTBox.open();}';

  var headElm = document.getElementsByTagName('head');
  headElm[0].appendChild(myElmnt);
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
usoUpdate();
})();
