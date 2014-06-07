// ==UserScript==
// @name       LF Endless Scroll
// @namespace  http://ellelelelelajaxscroll/
// @version    0.9
// @description  Scroll Seemlessly with this plugin; with no need to click "next" on a thread.
// @match http://www.leakforums.org/showthread.php?tid=*
// @match http://*.leakforums.org/showthread.php?tid=*
// @copyright  2013+, Oscar Sanchez
// @downloadURL https://userscripts.org/scripts/source/178313.user.js
// @updateURL https://userscripts.org/scripts/source/178313.meta.js
// @icon http://x.leakforums.org/images/leakforums/dot_newhotlockfolder.gif
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @run-at document-end
// ==/UserScript==

host = location.origin, page = location.pathname;

$("head").append("<style>#quick_reply_form{z-index:10;position: fixed; bottom: -243px; opacity: .8; transition: all .5s; width: -moz-calc(90% + 40px); width: -webkit-calc(90% + 40px); width: -o-calc(90% + 40px); width: calc(90% + 40px); margin-left: -20px;} #quick_reply_form:hover{bottom:0;opacity:1} #quick_reply_form .expcolimage { display:none }#quickreply_e td:nth-of-type(2)>div{width:98% !important} .messageEditor{width: 100% !important; height: 165px !important;} .messageEditor div:nth-of-type(3){width:100% !important} #message_new{width: 98% !important; height: 95px !important;}</style>");
$("#quickreply_e textarea").html('<td class="trow2"><textarea id="message" name="message" style="width: 100%; height: 100px;" tabindex="2"></textarea></td>');
(function () {
    var url = "/jscripts/editor.js";
    $.getScript(url, function () {
        var editor_language = { title_bold: "Insert bold text", title_italic: "Insert italic text", title_underline: "Insert underlined text", title_left: "Align text to the left", title_center: "Align text to the center", title_right: "Align text to the right", title_justify: "Justify text", title_numlist: "Insert numbered list", title_bulletlist: "Insert bulleted list", title_image: "Insert image", title_hyperlink: "Insert hyperlink", title_email: "Insert email address", title_quote: "Insert quoted text", title_code: "Insert formatted code", title_php: "Insert formatted PHP code", title_close_tags: "Close any open MyCode tags that you currently have open", enter_list_item: "Enter a list item. Click cancel or leave blank to end the list.", enter_url: "Please enter the URL of the website.", enter_url_title: "Optionally, you can also enter a title for the URL.", enter_email: "Please enter the email address you wish to insert.", enter_email_title: "Optionally, you may also enter a title for the email address.", enter_image: "Please enter the remote URL of the image you wish to insert.", enter_video_url: "Please enter the URL of the video.", video_dailymotion: "Dailymotion", video_metacafe: "MetaCafe", video_myspacetv: "MySpace TV", video_vimeo: "Vimeo", video_yahoo: "Yahoo Video", video_youtube: "YouTube", size_xx_small: "XX Small", size_x_small: "X Small", size_small: "Small", size_medium: "Medium", size_large: "Large", size_x_large: "X Large", size_xx_large: "XX Large", font: "Font", size: "Text Size", color: "Text Color" };
        var clickableEditor = new messageEditor("message", {
            lang: editor_language,
            rtl: 0,
            theme: "../jscripts/editor_themes/Leakforums5"
        });
    });

})();

$(document).keydown(function (e) {
    if (e.which == 83) if (e.altKey) $("#message").val($("#message_new").val());
});

$('#quick_reply_submit').on("click keydown", function () {
    $("#message").val($("#message_new").val());
     $('#quick_reply_form').submit();
    return false;
});

$('#quick_reply_form').submit(function () {
    $("#message").val($("#message_new").val());
    return true;
});

atbottom = false;
$(window).scroll(function () {
    if (($(document).scrollTop() > (document.body.offsetHeight - 3000)) && (!(atbottom)) && ($(".pagination_next").length !== 0)) {
        atbottom = true;
        loadertable = '<table border="0" cellspacing="0" cellpadding="4" class="tborder" style="margin-top:5px" id="loadingtable"> <tbody> <tr> <td class="tcat"> <div class="float_left smalltext">Loading next page...</div> </td> </tr> <tr> <td class="trow2 post_content"> <div class="post_body"><img id="loadingimg" src="data:image/gif;base64,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" style="left:50%;position:relative;margin-left:-64px;cursor:pointer"> </div> </td> </tr> </tbody> </table>';
        $("#posts").append(loadertable);
        autoloadenabled = true;
        $("#loadingimg").click(function () {
            autoloadenabled = false;
            $("#loadingtable").replaceWith("");
        });

        $.ajax({
            url: $(".pagination_next").attr("href"),
            cache: false
        }).done(function (html) {
            if (!(autoloadenabled)) return;
            $("#loadingtable").replaceWith("");
            $("#posts").append($(html).find("#posts").css("margin-top", "5px"));
            $(".pagination").html($(html).find(".pagination")[0]);
            atbottom = false;
        });
    }
});