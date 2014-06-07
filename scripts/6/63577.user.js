// Image Solitaire Effect.
// Move the mouse into the bottom right corner of any page.
// Copyright (c) 2009, Alex Leone (acleone ~at~ gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Digikey Sort By Price", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Image Solitaire Effect
// @namespace     http://students.washington.edu/acleone/
// @description   Windows solitaire ending effect on all images if the mouse is moved into the bottom right corner of the page.
// @include       *
// ==/UserScript==

var running = false,
    REBOUND = 1,
    GRAV = -9.8,
    dt = 0.35, step = 0;

function findPos(obj) {
	var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft, curtop];
}



function ImgBall(node, img, cwidth, cheight, ctx) {
    var vx = (Math.random() < 0.5)? 10 : -10,
        vy = 0,
        pos = findPos(node), x = pos[0], y = pos[1],
        w = node.offsetWidth,
        h = node.offsetHeight;
    function step(i) {
        vy += dt * GRAV;
        x += vx * dt;
        y -= vy * dt;
        if (y > cheight - h && vy < 0) {
            vy *= -(REBOUND + Math.random() / 10 - 0.05);
        }
        if (x < 0 || x > cwidth - w) {
            vx *= -1;
        }
        ctx.drawImage(img, x, y);
    }
    this.step = step;
}

function run() {
    var imgs = document.getElementsByTagName('img'),
        imgsLoaded = 0, img, cwidth, cheight,
        i, len = imgs.length, balls = [], canvas, ctx, t;
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    cwidth = canvas.width = window.innerWidth;
    cheight = canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    function loadedInc() {
        imgsLoaded++;
    }
    for (i = 0; i < len; i++) {
        img = new Image();
        img.addEventListener('load', loadedInc, false);
        img.src = imgs[i].src;
        balls.push(new ImgBall(imgs[i], img, cwidth, cheight, ctx));
    }
    t = setInterval(function () {
        if (imgsLoaded === len) {
            clearInterval(t);
                setInterval(function () {
                    step++;
                    for (i = 0; i < len; i++) {
                        balls[i].step(step);
                    }
                }, 35);
        }
    }, 100);
}

window.addEventListener('mousemove', function (event) {
    if (event.clientY > window.innerHeight - 50
            && event.clientX > window.innerWidth - 50
            && !running) {
        running = true;
        run();
    }
}, false);
