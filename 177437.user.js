// ==UserScript==
// @name       GoodDrama Ads Killer
// @version    0.5
// @description Kill annoying ads
// @match      http://www.gooddrama.net/*
// @copyright  2013+, xenohawk
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.j=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main(){
    j(document).ready(function()
                      {
                          setTimeout(function(){
                              // Remove ads
                              j('#upper_header, #body > .right_col, #VelBar, .part, #slink + ul, .report_video, #snet').remove();
                              j('iframe').not(j('#streams iframe')).remove();
                              
                              // CSS
                              j('*').css({ backgroundColor:'#000', color:'#CCC', borderColor: 'transparent', backgroundImage:'none' });
                              j('.selected').css({ color:'red' });
                          },100);
                      });
}
// load jQuery and execute the main function
addJQuery(main);