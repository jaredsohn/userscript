// ==UserScript==
// @name            better-badoo
// @identifier      http://userscripts.org/scripts/source/65827.user.js
// @description     Import: Uncheck for unregistered contacts. Removes the empty image positioned over photos.
// @namespace       http://userscripts.org/users/125537
// @include         http://*.badoo.com/*
// @include         http://badoo.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require         http://buzzy.hostoi.com/AutoUpdater.js
// @author          http://www.dotek.info
// @copyright       2010, Dotek.info
// @date            2010-01-08
// @license         Creative Commons CC-BY-SA; http://creativecommons.org/licenses/by-sa/3.0/
// @version         0.1
// @unwrap
// ==/UserScript==

var script_id = 65827;
var script_version = '0.1';

// Import: Uncheck for unregistered contacts
// http://badoo.com/import/
if($("#sf_clist_place")) {
    var count = 0;
    $("#sf_clist_place tr").each(function (i) {
        $(this).find("input[type='checkbox']").removeAttr("checked");
        if($(this).find(".share_con_st").attr("title")) {
            $(this).find("input[type='checkbox']").attr("checked","checked");
            if(!$(this).find("input[type='checkbox']").attr("disabled")) {
                count++;
            }
        }
    });
    $("#f_submit").html($("#f_submit").text()+' (<b>'+count+'</b>)');
}

// Removes the empty image positioned over photos
if($("body").is("#pw_blur")) {
    $("#pw_blur").hidden();
}