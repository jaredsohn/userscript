// ==UserScript==
// @name       LF Quick Reply+
// @namespace  http://ellelelelelreplyyaquickcroll/
// @version    0.99
// @description  LF Quick Reply+LF Quick Reply+LF Quick Reply+LF Quick Reply+LF Quick Reply+LF Quick Reply+LF Quick Reply+
// @match http://www.leakforums.org/showthread.php?tid=*
// @match http://*.leakforums.org/showthread.php?tid=*
// @copyright  2013+, Oscar Sanchez
// @icon http://x.leakforums.org/images/leakforums/dot_newhotlockfolder.gif
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @run-at document-end
// ==/UserScript==

host = location.origin, page = location.pathname;
$("head").append("<style>body{overflow-x: hidden;}#quick_reply_form .expcolimage { display:none }#quickreply_e td:nth-of-type(2)>div{width:98% !important} .messageEditor{width: 100% !important; height: 165px !important;} .messageEditor div:nth-of-type(3){width:100% !important} #message_new{width: 98% !important; height: 95px !important;}</style>");
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
$('#quick_reply_submit').on("click keydown", function () {
    $("#message").val($("#message_new").val());
     $('#quick_reply_form').submit();
    return false;
});
$('#quick_reply_form').submit(function () {
    $("#message").val($("#message_new").val());
    return true;
});
