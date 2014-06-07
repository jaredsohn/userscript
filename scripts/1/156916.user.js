// ==UserScript==
// @name          Scroll on Top
// @namespace     http://www.webmonkey.com
// @description   Add scroll panel
// @include       *
// @grant       none
// ==/UserScript==

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}



function smoothScroll() {
    var startY = currentYPosition();
    var stopY = 0;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}


var body = document.getElementsByTagName('body')[0];
var scrollbar = document.createElement('div');

scrollbar.style.position="fixed";
scrollbar.style.width='5px';
scrollbar.style.height='100%';
scrollbar.style.top='0px';
scrollbar.style.left='0px';
scrollbar.onclick=smoothScroll
scrollbar.style.zIndex='99999';


body.appendChild(scrollbar);