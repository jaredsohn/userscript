// ==UserScript==
// @name        /r/dailydraw theme helper
// @namespace   http://www.reddit.com/r/dailydraw
// @description Copy selected text of /r/dailydraw suggestion as reddit markup suitable for daily theme
// @include     http://www.reddit.com/r/dailydraw/comments/*/weekly_suggestion_box_*/
// @version     2
// @grant       none
// ==/UserScript==

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, 
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
};

getSelected = function () {
    var t = '';
    if (window.getSelection){
        t = window.getSelection();
    }
    else if (document.getSelection){
        t = document.getSelection();
    }
    else if (document.selection){
        t = document.selection.createRange().text;
    }
    return t;
}

var m_names = ["January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November",
               "December"];
var m_names_abbr = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July",
                    "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

function parse(comment) {
    var author = $(comment).find(".author:first").text();
    var link = $(comment).find("a.bylink:first").attr("href");
    return { "author" : author, "link" : link };
}

$(".comment")
    .find(".buttons")
    .append('<li><a class="dailydraw_new_theme" href="javascript:void(0)">new theme</a></li>')
    .append('<li><a class="dailydraw_new_text" href="javascript:void(0)">get theme (text)</a></li>')
    .append('<li><a class="dailydraw_get_alt_theme" href="javascript:void(0)">get alt</a></li>');

$(".comment")
    .append('<div><textarea class="dailydraw_text" rows="5" cols="80"></textarea></div>');

$(".dailydraw_text").toggle();

$(".dailydraw_new_text")
    .click(function () {
        var selection = getSelected() + "";
        selection = selection.trim().toTitleCase();

        var comment = $(this).closest(".comment");
        var data = parse(comment);

        var text = "Thanks [" + data.author + "](" + data.link + ")!\n\n";

        comment.find("textarea").show().val(selection + "\n" + text).select();
    });

$(".dailydraw_new_theme")
    .click(function () {
        var selection = getSelected();
        // title
        var d = new Date();
        var day = d.getDate();
        var month = m_names_abbr[d.getMonth()];
        title = month + " " + day + ": " + selection;

        var comment = parse($(this).closest(".comment"));
        var text = "Thanks [" + comment.author + "](" + comment.link + ")!\n\n>" + selection;

        var params = $.param({
            'selftext': true,
            'title': title,
            'text': text,
        });

        window.open("http://www.reddit.com/r/dailydraw/submit?" + params);
    });

$(".dailydraw_get_alt_theme")
    .click(function () {
        var comment = $(this).closest(".comment");
        var data = parse(comment);
        var text = "Or **" + getSelected() + "**, thanks [" + data.author + "](" + data.link + ")!";
        //window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
        comment.find("textarea").show().val(text).select();
    });
