// ==UserScript==
// @name       AtomicLearning Auto-Progress
// @namespace  http://atomiclearning.com/
// @version    0.1
// @description  Automatically plays the next video at the end of each one. Meaning, you can keep it playing.
// @match      http://www.atomiclearning.com/k12/movie/*
// @copyright  2013+, WeThePeople
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
    function getThePlayer (player_id) {
        var player = document[player_id] || window[player_id];
        if (!player) return;
        return player;
	}
    jQuery(window).load(function() {
        var done = false;
        var originalFn = getUpdate;
        getUpdate = function () {
          originalFn.apply(this, arguments); // preserve the arguments
            if (parseInt(movieplayer_remaining_time) == 0 && movieplayer_elapsed_time != 0 && !done) {
              done = true;
	          console.log('Movie is DONE!');
	          eval(document.getElementById("movie_next_button").getAttribute('onclick'));
            }
        };

        var originalFn2 = movieplayerLoadMovie;
        movieplayerLoadMovie = function () {
          originalFn2.apply(this, arguments); // preserve the arguments
            done = false;
            movieplayer_remaining_time = 0;
            movieplayer_elapsed_time = 0;
        };



    });
}

// load jQuery and execute the main function
addJQuery(main);