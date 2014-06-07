// ==UserScript==
// @name           Dynamically set width of KAP forum
// @author         Sebastian Kaliszewski
// @author         Erik Vergobbi Vold
// @version        2012.9.4
// @namespace      
// @updateURL      
// @download       
// @description    Set width according to browser window width.
// @include        http://arch.ced.berkeley.edu/kap/*
// ==/UserScript==
// Set width according to browser window width.

// a function that loads jQuery and calls a callback function 
// when jQuery has finishedloading by Erik Vergobbi Vold
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
// "http://code.jquery.com/jquery-1.8.1.min.js"
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function widthSetter() {
  var setSize = function() {
    jQuery('#wrapper, #Body, #access, #Content').css('background', 'red');
    var m = parseInt(jQuery('#Body').css('marginTop'));
    if(m == 0) {
      return;
    }
    jQuery('#wrapper, #Body, #access, #Content').css('background', 'green');
    var windowWidth = parseInt(jQuery(window).width());
    var totalWidth = windowWidth - 50;
    totalWidth = (totalWidth > 1240) ? 1240 : ((totalWidth < 800) ? 800 : totalWidth);
    var mainWidth = totalWidth - 260;
    jQuery('div#wrapper, div#Body, div#branding, div#branding img, div#colophon, #access').width(totalWidth);
    jQuery('div#Content').width(mainWidth);
  };

  jQuery(document).ready(function() {
    var m = parseInt(jQuery('#Body').css('marginTop'));
    if(m == 0) {
      return;
    }
    setSize();
    jQuery(window).resize(setSize);
  });
}

// load jQuery and execute the main function
addJQuery(widthSetter);