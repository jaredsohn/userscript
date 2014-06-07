// ==UserScript==
// @name         Qidian For Logined Account
// @namespace    Qidian For Logined Account
// @version      0.16
// @description  Qidian For Logined Account
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @include      http://vipreader.qidian.com/BookReader/vip*
// @include      http://h5.qidian.com/bookreader.html*
// @require      http://static.tieba.baidu.com/tb/static-common/lib/tb_lib.js
// @updateURL      https://userscripts.org/scripts/source/180520.meta.js
// @downloadURL    https://userscripts.org/scripts/source/180520.user.js
// @run-at      document-end
// @copyright    2012+, \u675c\u6653\u5b87
// ==/UserScript==
// \u7528\u6237\u81ea\u5b9a\u4e49
var waterMark = GM_getValue("waterMark",'(\u672a\u5b8c\u5f85\u7eed\u3002\u72ec\u884c\u4e8e\u5fc3 by \u675c\u6653\u5b87)');
// \u57fa\u672c\u53c2\u6570
//GM_addStyle(".reader_txt{position:fixed;right:60px;bottom:358px;} .reader_zs{bottom:263px !important;} .reader_ds{bottom:173px !important;} .reader_zan{bottom:73px !important;}.zj_cont {font-size: 10.5pt;}");
GM_addStyle('.reader_txt{background: url(http://h5.qidian.com/images/side-btns.png) no-repeat bottom center;top: 119px;z-index: 20000; width:40px;position: fixed;height: 52px;font-family:"Microsoft YaHei","Arial","SimSun";font-size: 16px;}');
GM_addStyle('.reader_settings{background: url(http://h5.qidian.com/images/side-btns.png) no-repeat center center;top: 67px;z-index: 20000; width:40px;position: fixed;height: 52px;font-family:"Microsoft YaHei","Arial","SimSun";font-size: 16px;}');
GM_addStyle('.reader_txt a ,.reader_settings a{left:2px;color: white;background:none repeat scroll 0 0 transparent;font-size:100%;margin:0;padding:0;vertical-align:baseline;text-decoration:none;}');
GM_addStyle('.set_config{border:1px solid rgba(0,0,0,.5);background-color:rgba(222,222,222,.9);width:200px;position:fixed;padding:10px;z-index:100;font-family:"Microsoft YaHei","Arial","SimSun";top:60px;left:50px;}')
GM_addStyle('.settings_button {margin:5px;}');
GM_addStyle('.set_config a{left:2px;background:none repeat scroll 0 0 transparent;font-size:16px;margin:10px;vertical-align:baseline;text-decoration:none;border:1px solid rgba(0,0,0,.3);text-align:center;width:60px;font-weight:bold;background-image:-webkit-linear-gradient(top, #ebebeb, #d2d2d2);background-image:-moz-linear-gradient(top, #ebebeb, #d2d2d2);display:block;}');
var ReadVipChapter = unsafeWindow.ReadVipChapter;
var ChapterReader = unsafeWindow.ChapterReader;
var chaptername, bookname, bookid, userid, chapterid, cookie;
var vip = 1;
var info = "\u6b63\u5728\u83b7\u53d6\u7ae0\u8282\u5185\u5bb9\uff0c\u8bf7\u7a0d\u5019";
var addr = "http://stayalone.duapp.com";
var img;
// -=-\u641e\u6765\u641e\u53bb\uff0c\u4e4b\u524d\u90a3\u4e2a\u4ee3\u7801\uff0c\u706b\u72d0Greasemonkey\u5c31\u662f\u76f4\u63a5\u4e0d\u7b49\u5f85\u7f51\u9875\u5b8c\u6210\uff0c\u5c31\u8fd0\u884c\u811a\u672c\u4e86- -\u4e0d\u7ba1\u600e\u4e48\u52a0run-at\u90fd\u8fd9\u6837\uff0c\u52a0\u4e86\u8fd9\u6837\uff0c\u52a0\u4e86\u4e0d\u540c\u7684\u8fd9\u6837\uff0c\u4e0d\u52a0\u4e5f\u8fd9\u6837\uff0c\u5c31\u6362\u4e86\u79cd\u601d\u8def\uff0c\u6765\u641e\uff0c\u76ee\u524dGreasemonkey\u548cTampermonkey\u6211\u81ea\u5df1\u6d4b\u8bd5\u662f\u90fd\u53ef\u4ee5\u7528\u4e86- -\u5565\u539f\u56e0\u5462\uff0c\u4e0d\u61c2\u554a- -
// Tampermonkey
duxiaoyu();
// Greasemonkey
document.onreadystatechange = function(){
    duxiaoyu();
};

function duxiaoyu(){
    if (document.readyState == "complete"){
    // \u53d6\u6d88\u53f3\u952e\u9650\u5236
        document.onselectstart = null;
        document.oncontextmenu = null;
        document.body.onselectstart = null;
        document.body.oncontextmenu = null;
        if ($('#form1')[0] != undefined) $('#form1')[0].oncontextmenu = null;
        // \u4e3b\u4f53\u529f\u80fd
        if (ReadVipChapter != undefined) {
            zhuzhan();
        } else if (ChapterReader != undefined) {
            html5();
        }
    }   
}

// vip.qidian.com
function zhuzhan() {
    if ($(".zj_txt")[0] == undefined) {
        img = $('.zj_img');
        var image = img.html();
        $(".reader_ds").before('<div id="GetChapterDiv" class="reader_txt" align="center"><a href="javascript:void(0);">\u83b7\u53d6\u7ae0\u8282</a> </div>');
        getChapterContent(img, image);
        settings();
    }
}

function getChapterContent(img, image) {
    $("#GetChapterDiv").click(function() {
        if ($(".zj_txt")[0] != undefined) {
            return;
        }
        var interval = setInterval(function() {
            info += ".";
            info = info.replace(".......", "");
            img.html(info);
        },
        1000);
        var data = getBookData();
        var url = addr + "/chapter/get";
        GM_xmlhttpRequest({
            method: 'POST',
            synchronous: false,
            url: url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: encodeURI(data),
            onload: function(response) {
                clearInterval(interval);
                var jsonT = JSON.parse(response.responseText);
                if (jsonT.error != "") {
                    $(".zj_img").html(jsonT.error);
                } else {
                    var text2 = jsonT.data.content + "\n\u3000\u3000" + waterMark;
                    //GM_setClipboard(text2,"text");
                    var text = text2.replace(/\n/g, "<p>");
                    text = '<div id="wdvscontent" style="padding: 0px; text-align: left; word-wrap: break-word; font-size: 13pt; width: 100%;font-family:\'Microsoft YaHei\',\'Arial\',\'SimSun\';">' + text;
                    img.html(text);
                    img.attr("class", "zj_txt");
                    GM_setClipboard(bookname + " " + chaptername + "\n\n" + text2, "text");
                    //copy(bookname + " "+ chaptername+"\n"+text2);
                }
            },
            onerror: function() {
                clearInterval(interval);
                img.html(image);
            }
        });
    });
}

function getUserId() {
    $.ajax({
        type: 'POST',
        url: 'http://h5.qidian.com/index.ashx',
        data: 'ajaxMethod=getuserinfo',
        success: function(data) {
            userid = data.ReturnObject[0].UserId;
        },
        dataType: "json",
        async: false
    });
}

function settings() {
    $('#GetChapterDiv').after('<div id="SettingsDiv" class="reader_settings" align="center" style=""><a href="javascript:void(0);" style="">\u8bbe<br>\u7f6e</a> </div>');
    $('#SettingsDiv').after('<div class="set_config" align="center" style="display:none;"><div><label for="water_mark" style="font:12px Arial,\'\u5b8b\u4f53\'">\u6c34\u5370\uff1a</label><input class="water_mark" id="water_mark" placeholder="\u5728\u8fd9\u91cc\u586b\u5199\u5c0f\u8bf4\u66f4\u65b0\u6c34\u5370" /></div><div class="settings_button"><a href="javascript:void(0);" class="save_button" style="float:left;">\u4fdd\u5b58</a><a href="javascript:void(0);" class="cancel_button" style="float:right;">\u53d6\u6d88</a></div></div>')
    $(".reader_settings").click(function(){
        waterMark = GM_getValue("waterMark",'(\u672a\u5b8c\u5f85\u7eed\u3002\u72ec\u884c\u4e8e\u5fc3 by \u675c\u6653\u5b87)');
        $(".water_mark").val(waterMark);$(".set_config").show();
    });
    $('.cancel_button').click(function(){$('.set_config').hide();});
    $(".save_button").click(function(){
        var water = $(".water_mark").val();
        GM_setValue('waterMark',water);
        waterMark = water;
        $('.set_config').hide();
    });
}

function getBookData() {
    cookie = $.cookie('cmfuToken');
    if (ReadVipChapter != undefined) {
        var chapterInfo = ReadVipChapter.ShowBook.BookInfo;
        bookname = chapterInfo.BookName;
        bookid = chapterInfo.bookId || chapterInfo.BookId;
        chapterid = ReadVipChapter.chapterId;
        chaptername = ReadVipChapter.chapterName;
        userid = ReadVipChapter.userId;
    } else {
        vip = ChapterReader.ChapterList.Chapters[0].IsVip;
        var chapterInfo = ChapterReader.ChapterList.Chapters[0];
        bookname = chapterInfo.BookName;
        bookid = chapterInfo.bookId || chapterInfo.BookId;
        chapterid = chapterInfo.ChapterId;
        chaptername = chapterInfo.ChapterName;
        getUserId();
    }
    return "cookie=" + cookie + "&bookid=" + bookid + "&chapterid=" + chapterid + "&vip=" + vip + "&userid=" + userid;
}

//h5.qidian.com
function html5() {
    //unsafeWindow.ChapterReader.ChapterList.LoadChapterById();
    bookid = ChapterReader.Options.Config.bookId;
    chapterid = ChapterReader.Options.Config.currentChapterId;
    $.post("http://h5.qidian.com/Book/BookReader.ashx", {
        bookid: bookid,
        chapterid: chapterid,
        ajaxMethod: 'getchapterinfo'
    },
    function(data) {
        if (data.ReturnCode == 100) {
            vip = 1;
        } else if (data.ReturnCode == 1) {
            vip = 0;
        } else {
            vip = -1;
        }
        if (vip != 1) return;
        img = $('.xdiv');
        var image = img.html();
        $('.shownav').after('<div id="GetChapterDiv" class="reader_txt" align="center"><a href="javascript:void(0);">\u83b7\u53d6\u7ae0\u8282</a> </div>');
        getChapterContent(img, image);        
        settings();
    },
    "json");
}