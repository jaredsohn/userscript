// ==UserScript==
// @name           noads_blocket
// @namespace      www.edholm.com/grease
// @description    Remove ads from blocket.se
// @include        http://www.blocket.se/*
// @version        2011-07-23 20:55
// ==/UserScript==

/*  =====================================================================

    Copyright 2010-2011  Jan Edholm

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    ===================================================================== */
(function doIt() {
    var i, flag, foo, fo2, fo3, regex1, regex2;

    if (window.top != window.self)  //don't run on frames or iframes
    {
        // GM_log('Script running in frame');
        return;
    }

    // Remove named elements
    foo = document.getElementById('banner_list_top');
    if (foo) {
        foo.parentNode.removeChild(foo);
    }
    foo = document.getElementById('ehandel_search_iframe');
    if (foo) {
        foo.parentNode.removeChild(foo);
    }
    foo = document.getElementById('right_bar');
    if (foo) {
        foo.parentNode.removeChild(foo);
    }
    foo = document.getElementById('ehandel_iframe');
    if (foo) {
        foo.parentNode.removeChild(foo);
    }
    foo = document.getElementById('footer_gallery');
    if (foo)
    {
        foo.parentNode.removeChild(foo);
    }

    // Remove top banner div (subpages)
    foo = document.getElementById('banner_view_top');
    if (foo) {
        foo.parentNode.removeChild(foo);
    }

    // Remove top right ads
    foo = document.getElementsByClassName('searchbox_mini');
    if (foo && foo.length == 1) {
        foo[0].parentNode.removeChild(foo[0]);
    }
    foo = document.getElementsByClassName('top_items');
    if (foo && foo.length == 1) {
        for (i = foo[0].childNodes.length - 1; i >= 0; i--) {
            if (foo[0].childNodes[i].id != "news") {
                foo[0].childNodes[i].parentNode.removeChild(foo[0].childNodes[i]);
            }
        }
    }

    // Remove right column ad (subpages only)
    foo = document.getElementsByClassName('right_bar');
    if (foo && foo.length == 1 && foo[0].className.match(/(^|\\s)lazy_iframe(\\s|$)/) > -1)
    {
        foo[0].parentNode.removeChild(foo[0]);
    }

    // Clear & resize top right div ad
    foo = document.getElementById('blocket');
    if (foo && foo.childNodes.length > 0) {
        fo2 = foo.getElementsByTagName("div");
        if (fo2.length > 0 && fo2[0].innerHTML != "")
        {
            fo2[0].innerHTML="&nbsp;"
            fo2[0].style.height="5px"
        }
    }
}());