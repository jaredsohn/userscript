scr_meta=<><![CDATA[
// ==UserScript==
// @name           Quake Live All sizes in BrowserMode
// @namespace      http://userscripts.org/users/194012
// @description    Lets you use all r_mode with r_inBrowserMode, including -1.
// @author         flugsio
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// ==/UserScript==
]]></>.toString();

var $ = unsafeWindow.jQuery,
quakelive = unsafeWindow.quakelive;

/* overrides StartGameMode to change set the custom width */
unsafeWindow.StartGameMode = function(width, height) {
    unsafeWindow.onbeforeunload = unsafeWindow.OnBeforeUnload;
    unsafeWindow.qlHidePrompt();
    $("#body-container").hide();
    quakelive.mod_friends.MoveTo("#qlv_game_mode_chatlist");
    unsafeWindow.SetGameModeDefaults();
    var c = "";
    c = width <= 640 ? "game_decoration_640" : width <= 800 ? "game_decoration_800" : "game_decoration_1024";
    g = $("#qlv_game_mode");
    g.attr("class", c);
    if(quakelive.cvars.cvarLookup["r_inbrowsermode"].value==-1) {
        width = parseInt(quakelive.cvars.cvarLookup["r_customwidth"].value);
        height = parseInt(quakelive.cvars.cvarLookup["r_customheight"].value);
    }
    $("#qlv_game_mode .game_wrapper")[0].style.width = (width + 334) + "px";
    $("#qlv_game_mode .game_wrapper")[0].style.height = (height + 110) + "px";
    $("#qlv_game_mode_viewport")[0].style.width = width + "px";
    $("#qlv_game_mode_viewport")[0].style.height = height + "px";
}
