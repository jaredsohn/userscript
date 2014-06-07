// ==UserScript==
// @name            Feedly - Disable UTM Parameters
// @namespace       http://userscripts.org/users/509305
// @version         1.2
// @description     Strip UTM Parameters when clicking on Feedly links
// @include         http://feedly.com/*
// @include         https://feedly.com/*
// @include         http://*.feedly.com/*
// @include         https://*.feedly.com/*
// @run-at          document-start
// ==/UserScript==
// Load jQuery and Call Main

function jQueryLoader(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
    script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "window.FeedlyJQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
    document.body.appendChild(script);
}

// Load jQuery and execute the main function
jQueryLoader(main);

// Main Function

function main() {

    /* Link Click Event Handler */
    FeedlyJQ(document).on("click", "a", function (event) {

            // Don't Break Feedly Login
            if (window.location.href.indexOf("feedly.com") !== -1) {
                return true;
            }

            // Don't Browse to URL
            event.preventDefault();

            // Get Link HREF
            var href = FeedlyJQ(this).attr('href');

            // Get Base URL and Query String from Link HREF
            var url = href.split("?")[0];
            var query = href.split("?")[1];

            // Get All Query Parameters
            var parameters = query.split("&");

            // Remove Bad Parameters
            var goodparameters = new Array();
            for (var i = 0; i < parameters.length; i++) {
                // Parameter is Good if not UTM
                if (parameters[i].indexOf("utm_") === -1) {
                    goodparameters.push(parameters[i]);
                }
            }

            // Rebuild Query String
            query = goodparameters.join("&");
            if (query) {
                query = "?" + query;
            }

            // Browse Fixed URL
            if (FeedlyJQ(this).attr('target') != '_blank') {
                // Open in Current Tab or Window
                window.location.href = url + query;
            } else {
                // Open in New Tab or Window
                window.open(url + query);
            }

            // Prevent Original URL Browse
            return false;
        });
}