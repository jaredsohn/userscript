// ==UserScript==
// @name           kottt's vkontakte music download (testing)
// @description    Music download for vkontakte.ru (testing)
// @namespace      http://vk.com
// @include        http://vk.com/*
// @include        http://vkontakte.ru/*
// @version        20100908
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var getDownloadLink = function (click_code) {
    var xxx = /http:\/\/cs(\d+)\.vkontakte\.ru\/u(\d+)\/audio\/(\w+)\.mp3/(click_code);
    if (xxx != null && xxx.length > 0)
        return xxx[0];

    var arr = /operate([a-zA-Z]*?)\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/(click_code);
    var link = '';

    if (arr != null) {
        var user = arr[4];
        if (user < 100000) {
            user = parseInt(user) + 100000;
            user = (user.toString()).substr(1);
        }
        link = "http://cs" + arr[3] + ".vkontakte.ru/u" + user + "/audio/" + arr[5] + ".mp3";
    }
    else {
        arr = /'(\S+?)'/(click_code);
        link = arr[1];
    }

    return link;
};

var loadLinks = function () {
    $("a.download_link").remove();
    $(".playimg").each(function () {

        var titleTd = $(this).parent().parent().find("td:eq(1)");
        var linkTitle = $.trim(titleTd.find("div:eq(0)").text());

        var linkTag = $("<a/>").addClass("download_link").css("margin-left", 3)
                .attr({ "title": linkTitle, "alt": linkTitle, "href": getDownloadLink(this.getAttribute("onclick")) })
                .html("\u0441\u043A\u0430\u0447\u0430\u0442\u044C");

        //linkTag.html('<img alt="' + linkTitle + '" src="http://img133.imageshack.us/img133/1976/dlpo8.gif">');

        titleTd.find("small").remove();
        titleTd.find(".duration").append(linkTag);
        titleTd.find(".audioTitle").width(290);
    });
};

$(document).ready(function () {
    loadLinks();
    var update_links_button = $("<br /><div style=\"border-bottom:1px solid #D1D1D1; margin-bottom: 10px;\"><div style=\"border:1px solid #3B6798;\"><div id=\"update_links\" style=\"background-color:#6D8FB3;border-color:#7E9CBC #5C82AB #5C82AB;border-right:1px solid #5C82AB;border-style:solid;border-width:1px;color:#FFFFFF;cursor:pointer;padding:5px;text-align:center;\">Update download links</div></div></div>");

    $(".sidePanel, #filters").prepend(update_links_button);
    $("#update_links").click(loadLinks);
});