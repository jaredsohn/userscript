// ==UserScript==
// @name        Unstupify
// @namespace   https://github.com/mugli/unstupify
// @description Removes all stupid posts from Priyo.com on Facebook. Those morons won't stop, that doesn't mean we have to tolerate indefinitely.
// @icon https://raw.githubusercontent.com/mugli/unstupify/master/icons/icon48.png
// @include     *://*.facebook.com/*
// @run-at document-end
// @version     0.0.3
// @grant       none
// ==/UserScript==


//Nobody wants them
var filthyBacteria = ["priyo.com", "প্রিয়.কম"];

var feedMarker = "div._4-u2._5v3q";
var timeLineMarker = "li.fbTimelineUnit";

var sterilize = function(petridish){
  for (var i = 0; i < filthyBacteria.length; i++){
    var bacterium = filthyBacteria[i];
    var marker = 'a[href*="' + bacterium + '"]';
    if (petridish.querySelector(marker)) {
      //Contaminated
      petridish.remove();
    } else {
      if (!!petridish.textContent){
        var textContent = normalize(petridish.textContent);
        if (textContent.indexOf(bacterium) > -1){
          //Contaminated
          petridish.remove();
        }
      }
    }
  }
};

var sterilizeAll = function (petridishes){
  for (var i = 0, num = petridishes.length; i < num; i++){
    sterilize(petridishes[i]);
  }
};

//Normalization objects (For Bangla only)
var regex1 = new RegExp(String.fromCharCode(2479,2492), "g"), char1 = String.fromCharCode(2527);
var regex2 = new RegExp(String.fromCharCode(2465,2492), "g"), char2 = String.fromCharCode(2524);
var regex3 = new RegExp(String.fromCharCode(2466,2492), "g"), char3 = String.fromCharCode(2525);

var normalize = function(s){
  if (!!s){
    return s.replace(regex1, char1).replace(regex2, char2).replace(regex3, char3);
  }
};

var normalizeKeywords = function(){
  for (var i = 0; i < filthyBacteria.length; i++){
    filthyBacteria[i] = normalize(filthyBacteria[i]);
  }
};

var fuckOff = function(){
  var feedDishes = document.querySelectorAll(feedMarker);
  var tlDishes = document.querySelectorAll(timeLineMarker);

  if (feedDishes.length) sterilizeAll(feedDishes);
  if (tlDishes.length) sterilizeAll(tlDishes);
};

var _MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var doctocat = new _MutationObserver(function(mutations) {
  var nodesAdded = false;
  for (var i = 0; i < mutations.length; i++){
    if (mutations[i].addedNodes.length) {
       nodesAdded = true;
       break;
    }
  }
  if (nodesAdded) fuckOff();
});

var runMoron = function(){
  normalizeKeywords();
  fuckOff();
  doctocat.observe(document, { childList: true, subtree: true, characterData:false });
};

runMoron();