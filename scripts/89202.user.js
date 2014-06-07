// ==UserScript==
// @name           声远社区快速导航脚本
// @namespace      SunBo05@163.com
// @description    主要的用途是在【家园 我的群 游戏应用 声远排行 我的空间】里面快速跳转到论坛讨论区
// @include        http://bbs.syuan.net/*
// ==/UserScript==
// 作者：★星矢★
// 如有问题请mail至 sunbo05@163.com

function AddContent() {

    var content = "<style type = 'text/css'>#mydiv {background:url('http://bbs.syuan.net/data/attachment/album/201010/30/181115ok2gil6yoq7ktzg4.png') no-repeat scroll 0 0 transparent; display:inline;    float:right!important;    height:26px;    line-height:26px;    margin:3px 10px 0 0;    padding:0 0 0 10px !important;    width:85px;}</style><div id='mydiv_menu' class='p_pop' style='position: absolute; z-index: 302; left: 305.5px; top: 139px;display:none'><ul>";

        //如果要添加自定义的内容，整行复制下面的语句，修改一下名称和链接地址就行了
        content = content + "<li><a href='http://bbs.syuan.net/home.php?mod=spacecp&ac=upload&op=flash&albumid=0'>「上传图片」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-4-1.html'>「关注济宁」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-27-1.html'>「美食军团」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-68-1.html'>「亲子联盟」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-26-1.html'>「驴友部落」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-21-1.html'>「灌水专区」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-24-1.html'>「摄影沙龙」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-32-1.html'>「影迷Club」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-29-1.html'>「音乐地带」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-25-1.html'>「网络剧场」</a></li>";
        content = content + "<li><a href='http://bbs.syuan.net/forum-87-1.html'>「论坛版务」</a></li>";
        content = content + "</ul></div>";

        if (document.createStyleSheet) {
            var style = document.createStyleSheet();
            style.cssText = "#mydiv {background:url('http://bbs.syuan.net/data/attachment/album/201010/30/193321wq2m2mpwmc6cqbdx.gif') no-repeat scroll 0 0 transparent; display:inline;    float:right!important;    height:26px;    line-height:26px;    margin:3px 10px 0 0;    padding:0 0 0 10px !important;    width:85px;}"; 
        }

        var menu = document.createElement("div");
        menu.innerHTML = content;
        document.body.insertBefore(menu, document.body.firstChild);

        if (document.getElementById("qmenu")) {
            document.getElementById("nv").innerHTML = document.getElementById("nv").innerHTML + "<a href='' id='mydiv' onmouseover=\"showMenu('mydiv')\">快速跳转</a>";
        }
        else {
            var list = document.getElementById("nv").getElementsByTagName("ul")[0];

            list.innerHTML = list.innerHTML + "<li><a href='' id='mydiv' onmouseover=\"showMenu('mydiv')\">快速跳转</a></li>";
        }

    };

    if (document.location.host == "bbs.syuan.net") {
        if (document.getElementById("nv")) {
            AddContent();
        }
    }