// ==UserScript==
// @name       facebook-remove-ads
// @namespace  http://namingcrisis.net/
// @version    0.1
// @description Removes FB ads
// @match      https://*facebook.com/*
// @match      https://*facebook.com/?*
// @copyright  2012+, Kamal Advani
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// http://stackoverflow.com/questions/11036542/how-can-i-run-a-greasemonkey-script-when-page-changed-via-ajax/11036619#11036619

// set a high value, it's run on first refresh anyway
var CLEAR_INTERVAL = 11000;
var adDivIds = ["pagelet_ego_pane", "pagelet_ego_pane_w"]
    
function clearAdBar() {
    $.each(adDivIds, function(idx, elem) {
        $("div#" + elem).attr("style", "display: none");
    });
}

function setUpTimer() {
    window.setInterval(clearAdBar, CLEAR_INTERVAL);
}

setUpTimer();
