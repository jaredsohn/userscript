// ==UserScript==
// @name           Highlight drupal Modules
// @description    Helps, when you updating drupal 5.x, when you have to disable contributed modules. This script remembers, what modules where on and highlights them. This information is stored in cookie, which expires when you close the browser.
// @include        http://*/*admin/build/modules
// @version        0.1
// ==/UserScript==

(function () {

/*
 * Functions setCookie() and getCookieVal() are taken from Danny Goodman's "JavaScript & DHTML Cookbook"
 */

function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

// utility function called by getCookie()
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

// primary function to retrieve cookie by name
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return null;
}

/*
 * Main body
 */
//trying to get a cookie
strmod = getCookie('modulenames');

var cookieset = false;
if (strmod == null) {
    cookieset = true;
    strmod = '';
}

var containers = document.getElementById('system-modules').getElementsByTagName('tbody');

//iterate tbody
for (c = 0; c < containers.length; c++) {
    //iterate table rows (tr)
    var tablerows = containers[c].getElementsByTagName('tr');

    for (i = 0; i < tablerows.length; i++) {
            if (cookieset) {
                if (tablerows[i].cells[0].getElementsByTagName('input')[0].getAttribute('checked') == 'checked')
                    strmod += tablerows[i].cells[1].textContent + ';';
            } else {
                if (strmod.indexOf(tablerows[i].cells[1].textContent) != -1)
                    tablerows[i].cells[0].style.backgroundColor = "#FFFFDA";
            }

    }
}

//write cookie
setCookie('modulenames', strmod);

})();