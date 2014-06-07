// ==UserScript==
// @name          Netscreen Compatability for Google Chrome
// @author        Tavis Ormandy
// @namespace     https://lock.cmpxchg8b.com/
// @description   Fix incompatible javascript conventions used in ScreenOS.
// @include       http://*/dhtml.html*
// @include       https://*/dhtml.html*
// @include       http://*/code.html*
// @include       https://*/code.html*
// ==/UserScript==

// The ScreenOS webui assumes document.all["name"] is equivalent to
// getElementsByTagName("name"), this works on IE and Mozilla, but Chrome does
// not support it, and never will:
//
//  http://www.chromium.org/Home/chromecompatfaq
//
// I can workaround it by manually setting the name property for each element.

function whatever() {
    var elem = document.createElement("script");
    var text = document.createTextNode("()()");

    function install_chrome_workaround () {
        try {
            MTMUA.__defineSetter__("document", function (o) {
                this.__document = o;
                this.__document.__defineGetter__("all", function () {
                    var n = new Array();
                    var e = this.getElementsByTagName("*");
                        for (var i = 0; i < e.length; i++) {
                            if (e[i].hasOwnProperty("name")) {
                                n[e[i].name] = e[i];
                            }
                    }
                    return n;
                });
            });
            MTMUA.__defineGetter__("document", function () {
                return this.__document;
            });
        } catch (e) {};
    }

    elem.setAttribute("type", "text/javascript");
    text.insertData(1, install_chrome_workaround);
    elem.appendChild(text);

    if (document.body) {
        document.body.appendChild(elem);
    }
}
whatever();