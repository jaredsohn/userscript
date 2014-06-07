// ==UserScript==
// @name           Page-Monitor
// @namespace      kairee
// @description    Page Monitor Script
// @include        http://act.vip.qq.com/*
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

var nextPage = 'http://act.vip.qq.com/2010/xf/index.html';
        if (jQuery('.qqxf button').size() > 0 || jQuery('.qqxf input').size() > 0 || jQuery('.qqxf a').size() > 0){
           alert('可以了')
        }
        else
            setTimeout(function(){window.location.href = nextPage}, 5000);

}

// load jQuery and execute the main function
addJQuery(loadBigPicture);