// ==UserScript==
// @name       Expand Zynga.com sidebar, Remove header bar
// @namespace  http://bigdev.net
// @version    0.1
// @description  Does what the name says
// @match      http://zynga.com/*
// @copyright  2012+, You
// ==/UserScript==
var $ = unsafeWindow.jQuery;
function expandSideBar() {
    
    if (typeof($)== undefined || $(".zui_zdc_common_rail_adShell").length == 0) {
        window.setTimeout(expandSideBar, 500);
        return;
    }
    $(".zui_zdc_common_rail_adShell").remove();
    $(".zui_zdc_common_rail_viewnav_showFullScreenButton").remove();
    $(".zui_zdc_common_rail_body").css("bottom", "0px").css("top", "0px"); 
    $(".zui_zdc_common_rail_toaster").css("display", "none");
    $(".zui_zdc_common_rail_tabsShell").css("display", "none");
    $(".zui_zdc_common_rail_tabContent").css("top","0px");
    $(".zui_zdc_gameboard_game_farmville-two").css("top", "0px");
    $("#header").remove();
    $("#rail-right-outer").css("top","0px");
}
expandSideBar();