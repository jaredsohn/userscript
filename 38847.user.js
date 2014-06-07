// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Userscripts.org SCS
// @namespace       http://cuimingda
// @description     Add Red-S to view source code in script list
// @include         http://userscripts.org/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @resource        sourceImage http://cuimingda.googlecode.com/svn/trunk/scripts/38847/source.png
// ==/UserScript==
//
// 0.1 @ 2008/12/18 # Initial Release
// 0.2 @ 2008/12/20 # Added Greasemonkey meta require, need reinstall script
// 0.3 @ 2008/12/24 # Deal with all pages in userscripts.org
// --------------------------------------------------------------------------------

;(function() {
    $(document).ready(function() {
        var reScriptUrl = /^\/scripts\/show\/(\d+)$/;
        
        $("a[href]").each(function() {
            if(!reScriptUrl.test($(this).attr("href")) || $(this).text() === "About" || $(this).text() === "cancel") return;
            
            var scriptId = $(this).attr("href").match(reScriptUrl)[1];
            var sourceImage = "<img src='" + GM_getResourceURL("sourceImage") + "'/>";
            
            $(this).after("<a href='/scripts/review/" + scriptId + "'>" + sourceImage + "</a>");
        });
    });
})();