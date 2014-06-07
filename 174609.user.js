// ==UserScript==
// @name       SnowReport Plus
// @namespace  gagrol
// @version    0.1
// @description  SnowReport customization scripts
// @match      http://*.snowreport.gr/*
// @copyright  2012+, You
// @run-at         document-end
// ==/UserScript==

( function() {
  'use strict';

  function Actions() {
    this.targetUrl = null;
  }

  Actions.prototype.run = function() {
    njq = jQuery.noConflict();
    njq("#namaless_snowstorm-toggle").text("Toggle Snow ON");
    //alert("Start");
      
    // Remove snow
    snowStorm.toggleSnow();
    snowStorm.toggleSnow();
      
    // Wider message boxes
    njq("#srf_mainblock").css("padding-left", "0px");
    
    //Remove background
    njq("html").css({background : '#edf0f9 no-repeat 0px -100px'});
    //njq("html").css({background : '#edf0f9 url(images/srf/background2.jpg) no-repeat 0px -100px'});
    
    //Remove some toolbars
    njq("#pagetitle").remove();
    njq("#threadpagestats").remove();
    njq(".options_block_container").remove();
    njq("marquee").remove();
      
    
    
    //alert("End");
  };


  var action = new Actions();
  action.run();

} )();