// ==UserScript==
// @name Trello Red Hat Bugzilla Integration
// @namespace http://lukebrooker.com
// @version 0.3
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @description Looks for card titles with 'Bug \d+' and adds badge/links to bugzilla. Also autocompletes card titles that contain 'Bug \d+' from bugzilla. Autocomplete is actived when pressing `:` after 'Bug \d+'. Originally based on https://github.com/cmadsen/TrelloBugzilla
// @match https://trello.com/*
// @copyright 2012+, Carsten Madsen and Luke Brooker
// ==/UserScript==


// grey bugz icon
var bugzillaImg = '<svg style="height: 16px; width: 16px;" xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="8" cy="8" r="8" fill="#CC0000" /></svg>';

// edit me to point somewhere else
var bugzillaLink = 'https://bugzilla.redhat.com/show_bug.cgi?id=';

var addBugzillaBadge = function() {
    jQuery(".list-card-title, card-detail-title").each(function(i,val){
    if (jQuery(this).html().match(/Bug \d+/)) {
        var regExpMatch = jQuery(this).html().match(/Bug (\d+)/);
        if (jQuery(this).parent().find(".bugz").length < 1){
            var bugLink = '<a class="bugz" target="_blank" href="'+bugzillaLink+regExpMatch[1]+'">' + bugzillaImg + '</a>';
          jQuery(this).parent().children('.badges').append(bugLink);
          }
      }
    });
    jQuery(".badges .bugz").click(function(e) {
      e.stopPropagation();
  	})
};

// intercept spacebar press when creating new cards and look in
// bugzilla to do possible autocomplete

unsafeWindow.jQuery("body").on("keypress", ".js-card-title, .card-detail-title textarea", function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(String.fromCharCode(code) == ":") { //colon keycode
    console.log("Semicolon");
    var text = jQuery(this).val();
    var regExpMatch = text.match(/Bug (\d+)/);
    var textarea = jQuery(this);
    if (regExpMatch) {
        var controls = textarea.parent().next(".cc-controls"),
            editControls = textarea.next(".edit-controls")
        jQuery("#bugzilla-search").remove();
        controls.append('<span id="bugzilla-search" style="float: left;padding: 7px 3px;font-size: 12px;color: #999;">Searching…</span>');
        editControls.append('<span id="bugzilla-search" style="float: left;padding: 7px 3px;font-size: 12px;color: #999;">Searching…</span>').find('.icon-lg').css("float","left");
        // see http://stackoverflow.com/questions/11007605/gm-xmlhttprequest-why-is-it-never-firing-the-onload-in-firefox
        setTimeout(function() {GM_xmlhttpRequest({
        method: "GET",
        url: bugzillaLink+regExpMatch[1],
        onload: function(response) {
            var jq = jQuery(response.responseText),
                jqtext = jq.find("#short_desc_nonedit_display").text();
            if (jqtext) {
            	textarea.val(textarea.val() + " " + jqtext);
            	jQuery("#bugzilla-search").remove();
            }
            else {
            	jQuery("#bugzilla-search").remove();
        		controls.append('<span id="bugzilla-search" style="float: left;padding: 7px 3px;font-size: 12px;color: #999;">Not found.</span>');
                editControls.append('<span id="bugzilla-search" style="float: left;padding: 7px 3px;font-size: 12px;color: #999;">Not found.</span>');
            }
        },
        onerror: function(response) {
            jQuery("#bugzilla-search").remove();
         	controls.append('<span id="bugzilla-search" style="float: left;padding: 7px 3px;font-size: 12px;color: #999;">Failed.</span>');
            editControls.append('<span id="bugzilla-search" style="float: left;padding: 7px 3px;font-size: 12px;color: #999;">Failed.</span>');
        }
        })}, 0);
    }
    }
});

setInterval(addBugzillaBadge, 5000);
