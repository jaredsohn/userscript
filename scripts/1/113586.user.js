// ==UserScript==
// // @name          change buttons for elearnig.uni-hannover.de
// // @namespace     http://interwies.pl
// // @description   changes the buttons from images to color boxes. Use it together with http://userstyles.org/styles/53707/elearning-uni-hannover-de
// // @include       https://elearning.uni-hannover.de/*
// // @include       https://www.elearning.uni-hannover.de/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// // ==/UserScript==
// // Notes:
//require http://userscripts.org/scripts/source/79691.user.js
// //   * is a wildcard character
// //   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 
// etc.)
window.addEventListener("load", function(e) {
    jQuery.noConflict();
    jQuery('.button').attr('src','').css('background-color', '#91C1FF');
    jQuery('a.tree').live('mouseout', function(){
      jQuery('input.button').each(function(i){
        var src = jQuery(this).attr('src');
        //https://elearning.uni-hannover.de/assets/images/locale/de/LC_BUTTONS/ordneralszip-button.png
        if(src != ""){
        src = src.replace('https://elearning.uni-hannover.de/assets/images/locale/de/LC_BUTTONS/', "");
        src = src.replace('-button.png', "");
        //jQuery(this).attr('src','').css('background-color', '#91C1FF');
        jQuery(this).attr({'src':'', 'value': src}).css('background-color', '#91C1FF');
        }
      });
      jQuery('img.button').each(function(i){
        var src = jQuery(this).attr('src');
        //https://elearning.uni-hannover.de/assets/images/locale/de/LC_BUTTONS/ordneralszip-button.png
        if(src != ""){
        src = src.replace('https://elearning.uni-hannover.de/assets/images/locale/de/LC_BUTTONS/', "");
        src = src.replace('-button.png', "");
        //jQuery(this).attr('src','').css('background-color', '#91C1FF');
        var target = jQuery(this).parent();
        if(target.is("a")){
          target.empty();
          target.text(src);
          target.css("background-color", "#91C1FF");
        }
        }
      });
    });
}, false);
