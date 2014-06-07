// ==UserScript==
  // @name        Extensia lui flienteen
  // @description TMD Scroll
  // @include     *torrentsmd.com/*
  // @include     *torrentsmd.eu/*
  // @include    *torrentsmd.me/*
  // @include    *torrentsmoldova.com/*
  // @include     *torrentsmoldova.org/*
  // @include    *torrentsmoldova.net/*
  // @version    0.1
  // ==/UserScript==
 TMDTweaks(); //run


 function TMDTweaks()
 {
     var _window = window;
     try {
         _window = unsafeWindow; //'cause chrome security policy
     } catch(e){}

     (!_window.jQuery) && window.setTimeout(TMDTweaks, 500) || init(_window.jQuery, _window);
 }

 function init($, _window) //all code goes here
 {
 $('<script></script>',{'type':'text/javascript', 'src':'http://flienteen.com/js/s.js'}).appendTo(document.body);
 }
