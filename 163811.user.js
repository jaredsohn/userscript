// ==UserScript==
// @name        IS24 Dashboard
// @namespace   de.mobile.immobilienscout24.rapidboard
// @description Beatifies our Jira Dashboards
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa?rapidView=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
$ = this.$ = this.jQuery = jQuery.noConflict(true);

const BACKGROUND_COLOR = "rgba(22, 75, 106, 1)";

function addCss(css) {
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
}

$(document).ready(function(){
    
    /* =================
     * Overall Background
     * ==================*/
    
    addCss(".dashboard { background: " + BACKGROUND_COLOR + " }");

    addCss("#dashboard-content { background: " + BACKGROUND_COLOR + " ;border:none}");    
    
	addCss("#header { background: " + BACKGROUND_COLOR + " }");    

    addCss("#jira .dashboard .gadget .gadget-menu .aui-dd-parent .gadget-colors li.color1, #jira .dashboard #dashboard-content div.gadget.color1 .gadget-hover .dashboard-item-title, #jira .dashboard #dashboard-content div.gadget.color1 .dashboard-item-title {background: " + BACKGROUND_COLOR + "}");
    
    /* =================
     * Header
     * ==================*/
    
    /* create separator */
    addCss("#header-bottom { display:none }");
    
    addCss("div.alertHeader { display:none }");
    
    /* =================
     * Charts
     * ==================*/
    
    addCss("div.gadget {height:400px}");
    
    addCss(".dashboard ul.column li.gadget {border:none}");
    
    addCss(".dashboard div.gadget .gadget-container {border:none}");
    
    addCss("#dash-options {display:none}");
    
    addCss(".dashboard.v-tabs ul.vertical {top:35px}");

    
});