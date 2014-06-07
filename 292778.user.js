// ==UserScript==
// @name           4chan tts
// @description    Reads replies to your posts, requires 4chan-x
// @version        1.1
// @include        http://boards.4chan.org/*/res/*
// @include        https://boards.4chan.org/*/res/*
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/292778.meta.js
// @downloadURL    https://userscripts.org/scripts/source/292778.user.js
// ==/UserScript==

/* loading jQuery http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey */
var load, execute, loadAndExecute;
load = function(a, b, c) {
    var d;
    d = document.createElement("script"), d.setAttribute("src", a), b != null && d.addEventListener("load", b), c != null && d.addEventListener("error", c), document.body.appendChild(d);
    return d
}, execute = function(a) {
    var b, c;
    typeof a == "function" ? b = "(" + a + ")();" : b = a, c = document.createElement("script"), c.textContent = b, document.body.appendChild(c);
    return c
}, loadAndExecute = function(a, b) {
    return load(a, function() {
        return execute(b)
    })
};

loadAndExecute("https://code.jquery.com/jquery-1.10.1.min.js", function() {
    $("div.thread").on('DOMNodeInserted', function(e) {
        var newEl = e.target;
        if (newEl.className == "postContainer replyContainer") {
            // whenever a new post is inserted...
            var thisEl = $('div#' + newEl.id + ' div.post.reply blockquote');

            // fetch post contents
            var h = $(thisEl).html();

            // <br> to spaces, remove html
            var hRemoveHtml = h.replace(/(<br>)+/ig, "&nbsp;").replace(/(<([^>]+)>)/ig, "");

            // decode html entities
            var hDecode = $('<textarea/>').html(hRemoveHtml).val();

            // is it a reply to me?
            var reply = hDecode.search(/(>>[0-9]+\s*\(You\))/ig);

            // remove all post reference numbers like >>123456 (You) (OP)
            var hRemoveNr = hDecode.replace(/(>>[0-9]+(\s*\(You\))?(\s*\(OP\))?)/ig, "");

            // if reply to me, insert tts mp3 file as <audio> element
            if (reply != -1) {
                console.log('4chan tts: ' + hRemoveNr);
                $(thisEl).append('<audio type="audio/mpeg" src="http://tts-api.com/tts.mp3?q=' + encodeURIComponent(hRemoveNr) + '" autoplay="true"></audio>');
            }
        }
    });
});