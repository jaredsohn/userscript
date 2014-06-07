// ==UserScript==
// @include        http://www.lockerz.com/p/watch/*
// @exclude        http://www.lockerz.com/p/watch/featured/*
// @name Forolockerz
// ==/UserScript==


function blink() {
    x = setInterval(function () {
        document.title = "Listo! Relleñe el Captcha!";
        setTimeout(function () {
            document.title = "Sus PTZ : " + document.getElementsByClassName("ptz_value")[0].innerHTML;
        }, 800);
    }, 1600);
}

window.scrollTo(0,180);

function getTime(m) {
    return eval((r = m.match(/([\d+]{1,2})\:([\d+]{2})/))[1] * 60 + eval(r[2]));
}
x = getTime(document.body.innerHTML) + 30;
t = setInterval(function () {
    if (x == 0) {
        clearTimeout(t);    
        blink();
    } else {
        x -= 1;
        document.title = "Quedan : " + x;
    }
}, 1000);