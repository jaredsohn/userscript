// ==UserScript==
// @name        TSR Fluid Width Layout (No carousel)
// @namespace   http://userscripts.org/users/vulpes
// @author      Vulpes
// @description Customise the new TSR layout for No carousel + Fluid width
// @include     http://www.thestudentroom.co.uk/
// @include     http://*.thestudentroom.co.uk/
// @include     http://www.thestudentroom.co.uk/*
// @include     http://*.thestudentroom.co.uk/*
// @version     2.3
// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
  $('#carousel-container').hide();
  $('.page-section').width('90%');
  $('#carousel-container').width('960px');
  $('.page-section wide-gutter').width('90%');
  $('#page-section-top').width('90%');
  $('#page-section-top').css({"padding":"8px 0px"});

  $('#takeover-panelright').hide();
  $('#takeover-panelleft').hide();
});