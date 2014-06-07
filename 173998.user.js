// ==UserScript==
// @name         kizi begabon
// @namespace    talskii example
// @include      *
// @author       kizi begabon tech
// @description  talsky begabon
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


    jQ.getScript("//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js", function(data, textStatus, jqxhr) {
            jQ("iframe").each(function(index,checked_div){
                checked_div = jQ(checked_div);
                if((checked_div.width() == 728 && checked_div.height() == 90) || (checked_div.width() == 160 && checked_div.height() == 600) ||
                    (checked_div.width() == 300 && checked_div.height() == 250) || (checked_div.width() == 468 && checked_div.height() == 60)){

                        var flashvars = false;
                        var params = {};
                        var attributes = {
                            id: "myDynamicContent",
                            name: "myDynamicContent"
                        };

                        swfobject.embedSWF("https://s3.amazonaws.com/mobile_catalog/zion_gabon.swf", checked_div.attr("id"), checked_div.width(), checked_div.height(), "9.0.0","expressInstall.swf", flashvars, params, attributes);
                }
            })
        });

    // Note, jQ replaces $ to avoid conflicts.
    //alert("There are " + jQ('a').length + " links on this page.");
}

// load jQuery and execute the main function
setTimeout(function(){addJQuery(main);},2000);