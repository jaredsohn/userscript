// ==UserScript==
// @name        twitch.tv broadcast download
// @description	adds the "Download" button next to "Follow" and "Options" buttons to the past broadcast pages
// @author      anon34522
// @grant       none
// @include     http://*twitch.tv/*/b/*
// @version     1
// ==/UserScript==

(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != 'undefined') {
        w = unsafeWindow
    } else {
        w = window;
    }
/*
    if (w.self != w.top) {
        return;
    }
*/
    // additional check @include
    if (/http:\/\/.*?twitch\.tv\/.*?\/b\/.*?/.test(w.location.href)) {
        function cbGetUrl(data) {
            if (data.results[0]) {
                var dl_direct_url = $(data.results[0]).find('video_file_url')[0].innerHTML;
                $('#channel_actions').append('<a id="dl_link" class="primary_button action" href="'+dl_direct_url+'"><span>Download</span></a>');
            } else {
                //alert('an error occured while retriving the direct url via yahoo-service!');
            }
        }
        function jqueryLoaded() {
            // get direct url for "Download" button
            var id = w.location.pathname.split("/").slice(-1)[0];
            var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="http://api.justin.tv/api/clip/show/'+id+'.xml"') + '&format=xml&callback=?';
            $.getJSON(yql, cbGetUrl);
        }
        function checkJquery() {
            if (typeof jQuery != 'undefined' && typeof $.getJSON != 'undefined') {
                jqueryLoaded();
            } else {
                w.setTimeout(checkJquery, 100);
            }
        }

        // include jquery
        var script = document.createElement("script");
        script.src = "http://code.jquery.com/jquery-1.9.1.min.js";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
        checkJquery();
    }
})(window);