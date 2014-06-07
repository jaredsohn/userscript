// ==UserScript==
// @name gMusicDownloader
// @namespace gMusicDownloader
// @description Download music for g.top100.cn one at time
// @version 0.2.1
// @author Sean
// @match http://g.top100.cn/*
// @match http://www.google.cn/music/top100/*
// ==/UserScript==

//chrome加载iframe为一个html文件，直接匹配iframe的url
//g.top100.cn/xxxx的内容
//<body style="margin: 0px;">
//  <iframe id="download-iframe" src="" width="650" height="350" frameborder="0" scrolling="no"/>
//</body>

//download-iframe内容
//<div class="download">
//<a href="/music/top100/url?q=http://file4.top100.cn/.../full%2520circle.mp3"></a>
//<span class="download-hint">如果下载有问题，请尝试点击鼠标右键，选择“目标另存为”下载。</span>
//</div>

var m_pathname = document.location.pathname;

if (-1 != m_pathname.indexOf("download.html")) {
    //顶级html对象，9秒后关闭
    //9秒后关闭下载窗口
    setTimeout('window.close()', 9000);
}

if (-1 != m_pathname.indexOf("music/top100")) {
    //打开iframe中的下载链接
    window.location = document.getElementsByTagName("a")[3].href;
}
