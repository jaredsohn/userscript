// ==UserScript==
// @name            Hack Forums PM quote remover
// @namespace       Snorlax
// @description     Removes all quotes but the last one in a PM
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/private.php?action=send&pmid=*
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @version         1.0
// ==/UserScript==

textarea = $("#message_new");
GM_setValue("savedMessage", textarea.val());

replace = textarea.val().replace(/^(\[quote=(?:(?!\[quote=)[\s\S]*?))\[quote=[\s\S]+\[\/quote\]\s*([\s\S]+?\[\/quote\]\s*)$/g, "$1$2\n\n");
textarea.val(replace);

$(".tborder tr:last td:last span").append('<label><input type="checkbox" class="checkbox loadMessage" name="options[loadMessage]" value="0" tabindex="8" checked="checked"><strong>Strip quotes?</strong> Strip all quotes but the last.</label>');

$('.loadMessage').live('change', function(){
    if($(this).is(':checked')){
        textarea.val(replace);
    } else {
        textarea.val(GM_getValue("savedMessage"));
    }
});