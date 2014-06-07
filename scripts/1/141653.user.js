// ==UserScript==
// @name       Pixiv一键收藏画师
// @namespace  http://userscripts.org/scripts/show/141653
// @version    1.12
// @description  P站关注画师/加书签需要弹出一个新页面 很不方便 现在只要点一下就好了
// @match      http://www.pixiv.net/*
// @copyright  2012, XpAhH
// ==/UserScript==
$=parent.$;
//一键关注
$("input[name=left_column]").click(function(){
    var ob={};
    var ar=$("#favorite-preference form").serializeArray();
    for(var a in ar)ob[ar[a].name]=ar[a].value;
    $.post($("#favorite-preference form").attr("action"),ob).success(function(){
        $("#favorite-button").attr("class","following").html('<i class="_icon sprites-follow"></i>正在关注');
        $("#favorite-preference div.action").append('<input type="button" value="删除书签" class="button remove">');
    });
    $("#favorite-preference").hide();
    return!1
});
//一键书签
$("div.bookmark a").click(function(){
    var d=location.search.match(/id=(\d+)/)[1];
    $.post("bookmark_add.php",{mode:"add",id:d,"type":"illust"}).success(function(){
        $("div.bookmark").html('[ <a href="bookmark_detail.php?illust_id='+d+'">书签登录完了</a> | <a href="bookmark_add.php?type=illust&amp;illust_id='+d+'">编辑</a> ]');
    });
    return!1
});