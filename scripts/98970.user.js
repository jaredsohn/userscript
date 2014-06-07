// ==UserScript==
// @name           HackDiet
// @namespace      ajorpheus
// @description    Changes the URL of the 'Chart' to a 1024*768
// @include        https://www.fourmilab.ch/cgi-bin/HackDiet*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
      $("document").ready(function(){
            // Get the chart href element
            var chartElem = $("td[title*='Generate historical charts'] a");

            // Get the curreent value of the Chart url and append required params

            var currentHref = chartElem.attr('href');
            var newHref =currentHref.split("&q")[0] 
                + "&HDiet_tzoffset=-330&from_d=5&from_m=3&from_y=2010&period=c&size=1024x768&to_d=14&to_m=6&to_y=2011&q%3Dhistreq=%20Update%20";
            
            // Set the new url for the 'Chart'
            chartElem.attr('href',newHref) ;

      });
}

// load jQuery and execute the main function
addJQuery(main);
