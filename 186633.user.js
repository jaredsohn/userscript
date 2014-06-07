// ==UserScript==
// @name           doit.im
// @version     1.0
// @namespace      http://d.hatena.ne.jp/tech-kazuhisa/
// @include        https://i.doit.im/*
// ==/UserScript==
(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s1.addEventListener('load', function () {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function ($) {
    // Main Code write here.
    $(document).ready(function ($) {
      $('#task_container').css("background-image","url(http://dic.nicovideo.jp/oekaki/663056.png)");
    });
});