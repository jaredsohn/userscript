// ==UserScript==
// @name           Stack Overflow Old Unanswered Boxes
// @namespace      SOUNTAGS
// @description    Reverts the styling changes to unanswered questions made on March 17th
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
    try { $('.unanswered').css('background-color', '#9A4444').css('color', '#FFF'); } catch(all) {}
   });
});