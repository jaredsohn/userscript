// ==UserScript==
// @name       douban comment
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  create a comment box in douban.
// @match      http://www.douban.com/group/topic/*
// @copyright  2013, liximomo
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js
// ==/UserScript==
$(function() {
     // Handler for .ready() called.
    var dest=$(".comment-form");
   if ( dest.length > 0 ) { 
       dest.insertAfter('.tabs');
      }
   else {
     $('<div class=\"txd comment-form\">\
            <form name=\"comment_form\" method=\"post\" action=\"add_comment#last\" onsubmit=\"this.onsubmit=function(){return false}\"><div style=\"display:none;\"><input type=\"hidden\" name=\"ck\" value=\"xtoJ\"></div>\
            <textarea id=\"last\" name=\"rv_comment\" rows=\"8\" cols=\"54\"></textarea><br>\
            <input type=\"hidden\" name=\"start\" value=\"1600\">\
            <span class=\"bn-flat-hot rr\">\
                <input name=\"submit_btn\" type=\"submit\" value=\"加上去\">\
            </span>\
                <span>\
                <label class=\"pl share-label share-shuo\">\
                <input type=\"checkbox\" name=\"sync_to_mb\">推荐到广播\
                </label>\
                </span>\
        </form></div>').insertAfter('.tabs');
   }
    });