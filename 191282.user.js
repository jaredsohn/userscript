// ==UserScript==
// @name            Hack Forums Private Message Preview
// @namespace       Snorlax
// @description     Preview private messages
// @require         http://code.jquery.com/jquery-2.0.3.js
// @require         http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource        jqueryUI //code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @include         *hackforums.net/*
// @version         1.01
// ==/UserScript==

var newCSS = GM_getResourceText("jqueryUI");
GM_addStyle(newCSS);

$("#pm_notice a:last").after('<span id="previewPM" class="quick_jump" style="font-size: 13px;cursor:pointer;">▼</span>');

previewContainer = '<div id="draggable" class="ui-widget-content" style="width:600px; height:300px; position:absolute; padding-top:8px; background:#333; border:2px solid purple; z-index:9999999; display:none;"> \
<div id="closeWindow" style="float:right; position:relative; color:white; cursor:pointer; ">[x]</div> \
<div>Loading</div> \
</div>';

$("#pm_notice").after(previewContainer);
$("#draggable").draggable();

$("#previewPM").click(function() {
    $("#draggable").show();
    pmid = $(this).parentsUntil("#pm_notice").find("a:nth-child(3)").attr("href").replace(/[^0-9]/g, '');
    $.ajax({
        type: "GET",
        url: "http://www.hackforums.net/private.php?action=read&pmid=" + pmid,
        async: true,
        data: "",
        success: function(data){
            siteStuff = $(data).find("#post_").clone();
            siteStuff.find("tr:lt(2)").remove();
            $("#draggable div:last").html(siteStuff);
        }
    });
    
});

$("#closeWindow").click(function() {
    $("#draggable").hide();
});