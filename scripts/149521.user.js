// ==UserScript==
// @name        TSR Fluid Width Layout
// @author      Robert Humphries (Main Script by Vulpes)
// @description Customise the new TSR layout for Fluid width to match the removal of borders on the rest of the site.
// @include     http://www.thestudentroom.co.uk/
// @include     http://*.thestudentroom.co.uk/
// @version     2.1b
// ==/UserScript==

// jquery greasemonkey chrome - http://stackoverflow.com/questions/3032261/any-working-greasemonkey-script-with-jquery-that-works-in-google-chrome
// Add jquery to page without it - https://gist.github.com/437513

//Credits to Chrosson for coming up with the original script and idea. See his original version here: http://userscripts.org/scripts/show/138169

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
  $('.page-section').width('98%');
  $('#carousel-container').width('960px');
  $('#page-section-top').width('98%');
  $('#page-section-top').css({"padding":"8px 0px"});
});