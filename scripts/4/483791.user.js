// ==UserScript==
// @name       Add JQuerry
// @namespace  http://fb.me/shivesh96
// @version    0.1
// @description  This script is for adding JQuerry in any webpage.
// @include      *
// @copyright  2014+, Shivesh
// ==/UserScript==


(function(){
    var ttBkp = document.title;
    document.title = ttBkp+" :: Body Hide";
    document.getElementsByTagName("body")[0].style.visibility="hidden";
    var isIefbd = !!window.ActiveXObject;
    if (typeof(jQuery) === "undefined") {
        var jqscript = document.createElement('script');
        jqscript.src = "//code.jquery.com/jquery-latest.js";
        /*jqscript.src = '//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';*/
        document.getElementsByTagName('head')[0].appendChild(jqscript);
        document.title = ttBkp+" ::Append JQuerry";
        if (isIefbd) {
            var doneFb = false;
            jqscript.onreadystatechange = function() {
                document.title = ttBkp+" ::On Ready Status change";
                if ( !doneFb && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                    document.title = ttBkp+" ::complete";
                    doneFb = true;
                    document.getElementsByTagName("body")[0].style.visibility="visible";
                    /* Run Custom Function Here Which Need JQuerry */
                    jqscript.onreadystatechange = null;
                }
            };
        } else {
            jqscript.onload = function() {
                document.title = ttBkp + " ::Jquerry Loded";
                document.getElementsByTagName("body")[0].style.visibility="visible";
                /* just run the function as Jq loded */
            };
        }
    }
    else {
        document.title = ttBkp + " ::Jquerry Already Loded";
        document.getElementsByTagName("body")[0].style.visibility="visible";
        /* JQuerry Already Exist */
    }
})();
