// ==UserScript==
// @name           HoodHider
// @namespace      http://www.staggernation.com
// @description    Provides "neighborhood" filtering for apartment searches on Craigslist outside the Bay Area.
// @author         Kevin Shay
// @include        http://*.craigslist.tld/*
// ==/UserScript==

unsafeWindow.storeNabes = function() {
    setTimeout(function() {
        GM_setValue(unsafeWindow.configkey, JSON.stringify(unsafeWindow.nabes));
    }, 0);
}

unsafeWindow.clickNabe = function(cb) {
    var key = unsafeWindow.nabes_by_id[cb.id.replace(/^nabe_/, '')];
    unsafeWindow.nabes[key].on = cb.checked ? 1 : 0;
    unsafeWindow.storeNabes();
    unsafeWindow.filterNabes();
}

unsafeWindow.nabeAll = function(on) {
    for (var id in unsafeWindow.nabes_by_id) {
        var cb = document.getElementById('nabe_' + id);
        var fld = on ? 'nabecheckall' : 'nabeuncheckall';
        var containing = document.getElementById(fld).value;
        if (containing) {
            if (!unsafeWindow.nabes_by_id[id].match(new RegExp(containing))) continue;
        }
        cb.checked = (on ? true : false);
        unsafeWindow.clickNabe(cb);
    }
}

unsafeWindow.nabeAlways = function(cb) {
    var str = document.getElementById('nabealways').checked ? document.getElementById('nabeuncheckall').value : '';
    setTimeout(function() {
        GM_setValue(unsafeWindow.configkey + '_always', str);
    }, 0);
}

unsafeWindow.nabeReset = function() {
    setTimeout(function() {
        GM_setValue(unsafeWindow.configkey, '');
        window.location.reload();
    }, 0);
}

unsafeWindow.filterNabes = function() {
    var listings = document.getElementsByTagName('p');
    for (var i = 0; i < listings.length; i++) {
        var els = listings[i].getElementsByTagName('font');
        if (els[0]) { 
            var key = unsafeWindow.normalizeNabe(els[0].innerHTML);
            if (typeof(unsafeWindow.nabes[key]) != 'undefined') {
                listings[i].style.display = unsafeWindow.nabes[key].on ? 'block' : 'none';
            }
        }
    }
}

unsafeWindow.normalizeNabe = function(str) {
    return str.toLowerCase().replace(/^[ (]+/, '').replace(/[ )]+$/, '').replace(/[^a-z0-9 /.,-]/g, '').replace(/ {2,}/g, ' ');
}

window.addEventListener("load", function(e) {
    // SF bay area has real neighborhoods, they don't need us
    if (window.location.href.match(/sfbay\.craigslist\.org/)) return;
    var title = document.getElementsByTagName('title')[0].innerHTML;
    var matches = title.match(/^(.+) (apts\/housing|all apartments|all housing|rooms &amp; shares|sublets &amp; temporary|housing swap|vacation rentals|parking &amp; storage|office &amp; commercial|real estate)/);
    if (!matches) return;
    var key = matches[1] + '_' + matches[2].replace(/ &amp;/g, '');
    var re = new RegExp('search/[^/]+/([^?]+)\?');
    matches = window.location.href.match(re);
    if (matches) {
        key += '_' + matches[1];
    } else {
        re = new RegExp('craigslist\.org/([^/]+)/');
        matches = window.location.href.match(re);
        if (matches) {
            key += '_' + matches[1];
        }
    }
    key = key.replace(/ |\//g, '_');
    unsafeWindow.configkey = key + '_nabes';
    var nabestr = GM_getValue(unsafeWindow.configkey);
    var always = GM_getValue(unsafeWindow.configkey + '_always') || '';
    if (always) {
        var alwaysre = new RegExp(always);
    }
    unsafeWindow.nabes = nabestr ? eval('(' + nabestr + ')') : {};
    var listings = document.getElementsByTagName('p');
    var parent;
    for (var i = 0; i < listings.length; i++) {
        if (!parent) parent = listings[i].parentNode;
        var els = listings[i].getElementsByTagName('font');
        if (els[0] && els[0].size != 4) {
            var key = unsafeWindow.normalizeNabe(els[0].innerHTML);
            if (!key) continue;
            if (typeof(unsafeWindow.nabes[key]) == 'undefined') {
                var on = (always && key.match(alwaysre)) ? 0 : 1;    
                unsafeWindow.nabes[key] = {"on": on};
            }
            if (!unsafeWindow.nabes[key].on) {
                listings[i].style.display = 'none';
            }
        }
    }
    var cbs = '';
    unsafeWindow.nabes_by_id = new Array();
    unsafeWindow.storeNabes();
    var id = 0;
    var flat = new Array();
    for (var key in unsafeWindow.nabes) {
        flat.push(key);
    }
    flat = flat.sort();
    for (var i = 0; i < flat.length; i++) {
        var key = flat[i];
        cbs += '<span class="nabespan"><input type="checkbox" onclick="clickNabe(this);" '
            + 'id="nabe_' + i + '"'
            + (unsafeWindow.nabes[key].on ? ' checked="checked"' : '')
            + ' /><label class="nabelabel" for="nabe_' + i + '">' + key.replace(/ /g, '&nbsp;') + '</label></span> ';
        unsafeWindow.nabes_by_id[i] = key;
    }
    var beforeme = document.getElementById('messages').parentNode.parentNode.parentNode;
    var cbdiv = document.createElement('div');
    cbdiv.innerHTML = '\
    <style type="text/css">\
    #nabeblock { border:1px solid #CCCCCC; text-align:left; margin-top:-10px; padding:5px; }\
    .nabelabel { font-size:8pt; font-family:sans-serif; }\
    .nabespan { white-space:nowrap; }\
    #nabecontrol { text-align:center;font-family:sans-serif;font-size:9pt;font-weight:bold;text-decoration:none;margin-top:10px;padding-top:5px;border-top:1px solid #CCCCCC;}\
    #nabecontrol span { margin-left:10px; }\
    </style>\
    <blockquote id="nabeblock">' + cbs
    + '<div id="nabecontrol">\
    <span><a href="javascript:void(0);" onclick="nabeAll(1);">show all</a> \
    containing <input type="text" id="nabecheckall" /></span>\
    <span><input type="checkbox" id="nabealways" onclick="nabeAlways();"' + (always ? ' checked="checked"' : '') + ' /> always <a href="javascript:void(0);" onclick="nabeAll(0);">hide all</a> \
    containing <input type="text" id="nabeuncheckall" value="' + always + '" onchange="nabeAlways();" /></span>\
    <span><a href="javascript:void(0);" onclick="nabeReset();">reset</a></span> \
    </div>'
    + '</blockquote>';
    beforeme.parentNode.insertBefore(cbdiv, beforeme);
}, false);