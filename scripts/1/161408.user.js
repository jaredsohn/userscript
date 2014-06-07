// ==UserScript==
// @name          3owl idiotic message skipper
// @description	  Skips idiotic "Continue to my account" messages on 3owl and removes ads
// @author		  Daniel Skowroński <d.skowronski@ds.lublin.pl>
// @version       3.0
// @include       http://cpanel.3owl.com/*
// @include       https://cpanel.3owl.com/*
//
// @comment       Yes, this is so simple - just hide one, and show another one. 
// @comment       I think that much complicated code on 3owl page is senseless, 
// @comment       maybe they thought that if someone can't see linkt destination  
// @comment       this will be end  of research.

// ==/UserScript==


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

function main() {
  jQ('#landing').attr('style', 'display: none');
  jQ('#container').attr('style', 'display: block');
  jQ('section.content').remove()
  jQ('iframe').remove()
  jQ('.upgrade').remove()
  jQ('ins').remove()
}

addJQuery(main);