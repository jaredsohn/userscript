// ==UserScript==
// @name         My Mouse Gestures
// @version      0.0.6
// @include      *
// @run-at       document-start
// ==/UserScript==


// --- Settings ---

const SENSITIVITY = 3; // 1 ~ 5
const TOLERANCE = 3; // 1 ~ 5

const funcs = {
    'DR': function() {
        window.open('', '_self', '');
        window.close();
    },
    'DU': function() {
        window.scrollTo(0, 0);
    },
    'UD': function() {
        window.scrollTo(0, 2147483647);
    },
    'L': function() {
        window.history.back();
    },
    'R': function() {
        window.history.forward();
    }
};

// ----------------


const s = 1 << ((7 - SENSITIVITY) << 1);
const t1 = Math.tan(0.15708 * TOLERANCE), t2 = 1 / t1;

var x, y, path;

function tracer(e) {
    var cx = e.clientX,
        cy = e.clientY,
        deltaX = cx - x,
        deltaY = cy - y,
        slope = Math.abs(deltaY / deltaX),
        distance = deltaX * deltaX + deltaY * deltaY,
        direction = '';
    if (distance > s) {
        if (slope > t1) {
            if (deltaY > 0) {
                direction = 'D';
            } else {
                direction = 'U';
            }
        } else if (slope <= t2) {
            if (deltaX > 0) {
                direction = 'R';
            } else {
                direction = 'L';
            }
        }
        if (path.slice(-1) != direction) {
            path += direction;
        }
        x = cx;
        y = cy;
    }
}

if (window.top == window.self) {

    window.addEventListener('mousedown', function(e) {
        if (e.which == 3) {
            x = e.clientX;
            y = e.clientY;
            path = "";
            window.addEventListener('mousemove', tracer, false);
        }
    }, false);

    window.addEventListener('contextmenu', function(e) {
        window.removeEventListener('mousemove', tracer, false);
        if (path != "") {
            e.preventDefault();
            if (funcs.hasOwnProperty(path)) {
                funcs[path]();
            }
        }
    }, false);

}