// ==UserScript==
// @name       Fix Feedly Links
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Removes the utm_source=feedly parameter from the end of feedly links.
// @match      http://www.feedly.com/*
// @copyright  2013, Francisco Vieira
// @require		http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

$(document).ready(function() {
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    
    var BAD_PARAMETER = "utm_source=feedly";
    
    window.setInterval(function() {
        $('a').each(function(i, link) {
            console.log(link);
            var url = $(link).attr('href');
            console.log(url);
            if (endsWith(url, BAD_PARAMETER)) {
                var new_url = url.substring(0, url.length - BAD_PARAMETER.length);
                console.log(new_url);
                $(link).attr('href', new_url);
            }
        });
    }, 500);
   
});