// ==UserScript==
// @name           Share easy downloads helper for Chrome
// @create         2012-02-27
// @lastmodified   2013-03-20
// @namespace      http://jixun.org/
// @version        1.0.0.3
// @description    Share Easy so to create download.(support Sina-iask,baidu-wenku)
// @include        http://ishare*.sina*.cn/f/*
// @include        http://wenku.baidu.com/view/*

// @include        ×://idown.org/cloud/reflash.php?id=*
// @include        ×://idown.org/cloud/verifydown.php

// @copyright      2012+, Yulei, Chrome Compatibility by Jixun
// ==/UserScript==

// if(!window["\x6f\x70\x65\x72\x61"]){return false};
document.addEventListener( "DOMContentLoaded", function() {
    var d = document,
        win = unsafeWindow,
        dHost = win.location.host.toLowerCase();
    
    win.console.log ('SEDH4C :: 脚本启动\n.:[ Share easy downloads helper for Chrome 1.0.0.3 ]:.\n',
                     '如果使用中发现问题，请访问: http://userscripts.org/scripts/show/160519#script-nav 并提出。');
    
    if (dHost.indexOf ('sina.com.cn') > 0) {
        // 新浪共享资料
        win.console.log ('SEDH4C :: 启动 :: 新浪');
        var fileid  = (win.fileid  || win.mfileid),
            dowB = d.getElementById('download_file'),
            dInfo = d.querySelector ('.p5'),
            s = d.createElement ('span'),
            finaurl = (win.finaurl || ("http://ishare.sina.cn/dintro.php?id=" + fileid));
        
        if (parseInt (dowB.nextElementSibling.innerHTML) == 0) {
            s.innerHTML = '文件无需积分下载';
        } else if (parseInt(d.querySelector ('.download_btn_box span').innerHTML.replace (/\dM/g, '9999')) > 5000) {
            s.innerHTML = '文件过大，无法免积分下载';
        } else {
            // 需要积分且文件在 5M 以内则开始解析真实地址
            s.innerHTML = '正在解析下载地址 ...';
            GM_xmlhttpRequest ({
                method: "GET",
                url: finaurl,
                onload: function (r) {
                dowB.href = (r.responseText.match (/<a href\="(.+?)">立即下载全部/i)||[,''])[1];
                s.innerHTML = '下载地址解析完毕，单击下方按钮即可开始下载';
            }});
        }
        dInfo.insertBefore (s, dInfo.firstElementChild);
        win.console.log ('SEDH4C :: 结束 :: 新浪');
        return ;
    } else if ('wenku.baidu.com' == dHost) {
        // 百度文库
        win.console.log ('SEDH4C :: 启动 :: 百度文库');
        var iFrame = d.createElement ('iframe');
        // http://wenku.baidu.com/view/<文章ID>
        // http://idown.org/cloud/reflash.php?id=<文章ID>
        iFrame.height = 300;
        iFrame.width  = 420;
        iFrame.style.border = 0;
        iFrame.src = '//idown.org/cloud/reflash.php?id=' + (win.location.href.match (/view\/([a-f0-9]+?)\.h/i)||[,''])[1];
        d.querySelector ('#ft-down-area').appendChild (iFrame);
        var cssCode = '.banner-wrap { display: none; }',
            eStyle = d.createElement ('style');
        eStyle.textContent = cssCode;
        d.querySelector ('body').appendChild (eStyle);
        win.console.log ('SEDH4C :: 结束 :: 百度文库');
    } else {
        win.console.log ('未知站点，请联系作者修正。');
    }
    win.console.log ('SEDH4C :: 脚本执行完毕。');
}, false);

/* （兼容：Firefox18、Chromes23；支持：Opera12；） 
*  1、新浪爱问共享资料,直接下载，去积分限制，无须登录，积分文件目前只支持5M以下
*   2、百度文库，直接下载，去积分限制，无须登录
* 简单成就下载 -|- by Yulei 本脚本只作学习研究参考用，版权所有 不得滥用、商用、它用，后果自负
*/

/*
*  jixun66 个人改造版 - 兼容 Chrome
* 
*   iDown云 那里现在有了验证码，没找到绕过去的方法，所以还是算了吧 >.>
*   新浪资源下载那没看懂，自己写了个解析方法。
* 
*/