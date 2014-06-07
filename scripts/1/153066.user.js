// ==UserScript==
// @name          ADN Post Delay
// @description   Delays any posting on ADN for 30 seconds so you can catch typos before they get posted
// @include       https://alpha.app.net/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

    jQuery(function($) {
        
        // Object to keep track of settings and timer
        var PD = {
            "delay" : 30000,
            "timeLeft" : 0
        };

        /* Functions */

        // Cancel the post, reset UI
        PD.cancel = function () {
            clearInterval(PD.timer);

            PD.timeLeft = 0;

            $(".postd-tl").text("");

            $("#postd-adn").html("<i class='icon-time'></i> <span class='postd-status'>Post</span>");
        };

        PD.countdown = function () {
            // If we've reached the end, send the post
            if (PD.timeLeft <= 0) {
                clearInterval(PD.timer);

                PD.$currentBtn.click();

                $("#postd-adn").text("Posting...");

                setTimeout(function () {
                    $("#postd-adn").html("<i class='icon-time'></i> <span class='postd-status'>Post</span>");
                }, 500);

                return;
            }

            // Update remaining time
            $(".postd-tl").text(" (" + PD.timeLeft / 1000 + ")");
            PD.timeLeft = PD.timeLeft - 1000;

        };

        /* UI Cache */
        PD.$currentBtn = $(".btn-primary[data-submit-post-button='']");
        PD.$delayedBtn = $("<button>", {
            "class" : "btn btn-primary",
            "id"    : "postd-adn",
            "html"  : "<i class='icon-time'></i> <span class='postd-status'>Post</span>"
        });
        PD.$textBox = $("textarea[name='post']");

        /* Events */

        // Set the delayed click event to fire the main one
        PD.$delayedBtn.on("click", function (e) {

            if (PD.timeLeft && PD.timeLeft > 0) {
                PD.cancel();
                return;
            }

            PD.$delayedBtn.text("Cancel");

            var timeLeft = $("<span>", {
                "text" : " (" + PD.delay / 1000 + ")",
                "class" : "postd-tl"
            }).appendTo(PD.$delayedBtn);
            


            // Set time left, call the countdown method once, and then start the interval
            PD.timeLeft = PD.delay;
            PD.countdown();
            PD.timer = setInterval(PD.countdown, 1000);
        });

        // On change, cancel the post and reset state
        PD.$textBox.on("keydown change", function () {
            PD.cancel();
        });

        // Add the button to the page
        PD.$delayedBtn.appendTo(PD.$currentBtn.addClass("hide").parent());
    })(jQuery);
}

addJQuery(main);