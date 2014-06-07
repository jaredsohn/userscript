// ==UserScript==
// @name        Twitter chat
// @namespace   http://www.bassintag551.com/
// @description chat
// @include     *://twitter.com/
// @version     1
// @grant       none
// ==/UserScript==

function insertChat() {
    console.log('loading chat');
    $('#content-main-heading') .append('<div id="iframeDiv"></div>')
    $('#iframeDiv') .html('<iframe id="shoutbox" height="300" width="100%" frameborder="0"></iframe>');
    $('iframe#shoutbox') .attr('src', 'https://freeshoutbox.net/Bassintag');
}

setTimeout(function () {
    function loadScript(url, callback) {
        var script = document.createElement('script')
        script.type = 'text/javascript';
        if (script.readyState) {
            //IE
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            //Others
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName('head') [0].appendChild(script);
    }
    loadScript('https://code.jquery.com/jquery-latest.min.js', function () {
        //jQuery loaded
        insertChat();
    });
},3000);
