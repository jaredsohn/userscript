// ==UserScript==
// @name           Castle Age Gift and Followers Invite FIX
// @namespace      cagafif
// @author         Xotic750
// @description    A fix for Castle Age gifting where people have an apostrophe in their name
// @version        1.3.0
// @include        *http*://web.castleagegame.com/castle/*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/*jslint maxlen: 200, white: true, browser: true, devel: true, undef: true, nomen: true, bitwise: true, plusplus: true, immed: true, regexp: true, eqeqeq: true, newcap: true */
/*global window,document */

(function (win, doc) {
    var pl = {
            "gift": {
                ix: /invite_sendgift\.gif/,
                nx: new RegExp(", '(.*?) has")
            },
            "army": {
                ix: /invite_army\.gif/,
                nx: new RegExp("join (.*?)\\\\'s army")
            },
            "quests": {
                ix: /hero_result_button_recruit_25\.jpg/,
                nx: new RegExp(", '(.*?) needs")
            },
            "festival_duel_home": {
                ix: /festival_duelchamp_invitefollow\.gif/,
                nx: new RegExp(", '(.*?) is")
            },
            "guild_shop": {
                ix: /hero_result_button_recruit_25\.jpg/,
                nx: new RegExp(", '(.*?) needs")
            }
        },
        ax = /'/g,
        gc,
        nw,
        nr,
        /*
        * type in your manually analysed name here to override autodetect method,
        * e.g "'your 'name 'with any 'apostrophes in it"
        */
        manual = "",
        /*
        * type in the name you want to replace the manual/autodetected value with,
        * Useful if you are just wanting to spell your name correctly if you have strange characters
        * like Ä, Å, Ö and such like
        */
        display = "";

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

    function setReplacer(name) {
        nr = new RegExp(name, "g");
        nw = display ? display.replace(ax, "\\'") : name.replace(ax, "\\'");
    }

    function replaceName(id) {
        if (!id || !pl[id]) {
            return;
        }

        var g = 0,
            e = doc.getElementsByTagName("img"),
            el = e.length,
            rx = pl[id].ix,
            eg,
            oc;

        for (g = 0; g < el; g += 1) {
            eg = e[g];
            if (rx.test(eg.src)) {
                oc = eg.getAttribute("onclick");
                if (!manual) {
                    setReplacer(oc.match(pl[id].nx)[1]);
                }

                eg.setAttribute("onclick", oc.replace(nr, nw));
                break;
            }
        }
    }

    function gcListen(event) {
        replaceName(event.target.id);
    }

    function onUnLoad() {
        removeEvent(gc, "DOMNodeInserted", gcListen);
        removeEvent(win, "unload", onUnLoad);
    }

    function waitLoad() {
        gc = doc.getElementById("globalContainer");
        if (gc) {
            if (manual) {
                setReplacer(manual);
            }

            addEvent(gc, "DOMNodeInserted", gcListen);
            addEvent(win, "unload", onUnLoad);
            replaceName(gc.getElementsByClassName('game')[0].id);
        } else {
            win.setTimeout(waitLoad, 100);
        }
    }

    waitLoad();
}(window, document));
