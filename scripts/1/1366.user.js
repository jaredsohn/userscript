// FitSizeToTablet
// version 0.1
// 2005-04-29
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Fit Size To Tablet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Fit Size To Tablet
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     
// @include         http://*
// ==/UserScript==

if (document.documentElement.scrollWidth > 700) 
{
    for (var i = 0; i < window.document.styleSheets.length; i++) 
    {
        var sheet = window.document.styleSheets[i];
        for (var j = 0; j < sheet.cssRules.length; j++) 
        {
            var rule = sheet.cssRules[j];
            if (rule.style["width"] != "") 
            {
                var matches = rule.style["width"].match(/^(.*)px$/)
                if (matches != null)
                {
                    if (parseInt(matches[1]) > 600) 
                    {
                        rule.style["width"] = "90%";
                    } 
                    /*else {
                    rule.style["width"] = "" + (parseInt(matches[1])*0.8) + "px";
                    GM_log(rule.style["width"]);
                    */
                }
            }
        }
    }
}