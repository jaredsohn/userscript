// ==UserScript==
// @name Google+ Add Home link button
// @namespace http://tyrelsouza.com
// @description Make Google+ work the way that most websites work, click the logo and it brings you home. https://github.com/tyrelsouza/googleplushome
// @include *://plus.google.com/*
// ==/UserScript==




function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    $.noConflict();
    var getGoogleLogo = function() {var imgs=document.getElementsByTagName("img");for(var i=0,l=imgs.length;i<l;++i){var obj=imgs[i]; if(!obj.getAttribute('alt') || !obj.getAttribute('alt').match(/google/i))continue;return(obj)}};
    var logo = getGoogleLogo();
    try{
        (function($) {
            var i = getGoogleLogo().getAttribute("id");
            $("#"+i).wrap('<a href="https://plus.google.com/" />');
        })(jQuery);
    } catch(err){

    }
}

// load jQuery and execute the main function
addJQuery(main);