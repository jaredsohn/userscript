// ==UserScript==
// @name       百度贴吧热门动态指定贴吧屏蔽
// @namespace  http://openszone.com
// @author	Myfreedom614 <openszone@gmail.com>
// @version    1.1
// @description  百度贴吧的热门动态中屏蔽指定贴吧的帖子
// @homepage	https://userscripts.org/scripts/show/171512
// @updateURL	https://userscripts.org/scripts/source/171512.meta.js
// @downloadURL	https://userscripts.org/scripts/source/171512.user.js
// @include http://tieba.baidu.com/home/main?*
// @include http://tieba.baidu.com/i/*?fr=home
// @exclude http://tieba.baidu.com/home/main?*/*
// @copyright  2013,Myfreedom614
// ==/UserScript==

/* History
 * 2013-10-13 v1.1 支持新的贴吧主页链接 http://tieba.baidu.com/home/main?(id/un)=....
 * 2013-10-13 v1.0 同时支持新版 贴吧主页 和 我的 i 贴吧
 * 2013-10-11 v0.4 百度改版，个人主页链接格式为：http://tieba.baidu.com/home/main?id=.......
 * 2013-06-24 v0.3 排除某些页面，按钮样式微调
 * 2013-06-23 v0.2 增加点击按钮，可一键屏蔽或者取消屏蔽功能
 * 2013-06-21 v0.1 首个版本
 */

function doblock()
{
    var siteurl = document.URL;
    var blocklist = ['在此输入贴吧名'];//关键词名单,填写格式：['关键字1','关键字2',...,'关键字N']
    if(siteurl.indexOf("main") != -1)
        var items = document.getElementsByClassName('n_right');
    else
        var items = document.getElementsByClassName('feat_item');
    var div = document.getElementById('blockitem');
    //alert(items.length);
    for(i in items )
    {
        if(siteurl.indexOf("main") != -1)
            var tiebaname = items[i].getElementsByClassName('n_name')[0].title;
        else
            var tiebaname = items[i].getElementsByClassName('j_tbname')[0].title;
        
        if( tiebaname )
            for( j in blocklist )
            {
                if( tiebaname.indexOf( blocklist[j] ) != -1 )
                {
                    if ( items[i].style.display == "none" ) 
                    {     
                        items[i].style.display = "";
                        div.innerHTML = "点击屏蔽指定贴吧";
                    }
                    else
                    {
                        items[i].style.display = "none"; 
                        div.innerHTML = "取消屏蔽指定贴吧";
                    }
                }
                    
            }
    }
}
var siteurl = document.URL;


if(siteurl.indexOf("main") == -1)
{
    var div = document.getElementsByClassName('current')[0];
    div.innerHTML += "<a id='blockitem' style='cursor: pointer; color: red !important; background: #e6e6e6 !important;' >取消屏蔽指定贴吧</a>";
}
else
{
    var div = document.getElementsByClassName('threadList_title')[0];
    div.innerHTML += "<span class='cut_line'>|</span><a id='blockitem' style='cursor: pointer; color: red !important; text-decoration: none !important;text-shadow: 0 0 15px #FF0000 !important;' >取消屏蔽指定贴吧</a>";
}
div = document.getElementById('blockitem');
div.onclick = doblock;
doblock();//默认屏蔽