// ==UserScript==
// @name           Amazon URL trimmer
// @namespace      localhost
// @description    Trim away unnecessary part of Amazon's long url. Triggered by Ctrl-M
// @include       http://www.amazon.com/*
// @include       http://www.amazon.co.uk/*
// @include       http://www.amazon.de/*
// @include       http://www.amazon.fr/*
// @include       http://www.amazon.ca/*
// @include       http://www.amazon.co.jp/*
// ==/UserScript==

var isCtrl = false;

function detectkeyup(e){
  if(e.which == 17) isCtrl=false;
}

function detectkeydown(e){
  if(e.which == 17) isCtrl=true;
  if(e.which == 77 && isCtrl == true){  // 77 is "M"
    var re = /^(http:\/\/www.amazon.((com)|(co.uk)|(de)|(fr)|(ca)|(co.jp)))\/?.*$/;
    var re1 = /\/?.*((dp)|(ASIN)|(gp\/product)|(product-reviews))\/((customer-reviews\/)|(product-description\/))?([^\/%\?]+).*$/;
    if (location.href.match(re)){
      var amadomain = RegExp.$2;
      if (location.href.match(re1)){
        newurl = "http://www.amazon." + amadomain + "/dp/" + RegExp.$9;
        if (window.confirm("Go to " + newurl + "\n" + "Click OK to proceed.")){
          location.href = newurl
        }
      }
      else {
        alert("Could not get a valid item URL of Amazon.");
      }
    }
    else {
      alert("Could not get a valid item URL of Amazon.");
    }
    return false;
  }
}

document.addEventListener("keyup", detectkeyup, true);
document.addEventListener("keydown", detectkeydown, true);
