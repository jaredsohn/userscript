// ==UserScript==
// @name           Clickmeter Referrer to USO Title Converter
// @namespace      CRUTC
// @description    Tool to help show visitor info by retrieving the userscript.org script titles from referrer link urls.
// @include        http://my.clickmeter.com/campaign-clicks?campaignId=*
// @include        https://my.clickmeter.com/campaign-clicks?campaignId=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author         drhouse
// @version        1.0.3
// @grant          GM_xmlhttpRequest
// ==/UserScript==

/* Works on 'List of Clicks' pages from the dropdown menu */

$(document).ready(function () {
    
    var blue;
    
    function convert(){
        $(".simpleTooltip2").each(function(e) {
            var blue = this;
            var query = $(this).attr('href');
            var url = 'https://www.google.com/search?q="'+query+'"';    
            
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(responseDetails) {
                    var holder = responseDetails.responseText;
                    var msg = $(holder).contents().find('#rso > li:nth-child(1) > div > h3').text();
                    $(blue).replaceWith('<a href="'+blue+'">'+msg+'</a>');
                    
                    function sleep(milliseconds) {
                        var start = new Date().getTime();
                        for (var i = 0; i < 1e7; i++) {
                            if ((new Date().getTime() - start) > milliseconds){
                                break;
                            }
                        }
                    }
                    sleep(750);
                }
            });
        });
    }
    setTimeout(function(){convert()},1000);
});