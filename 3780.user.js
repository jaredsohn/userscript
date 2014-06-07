// ==UserScript==
// @name          Number Google Results Remixed 1.1
// @description	  Numbers results of Google searches
// @include       http://google.*
// @include       http://www.google.*

// Changed up the original script (by Dave Child)
// so that it will inter-op with other scripts.

// ==/UserScript==

// Updated 12/6/2006 to adjust to Google changes.

var dbg = true;

function slog(logthis) {
	if (dbg) GM_log(logthis);
}

function q(key) {
    var value = null;
    for (var i = 0; i < q.keys.length; i++) {
        if (q.keys[i] == key) {
            value = q.values[i];
            break;
        }
    }
    return value;
}
q.keys = new Array();
q.values = new Array();
function q_Parse() {
    var query = window.location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf("=");
        if (pos >= 0) {
            var a = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            q.keys[q.keys.length] = a;
            q.values[q.values.length] = value;
        }
    }
}
q_Parse();
var j = 0;
var s = q("start");
if (s == null) {
    s = 0;
}
s = parseInt(s) + 1;


ps = document.getElementsByTagName("div");
for (pi = 0; pi < ps.length; pi++) {
	slog("Pi = " + pi);
    tp = ps[pi];
    if (tp.className == "g") {
        w = s + j;
        tp.innerHTML = w + ". " + tp.innerHTML;
        j++;
    }
}



