// ==UserScript==
// @name         cyberbit's Sound Drain
// @version      1.0
// @namespace    cyberbitssounddrain
// @include      http://soundation.com/*
// @author       cyberbit
// @description  Adds downloading to any track.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var includeFunctions = [];
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-1.10.2.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        var sIncludeFunctions = "";
        includeFunctions.forEach(function (f) {
            sIncludeFunctions += f.toString();
        });
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();" + sIncludeFunctions;
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    jQ("object").each(function(index) {
        jQ(this).after("<div id=\"sounddrain-" + index + "\" style=\"padding: 0 8px; background: #e5f3d6; border: 1px solid #709343; border-radius: 2px\">cyberbit's Sound Drain - <a href=\"javascript:;\" onclick=\"window.location = 'http://powerfx.soundation-mixdowns.s3.amazonaws.com/mp3/" + jQ(this)[0].outerHTML.match(/(?:t=)([0-9a-f]+)/)[1] + ".mp3';\">Download this track</a></div>");
        //alert("track " + index + " id: " + jQ(this)[0].outerHTML.match(/(?:t=)([0-9a-f]+)/)[1]);
    });
    jQ("div[id^='sounddrain']").hide();
    $(document).ready(function () {
        jQ("div[id^='sounddrain']").fadeIn(2000);
    });
}

// load jQuery and execute the main function
addJQuery(main);