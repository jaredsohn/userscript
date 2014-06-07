// ==UserScript==
// @name           tiebaxinxiyiyue
// @version        20130310.0
// @namespace      nhnhwsnh
// @author         nhnhwsnh
// @description    用来标记贴吧已阅的信息
// @include       http://tieba.baidu.com/i/*/replyme
// @include       http://tieba.baidu.com/i/*/replyme?&pn=*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

if(typeof GM_getValue("mynum") === 'undefined'){          
    GM_setValue("mynum", '26483130000');                                           
}

gotit();

var $replymecontents = $("div.replyme_content");
for(var i = 0; i < $replymecontents.length; i++) {
    var $replymecontent = $replymecontents.eq(i);
    var numlink = $replymecontent.children("a").attr("href")
    var num = /&?sc=(\d+)&?/.exec(numlink)[1]
    var feedtime = $replymecontent.parent().parent().parent().children("div.feed_right").children("div.feed_time")
    time=feedtime.text()
    feedtime.html('<a num='+num+' style="cursor:pointer">'+feedtime.text()+'</a>')
    feedtime.children()[0].addEventListener("click", markit, false);
}


function gotit(){
    var $replymecontents = $("div.replyme_content");
    for(var i = 0; i < $replymecontents.length; i++) {
        var $replymecontent = $replymecontents.eq(i);
        var numlink = $replymecontent.children("a").attr("href")
        var num = /&?sc=(\d+)&?/.exec(numlink)[1]
        $replymecontent.parent().parent().parent().attr("style","background-image: url() !important;")

        if(num==GM_getValue("mynum")){
            $replymecontent.parent().parent().parent().attr("style",";background-position: right center !important;background-color: white !important;background-image: url(http://www.yljy.com/admin/UploadFile/20114218261166.jpg) !important;background-repeat: no-repeat !important;")
        }
    }
}
function markit(){
    GM_setValue("mynum", $(this).attr("num"));
     gotit();
}

