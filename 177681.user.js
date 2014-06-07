// ==UserScript==
// @name           Wallbase Ctrl+A
// @description    Click Ctrl+A to select all walls to add to favourite, Ctrl+Z to unselect all
// @include http://wallbase.cc/search*
// @include http://wallbase.cc/toplist*
// @include http://wallbase.cc/random*
// ==/UserScript==
 
 

$(document).keydown(function(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 65 || e.keyCode == 97) { // 'A' or 'a'
      e.preventDefault();
      $(".thumbnail").removeClass("selected");
      Us.selected_thumbs.length = 0;
      $(".thumbnail").each(function(){
        $(this).addClass("selected");
        Us.selected_thumbs.push($(this).attr("id").split("thumb").join(""));
        
      });
    }else if(e.keyCode == 90 || e.keyCode == 122){ // 'Z' or 'z'
        $(".thumbnail").removeClass("selected");
        Us.selected_thumbs.length = 0;    
    }
    
    
  }
}); 