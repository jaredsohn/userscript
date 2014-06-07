// ==UserScript==
// @name           SOFU widescreen
// @namespace      http://userscripts.org/users/152814
// @description    Use SOFU Markdown editor and its preview side-by-side
// @include        http://meta.stackoverflow.com/*
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// ==/UserScript==

// See http://meta.stackoverflow.com/questions/53484/preview-on-the-right-please

// Thanks to Shog9 for this idea for making scripts work in both
// Chrome and Firefox; http://meta.stackoverflow.com/questions/46562
// Thanks to Benjamin Dumke for this reference. :-)

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function ($) {

  $("#sidebar").hide();
  $("#post-editor").width(1360);
  $(".community-option").css("float", "left");
  $("#wmd-container").css("float", "left");
  $("#wmd-preview").css("clear", "none")
    .css("margin-left", "20px")
    .css("float", "left"); 

});