
// ==UserScript==
// // @name          Facebook Ticker Box Opacity Changer
// // @author        Jakub Zakrzewski
// // @namespace     http://interwies.pl
// // @description   Do you find the new facebook ticker activity stories box annoying? Simply play with its opacity, make it less visible, but still have access to it.
// // @include       http://facebook.tld/*
// // @include       http://www.facebook.tld/*
// // @include       http://facebook.com/*
// // @include       http://www.facebook.com/*
// // @version  0.4
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// // ==/UserScript==
// // Notes:
// //   * is a wildcard character
// //   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 
// etc.)
// v0.4 - added "button" to toggle the ticker display
// v0.3 - store opacity value 


var oldOpacity = Number(GM_getValue("opacity", 0.5));
      GM_log("oldOpacity=" + oldOpacity);

      var difference = 0.2;

window.addEventListener("load", function(e) {

    jQuery.noConflict();
    function start(){
    try{
    var div_content = '<div id="jz_resize_stories_box">'
    +  '<span id="jz_resizedown">[-]</span>'
    + '<span id="jz_resizeup">[+]</span>'
    + '<span id="jz_hide">[x]</span>'
    + '</div>';
    //jQuery('#pagelet_rhc_ticker').children().eq(0).before(div_content);
    jQuery('#pagelet_rhc_ticker').after(div_content);

    var stories_div = jQuery('.tickerActivityStories:first');
    stories_div.css('opacity',oldOpacity); 
    stories_div.mouseenter(function(){
//      alert("hahaha-mouseenter");
      stories_div.css('opacity',1);
      //alert("hahaha-mouseenter2");
      });
    /*
    stories_div.live('mouseover', function(){
      stories_div.css('opacity',1);
      });
    */
    stories_div.mouseleave(function(){
      //alert("hahaha-mouseleave");
      stories_div.css("opacity", oldOpacity);
      });

    jQuery('span#jz_hide').live('click', function() {
      var i= jQuery('.tickerActivityStories').filter(':first').fadeToggle('slow');
      var t = jQuery('span#jz_hide').text();
      if(t.indexOf("x")!=-1){
        jQuery('span#jz_hide').text("[o]");
      }
      else {
        jQuery('span#jz_hide').text("[x]");
      }
      });


    jQuery('span#jz_resizedown').live('click', function() {
      var i= jQuery('.tickerActivityStories').filter(':first');
      var h=Number(i.css('opacity')); 
      GM_log("h=" + h);
      oldOpacity=h-difference;
      GM_log("oldOpacity=" + oldOpacity);
      i.css('opacity',oldOpacity);
      GM_setValue("opacity", oldOpacity+'');
      });

    jQuery('span#jz_resizeup').live('click', function() {
      var i= jQuery('.tickerActivityStories').filter(':first');
      var h=Number(i.css('opacity')); 
      GM_log("h=" + h);
      oldOpacity=h+difference;
      GM_log("oldOpacity=" + oldOpacity);
      i.css('opacity',oldOpacity);
      GM_setValue("opacity", oldOpacity+'');
      });
    }
    finally{
      if(jQuery('div#jz_resize_stories_box').length == 0){
        window.setTimeout(start, 1000, true);  
      }
    }
    }

  if(jQuery('div#jz_resize_stories_box').length == 0){
    window.setTimeout(start, 1000, true);  
  }

}, false);


