// ==UserScript==
// @name        Google+ magnifier
// @namespace   aelys-info.fr
// @include     https://plus.google.com/*
// @include     http://plus.google.com/*
// @version     3
// ==/UserScript==
(function () {

    var posref = 70

    function cursorPosition(event)
    {
        var posy = event.clientY;
        var scpos = document.documentElement.scrollTop;
        if ((scpos == 0) && (posy > posref)) {
            scroll(0, posref);
        }
    }

    function testScroll(event)
    {
        var sypos = document.documentElement.scrollTop;
        if ((sypos == 0) && (posy > posref)) {
            scroll(0, posref);
        }
    }

    try
    {
        testScroll;
        window.onscroll = testScroll;
        document.onmousemove = cursorPosition;
        setTimeout(testScroll, 500); 
    }
    catch (e)
    {
        alert("UserScript exception:\n" + e);
    }
 
})();
