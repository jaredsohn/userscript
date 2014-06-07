// ==UserScript==
// @name           Krautkanal Funktionsbefähiger
// @description    Zu 4Kanal-Funktionen befähigen
// @include        http://krautchan.net/*/thread-*
// @require        http://code.jquery.com/jquery-latest.min.js
// @grant          none
// ==/UserScript==

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number){ 
        return typeof (args[number] != 'undefined') ? args[number] : match;
    });
}

function getMatches(string, regex, index) {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

$(document).ready(function(){
    // hover reply
   $("body").on("mouseover", ".hover_repl", function(event) {
        var this_id = $(this).attr("id").split("-")[1];
        var repl_html = $("#post-"+this_id).html();
        $("body").append( 
            "<div style='border:2px dashed rgb(68, 68, 136);\
            position:fixed;z-index:99;top:{0}px;left:{1}px;\
            background:#aaaacc;' id='hoverino'>{2}</div>".format(
                event.clientY, (event.clientX+10), repl_html)
        );
        try { // Referenzierenden Elfenjungen in Pfosten markieren 
            var this_parent_id = $(this).parent().parent().attr("id").split("-")[1]
        }
        catch (err) { // Fagott wird referenziert
            var this_parent_id = location.href.split("-")[1].split(".")[0];
        } // Pünktchen
        $("#hoverino").find("a[href=#"+this_parent_id+"]").css(
            {'text-decoration': 'none', 'border-bottom': '1px dashed'}
        );
    });
    $("body").on("mouseout", ".hover_repl", function(event) {
        $("#hoverino").remove();
    });
    // hover quote
    $("body").on("mouseover", "blockquote > p > a", function(event) {
        var this_id = $(this).attr("href").split("#")[1];
        if (this_id == fagott_id) return;
        
        var repl_html = $("#post-"+this_id).html();          
        $("body").append(
            "<div style='border:2px dashed rgb(68, 68, 136);\
            position:fixed;z-index:99;top:{0}px;left:{1}px;\
            background:#aaaacc;' id='hoveronimo'>{2}</div>".format(
                event.clientY, (event.clientX+10), repl_html)
        );
    });
    $("body").on("mouseout", "blockquote > p > a", function(event) {
        $("#hoveronimo").remove();
    });
    // op ist fagott
    var fagott_id = $(".postbody > blockquote > p").attr("id").split("_")[2];
    var replies = $("td.postreply");
    var replies_comment = $("td.postreply > div > blockquote > p");
    $.each(replies_comment, function (i, rep) {
        var mess = $(rep).html();
        var m = getMatches(mess, /href="#([0-9]*)"/g, 1);
        $.each(m, function (j, x) {
            var replied_id = $(replies[i]).attr("id").split("-")[1];
            var neu_link = "<span class='hover_repl' style='font-size:70%;'\
                id='hover-{0}'><a href='#{0}'>&gt;&gt;{0}</a></span> ".format(
                replied_id) 
            if(x == fagott_id) {
                $(".postheader").first().append(neu_link);
            } else {
                $("#post-"+x+" > .postheader").append(neu_link);
            }
        });
    }); // fagott markieren, fagott kann man nicht hovern
    $.each($("blockquote > p > a"), function() {
        var this_id = $(this).attr("href").split("#")[1];
        if (this_id == fagott_id) 
            $(this).text($(this).text()+ " (OP)");
    });
});
