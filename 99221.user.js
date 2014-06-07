// ==UserScript==
// @name           Stack Overflow Box Mod - Black text on light background
// @namespace      SOUNTAGS
// @description    Reverts the styling changes to voting system and improves usability
// @include        http://stackoverflow.com/*
// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
  $(function() {
    try { 
         $('.unanswered').css('background-color', 'rgba(154, 68, 68, 0.5)').css('color', '#000');
         $('.unanswered strong').css('color','#000 !important;');
         $('.answered').css('background-color','rgba(117, 132, 92, 0.5)').css('color','#000'); 
         $('.answered strong').css('color','#000 !important;');  
    } catch(all) {}
   });
});