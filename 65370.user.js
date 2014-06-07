// ==UserScript==
// @name           Twitter tweet reader
// @namespace      http://shabetter.appspot.com
// @description    "Read" new tweets in Japanese
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @require        http://shabetter.appspot.com/fire_shabelet_gm.js
// ==/UserScript==

// this script requires "Fire Shabelet" addon
// https://addons.mozilla.org/en-US/firefox/addon/54452

(function(){
  var tweets = fireShabeletGM.xpath ("//span[@class='entry-content']");
  var i;
  var j;
  var text;
  var current = "0";

  var lastRead = GM_getValue ("TTRLastRead");
  if (typeof lastRead == "undefined"){
    lastRead = "1";
  }

  for (i = tweets.length - 1; i >= 0; i--){
    try{
      current = tweets[i].parentNode.parentNode.getAttribute ("id").match ("[0-9]+")[0];
    } catch (e){
      current = "0";
    }

    if (current.length > lastRead.length || current.length == lastRead.length && current > lastRead){
      for (j = tweets[i].firstChild; j != null; j = j.nextSibling){
        if (j.nodeType == 3){
          text = j.nodeValue;
        } else if (j.firstChild != null && j.firstChild.nodeType == 3){
          text = j.firstChild.nodeValue;
        } else{
          continue;
        }

        //fireShabeletGM.shabelet (data, translation, reader, speed)
        //    data:        words to be read
        //    translation: 1 (translate) or 0 (not translate)
        //    reader:      "TakashiJPm", "KeikoJPf" or "default"
        //    speed:       from "-10" (slowest) to "10" or "default"
        fireShabeletGM.shabelet (text, 1);
      }
    }
  }

  if (current.length > lastRead.length || current.length == lastRead.length && current > lastRead){
    GM_setValue ("TTRLastRead", current);
  }
})();
