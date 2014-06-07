// ==UserScript==
// @name       Center Youtube player December 2012
// @namespace  http://use.i.E.your.homepage/
// @version    1.1
// @description  The new Youtube layout have the website left aligned, this script will align the website to the center again on all pages.
// @include      http://www.youtube.*/watch*
// @include      http://www.youtube.*/?*
// @include      http://www.youtube.*/
// @include      https://www.youtube.*/watch*
// @include      https://www.youtube.*/?*
// @include      https://www.youtube.*/
// @copyright  2012+, Chawan
// ==/UserScript==

//Adds JQuery functionality
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

// Main function for this script, 
function main() {
    if(location.pathname == "/")
    {
        var bodyElement = document.body;
         bodyElement.setAttribute("class", "  ltr  webkit webkit-537      site-center-aligned    exp-new-site-width exp-watch7-comment-ui    hitchhiker-enabled guide-enabled    guide-expanded");
    }
    else if(location.pathname == "/watch")
    {
         // Declare variables for elements that needs to be edited
         var bodyElement = document.body;
         var guideElement = document.getElementById('guide');   
 
         bodyElement.setAttribute("class", "  ltr  webkit webkit-537      site-center-aligned    exp-new-site-width exp-watch7-comment-ui hitchhiker-enabledguide-enabled sidebar-expanded       guide-collapsed ");
         jQ('#guide').css('position', 'absolute');
    }
    
}

// load jQuery and execute the main function
addJQuery(main);