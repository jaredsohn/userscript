// ==UserScript==
// @name        FilterX
// @namespace   test
// @include     http://lolthai.com/browse.php?c9=1*
// @version     1
// @grant       none
// ==/UserScript==
var $;

// Add jQuery
(function() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
    GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    alert('Start');
    var body = document.getElementsByTagName('body');
    var x = document.getElementsByTagName('a');
    alert(document.links.length);
    var size = document.links.length;
    var flag = 0;
    var result = "";
    for (var i = 0; i < size; i++) {
        var tmp = document.links.item(i);
        var flag = isLink(tmp);
        if (flag) {
          console.log(i + ". " + flag + " " + tmp + " ");
          result = result + "<br/><a href='" + tmp + "'>" + tmp + "</a>";
          if (isPicture(document.links.item(i + 1))) {
             console.log("   " + document.links.item(i + 1));
             result = result + "<br/><iframe src='" + document.links.item(i + 1) + "' width='900' height='900'></iframe> ";
          }
        }
    }
    $("body").prepend(result);
}

function isLink(link) {
    if (link.toString().indexOf("http://lolthai.com/details.php?id=") >= 0 && link.toString().indexOf("filelist=") < 0 && link.toString().indexOf("tocomm=") < 0 && link.toString().indexOf("toseeders=") < 0 && link.toString().indexOf("todlers=") < 0) {
        return true;
    } else {
        return false;
    }
}

function isPicture(link) {
    if (link.toString().indexOf("http://lolthai.com/details.php?id=") < 0) {
        return true;
    } else {
        return false;
    }
}