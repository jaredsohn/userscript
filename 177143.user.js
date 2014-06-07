// ==UserScript==
// @name       Blackboard download redirect remover
// @namespace  http://wol.ph/
// @version    0.1
// @description Removes the need to click twice to download a file
// @match      https://blackboard.tudelft.nl/webapps/*
// @copyright  2013, Rick van Hattem
// ==/UserScript==

function runWithJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
    script.addEventListener('load', function() {
        var script = document.createElement('script');
        script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main(){
    var links = jQ('a[href^="https://blackboard.tudelft.nl/bbcswebdav/"]');
    jQ.each(links, function(){
        var $link = jQ(this);
        $link.unbind();
        $link.removeAttr('onclick');
        $link.attr('target', '_blank');
    });
        
}

runWithJQuery(main);