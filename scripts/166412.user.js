// ==UserScript==
// @name moodle_pdf_button
// @description Adds a button to moodle pdf page so you can see pdf fullscreen
// @include https://moodle.goshen.edu/mod/resource/*
// @version 1
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
  // Note, jQ replaces $ to avoid conflicts.
          var pdf_location = jQ('#resourceobject').attr('data');
        jQ('#resourceintro div').append('<button style="float:right" id="pdf-replacer">View full-size PDF</button>');
        jQ('#pdf-replacer').click(function()
            {
                window.location = pdf_location;
            });
}

// load jQuery and execute the main function
addJQuery(main);