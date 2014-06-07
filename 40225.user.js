// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Edit Source When View
// @namespace       http://cuimingda.com
// @description     [ userscripts.org ] Add an edit link on source code view page, instead of the one on about page.
// @include         http://userscripts.org/scripts/review/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
// 0.1 @ 2009/01/11 # Initial Release
// --------------------------------------------------------------------------------

;(function() {
    $(document.createElement("a"))
        .text("Edit/Update Source")
        .attr("href", "/scripts/edit_src/" + location.href.match(/\d+/))
        .appendTo($("#script-nav")).wrap(document.createElement("li"));
})();