// ==UserScript==
// @name       HF Infiniscroll
// @author     emanb29
// @namespace  http://hackforums.net/
// @version    0.8
// @description  A userscript to enhance HF by providing infinite scrolling on thread listings and post listings
// @include     *hackforums.net/*
// @copyright  2014+, emanb29
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_info
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

if (window.location.href.match(".+://.*\\.?hackforums\\.net/showthread\\.php\\?tid=[0-9]+")){
    GM_log('tid match');
    var tid = window.location.href.match("tid=[0-9]+")[0],
        maxpgs,
        page = 1,
        allow = true,
        setting,
        postid;

    $('.pagination').append('<span class="bitButton HFScroll" style="padding: 5px; cursor: pointer;" title="Infinite Scroll"><img class="ScrollImg" src="' + "http://i.imgur.com/H2OONnP.png" + '""/></span>');

    if (getSettings("iScroll") === null){saveSettings("iScroll", true)}
    if (getSettings("iScroll") === true){
        $('.ScrollImg').attr("src", "http://i.imgur.com/M4Bu1Zp.png");
        setting = true;
    }
    if (getSettings("iScroll") === false){
        $('.ScrollImg').attr("src", "http://i.imgur.com/H2OONnP.png");
        setting = false;
    }
    try {
        maxpgs = ($('a[class="pagination_next"]')[0]) ? $('a[class="pagination_next"]').prev()[0].innerHTML : $('span[class="pagination_current"]')[0].innerText;
    } catch (ex) {
        maxpgs = 1;
    }

    page = document.getElementsByClassName("pagination_current")[0].innerText;
    postid = $('#posts');
    $(window).scroll(function () {
        if (setting === true){
            var height = $(document).height() - $(window).height();
            if ($(window).scrollTop() === height){
                if (allow = true && window.location.href.match(".+://.*\\.?hackforums\\.net/showthread\\.php\\?tid=[0-9]+")){
                    if (parseInt(page) < parseInt(maxpgs)){
                        allow = false;
                        page ++;
                        request(page);
                    }
                }
            }
        }
    });

    function request(page){
        $.ajax({
            type: "get",
            url: "/showthread.php?" + tid + "&page=" + page,
            dataType: "html",
            success: function (data){
                $(data).find('div#posts').each(function(){
                    postid.last().append('<br /> <table border="0" cellspacing="1" cellpadding="4" class="tborder" style="cursor: pointer; text-align: center; clear: both; border-bottom-width: 0;">' +
                        '<tbody class="HFbreak"><tr>' +
                        '<td class="thead" colspan="2">' +
                            '<div>' +
                                '<strong>Page: ' + page + '</strong>' +
                            '</div>' +
                       '</td>' +
                    '</tr>' +
                    '</tbody></table><br />');
                    var posts = $(this);
                    postid.last().append(posts.children());
                    $(".HFbreak").click(function(){
                        window.scrollTo(0, document.body.scrollHeight - 1000);
                    });
                });
                allow = true;
            }
        });
    }

    function saveSettings(aVal, aKey) {
        localStorage.setItem(aVal, JSON.stringify(aKey));
    }

    function getSettings(aKey) {
        var str = localStorage.getItem(aKey);
        return JSON.parse(str);
    }

    $(".bitButton.HFScroll").click(function(){
       if (setting === true){
           saveSettings("iScroll", false);
           $('.ScrollImg').attr("src", "http://i.imgur.com/H2OONnP.png");
           setting = false;
           GM_log(setting);
       }else{
           saveSettings("iScroll", true);
           $('.ScrollImg').attr("src", "http://i.imgur.com/M4Bu1Zp.png");
           setting = true;
           GM_log(setting);
       }
    });
} else if (window.location.href.match(".+://.*\\.?hackforums\\.net/forumdisplay\\.php\\?fid=[0-9]+")) {
    GM_log('fid match');
    var fid = window.location.href.match("fid=[0-9]+")[0],
        maxpgs,
        page = 1,
        allow = true,
        setting,
        threadid,
        currentpage;

    $('.pagination').append('<span class="bitButton HFScroll" style="padding: 5px; cursor: pointer;" title="Infinite Scroll"><img class="ScrollImg" src="' + "http://i.imgur.com/H2OONnP.png" + '""/></span>');

    if (getSettings("iScroll") === null){saveSettings("iScroll", true)}
    if (getSettings("iScroll") === true){
        $('.ScrollImg').attr("src", "http://i.imgur.com/M4Bu1Zp.png");
        setting = true;
    }
    if (getSettings("iScroll") === false){
        $('.ScrollImg').attr("src", "http://i.imgur.com/H2OONnP.png");
        setting = false;
    }
    try {
        maxpgs = ($('a[class="pagination_next"]')[0]) ? $('a[class="pagination_next"]').prev()[0].innerHTML : $('span[class="pagination_current"]')[0].innerText;
    } catch (ex) {
        maxpgs = 1;
    }

    currentpage = document.getElementsByClassName("pagination_current")[0].innerText;
    page = document.getElementsByClassName("pagination_current")[0].innerText;

    threadid = $('table[style="clear: both;"]>tbody');

    $(window).scroll(function () {
        if (setting === true){
            var height = $(document).height() - $(window).height();
            if ($(window).scrollTop() === height){
                if (allow = true && window.location.href.match(".+://.*\\.?hackforums\\.net/forumdisplay\\.php\\?fid=[0-9]+")){
                    if (parseInt(page) < parseInt(maxpgs)){
                        allow = false;
                        page ++;
                        GM_log("Page: " + page);
                        request(page);
                    }
                }
            }
        }
    });

    var request = function(page){
        $.ajax({
            type: "get",
            url: "/forumdisplay.php?" + fid + "&page=" + page,
            dataType: "html",
            success: function (data){
                var tr = $(data).find('table[style="clear: both;"]>tbody tr:not(:first)');
                $('table[style="clear: both;"]>tbody>tr:last').remove();
                threadid.last().append(tr);
                allow = true;
            }
        });
    }

    function saveSettings(aVal, aKey) {
        localStorage.setItem(aVal, JSON.stringify(aKey));
    }

    function getSettings(aKey) {
        var str = localStorage.getItem(aKey);
        return JSON.parse(str);
    }

    $(".bitButton.HFScroll").click(function(){
       if (setting === true){
           saveSettings("iScroll", false);
           $('.ScrollImg').attr("src", "http://i.imgur.com/H2OONnP.png");
           setting = false;
           GM_log(setting);
       }else{
           saveSettings("iScroll", true);
           $('.ScrollImg').attr("src", "http://i.imgur.com/M4Bu1Zp.png");
           setting = true;
           GM_log(setting);
       }
    });
}