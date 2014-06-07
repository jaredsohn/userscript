// ==UserScript==
// @name       Boerse.bz Direct Links
// @namespace  http://deutscherminecrafter.de
// @version    0.1
// @description  enter something useful
// @match      http://www.boerse.bz/boerse/*
// @copyright  2012+, DeutscherMinecrafter
// ==/UserScript==

var urlbefore;
var urlafter;

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
    $(document).ready(function(){
        $('.postbit-user-wrap').parent().find("a").each(function(){
         	urlbefore = $(this).attr('href');
            if(typeof urlbefore !== "undefined"){
            	$(this).attr('href', urlbefore.replace('http://www.boerse.bz/out/?url=',''));
            }
        });
    });
    
}
// load jQuery and execute the main function
addJQuery(main);
