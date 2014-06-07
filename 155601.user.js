// ==UserScript==
// @name           AntiThumbs
// @description    Replaces fastpic and imagebam screenshot previews with full size images on PornoLab
// @author         shock_one
// @license        MIT
// @version        0.5
// @updateURL      http://userscripts.org/scripts/source/155601.user.js
// @include        http://pornolab.net/*
// @icon           http://static.pornolab.net/favicon.ico
// ==/UserScript==

//load jQuery (if you know the way to getJSON with callback and without jQuery, please, contact me).
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
}, false);
  document.body.appendChild(script);
}

function changeScreenshots() {
    function formYQLRequest (url) {
        return "http://query.yahooapis.com/v1/public/yql?q=select%20src%20from%20html%20where%20url%3D%22"+
               encodeURIComponent(url) + "%22%20AND%20xpath%3D%22%2F%2Fimg%5B%40onclick%3D'scale(this)%3B'%5D%22&format=xml'&callback=?"
    }

    var vars = document.getElementsByTagName('var');
    var fastpicRE = /^(http:\/\/.*\.fastpic\.ru\/)thumb(.*)(jpe?g)$/;
    var imagebamRE = /imagebam\.com/;
    var matches;
    
    for (var i = 0; i < vars.length; i++) {
        if (vars[i].className === 'postImg') {
            //Fastpic screenshots
            if (matches = vars[i].title.match(fastpicRE)) {
                vars[i].title = matches[1] + 'big' + matches[2] + 'jpg';
            }
            //ImageBam screenshots
            else if (vars[i].title.match(imagebamRE)) {
                $.getJSON(formYQLRequest(vars[i].parentNode.href),
                          (function() {
                              var image = vars[i];
                              return function(data){ image.title = data.results[0].match(/src="([^"]+)/)[1]; }
                          })()
                         );
            }
        }
    }

    //Add max-width to pictures.
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    sheet.insertRule('img.postImg { max-width:' + (window.innerWidth - 250) + 'px !important; height: auto !important; }', sheet.cssRules.length);
}
addJQuery(changeScreenshots);