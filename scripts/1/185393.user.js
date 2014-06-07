// ==UserScript==
// @name           Get Entry Index
// @namespace      http://yoksel.ru/
// @description    Pick anchors and create index of the entry
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$.noConflict(); 
jQuery(document).ready(function($) {
    
    $(".post__text").prepend("<div class='catch-code'><ul class='list--post-index'>\n</ul></div><div class='list--yml'></div>");
    
    $(".post__text *[data-name]").each(
      function (){
          console.log("------------------");
        var text = $(this).attr("data-name");
        var elem_id = $(this).attr("id");
          
        if ( text != "" && text !== undefined ) {
            text = text.replace(/'/g,"\"");
            
            console.log(text);
          console.log(elem_id);
            
          var link = "<li><a href=\"#" + elem_id + "\">" + text + "</a></li>\n";  
          var link_yml = "- url: '#" + elem_id + "'\n  name: '" + text + "'\n";  
          
          $(".list--post-index").append(link);
          $(".list--yml").append(link_yml);
      	}
      });
        
  var list = $(".catch-code").html();
  $(".catch-code").prepend("<textarea>" + list  + "</textarea>");
  $(".list--yml").prepend("<textarea>" + $(".list--yml").text()  + "</textarea>");

});
