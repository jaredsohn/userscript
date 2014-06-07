// ==UserScript==
// @name            Hack Forums Automatically apply BBCode to your posts
// @namespace       Snorlax
// @description     Applies custom MyBB code when you post a new post
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @include         *hackforums.net/*
// @version         1.01
// ==/UserScript==

regex = /^(.*)Your/g;
first = regex.exec(GM_getValue("customPost"));
regex = /post(.*)$/g;
second = regex.exec(GM_getValue("customPost"));

if(window.location.href.indexOf("hackforums.net/showthread.php?tid=") >= 1) {
    console.log("MyBB Thread");
    textarea = $("#message");
    $("#quick_reply_submit").before('<input type="button" class="button" value="Post Reply" tabindex="2" accesskey="s" id="newQuickReply" />');
    $("#quick_reply_submit").removeAttr("accesskey").hide();
    $("#newQuickReply").on("click", function() {
        runScript();
        $("#quick_reply_submit").click();
    });
}

if(window.location.href.indexOf("hackforums.net/newreply.php?tid=") >= 1 || window.location.href.indexOf("hackforums.net/private.php") >= 1) {
    console.log("MyBB New Reply");
    textarea = $("#message_new");
    $("input[name='submit']").on("click", function() {
        runScript();
    });
}

if(window.location.href.indexOf("hackforums.net/usercp.php?action=profile") >= 1) {
    if(! GM_getValue("customPost")) {
        GM_setValue("customPost", "[b]Your post[/b]");
    }
    console.log("Settings page");
    settings = '<fieldset class="trow2"> \
<legend> \
<strong>Auto add BBCode to posts</strong> \
</legend> \
<span class="smalltext">Enter your MyBB code below. You do not need to save it, because it will save automatically every time you type something. If you just installed this userscript, all your posts will be bold as you can see below. \
All you have to do is type in your MyBB code around the "Your post" and it will apply on your posts when you post. You HAVE to leave the "Your post" there and apply your BBCode around it.<br /> \
To make the text normal, just type in "Your post" and it will be normal.</span><br /><br /> \
<input type="text" id="customPost" value="' + GM_getValue("customPost") + '"/><br /><br /> \
</fieldset>';
    $(".tborder:last .trow1:first .trow2:last").after('<br />' + settings);
    $("#customPost").keyup(function() {
        GM_setValue("customPost", $(this).val());
    });
}

function runScript() {
    textarea.val($("textarea").val().replace(/(\[\/quote\]\s*|^)([^[]+?)(\s*\[quote|$)/g, "$1" + first[1] + "$2" + second[1] + "$3"));
}