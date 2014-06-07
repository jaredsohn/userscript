// Minify URLs For Twitter
// version 1.0.1
// 2009-05-26
// Copyright (c) 2009, Nate Agrin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a beta script that tries to solve a problem I'd been having while
// using Twitter's web interface. I would notice that Twitter was smart enough to
// shorten urls when I was under the 140 char limit (using tinyurl.com), but if I
// was over because of a url it wouldn't let me submit. This forced me to either
// tweet much smaller messages than I really was allowed or go to tinyurl or
// is.gd to shorten the url then paste it into the tweet by hand (which I'm too
// lazy to do).
// 
// Now as you type, if you press space any recognized urls are shortened
// automatically. Urls are also shortened before you submit to Twitter and if you
// paste in some text which puts the total tweet length over 140 char.
// 
// Disclaimer:
// This is a beta script; I wrote it in a couple of hours and so you
// should use it at your own risk. I did use 'unsafeWindow' and 'windowJSObject'
// twice which may pose security risks. I ASSUME NO LIABILITY IF BAD THINGS
// HAPPEN TO YOU OR YOUR COMPUTER WHILE USING THIS SCRIPT. But I doubt that will
// happen.
// 
// Todo:
// 1) It would be nice if the script recognized "foo.com" as a url and
// shortened it so you have to type less.
// 
// 2) It would be nice if when you put the cursor on a shortened url, it
// displayed the original url so that you could make any corrections or edits to
// the original url. The idea being that if you accidentally hit space or wanted
// to double check your urls you could before submitting.
// 
// 3) It would be nice to abstract the shortening code a bit more and allow for
// others to write plugins for tinyurl and other shortening services.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Minify URLs for Twitter
// @namespace      http://n8agrin.com/
// @description    Minify recognizes any URLs in what you are typing and automatically shortens them using the "is.gd" service.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

window.addEventListener('load', function() {
  if (!GM_xmlhttpRequest) {
    throw 'Your version of GreaseMonkey does not include the \
          GM_xmlhttpRequest method which is required for this grease script. \
          Please to upgradez.';
    return;
  }
  
  var status = document.getElementById('status');
  var http_re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  var find_and_replace = function(status, callback) {
    var values = status.value.split(' ');
    var last_value = values.pop();
    if (http_re.test(last_value)) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://is.gd/create.php?longurl=' + encodeURIComponent(last_value),
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(response) {
          var response_html = response.responseText;
          var short_url = response_html.match(/id="short_url"\svalue="([^\s]+)"/);
          if (short_url.constructor === Array && short_url.length === 2) {
            if (values.length === 0) {
              status.value = short_url[1] + ' ';
            }
            else {
              status.value = (values.join(' ') + ' ' + short_url[1] + ' ');
            }
            
            // ACCESSING THE UNSAFEWINDOW!!!
            unsafeWindow.$(status).change();
          }
          if (typeof callback === 'function'){
            callback();
          }
        }
      });
    }
    else {
      if (typeof callback === 'function'){
        callback();
      }
    }
  };
  
  // replace urls when the user hits 'space'
  status.addEventListener('keydown', function(event) {
    if (event.keyCode === 32) {
      find_and_replace(this);
    }
  }, false);
  
  // replace urls when the length is greater than 140 and the user probably
  // pasted in a long url
  status.addEventListener('keyup', function(event) {
    if (this.value.length > 140) {
      find_and_replace(this);
    }
  }, false);
  
  // ACCESSING THE RAW SUBMIT BUTTON!!!!
  var submit_button = document.getElementById('update-submit').wrappedJSObject;
  var old_submit_event = submit_button.onclick;
  submit_button.onclick = null;
  
  // replace the last url added if they are submitting
  document.getElementById('update-submit').addEventListener('click', function() {
    find_and_replace(status, old_submit_event);
  }, false);
  
}, false);