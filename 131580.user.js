// ==UserScript==
// @name           Films.Kg Image Hover Zoom
// @namespace      https://userscripts.org/users/423026
// @description    Enlarge Hovered Images script
// @include        http://films.kg/*
// @require   https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

 // Adds jQuery
function addJQuery(callback) {  
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// MAIN FUNCTION
function main() {
jQuery.noConflict();

  var img = jQuery('<img>').attr('id', 'hover-popup').css('position','fixed').css('top',0).css('left',0).css('z-index', 100).css('width', '400px');;
  jQuery('div#show_list').append(img);

  jQuery("img[src^='/dinamic/participant/']").mouseover(function(e) {
      var loc = getSrc(this.src);
      img.attr('src', loc);
      img.css('left', setLeft(e.pageX).toString()+'px');
      img.css('display','block');
    });
  jQuery("img[src^='/dinamic/participant/']").mouseout(function(e) {
      img.css('display','none');
    });
  function zoomImg() {
    jQuery("img[src^='/dinamic/participant/']").mouseover(function(e) {
      var loc = getSrc(this.src);
      img.attr('src', loc);
      img.css('left', setLeft(e.pageX)+"px");
      img.css('display','block');      
    });
    jQuery("img[src^='/dinamic/participant/']").mouseout(function(e) {
      img.css('display','none');
    });
    jQuery("a[href^='/participant/ladies']").click(function(){
    setTimeout(function(){zoomImg();},2000);
    });
    jQuery("a[href^='/participant/ladies']").click(function(){
    setTimeout(function(){zoomImg();},2000);
    });
  }
  jQuery("a[href^='/participant/ladies']").click(function(){
    setTimeout(function(){zoomImg();},2000);
  });
  jQuery("a[href^='/participant/ladies']").click(function(){
    setTimeout(function(){zoomImg();},2000);
  });
  
  function setLeft(x) {  
     if (x > jQuery(document).width()/2) {
      left = 0;
     } else {
      left = jQuery(document).width()-400;      
     }      
     return left;
  }  

  function getSrc(src) {  
     src=src.substring(0,src.length-4)+"_full"+src.substring(src.length-4);  
     return src;
  }

/* End of main() */}

// Runs main()
addJQuery(main);