// ==UserScript==
// @name         The Sheriff's Secret Police
// @namespace    SheriffsSecretPolice
// @include      *
// @author       Ashton McAllan
// @description  Please install this script to assist the sheriff's secret police in monitoring all Night Vale citizens.
// ==/UserScript==

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

// the guts of this userscript
function main() {
	jQ('input').keyup(function(){if(jQ(this).val().toLowerCase().replace(/[^a-zA-Z]+/g,"").indexOf("dogpark") >= 0){jQ('body').html('<h1 style="font-size:50px;color:red;text-align:center;margin-right:auto;margin-left:auto;">THOUGHTCRIME</h1>')}});
}

// load jQuery and execute the main function
addJQuery(main);