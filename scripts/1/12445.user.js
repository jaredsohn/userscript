// ==UserScript==
// @name           quick_focus_out
// @namespace      perlnamehoge@gmail.com
// @include        http://*
// ==/UserScript==

new function () {
    var addEventListener = (function () {
        if ( window.addEventListener ) {
           return function (target, action, observe, useCapture) {
               target.addEventListener(action, observe, useCapture);
           }
        }
        else {
           return function (target, action, observe, useCapture) {
               target.attachEvent(action, observe, useCapture);
           }
        }
    })();
    var $x = function (xpath) {
        var r = document.evaluate(xpath, document, null, 7, null);
        for ( var i = 0, l = r.snapshotLength, res = []; i < l; i++ )
            res[i] = r.snapshotItem(i);
        return res;
    }
    if ( !Array.prototype.forEach )
       Array.prototype.forEach = function (f) {
            for ( var i = 0, res = []; i < this.length; i++ ) {
                res[i] = f( this[i] );
            }
            return res;
       }
    $x("//textarea | //input[@type='text' or @type='password']").forEach(function (elem) {
       addEventListener(elem, "keydown", function (event) {
          var kc = event.which || event.keyCode;
          kc == 27 && event.target.blur && event.target.blur();
       }, false);
    });
}