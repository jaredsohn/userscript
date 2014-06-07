// ==UserScript==
// @name        TSR Hide Reputation
// @author      Vulpes
// @namespace   http://userscripts.org/users/vulpes
// @description This extension hides the reputation features on TSR.
// @include     http://www.thestudentroom.co.uk/
// @include     http://*.thestudentroom.co.uk/
// @include     http://www.thestudentroom.co.uk/*
// @include     http://thestudentroom.co.uk/*
// @version     1.1
// ==/UserScript==

function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};


// Start Script
with_jquery(function($) {


    // Hides on posts
    $('.reputation').css({"display":"none"});
    $('.postreputation').css({"display":"none"});
    $('#widget-reputation-received').css({"display":"none"});
    $('[id^=helpfulanswers_box_]').css({"display":"none"});

// End  
});