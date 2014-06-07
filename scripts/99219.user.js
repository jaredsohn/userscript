// ==UserScript==
// @name           Stack Overflow Box Mod
// @namespace      SOUNTAGS
// @description    Reverts the styling changes to voting system
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
         $('.unanswered').css('background-color', '#9A4444').css('color', '#FFF');
         $('.unanswered strong').css('color','#FFF !important;');
         $('.answered').css('background-color','#75845C').css('color','#FFF'); 
         $('.answered strong').css('color','#FFF !important;');  
    } catch(all) {}
   });
});