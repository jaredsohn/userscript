// ==UserScript==
// @name		feizan fake
// @namespace	pbunny
// @version		0.4.1
// @description	fake feizan to avoid coming out when studying in WenTu Lib ;P
// @match		http://www.feizan.com/*
// @downloadURL	http://userscripts.org/scripts/source/178831.user.js
// @updateURL	http://userscripts.org/scripts/source/178831.user.js
// @copyright	2012+, pbunny~
// @run-at		document-end
// ==/UserScript==

/*
 * 
 * 
Script Summary: fake feizan to avoid coming out when studying in WenTu Lib ;P

Version: 0.4.0

Copyright: 2012+, pbunny~

fake feizan to avoid coming out when studying in WenTu Lib ;P

环境：
chrome+Tampermonkey
（对其他环境的使用性不做任何保证;P）

功能： 
1.改变feizan标题栏外观（颜色） 
2.手动去掉两侧坑爹的广告栏（什么？你说想看最新帅哥照片？我只是水feizan的=。=） 
3.将新鲜事里面的图片默认隐藏，当鼠标移到相应新鲜事的时候显示图片（你说fz上怎么到处都是卖肉的=。=），鼠标移出时图片自动隐藏（防出必备啊2333！！新鲜事也会干净许多~） 
4.将标题栏和新鲜事浮动（靠右的搜索栏能适应窗口，新鲜事浮动到左边）

备注： 
1.feizan的logo，以及一些东西被我自己用adblock屏蔽了，在此脚本中未实现 
2.因为去掉了右侧的广告栏，但是又想看最近访客=w=，因此手动把访客塞到右边（就懒得美化了，美化就那回事2333） 
3.我第一次调戏userscript…有什么问题大家多包涵了…汗(￣▽￣") 
4.不怎么懂开源协议…就弄GPL吧…以GPL发布该代码、说明
5.更新方式，导入脚本以后开GM，点选更新即可
6.禁用脚本以及修改可以参见GM使用，如果只是临时禁用，可以用chrome的隐身模式;D

[3.4~4.0]改进：
1.修复切换页面脚本会挂的错误
2.现在加载更多新鲜事也不怕卖肉照了=w=

TODO：
1.存在加载时间问题，还是有可能被发现= =

欢迎大家的任何反馈（Report Bug）： 
i<at>pbunny.me</at>
 * 
 * 
 */

// make it public to call afterwards
function hide_boys_img(){
    // do something interesting (hide boys img)
    var smyset = document.getElementsByClassName("summaryimg");
    /*
         	 * can do something like a.href = "javascript: void(0)";
        	 */
    for(var i = 0; i < smyset.length; i++){
        var smys = smyset[i].parentNode;
        smyset[i].style.display = 'none';
        var smy_li = smys.parentNode.parentNode.parentNode;
        smy_li['onmouseover'] = function(event){
            var me = event.target;
            var myimgset = me.getElementsByClassName("summaryimg");
            for(var i = 0; i < myimgset.length; i++)
                myimgset[i].style.display = 'block';
        };
        
        smy_li['onmouseout'] = function(event){
            var me = event.target;
            var myimgset = me.getElementsByClassName("summaryimg");
            for(var i = 0; i < myimgset.length; i++)
                myimgset[i].style.display = 'none';
        };
    }// end of iterate smyset
    // return false;
}// end of the func


(
    function(){
        // change the icon and head
        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'http://www.stackoverflow.com/favicon.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
        document.title = "_(:3」∠)_";
        
        // hide the logo
        document.getElementsByClassName("logo")[0].style.display = "none";
        // change the css
        document.getElementById("header").style.background = "#99cccc";
        //document.getElementById("sidebar").style.display = "none";
        var visit = document.getElementsByClassName("avatar_list")[0];
        
        /*
         * some element name is changed in the user panel, different from the news panel,
         * so i have to make a try...catch block get it
         */
        try{
            // if no error, you are in news panel(xin xian shi)
            document.getElementById("app_sidebar").style.display = "none";
            document.getElementById("sidebar").innerHTML = visit.innerHTML;
            document.getElementsByClassName("tabs_header")[0].style.display = "none";
            document.getElementById("wrap").style.width = "auto";        
        } catch(err){
            // if error occurs, you are in user panel(wo de fei zan)
            
            // do nothing
            // document.getElementById("sidebox").innerHTML = visit.innerHTML;
        }        
        document.getElementsByClassName("nav_account")[0].style.display = "none";
        document.getElementsByClassName("headerwarp")[0].style.width = "auto";
        
        
        
        hide_boys_img();	// when load the page hide some img        
        
        // hide stupid img when load more news(xin xian shi)
        try{
            document.getElementById("feed_a_more")["onclick"] = function(event){
                feed_more();
                setTimeout(
                    function(){
                        hide_boys_img();
                        // alert('hello');
                    },
                    2500	// time delay
                );
            }
        } catch(err){
            // alert("you can't do that!");
        }
        
    }()
);

// unused js code
/*
        document.getElementById("feed_a_more").addEventListener(
            'click',
            function(event){
                event.preventDefault();
                hide_boys_img();
            },
            false
        );
        */