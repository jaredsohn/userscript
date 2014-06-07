// ==UserScript==
// @name        cross-cookie
// @namespace   http://ezdl.it
// @version     0.35
// @description cross-cookie for Easily download it (http://ezdl.it)
// @match       http://127.0.0.1:8080/*
// @match       https://127.0.0.1:8080/*
// @match       http://dl.sinosky.org/*
// @match       https://dl.sinosky.org/*
// @match       http://dl.sinosky.us/*
// @match       https://dl.sinosky.us/*
// @match       http://ezdl.it/*
// @match       https://ezdl.it/*
// @match       http://www.ezdl.it/*
// @match       https://www.ezdl.it/*
// @match       http://vip.xunlei.com/*
// @copyright   2011-2012, Binux <17175297.hk@gmail.com> (http://blog.binux.me)
// @generator   SinoSky (https://www.sinosky.org)
// @license     GNU Lesser General Public License (LGPL)
// @run-at      document-end
// ==/UserScript==

var version = "0.35";
var _gc = function(name) {
    return document.getElementsByClassName(name);
};

if ('loading' != document.readyState) {
    var cookies = _gc("cross-cookie");
    if (cookies.length) {
        for (var i=0, len=cookies.length; i<len; i++) {
            if (cookies[i].getAttribute("data-version") == version) {
                cookies[i].setAttribute("style", "display: none;");
            }
        };
        document.cookie = "cross-cookie="+version+"; path=/";
    };

    var hash = location.hash;
    if (hash.indexOf("#cross-cookie|") == 0) {
        var src = hash.split("|")[1];
        var script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
        document.body.firstChild.innerHTML = "cross-cookie is running..<br />inject script.src = "+src+"";
    };
}