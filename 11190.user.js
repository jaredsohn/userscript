// ==UserScript==
// @name           nowa-highlight-code
// @namespace      perlnamehoge@gmail.com
// @description    highlight code on the nowa blog by google code pretty.
// @include        http://*.nowa.jp/*
// ==/UserScript==

new function () {
    var $F = function (obj,iter) {
        for ( var i in obj ) iter.call( this, i, obj[i] );
    }
    var $A = function (obj) {
        for ( var i = 0, res = []; i < obj.length; res[i] = obj[i], i++ ); return res;
    }
    var $N = function (name, attr) {
        var elem = document.createElement(name);
        $F(attr, function (key,val) {
                 elem.setAttribute(key,val);
        });
        return elem;
    }
    $A( document.getElementsByTagName("pre") ).forEach(function (pre) {
             pre.className = "prettyprint";
    });
    document.getElementsByTagName("head")[0].appendChild($N('link', {
        rel  : 'stylesheet',
        href : 'http://spreadsheet.sakura.ne.jp/labs/google/google-code-prettify/src/prettify.css'
    }));
    if ( this.pretty = GM_getValue("prettyprint", undefined ) ) {
       eval( this.pretty );
       prettyPrint();
    } else {
       GM_xmlhttpRequest({
           method : 'get',
           url    : 'http://spreadsheet.sakura.ne.jp/labs/google/google-code-prettify/src/prettify.js',
           onload : function (res) {
                    eval( res.responseText );
                    prettyPrint();
                    GM_setValue( "prettyprint", res.responseText );
           }
       });
    }
}