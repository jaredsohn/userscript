// ==UserScript==
// @name           Twocold Book Spy
// @namespace      s5s5
// @description    Twocold Book Spy
// @include        http://hanhanbook.taobao.com/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// the guts of this userscript
function loadBigPicture() {

var nextPage = 'http://hanhanbook.taobao.com/';
var hbooktxt = jQuery(".custom-area:contains('独唱团')")
        if
// (jQuery('.custom-area button').size() > 0 || jQuery('.qqxf input').size() > 0 || jQuery('.qqxf a').size() > 0){
           alert(hbooktxt)
//      }
        else
            setTimeout(function(){window.location.href = nextPage}, 5000);

}

// load jQuery and execute the main function
addJQuery(loadBigPicture);