// ==UserScript==
// @name            BoingBoing posts in BBS
// @description     Embeds BoingBoing posts into their comment BBS threads. Script by gwwar: http://bbs.boingboing.net/t/i-miss-the-old-site-with-comments-on-the-same-page/8634/156
// @include         http://bbs.boingboing.net/*
// ==/UserScript==

$(function(){
    var iframe, link;
    link = document.querySelector("#post_1 .topic-body .cooked a");
    if (link.firstChild.textContent == "Permalink") {
        iframe = document.createElement('iframe');
        iframe.setAttribute("src", link.getAttribute("href"));
        iframe.setAttribute("frameBorder", 0);
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", "600px");
        iframe.setAttribute("style", "border:1px solid #CCC;");
        document.querySelector(".topic-body .cooked").appendChild(iframe);
    }
});
