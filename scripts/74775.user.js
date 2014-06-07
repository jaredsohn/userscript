// ==UserScript==
// @name           Lockerz Countdown
// @namespace      Yash
// @include        http://www.lockerz.com/p/watch/*
// ==/UserScript==


function blink() {
    x = setInterval(function () {
        document.title = "Done! Fill the Captcha!";
        setTimeout(function () {
            document.title = "Your PTZ : " + document.getElementsByClassName("ptz_value")[0].innerHTML;
        }, 400);
    }, 800);
}


function getTime(m) {
    return eval((r = m.match(/([\d+]{1,2})\:([\d+]{2})/))[1] * 60 + eval(r[2]));
}
x = getTime(document.body.innerHTML);
t = setInterval(function () {
    if (x == 0) {
        clearTimeout(t);
        blink();
    } else {
        x -= 1;
        document.title = "Seconds Left : " + x;
    }
}, 1000);