// ==UserScript==
// @name          Yet Another Gmail Row Highlight
// @description   Highlight current row which the arrow indicates.
// @author        xiaogaozi
// @version       0.0.1
// @license       GPLv3
// @include       http://mail.google.tld/*
// @include       https://mail.google.tld/*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

/*
 * Yet Another Gmail Row Highlight <http://userscripts.org/scripts/show/62644>
 * Copyright (C) 2009  xiaogaozi <gaochangjian@gmail.com>
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var previous_row = null;        // store previous row

function highlightCurrentRow()
{
    var canvas = $("#canvas_frame").contents();
    if (canvas.length == 0)
        return;
    var current_arrow = $("table.zt tr img[style*='visibility: visible;']", canvas);
    /*
     * If there isn't specific arrow, just get out of here.
     */
    if (current_arrow.length == 0)
        return;

    var current_row = current_arrow.parent().parent(); // yeah, you get it.

    if (previous_row == null)   // initialize `previous_row'
    {
        previous_row = current_row;
    }
    else if (previous_row.text() != current_row.text()) // the arrow has moved
    {
        previous_row.removeAttr("style");
        previous_row = current_row;
    }
    else if (previous_row.text() == current_row.text())
    {
        return;
    }

    // if (current_row.hasClass("zE")) // current mail hasn't read
    // {
    //     current_row.attr("style", "background-color: rgb(205,243,159);");
    // }
    // else if (current_row.hasClass("yO")) // current mail has read
    // {
    //     current_row.attr("style", "background-color: rgb(255,235,134);");
    // }
    current_row.attr("style", "background-color: rgb(205,243,159);");
}

/*
 * Main function.
 */
(function()
 {
     $(document).ready(function() {
         /*
          * Execute this function during specific time.
          */
         setInterval(highlightCurrentRow, 50);
     });
 })();
