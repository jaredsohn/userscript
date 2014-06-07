// ==UserScript==
// @name           ESPN_PauseComments
// @namespace      http://userscripts.org
// @description    checkbox to pause new user comments from being added to conversation
// @include        *espn.go.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.js
// ==/UserScript==
//
//Author: Mark_13


function paused (zEvent) {
    return false;
}


function pause_click () {
       
    if (this.checked) {
        unsafeWindow.jQuery("div.echo-item-content:first").mouseover();
        unsafeWindow.jQuery("div.echo-item-content").bind("mouseout", paused);
    }
    else {
        unsafeWindow.jQuery("div.echo-item-content").unbind("mouseout", paused);
        unsafeWindow.jQuery("div.echo-item-content:first").mouseout();
    }
}


function add_pause_checkbox() {

  unsafeWindow.jQuery(".echo_sort_down").after("<span style='position:relative; top:2px; margin-left:20px;'><input  type='checkbox' id='pause_gm'  onClick='pause_click()' /><span style='position:relative; top:-2px;'>Pause</span></span>");

  unsafeWindow.jQuery("#pause_gm").click(pause_click);

}


unsafeWindow.jQuery(document).ready(add_pause_checkbox);
