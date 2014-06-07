// ==UserScript==
// @name       Minecraft Sub Reddit Flair Image
// @namespace  http://olliesilviotti.co.uk/
// @version    0.1
// @description  Replaces user flair images based on their username
// @match      http://reddit.com/r/minecraft
// @match      http://reddit.com/r/minecraft/*
// @match      http://www.reddit.com/r/minecraft
// @match      http://www.reddit.com/r/minecraft/*
// @match      http://reddit.com/r/Minecraft
// @match      http://reddit.com/r/Minecraft/*
// @match      http://www.reddit.com/r/Minecraft
// @match      http://www.reddit.com/r/Minecraft/*
// @copyright  http://olliesilviotti.co.uk
// ==/UserScript==

// Made by http://olliesilviotti.co.uk
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

// the guts of this userscript
function main() {
  //alert("There are " + $('.flair').length + " flairs on this page.");
    $('.tagline').each(function() {
        $(this).find('.flair').attr('class', 'flair');
        var author = $(this).find('.author').html();
        
        $(this).find('.flair').css('background', 'url("http://olliesilviotti.co.uk/mcface.php?n=' + author + '&w=16&h=1")');
    });
}

// load jQuery and execute the main function
addJQuery(main);