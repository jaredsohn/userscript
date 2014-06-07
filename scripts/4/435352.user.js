// ==UserScript==
// @name       Better ServiceNow Image Picker
// @namespace  https://joshneri.us/servicenow
// @version    0.1
// @description A better way to find ServiceNow icons
// @match      https://*.service-now.com/image_picker.do*
// @copyright  2014+, Josh Nerius
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==
$(window).load(function(){ 
    $("tr.tool_banner > td")
      .append("<input type='button' value='Show Names'>")
      .click(function() {
          var frame = $("#ibrowse"); 
          frame.contents().find("div > a").each(function() {
              var name = $("img", this).attr("src").split("/").pop(); 
              $(this).append(" " + name); 
          }); 
    }); 
});