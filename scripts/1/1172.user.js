/******************************************************************************
 *
 * Informed Comment xSidebars
 * version 0.1
 * 2005-07-07
 * Copyright (c) 2005, Denis McLaughlin
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 *
 ******************************************************************************
 *
 * Informed Comment, Juan Cole's blog at http://juancole.com/ is very
 * interesting, but I never use the sidebars, so this script makes them
 * go away.
 *
 * Denis McLaughlin
 * denism@cyberus.ca
 * http://denism.homeip.net
 *
 *
 * Requirements:
 *  - Firefox
 *  - Greasemonkey http://greasemonkey.mozdev.org/
 *
 * To Install:
 *  - like any greasemonkey script: install greasemonkey, restart FF, open
 *    this script in a browser window, go to Tools/Install User Script
 *
 * To Uninstall:
 *  - like any greasemonkey script: Tools/Manage User Scripts, select Slashdot
 *    X-Sidebars, click the Uninstall button
 *
 * Changelog:
 *    July 7, 2005
 *    Denis McLaughlin
 *    Version 0.1
 *    - initial implementation
 *
 */

// ==UserScript==
// @name          Informed Comment xSidebars
// @namespace     http://denism.homeip.net/software/ic-xsidebars.html
// @description   Removes sidebars
// @include       http://juancole.com/*
// ==/UserScript==


(function()
{
    try
    {
        // this turns off the right hand sidebar
        div = document.getElementById("sidebar");
        div.style["display"] = "none";

        // this turns off the background image
        wrapper = document.getElementById("wrapper");
        wrapper.style["background"] = "#fff";

        // this increases the width of the main body
        main = document.getElementById("main");
        main.style["width"] = "690px";
    }
    catch (e)
    {
        alert("Informed Comment xSidebars - script exception: " + e );
    }
}
)();

