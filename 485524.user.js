// ==UserScript==
// @name       Ball3D FullScreen
// @version    0.2a
// @description  Make Ball3D full screen
// @match      http://www.ball3d.com/
// @copyright  2012+, Hello
// ==/UserScript==

$(document).ready(function() {
    var d = $(document);
    var unity = $("#unityPlayer");
    
    function resize() {
        unity.css("width", d.width()).css("height", d.height());
    };

    $(document.body).html(unity);
    unity.css("visibility", "visible").css("position", "fixed").css("top", 0).css("left", 0).css("margin", 0);
    resize();
    $(window).resize(resize());
});