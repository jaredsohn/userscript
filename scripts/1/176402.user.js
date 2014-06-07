// ==UserScript==
// @name       Honey Rack
// @version    0.1
// @description  Replace igodigtal.com links with pow tld
// @match      https://www.honeybadger.io/inspector/*
// ==/UserScript==

/*! $ v1.10.2 | (c) 2005, 2013 $ Foundation, Inc. | $.org/license
//@ sourceMappingURL=$.min.map
*/

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=$.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    $(document).ready(function() {
		setTimeout(function(){
            function insertLocalLinks() {
                setTimeout(function() {
                    if ( $("html a[href*='.dev']").length == 0 ) {
                        $("html a[href*='api.igodigital.com']").each(function() {
                            href = $(this).attr('href').replace('https://', 'http://').replace(/(-dev|-staging|)\.gst\.api\.igodigital\.com/, '.dev');
                            $('<hr><span>Pow: </span>').add( $(this).clone().attr('href', href).text(href) ).insertAfter( $(this) );
                        });
                    }
            	}, 1000);
            }
            insertLocalLinks();
            $(document).bind('DOMNodeInserted', insertLocalLinks );
            setTimeout(function() {
                $('#button_calc').triggerHandler('click');
                setTimeout(function() {
                    $('.icon_size').triggerHandler('click');
                }, 500);
            }, 500);
        }, 2000);
    });
}
// load $ and execute the main function
addJQuery(main);
