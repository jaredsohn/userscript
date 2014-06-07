// ==UserScript==
// @name           Mabinogi Fantasy World Block Yatta
// @namespace      YattaBlockAd
// @description    block yatta.com.tw mask full screen AD at mabinogi fantasy world.
// @include        http://www.yatta.com.tw/mabinogi/*
// @auther         Mabinogi Fans
// ==/UserScript==

/**
 * Date:
 *   2011/10/20
 *
 * Authors:
 *   If you like this script, you can click more google ad in mabinogi fantasy world.
 *   using with adblock add on to get better and cleaner website.
 *
 * Changelog:
 *
 *  2011/10/20 Ver 1.0
 *  		-- block mask full screen AD.
 *  		-- users can change setting to get a clean background.
 */

window.addEventListener("load", blockAd, false);

function blockAd(){
  //removeElement('_yadhead_');
  removeElement('yatta_mask_bg_alpha');
  removeElement('yatta_mask_bg');
  
  // If you need clean background, change here
  var CLEAN_BG = false;
  
  if(CLEAN_BG==true){
    setTimeout((function(){
      removeElement('_yadhead_');
      removeElement('bgaddiv');
      document.body.style.background = '#FFF url("mbg.jpg") center 0 repeat-y';
    }), 100);
  }  
}

function removeElement(id) {
  var element = document.getElementById(id);
  if(element){
    element.parentNode.removeChild(element);
  }
}