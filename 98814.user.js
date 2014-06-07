// ==UserScript==
// @name           nlb.no ++
// @namespace      http://www.nlb.no/ns/userscripts/nlb.no
// @description    Diverse forbedringer for NLB.no
// @author         Jostein Austvik Jacobsen
// @include        http://www.nlb.no/*
// @include        http://nlb.no/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// ==/UserScript==

// http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
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

function main() {
  
  // Gi bilder på forsiden riktig størrelsesforhold
  $("#BoxList li img").css("height","auto").css("position","absolute").css("clip","rect(0px,170px,170px,0px)");
  
}

// load jQuery and execute the main function
addJQuery(main);