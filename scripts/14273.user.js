// vim: et ai nu tw=80 sw=4 ts=4 sts=4
//
// ==UserScript==
// @name           SlimTimer Static Sidebar Note
// @namespace      http://www.arthaey.com
// @description    Adds static sidebar notes to SlimTimer pages.
// @include        http://www.slimtimer.com/tasks*
// @include        http://www.slimtimer.com/edit*
// @include        http://www.slimtimer.com/report*
// @version        1.0
// ==/UserScript==

/* HOW TO USE:
 *   Edit the createContent() method to return the HTML you want displayed
 *   in the sidebar.
 */

window.addEventListener("load", function () {

    /* EDIT ME to return the HTML you want in the sidebar */
    function createContent() {
        var bCSS = "font: bolder 12px Arial";
        return '<b style="' + bCSS + '">Tag Legend</b>' +
               '<ul style="margin-left: 10px">' +
               '<li>@location</li>' +
               '<li>+project</li>' +
               '<li>general category</li>' +
               '</ul>'
               ;
    }

    // same method of rounder corners as used by SlimTimer
    function createBorder(loc) {
        var border = document.createElement("div");
        border.style.backgroundColor = "rgb(255,255,255)";

        css = [
            ["2px", "1px", "3px", "3px"],
            ["1px", "1px", "2px", "2px"],
            ["1px", "1px", "1px", "1px"],
            ["1px", "2px", "0px", "0px"]
        ];

        // reverse array if location is bottom
        if (loc == "bot") {
            var tmp, j;
            for (var i = 0; i * 2 <= css.length; i++) {
                j = css.length - 1 - i;
                tmp = css[i];
                css[i] = css[j];
                css[j] = tmp;
            }
        }

        innerHTML = '';
        for (var i = 0; i < css.length; i++) {
            innerHTML += '<span style="border-style: solid; ' +
                         'border-color: rgb(246,246,246); ' +
                         'border-width: 0px ' + css[i][0] + '; ' +
                         'overflow: hidden; ' +
                         'background-color: rgb(238,238,238); ' +
                         'display: block; ' +
                         'height: ' + css[i][1] + '; ' +
                         'font-size: 1px; ' +
                         'margin-left: ' + css[i][2] + '; ' +
                         'margin-right: ' + css[i][3] + ';"></span>'
                         ;
        }
        border.innerHTML = innerHTML;

        return border;
    }

    function addSidebarNote(contentsHTML) {
        var sidebar = document.getElementById("secondary-sidebar");
        if (!sidebar) return;

        var spacing = document.createElement("div");
        spacing.style.height = "10px";
        spacing.style.backgroundColor = "white";

        var topBorder = createBorder("top");
        var botBorder = createBorder("bot");

        var content = document.createElement("div");
        content.className = "content";
        content.innerHTML = contentsHTML;

        sidebar.appendChild(spacing);
        sidebar.appendChild(topBorder);
        sidebar.appendChild(content);
        sidebar.appendChild(botBorder);
    }

    addSidebarNote(createContent());

}, true);
