// ==UserScript==
// @name       For Steam Gifts
// @namespace  http://fsf.jun4rui.com
// @version    1.52 beta
// @description  steamgifts helper
// @match      http://www.steamgifts.com/*
// @copyright  2013, Jun4rui
// @require    http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==

// 初始化变量
if(typeof(GM_getValue("haveGames"))=="undefined"){
        GM_setValue("haveGames","");
}
/* 首页和列表页的处理方式 */
if (location.href=="http://www.steamgifts.com/" || location.href.indexOf("http://www.steamgifts.com/open/")!=-1){
    /* 这里是关注的游戏列表，可以自己按照格式添加和删减 */
    var favoriteList        = [
        {"name":"borderlands"},
        {"name":"Hotline Miami"},
        {"name":"Serious Sam 2"},
        {"name":"Superbrothers Sword Sworcery EP"}
    ];

    /* 在顶部增加关注游戏的搜索按钮 */
    $("div.bg_gradient.shadow").append("<div style=\"display:block; width:1000px; margin:0 auto; font-size:12px; padding:10px 0px;\" id=\"favoritePanel\"></div>");
    $("#favoritePanel").append("<div style=\"color:#FFF; font-weight:bold;\">关注标题：</div>");
    for (i in favoriteList){
        $("#favoritePanel").append("<a href=\"http://www.steamgifts.com/open/search/"+favoriteList["name"]+" target=\"_blank\" style=\" display:inline;\"><button style=\"line-height:200%;\">"+favoriteList["name"]+"</button></a>");
    }

    /* 在每个游戏标题后面增加搜索同名游戏的按钮 */
    $("div.post").each(function(){
        var gameTitle        = $(this).find("div.title a").text();
        var gameUrl                = $(this).find("div.title a").attr("href");
        var thisGameSearchLink        = "http://www.steamgifts.com/open/search/"+gameTitle.replace(/[\&|:]/g," ");
        //alert(gameTitle);
        var enterHTML        ="<a href=\""+gameUrl+"#oneKeyEnter\" target=\"_blank\"><button style=\"line-height:200%;\">一键进入</button></a>";
        var linkHTML        = "<a href=\""+thisGameSearchLink+"\" target=\"_blank\"><button style=\"line-height:200%;\">搜索: "+gameTitle+"</button></a>";
        $(this).find("div.title").append(enterHTML);
        $(this).find("div.title").append(linkHTML);
    });
}

/* 单独游戏页面的处理方式 */
if (location.href.indexOf("http://www.steamgifts.com/giveaway")!=-1){
        // 如果这个游戏你已经有了
    if ($("a.rounded.view").text()=="Exists in Your Account"){
            // 判断havaGames中是否有这个游戏
        var currentGameName        = $("div.content .featured .right .title").text();
        // 没有这个游戏则将名字加入列表用作屏蔽显示用
        if (GM_getValue("haveGames").indexOf(currentGameName)==-1){
                GM_setValue("haveGames",currentGameName+"|"+GM_getValue("haveGames"));
        }
    }
}


/* 单独的游戏页面一键参加模式的处理方式 */
if (location.href.indexOf("#oneKeyEnter")!=-1){
    //alert("一键进入模式");
    // 可参加则参加
    if ($("#form_enter_giveaway a.rounded.view.submit_entry").length==1){
        $("#form_enter_giveaway a.rounded.view.submit_entry").get(0).click();
    }else{
        // 不可参加自动关闭窗口
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
}

/* 搜索结果页面的处理方式 */
//if (location.href.indexOf("/search/")>0 || location.href=="http://www.steamgifts.com/"){
if ($("div.content .post").length>0){
    $("body").prepend("<div id='outPanel' style='height:auto; padding:0px 10px 10px 0px; background:#333; overflow:hidden;'></div>");
    $("body").prepend("<div style='display:block; line-height:30px; color:#FFF; background:#000; text-align:center; font-size:12px;'>Steam gifts助手 1.5版[排序切换 <a href=\"http://www.steamgifts.com/\">标准</a>/<a href=\"http://www.steamgifts.com/?sortmode=greed\">贪婪</a>][<a href=\"#\" title=\""+GM_getValue("haveGames")+"\">屏蔽列表</a>]</div>");
    getGameList(location.href);
}


/* 载入游戏列表的函数 */
function getGameList(inUrl){
    $.get(inUrl,function(HTMLData){
        // 读取本本页内容添加到列表
        $(HTMLData).find("div.post").each(function(){
            //alert($(this).find("div.title a").text());
            var gameName        = $(this).find("div.title a").text();
            var gameUrl         = $(this).find("div.title a").attr("href");
            var gamePic         = $(this).find("div.right img").attr("src");
            var enterNum        = parseInt($(this).find(".entries span a:eq(0)").text().replace(/,/,""),10);
            var enterPoint      = $(this).find("div.title span").text().replace(/New:/g,"");
            // 确定用何种排序算法
            if (location.href.indexOf("?sortmode=greed")>0){
                var sortValue        = (parseInt(enterPoint.replace(/[(|)|P]/g,""))/10000)+':'+parseInt(enterNum,10)/10000;        // 按照点数+参与人数排序用这个（贪婪模式）
            }else{
                    var sortValue        = gameName+':'+parseInt(enterNum,10)/10000;                                // 按照名称+参与人数排序用这个
            }
            // 确定活动状态
            var gameStatus        = "";
            if ($(this).find("div.contributor_only").length==0){
                gameStatus        = "open";
            }else{
                if ($(this).find("div.contributor_only").hasClass("green")){
                    // gameStatus        = "达成"+contributorText.substring(contributorText.indexOf("(")+1,contributorText.indexOf(")"));
                    gameStatus        = "qualified";
                }else{
                    //gameStatus        = "不足"+contributorText.substring(contributorText.indexOf("(")+1,contributorText.indexOf(")"));
                    gameStatus        = "notQualified";
                }    
            }
            if ($(this).hasClass("fade")){
                gameStatus                = "entered";
            }

            // 判断是否已经有了
            if (GM_getValue("haveGames").indexOf(gameName)!=-1){
                    gameStatus                = "have";
            }

            // 如果可以参加，才显示
            if (gameStatus=="open" || gameStatus=="qualified"){
                $("#outPanel").append('<a href="'+gameUrl+'#oneKeyEnter" title="'+gameName+'" sortStr="'+sortValue+'" target="_blank" class="gameCardUnit"><div style="margin: 10px 0px 0px 10px; width:110px; height:auto;padding:1px 0px; background:#FFF; border:1px solid #D8D8D8;text-align:center; display:inline-block; font-size:12px; line-height:180%; color:#FFF;"><div><img src="'+gamePic+'"  style="border:0px; width:108px; height:45px;" alt="'+gameName+'"></div><div style="text-align:center; color:#404040;">'+enterNum+enterPoint+'</div></div></a>');
            }
        });

        // 判断是否有下一页
        if ($(HTMLData).find("p.numbers a:eq("+($(HTMLData).find("p.numbers a").length-1)+")").text()=="Next"){
            getGameList($(HTMLData).find("p.numbers a:eq("+($(HTMLData).find("p.numbers a").length-1)+")").attr("href"));
        }
        // 排序！
        //alert($("#outPanel .gameCardUnit").toArray().length);
        var divObj        = $("#outPanel .gameCardUnit").toArray().sort(function(a,b){
            return $(a).attr("sortStr").localeCompare($(b).attr("sortStr"));
        });
        $("#outPanel").html(divObj);
    });

    return true;
}