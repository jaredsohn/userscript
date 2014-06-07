// ==UserScript==
//
//Displayable Name of your script 
// @name           ElianScript Toggler 
//
// brief description
// @description    Toggle ElianScript on the ES Subreddit   
//
// @namespace      http://www.reddit.com/r/elianscript/
//
// Your name, userscript userid link (optional)   
// @author         dymk 
//
// If you want to license out
// @license        All Rights Reserved 
//
//Version Number
// @version        1.3.2b
//
// Urls process this user script on
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
//
// Load jQuery from Google servers
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
//
// @history        1.3.2b more specific tab placement
// @history        1.3.1b fixed scheme diff canceling request
// @history        1.3b added some debugging statements
// @history        1.2b only run if on a sane page
// @history        1.1b better setup
// @history        1.0b Beta version (released to web)
// @history        1.0a Alpha version
//
// ==/UserScript==


$(function(){
  var schema = window.location.protocol + "//";
  var ex_style = "\
@font-face { \n\
  font-family: 'Elian Variant'; \n\
  src: local('☺'), \n\
       url('" + schema + "typefront.com/fonts/825590599.woff') format('woff'), \n\
       url('" + schema + "typefront.com/fonts/825590599.ttf') format('truetype'), \n\
       url('" + schema + "typefront.com/fonts/825590599.otf') format('opentype'); \n\
} \n\
 \n\
* { \n\
  font-family: 'Elian Variant' \n\
} \n\
";

  //Only run if there is a menu bar to append to
  if(!$("#header-bottom-left ul.tabmenu")) {
    if(window.console) {
      window.console.log("Not injecting Elian into this page, no menubar found");
    }
    return;
  } else {
    if(window.console) {
      window.console.log("Menubar found, injecting button");
    }    
  }

  var 
    head = document.getElementsByTagName("head")[0],
    h_style = document.createElement("style"),
    css_tnode = document.createTextNode(ex_style);

  h_style.type="text/css";
  h_style.appendChild(css_tnode);

  head.appendChild(h_style);

  var enable_elian = function() {
    if(window.console) {
      window.console.log("Enabling Elian");
    }    
    h_style.disabled = false;
    $("a.toggle_elain").text("Disable ElianScript");
  };

  var disable_elian = function() {
    if(window.console) {
      window.console.log("Disabling Elian");
    }    
    h_style.disabled = true;
    $("a.toggle_elain").text("Enable ElianScript");
  };

  //Append buttons on the subreddit nav bar
  $("<li><a class='toggle_elain' href='javascript:void(0);'></a></li>").appendTo("#header-bottom-left ul.tabmenu");
  $("a.toggle_elain").click(function( ){
    if(h_style.disabled) {
      enable_elian();
    } else {
      disable_elian();
    }
  });

  //Trigger setup (and to initialy disable ES)
  disable_elian();
});