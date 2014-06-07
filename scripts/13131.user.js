/* Google Quick Keys
 * --------------------------------------------------------------------
 * Created on: 2007-Oct-19 @ 9:41:40 PM
 *   - 2007-Oct-19 @ 11:03:22 PM: fixed bug when pressing '0'
 *   - 2007-Oct-21 @ 9:21:55 PM: fixed script so search results > 10
 *     can be accessed
 *   - 2008-Aug-22 @ 9:40:35 AM: Google seemed to have recently changed
 *     their link structure ... fxd bug so it now works again.
 * --------------------------------------------------------------------
 *     Copyright (C) 2007, Kevin T. Ryan
 * 
 *     This program is free software; you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation; either version 2 of the License, or
 *     (at your option) any later version.
 * 
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 * --------------------------------------------------------------------
*/

// ==UserScript==
// @name          Google Quick Keys
// @namespace     http://www.portss.com
// @description   Let's you go to links from a Google search by pressing the number keys.
// @include       http://www.google.com/search?*
// ==/UserScript==

function filter (predicate, filterable) {
    var ret = new Array();
    for (var f=0; f < filterable.length; f++) {
        if (predicate(filterable[f])) {
            ret.push(filterable[f]);
        }
    }
    return ret;
}

function map(fn, mappable) {
    var ret = new Array();
    for (var m=0; m < mappable.length; m++) {
        ret.push(fn(mappable[m]));
    }
    return ret;
}

var href = {
    relocate : function (num) {
        if (href.lastkey != -1) {
            var now = new Date();
            if (now - href.lasttime > 1000) {
                // Too much time has passed ... must not be trying to hit that key
                href.go_later(num);
                return;
            }
            var whichlink = parseInt(href.lastkey + "" + num);
            window.clearInterval(href.interval_id);
            href.go(whichlink);
        } else {
            href.go_later(num);
        }
    },

    go_later : function (num) {
        href.lastkey = num;
        href.lasttime = new Date();
        href.interval_id = window.setInterval(function () {
            href.go(num);
            window.clearInterval(href.interval_id); // only relocate once
        }, href.time);
        return;
    },

    init : function (links, time) {
        if (!href.initialized) {
            href.links = links;
            href.time = time;
            href.lastkey = -1;
            href.initialized = true;
        }
    },

    go : function(whichlink) {
        location.href = href.links[whichlink - 1];
        return;
    }
}

window.addEventListener("load", function () {
    /*
    var divs = document.getElementsByTagName("div");
    var relevant_divs = filter(function (ele) { return ele.className == "g"; }, divs);
    var links = map(function (div) {
        var hrefs = div.getElementsByTagName("a");
        return hrefs[0];
    }, relevant_divs);
    */
    var links = document.getElementsByClassName('l');
    document.addEventListener("keyup", function (e) {
        var key = String.fromCharCode(e.keyCode);
        if (/\d/.test(key)) {
            var whichlink = parseInt(key);
            href.init(links, 375); // wait about a half of a second before moving
            href.relocate(whichlink)
        }
    }, false);
    for (var i=0; i < links.length; i++) {
        var span = document.createElement("span");
        span.appendChild(document.createTextNode("[" + (i + 1) + "]"));
        span.style.color = "red";
        span.style.fontSize = "0.8em";
        span.style.marginRight = "5px";
        links[i].parentNode.insertBefore(span, links[i]);
    }
}, false);
