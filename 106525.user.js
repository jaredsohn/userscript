// ==UserScript==
// @name          4chon AJAX thread
// @author        Pseudonymous
// @Notes         Loads threads on 4chon through Ajax. Based on the 4chan AJAX thread script.
// @include       http://4chon.net/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var useAutoUpdate = true;   // false if you don't want timed updates
var useButton = true;       // false if you don't want a little "@" link to force an update
var timeDelay = 30000;      // timed update interval in milliseconds
var tempThread;
var insertBeforeMarker;
var lastCurrentPost;
var newPostToAdd;
var timerAjax;


jQuery(document).ready(function() {
  jQuery("body").append("<div id='tempThread'></div>");
  tempThread = jQuery("#tempThread").css({"display":"none"});
  insertBeforeMarker = jQuery("body > [name='delform'] > br[clear='left']");
  if(useAutoUpdate){timerAjax = setInterval(loadThread,timeDelay)}
  if(useButton){
    jQuery("body").append("<a id='ajaxianRefreshButton' href='#ajaxianRefreshButton'>@</a>");
    button = jQuery("#ajaxianRefreshButton");
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
      jQuery("body > [name='delform'] > br[clear='left']").before("<h2 style='clear:both;color:#F00'>404</h2>");
      jQuery("body > table[width='100%'] th").html("<h2 style='color:#F00'>404</h2>");
      
      break;

    case 304:
      break;

    default:
      lastCurrentPost = jQuery("body > [name='delform'] > a:last-of-type");
      newPostToAdd    = jQuery("#tempThread > [name='delform'] > a[name='"+lastCurrentPost.attr("name")+"']").next().next();
      if(lastCurrentPost.get(0) == jQuery("body > [name='delform'] > a").get(1)){
        newPostToAdd = jQuery("#tempThread > [name='delform'] > a:nth-of-type(3)");
      }
      while(newPostToAdd.get(0) != null && newPostToAdd.get(0).tagName == "A"){
        insertBeforeMarker.before(newPostToAdd.next()
          .css({"border-left":"1px solid #F00"})
          .mouseover(function(){
            jQuery(this).css({"border-left":"0"})
          })
        );
        insertBeforeMarker.before(newPostToAdd);
        lastCurrentPost = jQuery("body > [name='delform'] > a:last-of-type");
        newPostToAdd    = jQuery("#tempThread > [name='delform'] > a[name='"+lastCurrentPost.attr("name")+"']").next().next();
      }
      break;
    }
  });
}