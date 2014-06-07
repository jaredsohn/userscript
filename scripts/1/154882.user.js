// ==UserScript==
// @name        prostopleerCleaner
// @namespace   prostopleer
// @description remove all ads from prostopleer
// @include     http://prostopleer.com/*
// @version     1
// ==/UserScript==

function removeAds()
{
   var $ = jQ;
   $('.sidebar-a330').remove()
   $('.playlist').prev().detach(); 
   $('.pagination').next().detach()  

   var q = NanoPlayer.processLoadResult; 
   NanoPlayer.processLoadResult = function(){  q.apply(NanoPlayer, arguments); 
     $('.playlist').prev().detach(); 
     $('.pagination').next().detach()  
   }
}


// a function that loads jQuery and calls a callback function when jQuery has finished loading
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


// load jQuery and execute the main function
addJQuery(removeAds);