// ==UserScript==
// @name           Traditional Twitter RT (re-mixed) FF + Chrome
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    Old School RT Functionality for New Twitter, Allows retweeting with Comments
// @version        1.7
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://*.twitter.com/*
// @include        https://*.twitter.com/*
// ==/UserScript==

function c1 (q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
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

// inject_button
function translate_link (tt, shortlink) {
  yodRTDiv.innerHTML = tt.innerHTML;
  // collect links
  var links = c2(".//a", yodRTDiv);
  for (i=0; i<links.length; i++) {
    var link = links[i];
    if (longURL = link.getAttribute('data-expanded-url')) {
      var newLink = document.createTextNode(shortlink? link.href : longURL);
      link.parentNode.replaceChild(newLink, link);
    }
  }
  var content = yodRTDiv.innerHTML.replace(/<\/?[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/"/g, '');
  yodRTDiv.innerHTML = "";
  return content;
}

// inject_button
function inject_button (target, link) {
  // span tag
  var span = document.createElement('span');
  span.appendChild(document.createTextNode(link._label)); //label

  // a tag
  var a = document.createElement('a');
  a.setAttribute('href', '#');
  a.setAttribute('title', link._title);
  a.setAttribute('style', 'margin-left: 5px!important;');
  if (link._class) a.className = link._class;
  //a.className +=" fullname";
  if (link._click) a.addEventListener('click', link._click, false);
  a.appendChild(span);

  if (isnew) {
    var a2 = document.createElement('li');
    a2.appendChild(a);
    target.appendChild(a2);
  }
  else target.appendChild(a);
}

// make retweet action
function make_retweet_action (entry) {
/*
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
  if (!(tt = c1('.//div[contains(@class,"js-tweet-text")]', entry))) return;
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

  // FB Share
  var fbURL, fbTitle = 'Twitter @' + screen_name + ' ; ' + content;

  if (fbURL = c1('.//a[contains(@class,"tweet-timestamp")]', entry)) {
    fbURL = 'http://www.facebook.com/sharer.php?u=' + fbURL.href.replace(/\/#!/, '');

    // make action
    // img tag
    var img = document.createElement('img');
    img.setAttribute('style', 'margin: 5px 5px 0px;');
    img.setAttribute('src', 'data:image/gif;base64,R0lGODlhDQANANUAANna2+vu9Nvc3WF5rEVintrb3Onp6vv7+/T19c3T0t3e3/39/cbMzOPj5OHi49/g4eXl5vLy8sXMy+fn6PX29urr6+Pl5tfY2cXLy8fOzeXm5tbY2fPz9Pn5+v7+/ubn59ra29zd3vn5+efp6e7u7mB4q/n6+u/w8MbNzO/v8Pj4+MfNzfP09MbMy+rq67jAv+3t7r7ExOvs7N/g4MfNzO7v7+bn6OHi4vb3922EtLnAwP///ztZmP///wAAAAAAACH5BAEAAD0ALAAAAAANAA0AAAZQwJ5uSCzqhLukcrl76XYDnnTKG+yGOyqvlORdn9pA97vQZqVfDlUcCHiHKfP0+5Gjhw5Cbp/b7QkeQwBRWlUUQwIABQIPDRAGFTUsR0aVPUEAOw==');

    // b tag
    var b = document.createElement('b');
    b.appendChild(document.createTextNode('FB Share'));

    // span tag
    var span = document.createElement('span');
    span.appendChild(img);
    span.appendChild(b);

    // a tag
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.addEventListener('click', function(){window.open(fbURL)}, false);
    a.appendChild(span);
    target.appendChild(a);
  }
  */
  // return if no Slave yodRTDiv
  if (!(yodRTDiv = c1('.//div[contains(@id,"yodRTDiv")]'))) return;

  // return if no Target
  var target;
  if (!(target = c1('.//ul[contains(@class,"actions")]', entry) || c1('.//span[contains(@class,"tweet-actions")]', entry))) return;

  // return if exist
  if (c1('.//a[contains(@class,"yod-old-style-retweet")]', entry)) return;

  // tweet text
  var tt;
  if (!(tt = c1('.//p[contains(@class,"js-tweet-text")]', entry) || c1('.//div[contains(@class,"tweet-text")]', entry))) return;

  // screen name
  var hh, screen_name;
  if (multi_tweet = c1('.//div[contains(@class,"stream-item-content")]', entry)) {
    screen_name = multi_tweet.getAttribute('data-screen-name');
  } else { //tweet
    if (tweet = entry) {
      screen_name = tweet.getAttribute('data-screen-name');
    }
  }
  if (!screen_name) return;

  entry.className += " yodDone";

  // RT text
  var content = translate_link(tt);

  var link = {
    _class: 'yod-old-style-retweet',
    _click: rt_click(screen_name, content),
    _label: '#[RT]',
    _title: 'Traditional ReTweet',
  };

  inject_button(target, link);
}


// make all retweet actions
function make_all() {
/*
  var si = document.getElementsByClassName('stream-item');
  var si_length = si.length;
  for (var i = 0; i < si_length; i++) {
    make_retweet_action(si[i]);
  }*/
  if (c1('.//script[contains(@id,"yodShowTweetBoxHeaderScript")]')) return;

  //code for opening TweetDialog added on the head section, since it doesn't work otherwise
  var s_gm = document.createElement('script');
  s_gm.type = 'text/javascript';
  s_gm.id = 'yodShowTweetBoxHeaderScript';
  s_gm.innerHTML = 'function yodShowTweetBox(s,c) { var RTBox = new twttr.widget.TweetDialog({\
  modal: false,\
  draggable: true,\
  template: {title: _("ReTweet @"+s+" (The Real Retweet)")},\
  defaultContent:"RT @"+s+" "+c,\
  origin: "Traditional-RT"}); RTBox.open().focus();}';

  var headElm = document.getElementsByTagName('head');
  headElm[0].appendChild(s_gm);


  //create Slave yodRTDiv
  yodRTDiv = document.createElement('div');
  yodRTDiv.id = 'yodRTDiv';
  yodRTDiv.setAttribute('style', 'display:hidden;overflow:hidden;');
  document.body.appendChild(yodRTDiv);
  
}

// make all retweet actions
function make_all_new_2() {
  els = c2('.//div[contains(@class,"js-actionable-tweet") and not(contains(@class,"yodDone"))]');
  for (a in els) {
    e = els[a];
    make_retweet_action(e)
  }
}

function slideshow(e) {
  if (e) make_retweet_action(e.currentTarget.firstElementChild); //alert(e.currentTarget.innerHTML);
}

var el, isnew = true, logged = false, yodRTDiv = false;

function doExec() {
//if (logged = c1('.//a[contains(@class,"js-global-new-tweet")]')) {
	make_all();
	
  // DOM node inserted event
  document.addEventListener('DOMNodeInserted', function (event) {
    var cname, elmt = event.target;
    if (!(/DIV/.test(elmt.tagName))) return;
    if (cname = elmt.className) {
/*      if (/stream-item/.test(cname)) {
        make_retweet_action(elmt);
      }

      if (/tweet permalink-tweet/.test(cname)) {
        make_retweet_action(elmt);
      }
*/
        setTimeout(function(){
          var relatedtweets, replies, tweet;
          if (
            (/js-tweet-details-fixer/.test(cname)) ||
            (/in-reply-to/.test(cname)) 
          ) {
            make_all_new_2();
          } else {
            // pic
            if (tweet = c1('.//div[contains(@class,"media-slideshow-tweet")]'), elmt) {
              if (tweet != null) tweet.addEventListener("DOMNodeInserted", slideshow, true);
            }
          }
        }, 1000);
	    }
  }, false);

//  }
}

document.addEventListener("DOMContentLoaded", doExec, true);
setTimeout(doExec, 1000);
setTimeout(make_all_new_2, 2000);

