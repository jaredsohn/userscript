// ==UserScript==
// @name       Clean Salt
// @version    0.1
// @description  removes chat and bet list from saltybet
// @match      http://saltybet.com/*
// @copyright  2013 danbo
// ==/UserScript==

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

function main(){
    $(document).ready(function()
                      {
                        $('#sbettorswrapper').remove();
						$('#chatWrapper').remove();
                        $('#videoEmbed').width("99%").css("left", "5px");
                      });
}
// load jQuery and execute the main function
addJQuery(main);