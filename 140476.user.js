    // ==UserScript==
    // @name     hide sophie
    // @include  http://www.rlslog.net/*
    // @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
    // ==/UserScript==

    function addJQuery(callback) {
      var script = document.createElement("script");
      script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
      script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
      }, false);
      document.body.appendChild(script);
    }

    // load jQuery and execute the main function
    addJQuery(main);

    function main() {
    $("div.entry")   .show ()
                     .has ("a:contains('Sophie')")
                     .hide ();
    }

    // load jQuery and execute the main function
    addJQuery(main);            