// ==UserScript==
// @name           Fix donation bar
// @namespace      #TnB
// @description    Fixes donation bar.
// @copyright      2013+, TnB (http://userscripts.org/users/521590)
// @license        Creative Commons; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon           http://i.imgur.com/5hh3Snx.png
// @icon64         http://i.imgur.com/5hh3Snx.png
//
// @include        http://casualbananas.com/forums/
// @include        http://*.casualbananas.com/forums/
// @include        http://*.casualbananas.com/forums/index.php
// @include        http://casualbananas.com/forums/index.php
//
// @version        1.0.0
// ==/UserScript==

(function wrapper(window, injectNeeded, undefined) {
    if (injectNeeded) {
        var script = document.createElement('script');
        script.textContent = '(' + wrapper + ')(window, false)';
        document.body.appendChild(script);
        document.body.removeChild(script);
        return;
    }

    var $ = jQuery = window.jQuery;
    var progressbar,
        progressbarinner,
        s,
        elemText,
        elemTextU;

    progressbar = $(".trow1[colspan='5'] .progress-bar");
    progressbarinner = $(".trow1[colspan='5'] .progress-bar span");
    s = progressbarinner.attr("style");
    elemTextU = $('<span style="font-family: OswaldBook;font-size: 13px;margin-right: 10px;float: left;background: none;padding-top: 5px;z-index: 99;">2% ($23.00 / $1,000.00)</span>');
    elemText = $('span[style="font-family: OswaldBook;font-size: 13px;margin-right: 10px;float: right;background: none;padding-top: 5px;z-index: 99;"]');

    s = progressbarinner.attr("style");
    s = s.replace("width: ", "");
    s = s.replace("%", "");
    if (s > 12){
        elemText.css("display","block");
        elemTextU.css("display","none");
    }else{
        progressbar.after(elemTextU);
        elemText.css("display","none");
    }


})(this.unsafeWindow || window, window.chrome ? true : false);
