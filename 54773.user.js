// tiny_titles.user.js
//
// Copyright (c) 2009, Randy J. Ray
// This file is licensed under the terms of the Artistic License 2.0 as
// described at http://www.opensource.org/licenses/artistic-license-2.0.php
//
// Use and/or redistribution under the terms of the GNU Lesser GPL 2.1
// (http://www.opensource.org/licenses/lgpl-2.1.php) is also allowed.
//
// This is a GreaseMonkey user-script. To install and use this, you must first
// have GreaseMonkey installed in your browser: http://greasemonkey.mozdev.org/
//
// ==UserScript==
// @name        Hide CPAN TOC
// @version     20090730
// @author      Randy J. Ray
// @namespace   http://www.blackperl.com/javascript/greasemonkey/hide_cpan_toc
// @description Hide the default-displayed table of contents on search.cpan.org pages, replacing with an expand/collapse control.
// @include     http://search.cpan.org/dist/*
// ==/UserScript==

(
    function ()
    {
        var divs = document.getElementsByTagName("div");
        var tocElem = null;
        var contentElem = null;
        for (var idx = 0; idx < divs.length; idx++)
        {
            if (divs[idx].className == "toc")
            {
                tocElem = divs[idx];
            }
            else if (divs[idx].className == "indexgroup")
            {
                // Should have seen this one right after the previous
                contentElem = divs[idx];
                break;
            }
        }

        if ((tocElem != null) && (contentElem != null))
        {
            contentElem.style.display = "none";
            var style = document.createElement("style");
            // Doesn't seem to be a way to set/control CSS :hover properties
            // from JS, so insert a style block:
            style.innerHTML = "span.toc-hider:hover { text-decoration: underline; cursor: pointer; }";
            tocElem.insertBefore(style, contentElem);
            // By wrapping the clickable span in a div, I avoid having the
            // clickable area extends all the way to the right of the bounding
            // box:
            var div = document.createElement("div");
            div.style.display = "block";
            var span = document.createElement("span");
            span.className = "toc-hider";
            span.style.color = '#006699';
            span.style.paddingTop = '3px';
            span.innerHTML = '&laquo;&nbsp;Show Table of Contents&nbsp;&raquo;';
            span.addEventListener(
                'click',
                function (e) {
                    if (contentElem.style.display == "none")
                    {
                        // Currently hidden, show it
                        contentElem.style.display = "block";
                        span.innerHTML = '&laquo;&nbsp;hide&nbsp;&nbsp;';
                    }
                    else
                    {
                        // Currently visible, hide it
                        contentElem.style.display = "none";
                        span.innerHTML = '&nbsp;&nbsp;show&nbsp;&raquo;';
                    }
                },
                false);
            div.appendChild(span);
            tocElem.insertBefore(div, contentElem);
        }
    }
)();

