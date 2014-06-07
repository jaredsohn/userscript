// ==UserScript==
// @name            Userscript for vitafortis
// @namespace       Snorlax
// @description     Magic stuff!
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://code.jquery.com/ui/1.10.4/jquery-ui.js
// @include         *hackforums.net/*
// @version         1.1
// ==/UserScript==

if(window.location.href.indexOf("hackforums.net/managegroup.php?gid=") >= 1) {
    members = [];
    $(".tborder span[class*='group']").each(function() {
        members.push($(this).text());
    });
    $("strong:contains('Members in ')").after(" - <input type='button' class='button' id='vitaGenerate' value='Click'>");
    $("#vitaGenerate").on("click", function() {
        $('<textarea id="pushHere" style="margin-bottom: 20px;"></textarea>').dialog({
            width: 200,
            height: 600,
            dialogClass: 'dialogClass'
        });
        for(i=0;i<members.length;i++){
            $("#pushHere").append(members[i] + "\n");
        }
    });
}

if(window.location.href.indexOf("hackforums.net/misc.php?action=whoposted&tid=") >= 1) {
    members = [];
    $("span[class*='group']").each(function() {
        members.push($(this).text());
    });
    $("strong:contains('Total Posts:')").after(" - <input type='button' class='button' id='vitaGenerate' value='Click'>");
    $("#vitaGenerate").on("click", function() {
        $('<textarea id="pushHere" style="margin-bottom: 20px;"></textarea>').dialog({
            width: 200,
            height: 400,
            dialogClass: 'dialogClass'
        });
        for(i=0;i<members.length;i++){
            $("#pushHere").append(members[i] + "\n");
        }
    });
}