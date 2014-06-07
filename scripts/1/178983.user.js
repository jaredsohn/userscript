// ==UserScript==
// @name       Hide or show toggle for sidebar on Lojban Tiki
// @version    1.0
// @description Disable or enable the sidebar on Lojban Tiki. By default, it is hidden.
// @match      http://www.lojban.org/tiki/*
// @copyright  2013+, Dan Rosén
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant      none
// ==/UserScript==

$(document).ready(function() {
    var sidebar_show = false;
    var sidebar_toggle = function () {
        console.log("Toggle to ", sidebar_show);
        $("#mod-lojban_org_Menul1").toggle(sidebar_show);
        $(".box-google_search").toggle(sidebar_show);
        $(".box-switch_lang").toggle(sidebar_show);
        if (sidebar_show) {
            $("#col1").css("margin-left","");
        } else {
            $("#col1").css("margin-left","0px");
        }
        sidebar_show = !sidebar_show;

    };
    sidebar_toggle();
    $(".box-lojban_org_Menu>.clearfix").first().click(sidebar_toggle);
});

