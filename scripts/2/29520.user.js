// ==UserScript==
// @name           redirect stop by meta
// @namespace      perlnamehoge@gmail.com
// @include        http://*
// ==/UserScript==

var $x = function (xpath) {
    var r = document.evaluate(xpath, document, null, 7, null);
    for ( var i = 0, l = r.snapshotLength, res = []; i < l; i++ )
        res[i] = r.snapshotItem(i);
    return res;
}

var s = function () {
    var tid = setInterval(function () {
                      unsafeWindow.stop();
                      clearInterval(tid);
              }, 1);
    unsafeWindow.removeEventListener('beforeunload', s, false);
}

if ( $x("//meta[@http-equiv='Refresh' and @content]").length ) {
    unsafeWindow.addEventListener("beforeunload", s, false);
}