// ==UserScript==
// @name       Mixlr Auto Liker
// @namespace  http://www.varosion.com/
// @version    Final
// @description  Like Polymath's radio!
// @match      http://mixlr.com/polymath-radio/
// @copyright  2014+, Varosion
// ==/UserScript==

function sleep(millis, callback) {
    setTimeout(function()
            { callback(); }
    , millis);
}

function doThis() {
    if ($(".fired")[0]) { console.log("Wait...");  } else { $(".action").click(); }
    sleep(5000, doThis);
}

doThis();