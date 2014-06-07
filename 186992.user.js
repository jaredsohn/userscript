// ==UserScript==
// @name            Hack Forums Easy citing on reply
// @namespace       Snorlax
// @description     Cite a member really easy!
// @require         http://code.jquery.com/jquery-2.0.3.js
// @require         http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource        jqueryUI //code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @include         *hackforums.net/newreply*
// @include         *hackforums.net/newthread*
// @include         *hackforums.net/showthread*
// @version         1.02
// ==/UserScript==

var newCSS = GM_getResourceText("jqueryUI");
GM_addStyle(newCSS);

citeContainer = '<div id="draggable" class="ui-widget-content" style="width:450px; height:300px; overflow:scroll; position:absolute; padding-top:8px; background:#333; border:2px solid purple; z-index:9999999; display:none;"> \
<div id="closeWindow" style="float:right; position:relative; color:white; cursor:pointer; ">[x]</div> \
<center><input id="usernameSearch" placeholder="Username" type="text" /><br /> \
<input type="button" class="button" id="usernameButton" value="Search" /><hr> \
<div><span>Result will be shown here.<br />Type in an username then click search.<br />Cite the person by clicking \"cite\" next to their username.<br />Drag this window around to make it fit!</span></div></center> \
</div>';

if(window.location.href.indexOf("showthread.php") > -1) {
    $(".thead strong:contains('Quick Reply')").after(" <a href='javascript:void(0);' id='quickCite' class='smalltext'>Quick Cite</a>");

} else {
    $("a[href*='member.php']:contains('log out')").parentsUntil(".smalltext").parent().after(" <a href='javascript:void(0);' id='quickCite' class='smalltext'>Quick Cite</a>");
}
$("#quickCite").after(citeContainer);
$("#draggable").draggable();

$("#quickCite").click(function() {
    $("#draggable").show();
});

$("#closeWindow").click(function() {
    $("#draggable").hide();
});

var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

$("#usernameButton").click(function() {
    usernameSearch = $("#usernameSearch").val();
    $.ajax({
        type: "GET",
        url: "http://www.hackforums.net/memberlist.php?username=" + usernameSearch + "&sort=lastvisit&order=descending&submit=Search",
        async: true,
        data: "",
        success: function(data){
            siteStuff = $(data).find(".tborder:last").clone();
            siteStuff.find("tr:first").remove();
            siteStuff.find("a[href*='member.php']").after(" <a class='smalltext' id='citeUser' style='color:#9999FF;' href='javascript:void(0);'>cite</a>");
            $("#draggable div:last").html(siteStuff);
            $("a:contains('cite')[href='javascript:void(0);']").click(function() {
                url = $(this).prev().attr("href");
                username = $(this).prev().find("span").text();
                color = rgb2hex($(this).prev().find("span").css("color"));
                if(window.location.href.indexOf("showthread.php") > -1) {
                    insertAtCaret('message',"[url=" + url + "][color=" + color + "]" + username + "[/color][/url]");
                } else {
                    insertAtCaret('message_new',"[url=" + url + "][color=" + color + "]" + username + "[/color][/url]");
                }
            });
        }
    });
});

function insertAtCaret(areaId,text) {
    if(window.location.href.indexOf("showthread.php") > -1) {
        var txtarea = document.getElementById("message");
    } else {
        var txtarea = document.getElementById("message_new");
    }
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
              "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;
        
        var front = (txtarea.value).substring(0,strPos);  
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
        txtarea.scrollTop = scrollPos;
}