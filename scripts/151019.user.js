// ==UserScript==
// @name       t.co killer
// @namespace  http://userscripts.org/scripts/show/151019
// @version    0.1
// @description  replace t.co link into original link on twitter web page
// @match      https://twitter.com/*
// @copyright  2012, Herolee
// ==/UserScript==
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.microsoft.com/ajax/jquery/jquery-1.8.2.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
// the guts of this userscript
function main(){
    $().ready(function(){
        $('a.twitter-timeline-link').each(function(){
            if($(this).attr('data-expanded-url')){
                $(this).attr('href',$(this).attr('data-expanded-url'));
            }
        });
    });
}
// load jQuery and execute the main function
addJQuery(main);