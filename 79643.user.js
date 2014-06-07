// ==UserScript==
// @name           Chapters Notice
// @namespace      fjay
// @include        http://fjayvps.co.cc:8080/confluence/pages/viewpage.action*
// ==/UserScript==

var GM_JQ = document.createElement('script'), head = document.getElementsByTagName('head');

GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js';
GM_JQ.type = 'text/javascript';

var $;
if (head && head.length && head[0].appendChild) {
    head[0].appendChild(GM_JQ);
    
    // wait for jQuery to load
    function GM_wait(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        }
        else {
            unsafeWindow.jQuery.noConflict();
            $ = unsafeWindow.jQuery;
            var sourceUrl = findSourceUrl();
            
            if (sourceUrl == null) {
                return;
            }
            GM_xmlhttpRequest({
                method: 'GET',
                url: sourceUrl,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(responseDetails){
                    var chapters = null;
                    
                    if (sourceUrl.indexOf("qidian") > 0) {
                        //起点
                        chapters = $(responseDetails.responseText).find("#readV h3").text();
                    }
                    else 
                        if (sourceUrl.indexOf("17k") > 0) {
                            //17k
                            chapters = $(responseDetails.responseText).find("#fragment-2 h3").text();
                            chapters += blank(2) + $(responseDetails.responseText).find("#tab1_tool small").text();
                        }
                        else 
                            if (sourceUrl.indexOf("zongheng") > 0) {
                                var html = $(responseDetails.responseText);
                                html.find("#gxzj .info h3 span").empty();
                                chapters = html.find("#gxzj .info h3").text();
                            }
                    
                    if (chapters != null) {
                        findPosObj().find("img").after(blank(2) + "<span>" + chapters + "</span>");
                    }
                }
            });
        }
    }
    
    GM_wait();
}

function findSourceUrl(){
    return findPosObj().find("a").attr("href");
}

function findPosObj(){
    return $("td:contains('首发链接')").next();
}

function blank(n){
    var blank = "";
    for (i = 0; i < n; i++) {
        blank += "&nbsp;";
    };
    return blank;
}
