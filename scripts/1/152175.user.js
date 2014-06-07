// ==UserScript==
// @name Jamm The Track
// @version 1.0
// @description Access the page of Jamendo PRO tracks.
// @icon http://pro.jamendo.com/favicon.ico
// @namespace http://jmendeth.com/
//
// @grant none
//
// @match http://pro.jamendo.com/*
// ==/UserScript==
(function inject(func) {
    var source = func.toString();
    var script = document.createElement('script');
    // Put parenthesis after source so that it will be invoked.
    script.innerHTML = "("+ source +")()";
    document.body.appendChild(script);
})(function () {


// What we'll be injecting into the template


var snippet = '\
<div id="jammit_999999999999" class="jamm_the_track" style="float:right;margin-right:3px;">\
  <div class="jambutton jambutton_miniactionicon">\
    <div class="jambutton_miniactionicon_inner">\
\
      <a href="http://jamendo.com/track/999999999999" title="See at Jamendo" rel="nofollow"\
         target="_blank" style="width:25px;left:-110px;" class="button nolabel"><span>\
          <span class="icon download" style="background-position-x:1px"></span>\
      </span></a>\
\
    </div>\
  </div>\
</div>'


// INJECT!!

var templ = Jamendo.classes.trackSearch.trackItemTemplate;
if (templ) {
  var point = templ.lastIndexOf('</td>');
  if (point != -1) {
    templ = templ.substring(0,point)+snippet+templ.substring(point);
    Jamendo.classes.trackSearch.trackItemTemplate = templ;
  } else warn();
} else warn();

function warn() {
  // BOO, no button for YOU
  // This probably means Jamendo scripts have been updated.
  //FIXME: warn the user
}


})
