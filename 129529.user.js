// ==UserScript==
// @name           Twitererer
// @namespace      ubergeeky.com
// @include        https://twitter.com/*
// @include        https://twitter.com/
// ==/UserScript==

function twita(){
  try {
    twits = document.getElementsByClassName('js-mini-profile-stats')[0]
      .getElementsByTagName('A')[0];
    twits.innerHTML = twits.innerHTML.replace('Tweets','Twits');
  } catch (e) { }
  try {
    twits = document.getElementsByClassName('twitter-anywhere-tweet-box-editor')[0];
    twits.value = twits.value.replace('Tweet','Twit');
  } catch (e) { }
  try {
    twits = document.getElementsByClassName('list-link')[0];
    twits.innerHTML = twits.innerHTML.replace('Tweets','Twits');
  } catch (e) { }
  try {
    twits = document.getElementsByClassName('js-stream-title')[0];
    twits.innerHTML = twits.innerHTML.replace('Tweets','Twits');
  } catch (e) { }
  try {
    twits = document.getElementsByClassName('js-stream-end-text')[0];
    twits.innerHTML = twits.innerHTML.replace('Tweets','Twits');
  } catch (e) { }
  try {
    twits = document.getElementsByClassName('view-more-tweets');
    for (i=0;i<twits.length;i++)
      twits[i].innerHTML = twits[i].innerHTML.replace('Tweets','Twits');
  } catch (e) { }
  try {
    twits = document.getElementsByClassName('js-new-tweets-bar')[0];
    twits.innerHTML = twits.innerHTML.replace('Tweets', 'Twits');
  } catch (e) { }
  try {
    twits = document.getElementsByClassName('tweet-box-title')[0];
    twits.innerHTML = twits.innerHTML.replace('Tweet', 'Twit');
  } catch (e) { }
}

setInterval(twita, 200);