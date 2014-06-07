// ==UserScript==
// @name          cserelo
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   lord_vader
// @include       https://frame.neptun.bme.hu/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var kep='http://europass.uw.hu/neptun_header_vader.jpg';



addGlobalStyle(".main_header_r{background-color:#fff;background-image:url('" + kep + "');background-repeat:no-repeat;width:582px;height:200px;text-align:right;vertical-align:top}");
