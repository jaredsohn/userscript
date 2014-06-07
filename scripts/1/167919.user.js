// ==UserScript==
//
// @name           fotostrana.ru smiley sending
//
// @description    Allows you to send a smiley to the user you’re viewing by pressing Ctrl + 1.
//
// @version        0.1
//
// @include        http://fotostrana.ru/*
//
// ==/UserScript==

$(window).keypress(function(e) {
    // Ctrl + 1
    if (e.which == 49 && e.ctrlKey) {
        // User ID is obtained from the DOM
        var userid = $("#tabs-wrap #tab-names a.tab-name.on").attr("href").match(/\/user\/(\d+)\//)[1];
         
        $.ajax({
            url: "http://fotostrana.ru/friends/ajax/openPopupSendOneMesseng/?_ajax=1&id="+userid,
            method: "get",
            success: function(data) {
                var sh_value = data.data.html.match(/sh\s+:\s\"(\d+)\",/)[1];
                $.ajax({
                    url: "http://fotostrana.ru/messengernew/backend/sendmessage",
                    method: "post",
                    data: "ajax=true&ftoken-msg:"+userid+"=123&message=:)&nct=1&sh="+sh_value+"&uid="+userid,
                    success: function(data) {
                        $("body").html("<h1 style=\"padding:15px;\">Ok, message sent.</h1>");
                    }
                });
            }
        });
    }
});
