// ==UserScript==
// @name           Hacker News Comment Hiding
// @namespace      http://drostie.org/
// @include        https://news.ycombinator.com/item?id=*
// @include        http://news.ycombinator.com/item?id=*
// @include        https://news.ycombinator.com/threads?*
// @include        http://news.ycombinator.com/threads?*
// ==/UserScript==

/* This user script was authored by Chris Drost of drostie.org. To the extent 
 * possible by all laws in all countries, I hereby waive all copyright and any 
 * related rights under the Creative Commons Zero waiver/license, which you 
 * may read online at:
 * 
 *     http://creativecommons.org/publicdomain/zero/1.0/ 
 * 
 * This means that you may copy, distribute, modify, and use my script without 
 * any fear of lawsuits from me. It also means that my script is provided with 
 * NO WARRANTIES of any kind, so that I may have no fear of lawsuits from you.
 *
 * I always enjoy emails or messages about strange new places where my code 
 * and writings are being used, but I place no obligation on anyone to notify 
 * me of such things.
 */

function array(ls) {
    return Array.prototype.slice.call(ls, 0);
}
function repeat(element, selector, n) {
    return n <= 0 ? element : repeat(element[selector], selector, n - 1);
}
function ratings_from_comment(c) {
    return c.parentNode.previousSibling.firstChild;
}
function indent(b) {
    return repeat(b, 'firstChild', 6).width;
}
function children_of_comment(c) {
    var row = repeat(c, 'parentNode', 6),
        out = [], 
        indent_level = indent(row);
    function next() {
        row = row.nextSibling;
        return row !== null && row.getElementsByClassName("comment").length > 0 && 
                indent(row) > indent_level;
    }
    while (next()) {
        out.push(row);
    }
    return out;
}
var icon_hidden = "\u229E", // unicode: "squared plus"
    icon_shown = "\u229F", // unicode: "squared minus"
    comments = array(document.getElementsByClassName("comment"));

if (document.getElementsByClassName("title").length === 0) {
    // comment thread page, first comment replaces the root article.
    comments_list = comments_list.slice(1);
}
comments.forEach(function (c) {
    var child_rows = children_of_comment(c),
        shown = true,
        link = document.createElement("div"),
        target = ratings_from_comment(c);
    if (child_rows.length === 0) {
        return; // no sense in letting you hide nonexistent comments.
    }
    link.style.cursor = "pointer";
    link.style.fontSize = "12pt";
    link.innerHTML = icon_shown;
    link.onclick = function () {
        if (shown) {
            child_rows.forEach(function (r) {
                if (!r.hidden_by) {
                    r.hidden_by = c;
                    r.style.display = "none";
                }
            });
            link.innerHTML = icon_hidden;
            shown = false;
        } else {
            child_rows.forEach(function (r) {
                if (r.hidden_by === c) {
                    r.hidden_by = undefined;
                    r.style.display = "block";
                }
            });
            link.innerHTML = icon_shown;
            shown = true;
        }
        return false;
    };
    target.appendChild(link);
});