// ==UserScript==
// @name           Hide and Preserve Google Reader Likes
// @namespace      www.manu-j.com/blog/
// @description    Hide the no of  likes shown below the article title in reader and show it besider the like button
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==
//

var entries;
var timeoutID;
var interval;

function init() {
  entries = document.getElementsByClassName("entry")
  if(entries.length == 0) { 
    window.setTimeout(init,100);
  } else {
    if(typeof interval != "number" ) {
     interval = window.setInterval(init,1000)
    }
    start_hide_preserve() 
  }
}




function start_hide_preserve() {
 entries = document.getElementsByClassName("entry")
    for(i=0;i<entries.length;i++) {
      var entry = entries[i];
        if(entry.getElementsByClassName('number-of-likers').length != 0) {
        entry.getElementsByClassName('like-inactive')[0].innerHTML = entry.getElementsByClassName('number-of-likers')[0].innerHTML
        }
      }  
}

GM_addStyle(".entry-likers {display: none !important}")
init()
