// ==UserScript==
// @name        Intervals.com Hide Timer Dock
// @namespace   intervalsonline.com
// @include     http://*.intervalsonline.com/*
// @include     https://*.intervalsonline.com/*
// @version     1.3
// ==/UserScript==
(function () {
 
    function gmRemovedockRow()
    {
        var dockRowDIV = document.getElementById("dock");
        dockRowDIV.style.display = "none";
    }

    try
    {
        setTimeout(gmRemovedockRow, 0);
    }
    catch (e)
    {
        alert("UserScript exception:\n" + e);
    }
 
})();