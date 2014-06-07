// ==UserScript==
// @name           Facebook Set Status Updates As Default
// @namespace      fbsud
// @author         Xotic750
// @description    Adds a Status Updates item above the News Feed item on the navigation menu and sets Status Updates to be default instead of News Feed.
// @version        1.0.0
// @homepageURL    http://caaplayer.freeforums.org
// @icon           http://img833.imageshack.us/img833/5543/facebookiconrc.png
// @include        http*://www.facebook.com/*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/*jslint maxlen: 250, white: true, browser: true, devel: true, undef: true, nomen: true, bitwise: true, plusplus: true, immed: true, regexp: true, eqeqeq: true, newcap: true */
/*global window,document,self */


(function (win, doc) {
    if (top !== self) {
        return;
    }

    var loaded = false,
        to;

    function canCall(fn) {
        if (typeof fn !== 'function') {
            throw new TypeError(fn + " is not a function");
        }
    }

    function addEvent(obj, type, fn) {
        canCall(fn);
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function () {
                obj['e' + type + fn](window.event);
            };

            obj.attachEvent('on' + type, obj[type + fn]);
        } else {
            obj.addEventListener(type, fn, false);
        }
    }

    function removeEvent(obj, type, fn) {
        canCall(fn);
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else {
            obj.removeEventListener(type, fn, false);
        }
    }

    function clearTo() {
        if (to) {
            win.clearTimeout(to);
        }
    }

    function getImgClasses() {
        var i = 0,
            o = doc.getElementById("pagelet_stream_header").getElementsByTagName("i"),
            l = o.length,
            ic = {},
            a = false,
            n;

        if (l === 1) {
            o = doc.getElementById("pagelet_composer").getElementsByTagName("i");
            l = o.length;
            a = true;
        }

        for (i = 0; i < l; i += 1) {
            n = a && o[i].nextSibling ? o[i].nextSibling.firstChild : o[i].nextSibling;
            if (n && n.nodeType === 3) {
                ic[n.nodeValue] = o[i].getAttribute('class').replace(/mrs /, "");
            }
        }

        return ic;
    }

    function addMenu(evt) {
        if (evt === true || /mainContainer|fbCoreAppsNav/.test(evt.target.id)) {
            clearTo();
            to = win.setTimeout(function () {
                if (!doc.getElementById("navItem_su")) {
                    var nf = doc.getElementById("navItem_nf"),
                        ic,
                        li;

                    if (nf) {
                        ic = getImgClasses();
                        li = nf.cloneNode(true);
                        li.setAttribute('id', 'navItem_su');
                        li.setAttribute('class', 'sideNavItem key-app_2915120374' + (win.location.search === "?sk=app_2915120374" ? ' selectedItem open' : ''));
                        li.innerHTML = li.innerHTML.replace(/sk=nf/m, "sk=app_2915120374").replace(/News Feed/m, "Status Updates");
                        li.getElementsByTagName("i")[0].setAttribute('class', ic["Status Updates"] || ic["Status"]);
                        nf.setAttribute('class', nf.getAttribute('class').replace(new RegExp("(key-app_2915120374" + (win.location.search === "?sk=app_2915120374" ? "|selectedItem|open" : '') + ")+"), ''));
                        nf.parentNode.insertBefore(li, nf);
                    }
                }
            }, 100);
        }
    }

    function modifyMenu(id, rxs, rst) {
        var el = doc.getElementById(id).firstChild;
        if (el) {
            el.href = el.href.replace(new RegExp(rxs), rst);
        }
    }

    function onUnLoad(evt) {
        removeEvent(win, "DOMNodeInserted", addMenu);
        removeEvent(win, "unload", onUnLoad);
        clearTo();
        loaded = false;
    }

    function onLoad() {
        if (/\//.test(win.location.pathname) && (!win.location.search || /ref=logo|ref=home/.test(win.location.search))) {
            win.location.search = "?sk=app_2915120374";
        } else {
            addMenu(true);
            modifyMenu("pageLogo", "ref=logo", "sk=app_2915120374");
            modifyMenu("navHome", "ref=home", "sk=app_2915120374");
            addEvent(win, "DOMNodeInserted", addMenu);
            addEvent(win, "unload", onUnLoad);
        }
    }

    if (!loaded) {
        loaded = true;
        onLoad();
    }
}(window, document));
