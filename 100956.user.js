// ==UserScript==
// @name          4chan AJAX thread
// @author        Awesumness
// @Notes         Enjoy.
// @include       http://boards.4chan.org/*/res/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var useAutoUpdate = true;   // false if you don't want timed updates
var useButton = false;       // false if you don't want a little "@" link to force an update
var timeDelay = 5000;      // timed update interval in milliseconds
var tempThread;
var insertBeforeMarker;
var lastCurrentPost;
var newPostToAdd;
var timerAjax;


$(document).ready(function() {
  $("body").append("<div id='tempThread'></div>");
  tempThread = $("#tempThread").css({"display":"none"});
  insertBeforeMarker = $("body > [name='delform'] > br[clear='left']");
  if(useAutoUpdate){timerAjax = setInterval(loadThread,timeDelay)}
  if(useButton){
    $("body").append("<a id='ajaxianRefreshButton' href='#ajaxianRefreshButton'>@</a>");
    button = $("#ajaxianRefreshButton");
    button
    .css({
      "position":"fixed",
      "right":"5px",
      "bottom":"5px"
    })
    .click(function(){
      loadThread();
      clearInterval(timerAjax);
      if(useAutoUpdate){timerAjax = setInterval(loadThread,timeDelay)}
    });
  }
    

});

function loadThread(){

  tempThread.load(location.href + " form[name='delform']",'',function(responseText, textStatus, XMLHttpRequest) {
    switch (XMLHttpRequest.status) {
    case 404:
      clearInterval(timerAjax)
      $("body > [name='delform'] > br[clear='left']").before("<h2 style='clear:both;color:#F00'>404</h2>");
      $("body > table[width='100%'] th").html("<h2 style='color:#F00'>404</h2>");
      
      break;

    case 304:
      break;

    default:
      lastCurrentPost = $("body > [name='delform'] > a:last-of-type");
      newPostToAdd    = $("#tempThread > [name='delform'] > a[name='"+lastCurrentPost.attr("name")+"']").next().next();
      if(lastCurrentPost.get(0) == $("body > [name='delform'] > a").get(1)){
        newPostToAdd = $("#tempThread > [name='delform'] > a:nth-of-type(3)");
      }
      while(newPostToAdd.get(0) != null && newPostToAdd.get(0).tagName == "A"){
        insertBeforeMarker.before(newPostToAdd.next()
        );
        insertBeforeMarker.before(newPostToAdd);
        lastCurrentPost = $("body > [name='delform'] > a:last-of-type");
        newPostToAdd    = $("#tempThread > [name='delform'] > a[name='"+lastCurrentPost.attr("name")+"']").next().next();
      }
      break;
    }
  });
}